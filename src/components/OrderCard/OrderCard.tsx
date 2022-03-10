import { SYMBOL } from '../../config/config';
import { theme } from '../../styles/theme';
import { Label, Text } from '../../styles/typography';
import { getShortenedAddress } from '../../utils/address';
import { bigIntToReadable } from '../../utils/format';
import { deadlineMessage, isRequestExpired } from '../../utils/time';
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
  WideContainer,
} from './Style';
import { OrderCardProps } from './types';

const OrderCard: React.FC<OrderCardProps> = (props) => {
  const { isReceived, request } = props;
  const userAddress = props.isReceived ? props.request.requester : props.request.creator.address;
  const status = request.delivered ? (isReceived ? 'Received' : 'Paid') : 'Bid';

  return (
    <OrderCardContainer>
      <OrderCardTopRowContainer>
        <Row>
          <AvatarContainer>
            {isReceived && <AvatarComponent address={userAddress} />}
            {!isReceived && request.creator && <AvatarComponent url={request.creator.profilePicture} />}
          </AvatarContainer>
          <Column>
            {/* TODO(jonathanng) - make dynamic */}
            {!isReceived && <Label style={{ marginBottom: 2 }}>{request.creator.userName}</Label>}
            <Text>{getShortenedAddress(userAddress)}</Text>
          </Column>
        </Row>
        <Row>
          <WideContainer>
            {!(request.delivered || request.refunded) && (
              <Column style={{ marginRight: 40 }}>
                <SecondaryLabel style={{ marginBottom: 2 }}>Deadline</SecondaryLabel>
                <Text
                  style={{
                    color: `${(() => {
                      if (isRequestExpired(request.timestamp, request.deadline)) {
                        return theme.red;
                      } else {
                        return '#ffffff';
                      }
                    })()}`,
                  }}
                >
                  {deadlineMessage(request.timestamp, request.deadline)}
                </Text>
              </Column>
            )}
            <Column style={{ textAlign: 'right' }}>
              <SecondaryLabel style={{ marginBottom: 2 }}> {status} </SecondaryLabel>
              <BidAmount>
                {bigIntToReadable(request.amount)} {SYMBOL}
              </BidAmount>
            </Column>
          </WideContainer>
        </Row>
      </OrderCardTopRowContainer>
      <HR />
      <OrderCardBodyContainer>
        <div style={{ marginBottom: 0 }}>
          <SecondaryLabel style={{ marginBottom: 8 }}>Instructions</SecondaryLabel>
          <Text style={{ color: '#ffffff' }}>{request.description}</Text>
        </div>
        <Row style={{ flex: 1 }}>{props.children}</Row>
      </OrderCardBodyContainer>
    </OrderCardContainer>
  );
};

export { OrderCard };
