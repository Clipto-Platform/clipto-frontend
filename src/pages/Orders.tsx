import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
        // NOTE(jonathanng) - this is one way to get the order of the requests. This is important for knowing which request to change for the contracts
        for (let i = 0; i < userRequests.data.length; i++) {
          userRequests.data[i].index = i;
        }
        setRequestsByUser(userRequests.data);
        const creatorRequests = await axios.get(`${API_URL}/request/creator/${account}`);
        for (let i = 0; i < creatorRequests.data.length; i++) {
          creatorRequests.data[i].index = i;
        }
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
                  <OrderCard key={i.index} request={i}>
                    {i.delivered && (
                      <PrimaryButton
                        link={{
                          to: `/orders/${i.index}`,
                          state: { request: i },
                        }}
                        size="small"
                        width="small"
                        style={{ marginTop: 20 }}
                      >
                        View clip
                      </PrimaryButton>
                    )}
                    {!i.delivered && <Status style={{ marginTop: 20 }}>PENDING</Status>}
                  </OrderCard>
                ))}
              </TabContent>
            </Item>
            <Item key="received" title="Received">
              <TabContent>
                {requestsByUser.map((i, n, f) => (
                  <OrderCard key={i.index} request={i}>
                    {!i.delivered && (
                      <PrimaryButton
                        link={{
                          to: `/orders/${i.index}`,
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
                    {i.delivered && (
                      <PrimaryButton
                        link={{
                          to: `/orders/${i.id}`,
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
