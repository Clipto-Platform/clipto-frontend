import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { AvatarComponent } from '../components/AvatarOrb';
import { PrimaryButton } from '../components/Button';
import { HeaderContentGapSpacer, HeaderSpacer } from '../components/Header';
import { PageContentWrapper, PageWrapper } from '../components/layout/Common';
import { OrderCard } from '../components/OrderCard';
import { OrdersTab } from '../components/Orders/OrdersTab';
import { Item, Tabs } from '../components/Tabs';
import { API_URL } from '../config/config';
import { useExchangeContract } from '../hooks/useContracts';
import { Description, Label } from '../styles/typography';
import { checkIfDeadlinePassed } from '../utils/time';

export type Request = {
  id: number;
  requestId: number;
  requester: string;
  creator: string;
  amount: string;
  description: string;
  deadline: number;
  delivered: boolean;
  txHash: string;
  created: string;
};

export const Status = styled.div`
  width: 90px;
  height: 30px;
  line-height: 30px;
  background: rgba(255, 255, 255, 0.1); //TODO(jonathanng) - color don't be lazy
  font-family: 'Scto Grotesk A';
  border-radius: 40px;
  text-align: center;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.4); //TODO(jonathanng) - color don't be lazy
}
`;

const TabContent = styled.div`
  margin-top: 48px;
`;

const SingleColumnPageContent = styled(PageContentWrapper)`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const OrdersPage = () => {
  const [requestsByUser, setRequestsByUser] = useState<Request[]>([]);
  const [requestsToUser, setRequestsToUser] = useState<Request[]>([]);
  const { account } = useWeb3React<Web3Provider>();
  const exchangeContract = useExchangeContract(true);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const getRequests = async () => {
      if (account) {
        const userRequests = await axios.get(`${API_URL}/request/receiver/${account}`);
        setRequestsByUser(userRequests.data.reverse());

        const creatorRequests = await axios.get(`${API_URL}/request/creator/${account}`);
        setRequestsToUser(creatorRequests.data.reverse());
        setLoaded(true)
      }
    };
    getRequests();
  }, [account]);

  return (
    <>
      <PageWrapper>
        <HeaderSpacer />
        <HeaderContentGapSpacer />
        <SingleColumnPageContent>
          <Tabs aria-label="View received and purchased orders">
            <Item key="purchased" title="Purchased">
              <OrdersTab
                loaded={loaded}
                requests={requestsByUser}
                FallbackWhenNoRequests={() => (<div style={{ textAlign: 'center', display: 'flex', marginBottom: 24, marginTop: 80, width: '100%' }}>
                  <div style={{ display: 'block', width: '100%' }}>
                    <Label style={{ marginBottom: '40px' }}>You haven’t made any booking requests yet.</Label>
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
                </div>)}>
                {(requests) => requests.map((i, n) => (
                  <OrderCard key={i.id} request={i}>
                    {i.delivered && (
                      <PrimaryButton
                        onPress={() => {
                          navigate(`/orders/${i.creator}/${i.requestId}`);
                        }}
                        size="small"
                        width="small"
                        style={{ marginTop: 20 }}
                        isDisabled={true}
                      >
                        View clip
                      </PrimaryButton>
                    )}
                    {!i.delivered && !checkIfDeadlinePassed(i.created, i.deadline) && (
                      <Status style={{ marginTop: 20 }}>PENDING</Status>
                    )}
                    {!i.delivered && checkIfDeadlinePassed(i.created, i.deadline) && (
                      <PrimaryButton
                        size="small"
                        width="small"
                        variant="secondary"
                        style={{ marginTop: 20 }}
                        onPress={async () => {
                          //TODO(jonathanng) - when refunded, ui doesn't update. Also reload results in view clip button
                          const tx = await exchangeContract.refundRequest(i.creator, i.requestId);
                          await tx.wait();
                          const verificationResult = await axios
                            .post(`${API_URL}/request/finish`, { id: i.id })
                            .then(() => {
                              toast.success('Successfully on refund!');
                            })
                            .catch((e) => {
                              console.log(e);
                              toast.error('Error on refund!');
                            });
                        }}
                      >
                        Claim refund
                      </PrimaryButton>
                    )}
                  </OrderCard>
                ))}
              </OrdersTab>
            </Item>
            <Item key="received" title="Received">
              <OrdersTab
                loaded={loaded}
                requests={requestsToUser}
                FallbackWhenNoRequests={() => ((
                  <div style={{ textAlign: 'center', display: 'flex', marginBottom: 24, marginTop: 80, width: '100%' }}>
                    <div style={{ display: 'block', width: '100%' }}>
                      <Label style={{ marginBottom: '24px' }}>You haven’t received any booking requests yet.</Label>
                      {/* <Description>Set up your creator profile to start receiving bookings.</Description> */}
                      {/* Note(jonathanng) - currently /orders is not accessible for noncreators */}
                    </div>
                  </div>
                ))}>
                {(requests) => (requests.map((i, n, f) => (
                  <OrderCard key={i.id} request={i}>
                    {!i.delivered && !checkIfDeadlinePassed(i.created, i.deadline) && (
                      <PrimaryButton
                        onPress={() => {
                          navigate(`/orders/${i.creator}/${i.requestId}`);
                        }}
                        size="small"
                        width="small"
                        style={{ marginTop: 20 }}
                      >
                        Upload clip
                      </PrimaryButton>
                    )}
                    {!i.delivered && checkIfDeadlinePassed(i.created, i.deadline) && (
                      <Status style={{ marginTop: 20, minWidth: 160 }}>PAST DEADLINE</Status>
                    )}
                    {i.delivered && (
                      <PrimaryButton
                        onPress={() => {
                          navigate(`/orders/${i.creator}/${i.requestId}`);
                        }}
                        variant="secondary"
                        size="small"
                        width="small"
                        style={{ marginTop: 20 }}
                        isDisabled={true}
                      >
                        View clip
                      </PrimaryButton>
                    )}
                  </OrderCard>
                )))}
              </OrdersTab>
            </Item>
          </Tabs>
        </SingleColumnPageContent>
      </PageWrapper>
    </>
  );
};

export { OrdersPage };
