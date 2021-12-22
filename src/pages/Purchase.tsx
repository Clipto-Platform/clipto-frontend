import styled from 'styled-components';

import { AvatarOrb } from '../components/AvatarOrb';
import { PrimaryButton } from '../components/Button';
import { HeaderContentGapSpacer, HeaderSpacer } from '../components/Header';
import { PageContentWrapper, PageWrapper } from '../components/layout/Common';
import { TextField } from '../components/TextField';
import { Description, Label } from '../styles/typography';

const PageGrid = styled.div`
  display: grid;
  grid-template-columns: 504px 488px;
  grid-template-rows: 1fr;
  grid-column-gap: 40px;
  grid-row-gap: 0px;
  margin-bottom: 64px;
`;

const ImagesColumnContainer = styled.div`
  border: 1px solid white;
  opacity: 0.7;
  height: 440px;
`;

const BookingCard = styled.div`
  background: #040404;
  border: 1px solid #2a2a2a;
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
  background-color: #2a2a2a; ;
`;

const PurchasePage = () => {
  return (
    <PageWrapper>
      <HeaderSpacer />
      <HeaderContentGapSpacer />
      <PageContentWrapper>
        <PageGrid>
          <ImagesColumnContainer>Image carousel</ImagesColumnContainer>
          <BookingCard>
            <FlexRow style={{ marginBottom: 30 }}>
              <div>
                <Label style={{ marginBottom: 4 }}>Gabriel Haines</Label>
                <Description>Idea instigator</Description>
              </div>
              <div>
                <AvatarOrb />
              </div>
            </FlexRow>
            <FlexRow style={{ marginBottom: 24 }}>
              <Description>
                Copy WAGMI | @cre8rdao (Bricks,Bricks) | @county_cap | @elonmusk thinks my videos are “nice”
              </Description>
            </FlexRow>

            <HR style={{ marginBottom: 36 }} />

            <PurchaseOption style={{ marginBottom: 40 }}>
              <FlexRow style={{ marginBottom: 7 }}>
                <Label>Personal use</Label>
                <Label style={{ fontSize: 14 }}>100+ USDC</Label>
              </FlexRow>
              <Description>Personalized video for you or someone else</Description>
            </PurchaseOption>
            <div style={{ marginBottom: 40 }}>
              <TextField
                inputStyles={{
                  width: 172,
                }}
                type="date"
                label="Request deadline (3 days minimum)"
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
                label="Instructions for Gabriel"
                placeholder="Say something nice..."
              />
            </div>

            <div style={{ marginBottom: 40 }}>
              <TextField label="Address to receive video NFT" placeholder="Wallet address" />
            </div>

            <div style={{ marginBottom: 40 }}>
              {/* TODO(johnrjj) - Add label to input right (e.g. 'USDC') */}
              <TextField
                inputStyles={{
                  width: 172,
                }}
                label="Amount to pay"
                description={'Increase your bid to get your video earlier'}
                inputMode="numeric"
                placeholder="100"
              />
            </div>
            <PrimaryButton>Book now (100 USDC)</PrimaryButton>
          </BookingCard>
        </PageGrid>
      </PageContentWrapper>
    </PageWrapper>
  );
};

export { PurchasePage };
