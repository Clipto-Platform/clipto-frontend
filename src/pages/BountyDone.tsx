import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { ChangeEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';

import { XAvatarOrb } from '../components/AvatarOrb';
import { PrimaryButton } from '../components/Button';
import { ConfirmationText } from '../components/ConfirmationText';
import { HeaderContentGapSpacer, HeaderSpacer } from '../components/Header';
import SuccessIcon from '../components/icons/SuccessIcon';
import TwitterIcon from '../components/icons/TwitterIcon';
import {
  Container,
  ContentWrapper,
  OutlinedContainer,
  PageContentWrapper,
  PageWrapper,
} from '../components/layout/Common';
import { TextField } from '../components/TextField';
import { useProfile } from '../hooks/useProfile';
import { colors } from '../styles/theme';
import { Text } from '../styles/typography';
import { Description, Label } from '../styles/typography';
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
  max-width: 700px;
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
`;
export interface BountyConfirmationProps {
  // title: string;
  // instructions: string;
  // requestDue: string;
  // offerAmount: string;
  // recipientWallet: string;
}

const BountyDone = (props: BountyConfirmationProps) => {
  const theme = useTheme();
  const userProfile = useProfile();
  const { account } = useWeb3React<Web3Provider>();
  return (
    <>
      <PageWrapper>
        <HeaderSpacer />
        <PageContentWrapper>
          {/* TODO(jonathanng) - fix spacing to better match figma */}
          {/* paddingTop will probably need to change depending on what containers it is put in */}
          <CenterContainer style={{ textAlign: 'center' }}>
            <SuccessIcon />
            <OnboardTitle style={{ marginTop: '14px' }}>Success</OnboardTitle>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {/* TODO(jonathanng) - make arrow look like figma */}
              <XAvatarOrb /> -----------------{'>'} <XAvatarOrb />
            </div>
            {/* TODO(jonathanng) - add names below XAvatorOrb */}
            <Label as={'label'} style={{ marginTop: '14px' }}>
              Your bounty request has been posted!
            </Label>
            <Description style={{ marginTop: '14px' }}>
              Share and invite the creator to complete your request
            </Description>
            <PrimaryButton
              style={{
                backgroundColor: theme.twitterBlue,
                color: 'white',
                marginTop: '30px',
                marginBottom: '30px',
              }}
            >
              <TwitterIcon />
              Share on Twitter
            </PrimaryButton>
            <PrimaryButton
              // style={{ borderWidth: 100, backgroundColor: colors.black, color: colors.yellow, borderColor: colors.yellow }}
              variant="secondary"
              onPress={() => {}}
            >
              Copy Shareable Link
            </PrimaryButton>
          </CenterContainer>
        </PageContentWrapper>
      </PageWrapper>
    </>
  );
};

export { BountyDone };
