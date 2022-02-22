import { SYMBOL } from '../../config/config';
import { useCreator } from '../../hooks/useCreator';
import { theme } from '../../styles/theme';
import { Label, Text } from '../../styles/typography';
import { getShortenedAddress } from '../../utils/address';
import { formatETH } from '../../utils/format';
import { checkIfDeadlinePassed, DAY, HOUR } from '../../utils/time';
import { AvatarComponent } from '../AvatarOrb';
import {
  AvatarContainer,
  BidAmount,
  Column,
  HR,
  OrderCardBodyContainer,
  OrderCardContainer,
  OrderCardTopRowContainer,
  Row,
  SecondaryLabel,
  WideContainer
} from './Style';
import { OrderCardProps } from './types';

const OrderCard: React.FC<OrderCardProps> = (props) => {
  const { isReceived, request } = props;
  const { creator, loaded } = useCreator(props.request.creator);
  const userAddress = props.isReceived ? props.request.requester : props.request.creator;
  const status = request.delivered ? (isReceived ? 'Received' : 'Paid') : 'Bid';

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
          <WideContainer>
            <Column style={{ marginRight: 40 }}>
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
              <BidAmount>
                {formatETH(parseFloat(props.request?.amount))} {SYMBOL}
              </BidAmount>
            </Column>
          </WideContainer>
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
