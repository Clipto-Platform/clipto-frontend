import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';

import { PrimaryButton } from '../components/Button';
import { HeaderContentGapSpacer, HeaderSpacer } from '../components/Header';
import TwitterIcon from '../components/icons/TwitterIcon';
import { ContentWrapper, OutlinedContainer, PageContentWrapper, PageWrapper, Container } from '../components/layout/Common';
import { TextField } from '../components/TextField';
import { useProfile } from '../hooks/useProfile';
import { Text } from '../styles/typography';

// TODO(johnrjj) - Consolidate final typography into stylesheet
const OnboardTitle = styled.h1`
  font-family: 'Scto Grotesk A';
  font-weight: normal;
  text-align: center;
  font-size: 32px;
  line-height: 140%;
  font-style: normal;
  font-weight: bold;
  max-width: 500px;
  display: block;
  margin: auto;
  margin-bottom: 30px;
`;

const Subtitle = styled(Text)`
  text-align: center;
  font-size: 18px;
`;

const CenterContainer = styled(Container)`
  display: block;
  margin: auto;
  margin-top: 45px;
`;

const StepLabel = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: white;
  margin-bottom: 4px;
`;

const OnboardingHr = styled.hr`
  margin-left: -20px;
  width: calc(100% + 40px);
  height: 1px;
  border: none;
  background-color: ${({ theme }) => theme.border};
  margin-top: 10px;
  margin-bottom: 10px;
`;

const StepDescription = styled(Text)`
  font-size: 18px;
  line-height: 140%;
`;

const FieldWrapper = styled.div`
  margin-bottom: 26px;
`

const BountyPage = () => {
  const theme = useTheme();
  const userProfile = useProfile();
  const { account } = useWeb3React<Web3Provider>();
  const [tweetUrl, setTweetUrl] = useState<string>('');

  const verifyTwitterUser = async () => {
    await userProfile.verifyUser(tweetUrl, account!);
  };
  return (
    <>
      <PageWrapper>
        <HeaderSpacer />
        <HeaderContentGapSpacer />
        <PageContentWrapper>
          <ContentWrapper>
            <OnboardTitle>Post a Bounty</OnboardTitle>
            <CenterContainer>
              <FieldWrapper>
                <TextField
                  // onChange={(e) => setTweetUrl(e)}
                  label="Who are you requesting this from?"
                  placeholder="Creator's Twitter handle"
                />
              </FieldWrapper>
              <FieldWrapper>
                <TextField
                  // onChange={(e) => setTweetUrl(e)}
                  label="Title"
                  placeholder="Optional"
                />
              </FieldWrapper>
              <FieldWrapper>
                <TextField
                  // onChange={(e) => setTweetUrl(e)}
                  label="Instructions"
                  placeholder="Say something nice..."
                />
              </FieldWrapper>
              <FieldWrapper>
                <TextField
                  //TODO(jonathanng) - Date select or some query to verify date input
                  // onChange={(e) => setTweetUrl(e)}
                  label="Request deadline (3 days minimum)"
                  description="If your video isn't delivered by your requested deadline, you will receive an automatic refund."
                  placeholder={`${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getDate() + 3}, ${new Date().getFullYear()}`}
                />
              </FieldWrapper>
              <FieldWrapper>
                {/* TODO(johnrjj) - Add label to input right (e.g. 'USDC') */}
                <TextField
                  inputStyles={{
                    width: 172,
                  }}
                  label="Offer Amount"
                  description={'Increase your bid to get your video earlier'}
                  inputMode="numeric"
                  placeholder="100+"
                />
              </FieldWrapper>
              <FieldWrapper>
                <TextField
                  // onChange={(e) => setTweetUrl(e)}
                  label="Recipient Address for video NFT"
                  placeholder="Wallet address"
                />
              </FieldWrapper>
              <PrimaryButton
                style={{ marginBottom: '16px' }}
                onPress={() => {
                  verifyTwitterUser();
                }}
              >View Order Summary</PrimaryButton>
            </CenterContainer>
          </ContentWrapper>
        </PageContentWrapper>
      </PageWrapper>
    </>
  );
};

export { BountyPage };
