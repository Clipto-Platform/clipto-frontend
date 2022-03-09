import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as api from '../../api';
import { AvatarComponent } from '../../components/AvatarOrb';
import { ImagesSlider } from '../../components/Booking/ImagesSlider';
import { BookingCard, RightPanel } from '../../components/Booking/RightPanel';
import { PrimaryButton } from '../../components/Button';
import { HeaderContentGapSpacer, HeaderSpacer } from '../../components/Header/Header';
import { PageContentWrapper, PageWrapper } from '../../components/layout/Common';
import { TextField } from '../../components/TextField';
import { SYMBOL } from '../../config/config';
import { useExchangeContract } from '../../hooks/useContracts';
import { useCreator } from '../../hooks/useCreator';
import { useFee } from '../../hooks/useFee';
import { Description, Label } from '../../styles/typography';
import { getShortenedAddress } from '../../utils/address';
import { formatETH } from '../../utils/format';
import { Number } from '../../utils/validation';
import { isCreatorOnChain, signMessage } from '../../web3/request';
import { FlexRow, HR, ImagesColumnContainer, PageGrid, PurchaseOption } from './Style';
import { BookingFormValues } from './types';

const BookingPage = () => {
  const { creatorId } = useParams();
  const { account, library } = useWeb3React<Web3Provider>();

  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const exchangeContract = useExchangeContract(true);
  const { creator, loaded } = useCreator(creatorId);
  const { FeeDescription } = useFee();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (values: BookingFormValues) => {
    if (executeRecaptcha) {
      const token = await executeRecaptcha('Booking');
      await makeBooking(values, token);
    } else {
      toast.warn('Something has occured, Please refresh the page.');
    }
  };

  const makeBooking = async (values: BookingFormValues, captchaToken: string) => {
    try {
      const isCreator = await isCreatorOnChain(exchangeContract, creatorId);
      if (!isCreator) {
        toast.error('Booking request for this content creator cannot be created');
        return;
      }

      const signMsg = 'I am creating a booking for my creator';
      const signed = await signMessage(library, account, signMsg);
      const transaction = await exchangeContract.newRequest(creatorId || '', {
        value: ethers.utils.parseEther(values.amount),
      });
      const receipt = await transaction.wait();
      const requestId: number = receipt.events?.find((i) => i.event === 'NewRequest')?.args?.index.toNumber();

      const data = {
        ...values,
        deadline: parseInt(values.deadline),
        txHash: transaction.hash,
        signed,
        requestId,
        address: account || '',
        message: signMsg,
        creator: creatorId || '',
        requester: account || '',
      };

      const response = await api.createBooking(data, captchaToken);
      if (response && response.status === 201) {
        navigate('/orders');
        toast.success('Request created!');
      } else {
        toast.error('Request creation failed.');
      }
    } catch (e) {
      toast.error(`The transaction failed. Make sure you have enough ${SYMBOL} for gas.`);
      return;
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
                        errors.amount = `Amount must be greater than ${creator.price}`;
                      }
                      if (parseFloat(amount) > 700) {
                        errors.amount = `Amount must be less than 700 Matic`;
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
                          errors.deadline = `Deadline must be greater than ${creator.deliveryTime}`;
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
                  onSubmit={async (values) => {
                    setLoading(true);
                    await handleSubmit(values);
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
                          onChange={handleChange('deadline')}
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
                        <TextField
                          label="Address to receive video NFT"
                          placeholder="Wallet address"
                          value={account}
                          isDisabled
                        />
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
                        <FeeDescription />
                      </div>
                      <PrimaryButton
                        onPress={async () => {
                          setLoading(true);
                          const errors = await validateForm();
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
