import { useEffect, useState } from 'react';
import { formatUnits } from 'ethers/lib/utils';
import config from '../../config/config';
import { theme } from '../../styles/theme';
import { Label, Text } from '../../styles/typography';
import { getErcTokenSymbol, getShortenedAddress } from '../../utils/address';
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
import * as lens from '@/api/lens'
const OrderCard: React.FC<OrderCardProps> = (props) => {
  const { isReceived, request } = props;
  const displayBusiness = request.isBusiness && props.displayBusiness;
  const userAddress = props.isReceived ? props.request.requester : props.request.creator.address;
  const status = request.delivered ? (isReceived ? 'Received' : 'Paid') : 'Bid';

  const symbol = getErcTokenSymbol(request.erc20);
  const [url, setUrl] = useState<string>(); // only to be set if the request isReceived and is a creator or has a lens profile
  
  useEffect(() => {
    if (!isReceived) return;
    //check if the requester is also a creator or has a lens profile
    lens.getProfile(request.requester).then(({data, error}) => {
      if (error) {
        console.error(error)
      } else if (data) {
        if (data.profiles.items.length > 0) {
          const lensProfile = data.profiles.items[0]
          setUrl(lensProfile.picture.original.url)
        }
      }
    })
  }, [isReceived])
  useEffect(() => {console.log(url)}, [url])
  return (
    <OrderCardContainer>
      <OrderCardTopRowContainer>
        <Row>
          <AvatarContainer>
            {isReceived && !url && <AvatarComponent address={userAddress} />}
            {isReceived && url && <AvatarComponent address={userAddress} url={url} />}
            {!isReceived && request.creator && (
              <AvatarComponent url={request.creator.profilePicture} twitterHandle={request.creator.twitterHandle} />
            )}
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
                      if (isRequestExpired(request.createdTimestamp, request.deadline)) {
                        return theme.red;
                      } else {
                        return '#ffffff';
                      }
                    })()}`,
                  }}
                >
                  {deadlineMessage(request.createdTimestamp, request.deadline)}
                </Text>
              </Column>
            )}
            <Column style={{ textAlign: 'right' }}>
              <SecondaryLabel style={{ marginBottom: 2 }}> {status} </SecondaryLabel>
              <BidAmount>
                {formatUnits(request.amount, config.erc20[symbol].decimals)} {symbol}
              </BidAmount>
            </Column>
          </WideContainer>
        </Row>
      </OrderCardTopRowContainer>
      <HR />
      <OrderCardBodyContainer>
        <div style={{ marginBottom: 0 }}>
          {displayBusiness && props.request.businessName?.length ? (
            <div style={{ margin: '10px 0' }}>
              <SecondaryLabel style={{ marginBottom: 8, marginTop: 8 }}>Business Name</SecondaryLabel>
              <Text style={{ color: '#ffffff' }}>{props.request.businessName}</Text>
            </div>
          ) : (
            ''
          )}
          {displayBusiness && props.request.businessEmail?.length ? (
            <div style={{ margin: '10px 0' }}>
              <SecondaryLabel style={{ marginBottom: 8, marginTop: 8 }}>Business Email</SecondaryLabel>
              <Text style={{ color: '#ffffff' }}>{props.request.businessEmail}</Text>
            </div>
          ) : (
            ''
          )}
          {displayBusiness && props.request.businessTwitter?.length ? (
            <>
              <SecondaryLabel style={{ marginBottom: 8, marginTop: 8 }}>Business Twiter</SecondaryLabel>
              <Text style={{ color: '#ffffff' }}>
                <a
                  href={`https://twitter.com/${props.request.businessTwitter}`}
                  target="_blank"
                  style={{ color: '#EDE641' }}
                >
                  @{props.request.businessTwitter}
                </a>
              </Text>
            </>
          ) : (
            ''
          )}
          {displayBusiness && props.request.businessInfo?.length ? (
            <>
              <SecondaryLabel style={{ marginBottom: 8, marginTop: 8 }}>About Business</SecondaryLabel>
              <Text style={{ color: '#ffffff' }}>{props.request.businessInfo}</Text>
            </>
          ) : (
            ''
          )}
          <SecondaryLabel style={{ marginBottom: 8, marginTop: 10 }}>Instructions</SecondaryLabel>
          <Text style={{ color: '#ffffff' }}>{request.description}</Text>
        </div>
        <Row style={{ flex: 1 }}>{props.children}</Row>
      </OrderCardBodyContainer>
    </OrderCardContainer>
  );
};

export { OrderCard };
