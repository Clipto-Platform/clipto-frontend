import styled from 'styled-components';

import { HeaderContentGapSpacer, HeaderSpacer } from '../components/Header';
import { PageContentWrapper, PageWrapper } from '../components/layout/Common';
import { OrderCard } from '../components/OrderCard';
import { Item, Tabs } from '../components/Tabs';

const TabContent = styled.div`
  margin-top: 48px;
`;

const SingleColumnPageContent = styled(PageContentWrapper)`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const OrdersPage = () => {
  return (
    <>
      <PageWrapper>
        <HeaderSpacer />
        <HeaderContentGapSpacer />
        <SingleColumnPageContent>
          <Tabs aria-label="View received and purchased orders">
            <Item key="received" title="Received">
              <TabContent>
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
              </TabContent>
            </Item>
            <Item key="purchased" title="Purchased">
              <TabContent>purchased tab</TabContent>
            </Item>
          </Tabs>
        </SingleColumnPageContent>
      </PageWrapper>
    </>
  );
};

export { OrdersPage };
