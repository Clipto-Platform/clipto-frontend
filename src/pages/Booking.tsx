import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import pfp from '../assets/images/pfps/sample-profile.png';
import { AvatarComponent, AvatarOrb } from '../components/AvatarOrb';
import { PrimaryButton } from '../components/Button';
import { HeaderContentGapSpacer, HeaderSpacer } from '../components/Header';
import { ImagesSlider } from '../components/ImagesSlider';
import { PageContentWrapper, PageWrapper } from '../components/layout/Common';
import { TextField } from '../components/TextField';
import { useExchangeContract } from '../hooks/useContracts';
import { UserProfile } from '../hooks/useProfile';
import { Description, Label } from '../styles/typography';

const PageGrid = styled.div`
  display: grid;
  grid-template-columns: 504px 488px;
  grid-template-rows: 1fr;
  grid-column-gap: 40px;
  grid-row-gap: 0px;
  margin-bottom: 64px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
    width: 100%;
    grid-column-gap: 40px;
    grid-row-gap: 30px;
    max-width: 100%;
  `}
`;

const ImagesColumnContainer = styled.div`
  position: relative;
  height: 440px;
  max-width: 100%;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    overflow: hidden;
  `}
`;

const BookingCard = styled.div`
  background: ${(props) => props.theme.black};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 16px;
  padding: 32px 24px;
`;

// TODO(johnrjj) - Make into Radio/RadioGroup
const PurchaseOption = styled.div`
  border: 1px solid ${(props) => props.theme.yellow};
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
`;

const FlexRow = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
`;

const HR = styled.div`
  height: 1px;
  margin-left: -24px;
  width: calc(100% + 48px);
  background-color: ${(props) => props.theme.border};
`;

const BookingPage = () => {
  // TODO(johnrjj) - Use creatorId (wallet address) to query
  const { creatorId } = useParams();
  const exchangeContract = useExchangeContract(true);
  const [creatorProfile, setCreatorProfile] = useState<Partial<UserProfile>>();

  useEffect(() => {
    const getCreatorData = async () => {
      if (creatorId) {
        const profile = await exchangeContract.creators(creatorId);
        const arweaveProfile = await axios.get(`https://arweave.net/${profile.profileUrl.substring(5)}`);
        setCreatorProfile(arweaveProfile.data);
      }
    };
    getCreatorData();
  }, [creatorId]);

  return (
    <PageWrapper>
      <HeaderSpacer />
      <HeaderContentGapSpacer />
      <PageContentWrapper>
        <PageGrid>
          <ImagesColumnContainer>
            <ImagesSlider images={creatorProfile?.demos || []} />
          </ImagesColumnContainer>
          <BookingCard>
            <FlexRow style={{ marginBottom: 30 }}>
              <div>
                <Label style={{ marginBottom: 4 }}>{creatorProfile?.userName}</Label>
                {/* todo: decide what to do with this, it's not currently included in our profile data */}
                {/* <Description>Idea instigator</Description> */}
              </div>
              <div>
                <AvatarComponent url={creatorProfile?.profilePicture} />
              </div>
            </FlexRow>
            <FlexRow style={{ marginBottom: 24 }}>
              <Description>{creatorProfile?.bio}</Description>
            </FlexRow>

            <HR style={{ marginBottom: 36 }} />

            <PurchaseOption style={{ marginBottom: 40 }}>
              <FlexRow style={{ marginBottom: 7 }}>
                <Label>Personal use</Label>
                <Label style={{ fontSize: 14 }}>{creatorProfile?.price} ether</Label>
              </FlexRow>
              <Description>Personalized video for you or someone else</Description>
            </PurchaseOption>
            <div style={{ marginBottom: 40 }}>
              <TextField
                inputStyles={{
                  width: 172,
                }}
                type="date"
                label={`Request deadline (${creatorProfile?.deliveryTime} days minimum)`}
                value="2018-07-22"
                description={
                  'If your video isn’t delivered by your requested deadline, you will receive an automatic refund.'
                }
                placeholder="2018-07-22"
              />
            </div>

            <div style={{ marginBottom: 40 }}>
              <TextField
                inputElementType="textarea"
                label={`Instructions for ${creatorProfile?.userName}`}
                placeholder="Say something nice..."
              />
            </div>

            <div style={{ marginBottom: 40 }}>
              <TextField label="Address to receive video NFT" placeholder="Wallet address" />
            </div>

            <div style={{ marginBottom: 40 }}>
              <TextField
                inputStyles={{
                  width: 172,
                }}
                label="Amount to pay"
                description={'Increase your bid to get your video earlier'}
                endText="ETH"
                inputMode="numeric"
                placeholder={creatorProfile?.price}
              />
            </div>
            <PrimaryButton>Book now</PrimaryButton>
          </BookingCard>
        </PageGrid>
      </PageContentWrapper>
    </PageWrapper>
  );
};

export { BookingPage };
