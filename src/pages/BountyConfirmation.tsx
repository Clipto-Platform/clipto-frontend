import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { ChangeEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';

import { PrimaryButton } from '../components/Button';
import { ConfirmationText } from '../components/ConfirmationText';
import { HeaderContentGapSpacer, HeaderSpacer } from '../components/Header';
import TwitterIcon from '../components/icons/TwitterIcon';
import {
  Container,
  ContentWrapper,
  FieldWrapper,
  OutlinedContainer,
  PageContentWrapper,
  PageWrapper,
} from '../components/layout/Common';
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

const HR = styled.div`
  height: 1px;
  margin-left: -24px;
  width: calc(100% + 48px);
  background-color: ${(props) => props.theme.border};
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

export interface BountyConfirmationProps {
  title: string;
  instructions: string;
  requestDue: string;
  offerAmount: string;
  recipientWallet: string;
}

const BountyConfirmation = (props: BountyConfirmationProps) => {
  const theme = useTheme();
  const userProfile = useProfile();
  const { account } = useWeb3React<Web3Provider>();
  return (
    <>
      <OnboardTitle>Order Summary</OnboardTitle>
      <CenterContainer>
        {/* TODO(jonathanng) - fix text sizing to better match figma */}
        <FieldWrapper>
          <ConfirmationText label="Title" description={props.title} />
        </FieldWrapper>
        <FieldWrapper>
          <ConfirmationText label="Instructions" description={props.instructions} />
        </FieldWrapper>
        <FieldWrapper>
          <ConfirmationText label="Request Deadline" description={props.requestDue} />
        </FieldWrapper>
        <FieldWrapper>
          <ConfirmationText
            //TODO(jonathanng) - convert eth into usd display
            label="Offer Amount"
            description={props.offerAmount}
          />
        </FieldWrapper>
        <FieldWrapper>
          <ConfirmationText label="Recipient Wallet" description={props.recipientWallet} />
        </FieldWrapper>
        <HR style={{ marginBottom: 36 }} />
        <Link to={'/bountyDone'}>
          <PrimaryButton style={{ marginBottom: '16px' }} onPress={() => {}}>
            Place order {props.offerAmount}
          </PrimaryButton>
        </Link>
      </CenterContainer>
    </>
  );
};

export { BountyConfirmation };
