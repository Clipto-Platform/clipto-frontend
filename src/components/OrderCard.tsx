import styled from 'styled-components';

import { Text } from '../styles/typography';

export interface OrderCardProps {}

const OrderCardContainer = styled.div`
  border: 1px solid ${(props) => props.theme.border};
  padding: 24px;
  margin-bottom: 32px;
  border-radius: 16px;
`;

const OrderCardTopRowContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const OrderCardBodyContainer = styled.div`
  padding-top: 24px;
`;

const HR = styled.div`
  height: 1px;
  margin-left: -24px;
  width: calc(100% + 48px);
  background-color: ${(props) => props.theme.border};
`;

const OrderCard = () => {
  return (
    <OrderCardContainer>
      <OrderCardTopRowContainer>
        <div>left</div>
        <div>right</div>
      </OrderCardTopRowContainer>
      <HR />
      <OrderCardBodyContainer>
        <div style={{ marginBottom: 40 }}>
          <Text style={{ marginBottom: 8 }}>Instructions</Text>
          <Text style={{ color: '#ffffff' }}>Tell Jet merry christmas and congrats on finishing his finals.</Text>
        </div>
        <div>action panel</div>
      </OrderCardBodyContainer>
    </OrderCardContainer>
  );
};

export { OrderCard };
