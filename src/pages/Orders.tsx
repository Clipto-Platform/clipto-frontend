import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { PrimaryButton } from '../components/Button';
import { HeaderContentGapSpacer, HeaderSpacer } from '../components/Header';
import { PageContentWrapper, PageWrapper } from '../components/layout/Common';
import { OrderCard } from '../components/OrderCard';
import { Item, Tabs } from '../components/Tabs';
import { API_URL } from '../config/config';
import { useExchangeContract } from '../hooks/useContracts';
import { CreateRequestDto } from './Booking';

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
  const [requestsByUser, setRequestsByUser] = useState<CreateRequestDto[]>([]);
  const [requestsToUser, setRequestsToUser] = useState<CreateRequestDto[]>([]);
  const { account } = useWeb3React<Web3Provider>();
  const exchangeContract = useExchangeContract(true);

  useEffect(() => {
    const getRequests = async () => {
      if (account) {
        const userRequests = await axios.get(`${API_URL}/request/receiver/${account}`);
        setRequestsByUser(userRequests.data);

        const creatorRequests = await axios.get(`${API_URL}/request/creator/${account}`);
        setRequestsToUser(creatorRequests.data);
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
              <TabContent>
                {requestsToUser.map((i, n) => (
                  <OrderCard key={i!.index!} request={i}>
                    {i.delivered && (
                      <PrimaryButton
                        link={{
                          to: `/orders/${i.creator}/${i.requestId}`,
                          state: { request: i },
                        }}
                        size="small"
                        width="small"
                        style={{ marginTop: 20 }}
                      >
                        View clip
                      </PrimaryButton>
                    )}
                    {!i.delivered && i.deadline >= 0 && <Status style={{ marginTop: 20 }}>PENDING</Status>}
                    {!i.delivered && i.deadline < 0 && (
                      <PrimaryButton
                        size="small"
                        width="small"
                        variant="secondary"
                        style={{ marginTop: 20 }}
                        onPress={async () => {
                          //TODO(jonathanng) - when refunded, ui doesn't update. Also reload results in view clip button
                          const tx = await exchangeContract.refundRequest(i.creator, i.index!);
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
              </TabContent>
            </Item>
            <Item key="received" title="Received">
              <TabContent>
                {requestsByUser.map((i, n, f) => (
                  <OrderCard key={i!.index!} request={i}>
                    {!i.delivered && i.deadline >= 0 && (
                      <PrimaryButton
                        link={{
                          to: `/orders/${i.creator}/${i.requestId}`,
                          state: { request: i },
                        }}
                        size="small"
                        width="small"
                        style={{ marginTop: 20 }}
                      >
                        Upload clip
                        {/* {console.log(i)}
                        {console.log(n)}
                        {console.log(f)}
                        {console.log(i.position)} */}
                      </PrimaryButton>
                    )}
                    {!i.delivered && i.deadline < 0 && (
                      <Status style={{ marginTop: 20, minWidth: 160 }}>PAST DEADLINE</Status>
                    )}
                    {i.delivered && (
                      <PrimaryButton
                        link={{
                          to: `/orders/${i.creator}/${i.requestId}`,
                          state: { request: i },
                        }}
                        variant="secondary"
                        size="small"
                        width="small"
                        style={{ marginTop: 20 }}
                      >
                        View clip
                      </PrimaryButton>
                    )}
                  </OrderCard>
                ))}
              </TabContent>
            </Item>
          </Tabs>
        </SingleColumnPageContent>
      </PageWrapper>
    </>
  );
};

export { OrdersPage };
