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
                  <OrderCard key={n} request={i} />
                ))}
              </TabContent>
            </Item>
            <Item key="received" title="Received">
              <TabContent>
                {requestsByUser.map((i, n) => (
                  <OrderCard key={n} request={i}>
                    {!i.delivered && (
                      // {TODO(jonathanng) - Link and useLocation is very weird, make sure useLocation doesn't break here when you move Link somewhere else}
                      <PrimaryButton size="small" width="small" style={{ marginTop: 20 }}>
                        <Link to={`/orders/${i.id}`} state={{ request: i }} style={{}}>
                          Upload clip
                        </Link>
                      </PrimaryButton>
                    )}
                    {i.delivered && (
                      <Link to={`/orders/${i.id}`} state={{ request: i }} style={{ marginTop: 20 }}>
                        {/* TODO(jonathanng) - add Link here once useLocation is figured out */}
                        <PrimaryButton variant="secondary" size="small" width="small">
                          View clip
                        </PrimaryButton>
                      </Link>
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
