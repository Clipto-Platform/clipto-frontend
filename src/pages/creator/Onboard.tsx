import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled, { useTheme } from 'styled-components';

import { PrimaryButton } from '../../components/Button';
import { HeaderContentGapSpacer, HeaderSpacer } from '../../components/Header';
import TwitterIcon from '../../components/icons/TwitterIcon';
import { ContentWrapper, OutlinedContainer, PageContentWrapper, PageWrapper } from '../../components/layout/Common';
import { TextField } from '../../components/TextField';
import { API_URL } from '../../config/config';
import { useProfile } from '../../hooks/useProfile';
import { Text } from '../../styles/typography';
import { errorHandle, Url } from '../../utils/validation';

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

const StepsContainer = styled(OutlinedContainer)`
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

const OnboardingPage = () => {
  const theme = useTheme();
  const userProfile = useProfile();
  const navigate = useNavigate();
  const { account } = useWeb3React<Web3Provider>();
  const [tweetUrl, setTweetUrl] = useState<string>('');

  const verifyTwitterUser = async () => {
    const verificationResult = await axios.post(`${API_URL}/user/verify`, { tweetUrl, address: account }).catch((e) => {
      console.log(e);
    });
    if (verificationResult && verificationResult.data && verificationResult.data.includes) {
      userProfile.setUsername(verificationResult.data.includes.users[0].name);
      userProfile.setProfilePicture(
        verificationResult.data.includes.users[0].profile_image_url.replace('_normal', '_400x400'),
      );
      userProfile.setAddress(account!);
      userProfile.setTweetUrl(tweetUrl);
      toast.success('Verified Twitter successfully!');
      navigate('/onboarding/profile');
    } else {
      toast.error('Failed to verify your Twitter!');
    }
  };
  return (
    <>
      <PageWrapper>
        <HeaderSpacer />
        <HeaderContentGapSpacer />
        <PageContentWrapper>
          <ContentWrapper>
            <OnboardTitle>Claim your creator profile by verifying on Twitter</OnboardTitle>
            <Subtitle style={{ marginBottom: 64 }}>
              This helps secure your profile and prevents impersonations.
            </Subtitle>
            <StepsContainer>
              <StepLabel>Step 1.</StepLabel>
              <StepDescription>Post a public tweet that includes your wallet address: {account}</StepDescription>

              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  'Verifying myself on @cliptodao with wallet address: ',
                )} ${account}`}
                target="_blank"
                rel="noreferrer"
              >
                <PrimaryButton
                  style={{
                    backgroundColor: theme.twitterBlue,
                    color: 'white',
                    maxWidth: '180px',
                    marginTop: '30px',
                    marginBottom: '30px',
                  }}
                >
                  <TwitterIcon />
                  Post Tweet
                </PrimaryButton>
              </a>
              <OnboardingHr />
              <StepLabel>Step 2.</StepLabel>
              <StepDescription style={{ marginBottom: 40 }}>
                Paste the URL link to the tweet to verify your profile.
              </StepDescription>
              <div style={{ marginBottom: 24 }}>
                <TextField
                  onChange={(e) => setTweetUrl(e)}
                  label="Tweet URL"
                  placeholder="https://twitter.com/VitalikButerin/1273742863688499203"
                />
              </div>

              <PrimaryButton
                style={{ marginBottom: '16px' }}
                onPress={() => {
                  try {
                    Url.parse(tweetUrl);
                    verifyTwitterUser();
                  } catch (e) {
                    errorHandle(e, toast.error);
                  }
                }}
              >
                Confirm
              </PrimaryButton>
            </StepsContainer>
          </ContentWrapper>
        </PageContentWrapper>
      </PageWrapper>
    </>
  );
};

export { OnboardingPage };
