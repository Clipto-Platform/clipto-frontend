import styled from 'styled-components';

import { CreateRequestDto } from '../pages/Booking';
import { Label, Text } from '../styles/typography';
import { getShortenedAddress } from '../utils/address';
import { AvatarOrb } from './AvatarOrb';
import { PrimaryButton } from './Button';
import { Link } from 'react-router-dom';
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

// definitely good to implement in v2
// export interface OrderCardProps {
//   username: string;
//   address: string;
//   deadline?: Date;
//   bidAmount: string;
//   bidSymbol: string;
//   instructions: string;
//   clipData?: any;
//   action?: CreatorCardStates | UserOrderCardStates;
// }

export interface OrderCardProps {
  request: CreateRequestDto;
  txHash?: string;
  key: number;
}

const SecondaryLabel = styled(Text)`
  font-weight: bold;
`;

const BidAmount = styled(Text)`
  font-weight: bold;
  color: ${(props) => props.theme.yellow};
`;

const OrderCard: React.FC<OrderCardProps> = (props) => {
  console.log(props)
  const getDeadline = () => {
    const creationDate: Date = new Date(props.request!.created!);
    creationDate.setDate(creationDate.getDate() + (props.request?.deadline || 0));
    return creationDate.toLocaleDateString();
  };
  return (
    <OrderCardContainer>
      <OrderCardTopRowContainer>
        <Row>
          <AvatarOrb style={{ marginRight: 16 }} />
          <Column>
            <Label style={{ marginBottom: 2 }}>CC0maxi</Label>
            <Text>{props.request?.creator ? getShortenedAddress(props.request?.creator) : ''}</Text>
          </Column>
        </Row>
        <Row>
          <Column style={{ marginRight: 40, textAlign: 'right' }}>
            <SecondaryLabel style={{ marginBottom: 2 }}>Deadline</SecondaryLabel>
            <Text style={{ color: '#ffffff' }}>{getDeadline()}</Text>
          </Column>
          <Column style={{ textAlign: 'right' }}>
            <SecondaryLabel style={{ marginBottom: 2 }}>Bid</SecondaryLabel>
            <BidAmount>{props.request?.amount} ETH</BidAmount>
          </Column>
        </Row>
      </OrderCardTopRowContainer>
      <HR />
      <OrderCardBodyContainer>
        <div style={{ marginBottom: 0 }}>
          <SecondaryLabel style={{ marginBottom: 8 }}>Instructions</SecondaryLabel>
          <Text style={{ color: '#ffffff' }}>{props.request?.description}</Text>
        </div>
        <Row style={{ flex: 1 }}>{props.children}</Row>
      </OrderCardBodyContainer>
    </OrderCardContainer>
  );
};

export { OrderCard };
