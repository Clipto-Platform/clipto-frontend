import styled from 'styled-components';
import { useCreator } from '../hooks/useCreator';
import { Request } from '../pages/Orders';
import { theme } from '../styles/theme';
import { Label, Text } from '../styles/typography';
import { getShortenedAddress } from '../utils/address';
import { formatETH } from '../utils/format';
import { checkIfDeadlinePassed, DAY, HOUR } from '../utils/time';
import { AvatarComponent } from './AvatarOrb';

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

const AvatarContainer = styled.div`
  margin-right: 16px;
`

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
  request: Request;
  txHash?: string;
  key: number;
  isReceived: boolean;
}

const SecondaryLabel = styled(Text)`
  font-weight: bold;
`;

const BidAmount = styled(Text)`
  font-weight: bold;
  color: ${(props) => props.theme.yellow};
`;

const OrderCard: React.FC<OrderCardProps> = (props) => {
  const { isReceived, request } = props;
  const { creator, loaded } = useCreator(props.request.creator);
  const userAddress = props.isReceived ? props.request.requester : props.request.creator;
  const status = request.delivered ? isReceived ? 'Received' : 'Paid' : 'Bid';

  const getDeadline = () => {
    //TODO(jonathanng) - move to time.ts
    const creationDate: Date = new Date(props.request.created!);
    creationDate.setDate(creationDate.getDate() + (props.request?.deadline || 0));
    const mmRemaining = creationDate.getTime() - Date.now();
    if (mmRemaining < DAY && DAY - mmRemaining > 0) {
      const remaining = (mmRemaining - (mmRemaining % HOUR)) / HOUR;
      return remaining > 0 ? ` ${remaining} Hours` : 'Expired';
    }
    return creationDate.toLocaleDateString();
  };

  return (
    <OrderCardContainer>
      <OrderCardTopRowContainer>
        <Row>
          <AvatarContainer>
            {isReceived && <AvatarComponent address={userAddress} />}
            {!isReceived && creator && <AvatarComponent url={creator.profilePicture} />}
          </AvatarContainer>
          <Column>
            {/* TODO(jonathanng) - make dynamic */}
            {!isReceived && <Label style={{ marginBottom: 2 }}>{creator?.userName}</Label>}
            <Text>{getShortenedAddress(userAddress)}</Text>
          </Column>
        </Row>
        <Row>
          <Column style={{ marginRight: 40, textAlign: 'right' }}>
            <SecondaryLabel style={{ marginBottom: 2 }}>Deadline</SecondaryLabel>
            <Text
              style={{
                color: `${(() => {
                  if (checkIfDeadlinePassed(new Date().toString(), props.request?.deadline)) {
                    return theme.red;
                  } else {
                    return '#ffffff';
                  }
                })()}`,
              }}
            >
              {getDeadline()}
            </Text>
          </Column>
          <Column style={{ textAlign: 'right' }}>
            <SecondaryLabel style={{ marginBottom: 2 }}> {status} </SecondaryLabel>
            <BidAmount>{formatETH(parseFloat(props.request?.amount))} ETH</BidAmount>
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
