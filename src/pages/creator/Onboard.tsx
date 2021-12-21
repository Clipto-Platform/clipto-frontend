import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { Link } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';

import { PrimaryButton } from '../../components/Button';
import { HeaderContentGapSpacer, HeaderSpacer } from '../../components/Header';
import TwitterIcon from '../../components/icons/TwitterIcon';
import { ContentWrapper, OutlinedContainer, PageContentWrapper, PageWrapper } from '../../components/layout/Common';
import { TextField } from '../../components/TextField';
import { Text } from '../../styles/typography';

const OnboardTitle = styled.h1`
  font-family: 'Scto Grotesk A';
  font-weight: normal;
  text-align: center;
  font-size: 40px;
  line-height: 125%;
  max-width: 500px;
  display: block;
  margin: auto;
  margin-bottom: 30px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  font-size: 36px;
  font-weight: bold;
  `}
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

const TwitterButton = styled(PrimaryButton)`
  background: ${({ theme }) => theme.twitterBlue} !important;
`;

const OnboardingPage = () => {
  const theme = useTheme();
  const { account } = useWeb3React<Web3Provider>();

  return (
    <>
      <PageWrapper>
        <HeaderSpacer />
        <HeaderContentGapSpacer />
        <PageContentWrapper>
          <ContentWrapper>
            <OnboardTitle>Claim your creator profile by verifying on Twitter</OnboardTitle>
            <Subtitle>This helps secure your profile and prevents impersonations.</Subtitle>
            <StepsContainer>
              <StepLabel>Step 1.</StepLabel>
              <Text>Post a public tweet that includes your wallet address: {account}</Text>

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
              <Text>Paste the URL link to the tweet to verify your profile.</Text>

              <TextField label="Tweet URL" placeholder="https://twitter.com/VitalikButerin/1273742863688499203" />

              <PrimaryButton style={{ marginTop: '20px' }}>Confirm</PrimaryButton>
            </StepsContainer>
          </ContentWrapper>
        </PageContentWrapper>
      </PageWrapper>
    </>
  );
};

export { OnboardingPage };
