import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import axios from 'axios';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { DeliveryTime, errorHandle, Number, Url } from '../../utils/validation';
import { PrimaryButton } from '../../components/Button';
import { HeaderContentGapSpacer, HeaderSpacer } from '../../components/Header';
import { ContentWrapper, PageContentWrapper, PageWrapper } from '../../components/layout/Common';
import { TextField } from '../../components/TextField';
import { API_URL, DEV, HELP_EMAIL } from '../../config/config';
import { useExchangeContract } from '../../hooks/useContracts';
import { useProfile, values } from '../../hooks/useProfile';

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

const OnboardProfilePage = () => {
  const userProfile = useProfile();
  const { account } = useWeb3React<Web3Provider>();
  const exchangeContract = useExchangeContract(true);
  const [creator, setCreator] = useState();
  const navigate = useNavigate();
  const [formValid, setFormValid] = useState<boolean>(false);
  const createUserProfile = async () => {
    console.log(userProfile)
    const profile = values(userProfile);

    try {
      Number.parse(profile!.price)
      DeliveryTime.parse(profile.deliveryTime)
      for (let i = 0; i < profile.demos?.length; i++) {
        let demo = profile.demos[i]
        if (demo.trim() != '') {
          Url.parse(demo)
        }
      }
    } catch (e) {
      console.log(e.issues)
      errorHandle(e, toast.error)
      toast.error('Please fix fields')
      return;
    }
    console.log(profile)
    const verificationResult = await axios.post(`${API_URL}/user/create`, { ...profile }).catch((e) => {
      console.log(e);
    });
    if (verificationResult) {
      if (verificationResult.status === 201) {
        const txResult = await exchangeContract.registerCreator(userProfile.userName!);
        toast.success('Profile created, waiting for confirmation!');
        await txResult.wait();
        toast.success('Success!');
        navigate(`/creator/${userProfile.address}`);
      } else {
        toast.error(verificationResult.data.message);
      }
    } else {
      toast.error('You may already have an account');
    }
  };

  useEffect(() => {
    axios.get(`${API_URL}/user/${account}`).then(res => {
      setCreator(res.data.id)
    })
  }, [])
  return (
    <>
      {(DEV || creator) && (<PageWrapper>
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
                  onChange={(e) => userProfile.setDeliveryTime(parseFloat(e))}
                  label="Minimum time to deliver"
                  type="number"
                  placeholder="3"
                  endText="Days"
                  onBlur={() => {
                    try {
                      DeliveryTime.parse(userProfile.deliveryTime)
                    } catch {
                      toast.error('Invalid delivery time')
                    }
                  }}
                />
              </div>

              <div style={{ marginBottom: 48 }}>
                <TextField
                  onChange={(e) => userProfile.setPrice(parseFloat(e))}
                  label="Minimum amount to charge for bookings"
                  description="Fans will be able to pay this in ETH"
                  placeholder="0.5"
                  type="number"
                  endText="ETH"
                />
              </div>

              <div style={{ marginBottom: 48 }}>
                <TextField
                  onChange={(e) => userProfile.setDemos([e, userProfile.demos[1], userProfile.demos[2]])}
                  label="Demo videos"
                  description="Add links for demo videos that will display on your bookings page"
                  placeholder="Demo video link 1"
                />
                <TextField
                  onChange={(e) => userProfile.setDemos([userProfile.demos[0], e, userProfile.demos[2]])}
                  placeholder="Demo video link 2"
                />
                <TextField
                  onChange={(e) => userProfile.setDemos([userProfile.demos[1], userProfile.demos[2], e])}
                  placeholder="Demo video link 3"
                />
              </div>

              <PrimaryButton style={{ marginBottom: '16px' }} onPress={() => createUserProfile()}>
                Set up profile
              </PrimaryButton>
            </ProfileDetailsContainer>
          </ContentWrapper>
        </PageContentWrapper>
      </PageWrapper>)}
      {!creator && (
        <PageWrapper>
          <HeaderSpacer />
          <HeaderContentGapSpacer />
          <PageContentWrapper>
            <ContentWrapper>
              <OnboardTitle>
                It looks like you already have an account. Please contact {`${HELP_EMAIL}`}
              </OnboardTitle>
            </ContentWrapper>
          </PageContentWrapper>
        </PageWrapper>
      )}
    </>
  );
};

export { OnboardProfilePage };
