import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import axios from 'axios';
import { errors, ethers, Transaction } from 'ethers';
import { Formik } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { AvatarComponent } from '../components/AvatarOrb';
import { PrimaryButton } from '../components/Button';
import { HeaderContentGapSpacer, HeaderSpacer } from '../components/Header';
import { ImagesSlider } from '../components/ImagesSlider';
import { PageContentWrapper, PageWrapper } from '../components/layout/Common';
import { TextField } from '../components/TextField';
import { API_URL } from '../config/config';
import { useExchangeContract } from '../hooks/useContracts';
import { CreateUserDto, UserProfile } from '../hooks/useProfile';
import { theme } from '../styles/theme';
import { Description, Label } from '../styles/typography';
import { getShortenedAddress } from '../utils/address';
import { formatETH } from '../utils/format';
import { Number } from '../utils/validation';

const PageGrid = styled.div`
  display: grid;
  grid-template-columns: 504px 488px;
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
  justify-content: space-between;
`;

const HR = styled.div`
  height: 1px;
  margin-left: -24px;
  width: calc(100% + 48px);
  background-color: ${(props) => props.theme.border};
`;

export interface CreateRequestDto {
  requester: string;
  requestId: number;
  creator: string;
  amount: string;
  description: string;
  deadline: number;
  txHash: string;
}

export interface ReadUserDto {
  address: string;
  bio: string;
  deliveryTime: number;
  demos: string[];
  id: number;
  profilePicture: string;
  price: string;
  tweetUrl: string;
  userName: string;
  twitterHandle: string;
}

