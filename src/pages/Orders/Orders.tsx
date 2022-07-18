import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import Loader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify';
import * as api from '../../api';
import { EntityRequest } from '../../api/types';
import { PrimaryButton } from '../../components/Button';
import { HeaderSpacer } from '../../components/Header/Header';
import { PageWrapper } from '../../components/layout/Common';
import { OrderCard } from '../../components/OrderCard/OrderCard';
import { OrdersTab, Status } from '../../components/Orders/OrdersTab';
import { Item, Tabs } from '../../components/Tabs';
import { useExchangeContract, useExchangeContractV1 } from '../../hooks/useContracts';
import { Description, Label } from '../../styles/typography';
import { isRequestExpired } from '../../utils/time';
import { HighlightText, SingleColumnPageContent } from './Style';

const OrdersPage = () => {
  const [requestsByUser, setRequestsByUser] = useState<EntityRequest[]>([]);
  const [requestsToUser, setRequestsToUser] = useState<EntityRequest[]>([]);
  const { account, library } = useWeb3React<Web3Provider>();
  const exchangeContract = useExchangeContract(true);
  const exchangeContractV1 = useExchangeContractV1(true);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const [userRequestsPage, setUserRequestsPage] = useState<number>(1);
  const [creatorRequestsPage, setCreatorRequestsPage] = useState<number>(1);
  const [hasMoreCreatorRequests, setHasMoreCreatorRequests] = useState<boolean>(true);
  const [hasMoreUserRequests, setHasMoreUserRequests] = useState<boolean>(true);
  const limit: number = 10;

  useEffect(() => {
    const getRequests = async () => {
      if (account) {
        await api
          .userRequests(account, userRequestsPage, limit)
          .then((res) => {
            if (res.data) {
              const requests = res.data.requests;
              const has = requests.length !== 0 && requests.length % limit === 0;

              setHasMoreUserRequests(has);
              setRequestsByUser([...requestsByUser, ...requests]);
            }
          })
          .finally(() => setLoaded(true));
      }
    };
    getRequests();
  }, [account, userRequestsPage]);

  useEffect(() => {
    const getRequests = async () => {
      if (account) {
        await api
          .creatorRequests(account, creatorRequestsPage, limit)
          .then((res) => {
            if (res.data) {
              const requests = res.data.requests;
              const has = requests.length !== 0 && requests.length % limit === 0;

              setHasMoreCreatorRequests(has);
              setRequestsToUser([...requestsToUser, ...requests]);
            }
          })
          .finally(() => setLoaded(true));
      }
    };
    getRequests();
  }, [account, creatorRequestsPage]);

  const handleScrollUserRequests = () => {
    setUserRequestsPage(userRequestsPage + 1);
  };

  const handleScrollCreatorRequests = () => {
    setCreatorRequestsPage(creatorRequestsPage + 1);
  };

  const refund = async (request: EntityRequest) => {
    try {
      const version = request.id.split('-')[1];
      const contract = version === 'v0' ? exchangeContract : exchangeContractV1;
      const tx = await contract.refundRequest(request.creator.address, request.requestId);
      await tx.wait();
      toast.success('Successfully refunded!');

      const updated = requestsByUser.map((req) => {
        if (req.id === request.id) {
          req.refunded = true;
        }
        return req;
      });
      setRequestsByUser(updated);
    } catch (err) {
      toast.error('Error initiating refund!');
    }
  };

  return (
    <>
      <PageWrapper>
        <HeaderSpacer />
        <SingleColumnPageContent>
          <Tabs aria-label="View received and purchased orders">
            <Item key="ordered" title="Ordered">
              <OrdersTab
                loaded={loaded}
                requests={requestsByUser}
                FallbackWhenNoRequests={() => (
                  <div style={{ textAlign: 'center', display: 'flex', marginBottom: 24, marginTop: 80, width: '100%' }}>
                    <div style={{ display: 'block', width: '100%' }}>
                      <Label style={{ marginBottom: '40px' }}>You haven't made any booking requests yet.</Label>
                      {/* <Description>Set up your creator profile to start receiving bookings.</Description> */}
                      <PrimaryButton
                        onPress={() => {
                          navigate(`/explore`);
                        }}
                        size="small"
                        width="small"
                        style={{ marginTop: 20, margin: 'auto' }}
                      >
                        Explore creators
                      </PrimaryButton>
                    </div>
                  </div>
                )}
              >
                {(requests) => {
                  return (
                    <InfiniteScroll
                      dataLength={requests.length}
                      next={() => {
                        handleScrollUserRequests();
                      }}
                      hasMore={hasMoreUserRequests}
                      style={{ position: 'relative' }}
                      loader={
                        <div
                          style={{
                            width: '100%',
                            position: 'absolute',
                            textAlign: 'center',
                            bottom: '-48px',
                            marginBottom: '40px',
                          }}
                        >
                          <Loader color="#fff" />
                        </div>
                      }
                    >
                      {requests.map((i, n) => (
                        <OrderCard key={i.id} request={i} isReceived={false}>
                          {i.delivered && (
                            <PrimaryButton
                              onPress={() => {
                                navigate(`/orders/${i.creator.address}/${i.requestId}/${i.version}`);
                              }}
                              size="small"
                              width="small"
                              style={{ marginTop: 20 }}
                            >
                              View clip
                            </PrimaryButton>
                          )}
                          {!i.delivered && !isRequestExpired(i.createdTimestamp, i.deadline) && !i.refunded && (
                            <Status style={{ marginTop: 20 }}>PENDING</Status>
                          )}
                          {!i.delivered && isRequestExpired(i.createdTimestamp, i.deadline) && !i.refunded && (
                            <PrimaryButton
                              size="small"
                              width="small"
                              variant="secondary"
                              style={{ marginTop: 20 }}
                              onPress={async () => {
                                toast.loading('Refund may take few minutes', { toastId: 1 });
                                await refund(i);
                                toast.dismiss(1);
                              }}
                            >
                              Claim refund
                            </PrimaryButton>
                          )}
                          {!i.delivered && i.refunded && (
                            <>
                              <HighlightText style={{ marginTop: 10 }}>This order has been refunded.</HighlightText>
                            </>
                          )}
                        </OrderCard>
                      ))}
                    </InfiniteScroll>
                  );
                }}
              </OrdersTab>
            </Item>
            <Item key="received" title="Received">
              <OrdersTab
                loaded={loaded}
                requests={requestsToUser}
                FallbackWhenNoRequests={() => (
                  <div style={{ textAlign: 'center', display: 'flex', marginBottom: 24, marginTop: 80, width: '100%' }}>
                    <div style={{ display: 'block', width: '100%' }}>
                      <Label style={{ marginBottom: '10px' }}>You haven't received any booking requests yet.</Label>
                      <Description style={{ marginBottom: '30px' }}>
                        Set up your creator profile to start receiving bookings.
                      </Description>
                      {/* Note(jonathanng) - currently /orders is not accessible for noncreators */}
                      <PrimaryButton
                        onPress={() => {
                          navigate(`/onboarding`);
                        }}
                        size="small"
                        width="small"
                        style={{ marginTop: 20, margin: 'auto' }}
                      >
                        Create profile
                      </PrimaryButton>
                    </div>
                  </div>
                )}
              >
                {(requests) => {
                  return (
                    <InfiniteScroll
                      dataLength={requests.length}
                      next={() => {
                        handleScrollCreatorRequests();
                      }}
                      hasMore={hasMoreCreatorRequests}
                      style={{ position: 'relative' }}
                      loader={
                        <div
                          style={{
                            width: '100%',
                            position: 'absolute',
                            textAlign: 'center',
                            bottom: '-48px',
                            marginBottom: '40px',
                          }}
                        >
                          <Loader color="#fff" />
                        </div>
                      }
                    >
                      {requests.map((i, n, f) => (
                        <OrderCard key={i.id} request={i} isReceived={true}>
                          <span
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              width: '100%',
                            }}
                          >
                            {!i.delivered && !isRequestExpired(i.createdTimestamp, i.deadline) && (
                              <PrimaryButton
                                onPress={() => {
                                  navigate(`/orders/${i.creator.address}/${i.requestId}/${i.version}`);
                                }}
                                size="small"
                                width="small"
                                style={{ marginTop: 20 }}
                              >
                                Upload clip
                              </PrimaryButton>
                            )}
                            {!i.delivered && isRequestExpired(i.createdTimestamp, i.deadline) && (
                              <Status style={{ marginTop: 20, minWidth: 160 }}>PAST DEADLINE</Status>
                            )}
                            {i.delivered && (
                              <PrimaryButton
                                onPress={() => {
                                  navigate(`/orders/${i.creator.address}/${i.requestId}/${i.version}`);
                                }}
                                variant="secondary"
                                size="small"
                                width="small"
                                style={{ marginTop: 20 }}
                              >
                                View clip
                              </PrimaryButton>
                            )}
                            {i.isBusiness ? (
                              <PrimaryButton
                                size="small"
                                width="small"
                                style={{
                                  marginTop: 20,
                                  background: 'rgba(29, 161, 242, 0.84)',
                                  color: '#FFFFFF',
                                }}
                              >
                                For Business
                              </PrimaryButton>
                            ) : (
                              ''
                            )}
                          </span>
                        </OrderCard>
                      ))}
                    </InfiniteScroll>
                  );
                }}
              </OrdersTab>
            </Item>
          </Tabs>
        </SingleColumnPageContent>
      </PageWrapper>
    </>
  );
};

export { OrdersPage };
