import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { ChangeEvent, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import SuccessIcon from '../components/icons/SuccessIcon';
import { PrimaryButton } from '../components/Button';
import { HeaderContentGapSpacer, HeaderSpacer } from '../components/Header';
import TwitterIcon from '../components/icons/TwitterIcon';
import { ContentWrapper, OutlinedContainer, PageContentWrapper, PageWrapper, Container } from '../components/layout/Common';
import { TextField } from '../components/TextField';
import { useProfile } from '../hooks/useProfile';
import { Text } from '../styles/typography';
import { ConfirmationText } from '../components/ConfirmationText';
import { colors } from '../styles/theme';
import { Description, Label } from '../styles/typography';
import { XAvatarOrb } from '../components/AvatarOrb';
// TODO(johnrjj) - Consolidate final typography into stylesheet
const OnboardTitle = styled.h1`
  font-family: 'Scto Grotesk A';
  font-weight: normal;
  text-align: center;
  font-size: 32px;
  line-height: 140%;
  font-style: normal;
  font-weight: bold;
  max-width: 700px;
  display: block;
  margin: auto;
  margin-bottom: 30px;
`;

const Subtitle = styled(Text)`
  text-align: center;
  font-size: 18px;
`;

const CenterContainer = styled(Container)`
  max-width: 1000px;
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
export interface BountyConfirmationProps {
  // title: string;
  // instructions: string;
  // requestDue: string;
  // offerAmount: string;
  // recipientWallet: string;
}

const InvitationPage = (props: BountyConfirmationProps) => {
  const theme = useTheme();
  const userProfile = useProfile();
  const { account } = useWeb3React<Web3Provider>();
  return (
    <>
      <PageWrapper>
        <HeaderSpacer />
        <HeaderSpacer />
        <PageContentWrapper>
          {/* TODO(jonathanng) - fix spacing to better match figma */}
          {/* paddingTop will probably need to change depending on what containers it is put in */}
          <CenterContainer style={{ textAlign: 'center' }}>
            <OnboardTitle style={{ marginTop: '14px' }}>You have been invited to create a video NFT</OnboardTitle>
            {/* TODO(jonathanng) - add names below XAvatorOrb */}
            <Description style={{ marginTop: '50px', color: colors.white }}>
              Post a public tweet that contains your wallet address.
            </Description>
            <PrimaryButton
              style={{
                backgroundColor: theme.twitterBlue,
                color: 'white',
                margin: '60px auto 0px', //top left/right bot

              }}
            >
              <TwitterIcon />
              Post a Tweet
            </PrimaryButton>
          </CenterContainer>
        </PageContentWrapper>
      </PageWrapper>
    </>
  );
};

export { InvitationPage };