const BookingPage = () => {
  const { creatorId } = useParams();
  const { account } = useWeb3React<Web3Provider>();

  const exchangeContract = useExchangeContract(true);
  const [creatorProfile, setCreatorProfile] = useState<ReadUserDto>();
  const navigate = useNavigate();

  useEffect(() => {
    const getCreatorData = async () => {
      if (creatorId) {
        const restContractProfile: { data: ReadUserDto } = await axios.get(`${API_URL}/user/${creatorId}`);
        console.log(restContractProfile.data);
        setCreatorProfile(restContractProfile.data);
      }
    };
    getCreatorData();
  }, [creatorId]);

  const makeBooking = async (
    requester: string,
    creator: string,
    amount: string,
    description: string,
    deadline: number,
  ) => {
    let tx;
    try {
      console.log(creator);
      tx = await exchangeContract.newRequest(creator, { value: ethers.utils.parseEther(amount) });
    } catch (e) {
      console.error('tx failed at Booking.tsx');
      toast.error('The transaction failed. ');
      return;
    }
    const receipt = await tx.wait();
    const requestId: number = receipt.events?.at(0)?.args?.index.toNumber();
    const requestDat: CreateRequestDto = {
      requester,
      requestId,
      creator,
      amount,
      description,
      deadline: parseInt(deadline.toString()), //This was actually a string before this line... forms will automatically change it to string but ts doesn't see that
      txHash: tx.hash,
    };
    console.log(requestDat);
    const requestResult = await axios.post(`${API_URL}/request/create`, { ...requestDat }).catch((e) => {
      console.error(e);
      toast.error(e);
    });

    if (requestResult && requestResult.status === 201) {
      navigate('/orders');
      toast.success('Request created!');
    } else {
      toast.error('Something is wrong.');
    }
  };

  return (
    <PageWrapper>
      <HeaderSpacer />
      <HeaderContentGapSpacer />
      <PageContentWrapper>
        <PageGrid>
          <ImagesColumnContainer>
            <ImagesSlider images={creatorProfile?.demos || []} />
          </ImagesColumnContainer>
          <BookingCard>
            <FlexRow style={{ marginBottom: 12 }}>
              <div>
                <Label style={{ marginBottom: 8 }}>{creatorProfile?.userName}</Label>
                <Description>
                  Twitter:{' '}
                  <a href={`https://twitter.com/${creatorProfile?.twitterHandle}`} style={{ color: '#EDE641' }}>
                    @{creatorProfile?.twitterHandle}
                  </a>{' '}
                </Description>
                <Description>Address: {creatorProfile && getShortenedAddress(creatorProfile.address)}</Description>
              </div>
              <div>
                <AvatarComponent url={creatorProfile?.profilePicture} size="medium" />
              </div>
            </FlexRow>
            <FlexRow style={{ marginBottom: 24 }}>
              <Description>{creatorProfile?.bio}</Description>
            </FlexRow>

            <HR style={{ marginBottom: 36 }} />
            {!creatorProfile && <Label>Error loading creatorProfile</Label>}
            {!account && <Label>Error loading account</Label>}
            {creatorProfile && account && (
              <Formik
                initialValues={{
                  deadline: 0,
                  description: '',
                  amount: 0,
                }}
                validate={({ deadline, description, amount }) => {
                  const errors: any = {};
                  try {
                    Number.parse(parseFloat(amount.toString()));
                    if (formatETH(parseFloat(amount.toString())) < formatETH(parseFloat(creatorProfile.price))) {
                      errors.amount = `Amount must be greator than ${creatorProfile.price}`;
                    }
                  } catch {
                    errors.amount = `Please enter a number.`;
                  }
                  if (deadline.toString() != parseInt(deadline.toString()).toString()) {
                    errors.deliveryTime = 'Delivery time cannot be a decimal or have leading zeros.';
                  } else {
                    try {
                      Number.parse(parseInt(deadline.toString()));
                      if (
                        formatETH(parseInt(deadline.toString())) <
                        formatETH(parseInt(creatorProfile.deliveryTime.toString()))
                      ) {
                        errors.deadline = `Deadline must be greator than ${creatorProfile.deliveryTime}`;
                      }
                    } catch {
                      errors.deadline = `Please enter a deadline.`;
                    }
                    if (description === '') {
                      errors.description = 'Please write some instructions for the creator.';
                    }
                  }
                  return errors;
                }}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={({ deadline, description, amount }) => {
                  makeBooking(account, creatorProfile.address, amount.toString(), description, deadline);
                }}
              >
                {({ initialValues, handleChange, handleSubmit, errors, validateForm }) => (
                  <>
                    <PurchaseOption style={{ marginBottom: 40 }}>
                      <FlexRow style={{ marginBottom: 7 }}>
                        <Label>Personal use</Label>
                        <Label style={{ fontSize: 14 }}>{formatETH(parseFloat(creatorProfile.price))} ETH +</Label>
                      </FlexRow>
                      <Description>Personalized video for you or someone else</Description>
                    </PurchaseOption>
                    <div style={{ marginBottom: 40 }}>
                      <TextField
                        inputStyles={{
                          width: 172,
                        }}
                        type="number"
                        label={`Request deadline (${creatorProfile.deliveryTime} days minimum)`}
                        description={
                          'If your video isn’t delivered by your requested deadline, you will receive an automatic refund.'
                        }
                        endText="Days"
                        onChange={handleChange('deadline')} //parseInt
                        placeholder={`${creatorProfile.deliveryTime} days`}
                        errorMessage={errors.deadline}
                      />
                    </div>

                    <div style={{ marginBottom: 40 }}>
                      <TextField
                        inputElementType="textarea"
                        label={`Instructions for ${creatorProfile.userName}`}
                        placeholder="Say something nice..."
                        onChange={handleChange('description')}
                        errorMessage={errors.description}
                      />
                    </div>

                    <div style={{ marginBottom: 40 }}>
                      <TextField label="Address to receive video NFT" placeholder="Wallet address" value={account} />
                    </div>

                    <div style={{ marginBottom: 40 }}>
                      <TextField
                        inputStyles={{
                          width: 172,
                        }}
                        label="Amount to pay"
                        description={'Increase your bid to get your video earlier'}
                        endText="ETH"
                        type="number"
                        placeholder={formatETH(parseFloat(creatorProfile.price)) + ' +'}
                        onChange={handleChange('amount')}
                        onBlur={(e) => {}}
                        errorMessage={errors.amount}
                      />
                      {/* TODO(jonathanng) - make dynamic */}
                      <Description style={{ fontSize: 10 }}>
                        * Currently a 10% fee is in place to support our developers
                      </Description>
                    </div>
                    <PrimaryButton
                      onPress={() => {
                        validateForm();
                        if (Object.keys(errors).length != 0) {
                          toast.error('Please fix the errors.');
                          return;
                        }
                        return handleSubmit();
                      }}
                      isDisabled={false}
                    >
                      Book now
                    </PrimaryButton>
                  </>
                )}
              </Formik>
            )}
          </BookingCard>
        </PageGrid>
      </PageContentWrapper>
    </PageWrapper>
  );
};

export { BookingPage };
