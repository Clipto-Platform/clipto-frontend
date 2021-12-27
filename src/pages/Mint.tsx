import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import pfp from '../assets/images/pfps/sample-profile.png';
import { XAvatarOrb } from '../components/AvatarOrb';
import { PrimaryButton } from '../components/Button';
import { ConfirmationText } from '../components/ConfirmationText';
import { HeaderContentGapSpacer, HeaderSpacer } from '../components/Header';
import { ImagesSlider } from '../components/ImagesSlider';
import { FieldWrapper, PageContentWrapper, PageWrapper } from '../components/layout/Common';
import { TextField } from '../components/TextField';
import { colors } from '../styles/theme';
import { Description, Label } from '../styles/typography';

const PageGrid = styled.div`
  display: grid;
  grid-template-columns: 504px 408px;
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
  align-items: center;
  flex-direction: row;
`;

const HR = styled.div`
  height: 1px;
  margin-left: -24px;
  width: calc(100% + 48px);
  background-color: ${(props) => props.theme.border};
`;
const OnboardTitle = styled.h1`
  font-family: 'Scto Grotesk A';
  font-weight: normal;
  font-size: 32px;
  line-height: 140%;
  font-style: normal;
  font-weight: bold;
  margin-bottom: 30px;
  width: 952px; // this width is from: grid-template-columns: 504px 408px; & grid-column-gap: 40px; in PageGrid
`;

const MintPage = () => {
  const title = 'Reaction to Clipto';
  const instructions = 'Tell CC0 merry christmas and mention his designs are awesome!';
  const requestDeadline = 'December 24, 2021';

  return (
    <PageWrapper>
      <HeaderSpacer />
      <HeaderContentGapSpacer />
      <PageContentWrapper style={{ flexWrap: 'wrap' }}>
        <OnboardTitle>Create a Video NFT</OnboardTitle>
        <PageGrid>
          {/* Left side of page */}
          <BookingCard style={{ display: 'flex', textAlign: 'center' }}>
            <div style={{ margin: 'auto' }}>
              <FieldWrapper>
                {/** TODO(jonathanng) - Text size is off */}
                <Label>Upload clip</Label>
              </FieldWrapper>
              <FieldWrapper>
                <Description>Drag and drop an mp4 or select a file to upload</Description>
              </FieldWrapper>
              {/** TODO(jonathanng) - colors off */}
              <PrimaryButton
                variant="secondary"
                size="small"
                style={{ color: colors.white, width: 120, margin: 'auto' }}
              >
                Select file
              </PrimaryButton>
            </div>
          </BookingCard>
          {/* Right side of page */}
          <BookingCard>
            <Description>Request from</Description>
            <FlexRow style={{ marginBottom: 6, marginTop: 12 }}>
              <FlexRow style={{ justifyContent: 'flex-start' }}>
                <div style={{ marginRight: 20 }}>
                  <XAvatarOrb />
                </div>
                <div>
                  <Label style={{ marginBottom: 4 }}>Gabriel Haines</Label>
                  <Description>Idea instigator</Description>
                </div>
              </FlexRow>
              <div style={{ textAlign: 'right' }}>
                <Label style={{ color: colors.secondary }}>Bid</Label>
                <Label style={{ color: colors.yellow }}>500 USDC</Label>
              </div>
            </FlexRow>
            <FlexRow style={{ marginBottom: 24 }}></FlexRow>

            <HR style={{ marginBottom: 36 }} />
            <FieldWrapper>
              <ConfirmationText label="Title" description={title} />
            </FieldWrapper>
            <FieldWrapper>
              <ConfirmationText label="Instructions" description={instructions} />
            </FieldWrapper>
            <FieldWrapper>
              <ConfirmationText label="Request Deadline" description={requestDeadline} />
            </FieldWrapper>

            <PrimaryButton style={{ marginBottom: 15 }} size="small">
              Complete
            </PrimaryButton>
            <PrimaryButton variant="secondary" size="small">
              Reject Order
            </PrimaryButton>
          </BookingCard>
        </PageGrid>
      </PageContentWrapper>
    </PageWrapper>
  );
};

export { MintPage };
