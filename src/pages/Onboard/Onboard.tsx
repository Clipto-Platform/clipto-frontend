import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';
import * as api from '../../api';
import { PrimaryButton } from '../../components/Button';
import { HeaderContentGapSpacer, HeaderSpacer } from '../../components/Header/Header';
import TwitterIcon from '../../components/icons/TwitterIcon';
import { ContentWrapper, PageContentWrapper, PageWrapper } from '../../components/layout/Common';
import { TextField } from '../../components/TextField';
import { useProfile } from '../../hooks/useProfile';
import { errorHandle, Url } from '../../utils/validation';
import { OnboardingHr, OnboardTitle, StepDescription, StepLabel, StepsContainer, Subtitle } from './Style';

const OnboardingPage = () => {
  const theme = useTheme();
  const userProfile = useProfile();
  const navigate = useNavigate();
  const { account } = useWeb3React<Web3Provider>();
  const [tweetUrl, setTweetUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const verifyTwitterUser = async () => {
    const verificationResult = await api
      .tweetVerify({
        tweetUrl,
        address: account || '',
      })
      .catch((e) => {
        console.log(e);
      });
    if (verificationResult && verificationResult.data && verificationResult.data.includes) {
      userProfile.setUsername(verificationResult.data.includes.users[0].name);
      userProfile.setProfilePicture(
        verificationResult.data.includes.users[0].profile_image_url.replace('_normal', '_400x400'),
      );
      userProfile.setAddress(account!);
      userProfile.setTweetUrl(tweetUrl);
      console.log(userProfile);
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
                onPress={async () => {
                  setLoading(true);
                  try {
                    Url.parse(tweetUrl);
                    await verifyTwitterUser();
                  } catch (e) {
                    errorHandle(e, toast.error);
                  }
                  setLoading(false);
                }}
                isDisabled={loading}
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
