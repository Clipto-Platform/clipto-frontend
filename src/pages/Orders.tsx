import { HeaderContentGapSpacer, HeaderSpacer } from '../components/Header';
import { PageContentWrapper, PageWrapper } from '../components/layout/Common';
import { Item, Tabs } from '../components/Tabs';

const OrdersPage = () => {
  return (
    <>
      <PageWrapper>
        <HeaderSpacer />
        <HeaderContentGapSpacer />
        <PageContentWrapper style={{ width: '100%', maxWidth: 600, margin: '0 auto' }}>
          <Tabs aria-label="View received and purchased orders">
            <Item key="received" title="Received">
              <div style={{ marginTop: 48 }}>received tab</div>
            </Item>
            <Item key="purchased" title="Purchased">
              <div style={{ marginTop: 48 }}>purchased tab</div>
            </Item>
          </Tabs>
        </PageContentWrapper>
      </PageWrapper>
    </>
  );
};

export { OrdersPage };
