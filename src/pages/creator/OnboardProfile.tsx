import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';

import { PrimaryButton } from '../../components/Button';
import { HeaderContentGapSpacer, HeaderSpacer } from '../../components/Header';
import TwitterIcon from '../../components/icons/TwitterIcon';
import { ContentWrapper, OutlinedContainer, PageContentWrapper, PageWrapper } from '../../components/layout/Common';
import { TextField } from '../../components/TextField';
import { useProfile } from '../../hooks/useProfile';
import { Text } from '../../styles/typography';

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

const ProfileDetailsContainer = styled.div`
  display: block;
  margin: auto;
  margin-top: 45px;
  max-width: 512px;
  padding: 20px;
`;

const OnboardProfile = styled.img`
  border-radius: 50%;
  display: block;
  margin: auto;
  width: 124px;
  height: 124px;
`;

const StepLabel = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: white;
  margin-bottom: 4px;
`;

const StepDescription = styled(Text)`
  font-size: 18px;
  line-height: 140%;
`;

const OnboardProfilePage = () => {
  const theme = useTheme();
  const userProfile = useProfile();
  const { account } = useWeb3React<Web3Provider>();

  return (
    <>
      <PageWrapper>
        <HeaderSpacer />
        <HeaderContentGapSpacer />
        <PageContentWrapper>
          <ContentWrapper>
            <ProfileDetailsContainer>
              <OnboardTitle style={{ marginBottom: '50px' }}>Set up your creator profile</OnboardTitle>
              <OnboardProfile
                style={{ marginBottom: '50px' }}
                src={userProfile.profilePicture}
                alt="user profile picture"
              />

              <div style={{ marginBottom: 48 }}>
                <TextField
                  onChange={(e) => userProfile.setUsername(e)}
                  label="Name"
                  placeholder={userProfile.userName}
                  value={userProfile.userName}
                />
              </div>

              <div style={{ marginBottom: 48 }}>
                <TextField
                  label="Wallet Address"
                  description="You will receive payments to this address"
                  isReadOnly={true}
                  placeholder={account!}
                  value={account!}
                />
              </div>

              <div style={{ marginBottom: 48 }}>
                <TextField
                  inputElementType="textarea"
                  onChange={(e) => userProfile.setBio(e)}
                  label="Bio"
                  placeholder={'Say something nice'}
                />
              </div>

              <div style={{ marginBottom: 48 }}>
                <TextField
                  onChange={(e) => userProfile.setBio(e)}
                  label="Minimum time to deliver"
                  placeholder="3"
                  endText="Days"
                />
              </div>

              <div style={{ marginBottom: 48 }}>
                <TextField
                  onChange={(e) => userProfile.setBio(e)}
                  label="Minimum amount to charge for bookings"
                  description="Fans will be able to pay this in ETH"
                  placeholder="0.5"
                  endText="ETH"
                />
              </div>

              <div style={{ marginBottom: 48 }}>
                <TextField
                  onChange={(e) => userProfile.setBio(e)}
                  label="Demo videos"
                  description="Add links for demo videos that will display on your bookings page"
                  placeholder="Demo video link 1"
                />
                <TextField onChange={(e) => userProfile.setBio(e)} placeholder="Demo video link 2" />
                <TextField onChange={(e) => userProfile.setBio(e)} placeholder="Demo video link 3" />
              </div>

              <PrimaryButton style={{ marginBottom: '16px' }} onPress={() => {}}>
                Set up profile
              </PrimaryButton>
            </ProfileDetailsContainer>
          </ContentWrapper>
        </PageContentWrapper>
      </PageWrapper>
    </>
  );
};

export { OnboardProfilePage };
