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
import { ImagesSlider } from '../components/Booking/ImagesSlider';
import { ImagesSliderLoading } from '../components/Booking/ImagesSliderLoading';
import { RightPanel } from '../components/Booking/RightPanel';
import { RightPanelLoading } from '../components/Booking/RightPanelLoading';
import { PrimaryButton } from '../components/Button';
import { HeaderContentGapSpacer, HeaderSpacer } from '../components/Header';
import { PageContentWrapper, PageWrapper } from '../components/layout/Common';
import { TextField } from '../components/TextField';
import { API_URL, SYMBOL } from '../config/config';
import { useExchangeContract } from '../hooks/useContracts';
import { useCreator } from '../hooks/useCreator';
import { useImagesLoaded } from '../hooks/useImagesLoaded';
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
  height: 460px;
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

  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const exchangeContract = useExchangeContract(true);
  const { creator, loaded } = useCreator(creatorId);
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
    console.log(receipt.events);
    const requestId: number = receipt.events?.find((i) => i.event === 'NewRequest')?.args?.index.toNumber();
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
            {loaded && creator && creator.demos && <ImagesSlider images={creator.demos} />}
            <ImagesSliderLoading style={{ width: '100%', height: 460 }} />
          </ImagesColumnContainer>
          <RightPanel creator={creator} account={account} loaded={loaded}>
            {(creator, account) => (
              <BookingCard>
                <FlexRow style={{ marginBottom: 12 }}>
                  <div>
                    <Label style={{ marginBottom: 8 }}>{creator.userName}</Label>
                    <Description>
                      Twitter:{' '}
                      <a href={`https://twitter.com/${creator.twitterHandle}`} style={{ color: '#EDE641' }}>
                        @{creator.twitterHandle}
                      </a>{' '}
                    </Description>
                    <Description>Address: {creator && getShortenedAddress(creator.address)}</Description>
                  </div>
                  <div>
                    <AvatarComponent url={creator.profilePicture} size="medium" />
                  </div>
                </FlexRow>
                <FlexRow style={{ marginBottom: 24 }}>
                  <Description>{creator.bio}</Description>
                </FlexRow>

                <HR style={{ marginBottom: 36 }} />
                <Formik
                  initialValues={{
                    deadline: '0',
                    description: '',
                    amount: '0',
                  }}
                  validate={({ deadline, description, amount }) => {
                    const errors: any = {};
                    try {
                      Number.parse(parseFloat(amount));
                      if (parseFloat(amount) < parseFloat(creator.price)) {
                        errors.amount = `Amount must be greator than ${creator.price}`;
                      }
                    } catch {
                      errors.amount = `Please enter a number.`;
                    }
                    if (deadline.toString() != parseInt(deadline.toString()).toString()) {
                      errors.deliveryTime = 'Delivery time cannot be a decimal or have leading zeros.';
                    } else {
                      try {
                        Number.parse(parseInt(deadline.toString()));
                        if (parseInt(deadline.toString()) < parseInt(creator.deliveryTime.toString())) {
                          errors.deadline = `Deadline must be greator than ${creator.deliveryTime}`;
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
                  onSubmit={async ({ deadline, description, amount }) => {
                    setLoading(true);
                    await makeBooking(account, creator.address, amount.toString(), description, parseInt(deadline));
                    setLoading(false);
                  }}
                >
                  {({ initialValues, handleChange, handleSubmit, errors, validateForm }) => (
                    <>
                      <PurchaseOption style={{ marginBottom: 40 }}>
                        <FlexRow style={{ marginBottom: 7 }}>
                          <Label>Personal use</Label>
                          <Label style={{ fontSize: 14 }}>
                            {formatETH(parseFloat(creator.price))} {SYMBOL}+
                          </Label>
                        </FlexRow>
                        <Description>Personalized video for you or someone else</Description>
                      </PurchaseOption>
                      <div style={{ marginBottom: 40 }}>
                        <TextField
                          inputStyles={{
                            width: 172,
                          }}
                          type="number"
                          label={`Request deadline (${creator.deliveryTime} days minimum)`}
                          description={
                            "If your video isn't delivered by your requested deadline, you will be able to request a refund."
                          }
                          endText="Days"
                          onChange={handleChange('deadline')} //parseInt
                          placeholder={`${creator.deliveryTime}+`}
                          errorMessage={errors.deadline}
                        />
                      </div>

                      <div style={{ marginBottom: 40 }}>
                        <TextField
                          inputElementType="textarea"
                          label={`Instructions for ${creator.userName}`}
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
                          endText={SYMBOL}
                          type="number"
                          placeholder={formatETH(parseFloat(creator.price)) + '+'}
                          onChange={handleChange('amount')}
                          errorMessage={errors.amount}
                        />
                        {/* TODO(jonathanng) - make dynamic */}
                        <Description style={{ fontSize: 10, marginTop: '8px' }}>
                          * Includes a 10% fee to support the platform
                        </Description>
                      </div>
                      <PrimaryButton
                        onPress={async () => {
                          setLoading(true);
                          await validateForm();
                          if (Object.keys(errors).length != 0) {
                            toast.error('Please fix the errors.');
                          } else {
                            handleSubmit();
                          }
                          setLoading(false);
                        }}
                        isDisabled={loading}
                      >
                        Book now
                      </PrimaryButton>
                    </>
                  )}
                </Formik>
              </BookingCard>
            )}
          </RightPanel>
        </PageGrid>
      </PageContentWrapper>
    </PageWrapper>
  );
};

export { BookingPage };
