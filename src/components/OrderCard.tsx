import styled from 'styled-components';

import { Label, Text } from '../styles/typography';
import { AvatarOrb } from './AvatarOrb';
import { PrimaryButton } from './Button';

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

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

type CreatorCardStates = 'rejected' | 'past-deadline' | 'upload-clip' | 'accept-booking' | 'done';
type UserOrderCardStates = 'pending' | 'accepted' | 'cancelled' | 'done' | 'rejected';

export interface OrderCardProps {
  username: string;
  address: string;
  deadline?: Date;
  bidAmount: string;
  bidSymbol: string;
  instructions: string;
  clipData?: any;
  action?: CreatorCardStates | UserOrderCardStates;
}

const SecondaryLabel = styled(Text)`
  font-weight: bold;
`;

const BidAmount = styled(Text)`
  font-weight: bold;
  color: ${(props) => props.theme.yellow};
`;

const OrderCard: React.FC<OrderCardProps> = (props) => {
  return (
    <OrderCardContainer>
      <OrderCardTopRowContainer>
        <Row>
          <AvatarOrb style={{ marginRight: 16 }} />
          <Column>
            <Label style={{ marginBottom: 2 }}>CC0maxi</Label>
            <Text>0xD79...Cf15</Text>
          </Column>
        </Row>
        <Row>
          <Column style={{ marginRight: 40, textAlign: 'right' }}>
            <SecondaryLabel style={{ marginBottom: 2 }}>Deadline</SecondaryLabel>
            <Text style={{ color: '#ffffff' }}>Dec 20, 2021</Text>
          </Column>
          <Column style={{ textAlign: 'right' }}>
            <SecondaryLabel style={{ marginBottom: 2 }}>Bid</SecondaryLabel>
            <BidAmount>500 USDC</BidAmount>
          </Column>
        </Row>
      </OrderCardTopRowContainer>
      <HR />
      <OrderCardBodyContainer>
        <div style={{ marginBottom: 40 }}>
          <SecondaryLabel style={{ marginBottom: 8 }}>Instructions</SecondaryLabel>
          <Text style={{ color: '#ffffff' }}>Tell Jet merry christmas and congrats on finishing his finals.</Text>
        </div>
        <Row style={{ flex: 1 }}>{props.children}</Row>
      </OrderCardBodyContainer>
    </OrderCardContainer>
  );
};

export { OrderCard };
