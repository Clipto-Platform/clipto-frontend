import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { errors, ethers } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { exchangeRates, indexRequest } from '../../api';
import { RequestData } from '../../api/types';
import { AvatarComponent } from '../../components/AvatarOrb';
import { ImagesSlider } from '../../components/Booking/ImagesSlider';
import { BookingCard, RightPanel } from '../../components/Booking/RightPanel';
import { PrimaryButton } from '../../components/Button';
import { Dropdown, Option } from '../../components/Dropdown/Dropdown';
import { HeaderContentGapSpacer } from '../../components/Header/Header';
import { PageContentWrapper, PageWrapper } from '../../components/layout/Common';
import { TextField } from '../../components/TextField';
import config from '../../config/config';
import { ERCTokenType } from '../../config/types';
import { getErc20Contract, useExchangeContractV1 } from '../../hooks/useContracts';
import { useCreator } from '../../hooks/useCreator';
import { useFee } from '../../hooks/useFee';
import { Description, Label } from '../../styles/typography';
import { getShortenedAddress } from '../../utils/address';
import { convertToFloat, convertToInt, formatETH, removeTrailingZero } from '../../utils/format';
import { Number } from '../../utils/validation';
import { isCreatorOnChain } from '../../web3/request';
import { FlexRow, HR, ImagesColumnContainer, PageGrid, PurchaseOption } from './Style';
import { BookingFormValues, UsesOptions } from './types';
import { getTwitterData } from '../../api';

const BookingPage = () => {
  const navigate = useNavigate();
  const ref = useRef(null as any);
  const exchangeContractV1 = useExchangeContractV1(true);
  const getUser = useSelector((state: any) => state.user);

  const { account, library, chainId } = useWeb3React<Web3Provider>();
  const { creatorId } = useParams();
  const { creator, loaded } = useCreator(creatorId);
  const { FeeDescription } = useFee();

  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState();
  const [token, setToken] = useState<ERCTokenType>('MATIC');
  const [price, setPrice] = useState<number>(0);
  const [uses, setUses] = useState<UsesOptions>(UsesOptions.personal);
  const [isTwitterAccount, setIsTwitterAccount] = useState<boolean>(false);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [businessTwitter, setBusinessTwitter] = useState<string>('');
  const [invalidTwitter, setInvalidTwitter] = useState<string>('');
  const [businessPrice, setBusinessPrice] = useState<number>(0);
  const [businessIndex, setBusinessIndex] = useState<number>(0);

  useEffect(() => {
    setUser(getUser);
  }, [getUser]);

  useEffect(() => {
    if (ref && ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
      });
    }
  }, [ref]);

  useEffect(() => {
    if (loaded && creator) {
      setBusinessPrice(
        creator.customServices &&
          creator.customServices.map((elm: any) => {
            elm = JSON.parse(elm);
            return elm.price;
          })[businessIndex],
      );
    }
  }, [loaded, businessIndex, businessPrice]);

  useEffect(() => {
    if (loaded && creator) {
      const updatedPrice = uses === UsesOptions.business ? businessPrice : creator.price;
      exchangeRates(token, updatedPrice).then((convertedPrice) => {
        setPrice(parseFloat(convertedPrice));
      });
    }
  }, [loaded, token, businessPrice, uses]);

  useEffect(() => {
    setIsTwitterAccount(false);
    setInvalidTwitter('');
    let timer: any;
    if (businessTwitter.length) {
      setIsLoader(true);
      clearTimeout();
      timer = setTimeout(async () => {
        try {
          const twitterHandle = await getTwitterData([businessTwitter]);
          const isTwitterPrfile =
            !!twitterHandle && twitterHandle.data && twitterHandle.data.data && twitterHandle.data.data.length === 1;
          if (isTwitterPrfile) {
            setIsTwitterAccount(true);
            setInvalidTwitter('');
          } else {
            setIsTwitterAccount(false);
          }
        } catch (e) {
          setIsTwitterAccount(false);
          if (uses === UsesOptions.business) setInvalidTwitter('Invalid twitter handle.');
        }
      }, 3000);
    } else {
      setInvalidTwitter('');
      setIsTwitterAccount(false);
      setIsLoader(false);
    }
    return () => clearTimeout(timer);
  }, [businessTwitter]);

  const handleSelect = (e: any) => {
    setToken(e.target.value);
  };

  const waitForTransaction = async (transaction: ethers.ContractTransaction) => {
    toast.loading('Creating a new booking, waiting for confirmation');
    await transaction.wait();
    toast.dismiss();
  };

  const waitForIndexing = async (txHash: string) => {
    toast.loading('Indexing your request, will be done soon');
    await indexRequest(txHash);
    toast.dismiss();
  };

  const addAllowance = async (amount: string) => {
    const ERC20 = getErc20Contract(token, account as string, library as Web3Provider);
    const tx = await ERC20.approve(config.exchangeAddressV1, parseUnits(amount));

    toast.loading('Waiting for approval');
    await tx.wait();
    toast.dismiss();
  };

  const makeBooking = async (values: BookingFormValues) => {
    try {
      const isCreator = await isCreatorOnChain(exchangeContractV1, creatorId);
      if (!isCreator) {
        toast.error('Booking request for this content creator cannot be created');
        return;
      }

      const requestData: RequestData = {
        deadline: convertToInt(values.deadline),
        description: values.description,
        isBusiness: uses === UsesOptions.business ? true : false,
      };
      if (uses === UsesOptions.business) {
        requestData.businessName = values.businessName;
        requestData.businessEmail = values.businessEmail;
        requestData.businessTwitter = values.businessTwitter;
        requestData.businessInfo = values.businessInfo;
        requestData.businessRequestType = values.businessRequestType;
      }

      let transaction;
      if (token !== 'MATIC') {
        await addAllowance(values.amount);

        transaction = await exchangeContractV1.newRequest(
          creatorId as string,
          account as string,
          config.erc20Contracts[token],
          parseUnits(values.amount),
          JSON.stringify(requestData),
        );
      } else {
        transaction = await exchangeContractV1.nativeNewRequest(
          creatorId as string,
          account as string,
          JSON.stringify(requestData),
          {
            value: ethers.utils.parseEther(values.amount),
          },
        );
      }

      await waitForTransaction(transaction);
      await waitForIndexing(transaction.hash);

      toast.dismiss();
      toast.success('Booking completed, your Order has been created.');
      navigate('/orders');
    } catch (e) {
      toast.dismiss();
      toast.error(`The transaction failed. Make sure you have enough ${token} for gas.`);
    }
  };

  return (
    <PageWrapper>
      <HeaderContentGapSpacer />
      <PageContentWrapper ref={ref}>
        <PageGrid>
          <ImagesColumnContainer>
            {loaded && creator && creator.demos && <ImagesSlider images={creator.demos} />}
          </ImagesColumnContainer>
          <RightPanel creator={creator} account={account} loaded={loaded} user={user}>
            {(creator, account) => (
              <BookingCard>
                <FlexRow style={{ marginBottom: 12 }}>
                  <div>
                    <Label style={{ marginBottom: 8 }}>{creator.userName}</Label>
                    <Description>
                      Twitter:{' '}
                      <a
                        href={`https://twitter.com/${creator.twitterHandle}`}
                        target="_blank"
                        style={{ color: '#EDE641' }}
                      >
                        @{creator.twitterHandle}
                      </a>{' '}
                    </Description>
                    <Description>Address: {creator && getShortenedAddress(creator.address)}</Description>
                  </div>
                  <div>
                    <AvatarComponent url={creator.profilePicture} size="medium" twitterHandle={creator.twitterHandle} />
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
                    businessName: '',
                    businessEmail: '',
                    businessTwitter: '',
                    businessInfo: '',
                    businessRequestType:
                      creator.customServices &&
                      creator.customServices.map((elm: any) => {
                        elm = JSON.parse(elm);
                        return `${elm.description}: ${elm.time} - ${elm.price} MATIC`;
                      })[0],
                    selectedBusinessOptionPrice: businessPrice,
                  }}
                  validate={({
                    deadline,
                    description,
                    amount,
                    businessName,
                    businessEmail,
                    businessTwitter,
                    businessInfo,
                    businessRequestType,
                    selectedBusinessOptionPrice,
                  }) => {
                    const errors: any = {};
                    try {
                      Number.parse(parseFloat(amount));
                      if (parseFloat(amount) < convertToFloat(creator.price)) {
                        errors.amount = `Amount must be greater than ${creator.price}`;
                      }
                      if (
                        uses === UsesOptions.business &&
                        parseFloat(amount) < convertToFloat(selectedBusinessOptionPrice)
                      ) {
                        errors.amount = `Amount must be greater than ${selectedBusinessOptionPrice}`;
                      }
                      if (parseFloat(amount) > 700) {
                        errors.amount = `Amount must be less than 700 Matic`;
                      }
                      console.log(businessRequestType, selectedBusinessOptionPrice);
                      if (
                        uses === UsesOptions.business &&
                        parseFloat(amount) < convertToFloat(selectedBusinessOptionPrice)
                      ) {
                        errors.amount = `Amount must be greater than ${selectedBusinessOptionPrice} Matic`;
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
                    const isBusiness = uses === UsesOptions.business;
                    if (isBusiness && !businessEmail) errors.businessEmail = `Business email is required`;
                    if (isBusiness && !businessInfo) errors.businessInfo = `Business description is required`;
                    return errors;
                  }}
                  validateOnBlur={false}
                  validateOnChange={false}
                  onSubmit={async (values) => {
                    setLoading(true);
                    await makeBooking(values);
                    setLoading(false);
                  }}
                >
                  {({ initialValues, handleChange, handleSubmit, errors, validateForm, setFieldValue, values }) => (
                    <>
                      <div style={{ margin: '0 0 15px 2px' }}>Choose an option</div>
                      <PurchaseOption
                        style={{
                          marginBottom: 20,
                          border: `${uses === UsesOptions.personal ? '1px solid yellow' : '1px solid #2A2A2A'}`,
                        }}
                        onClick={() => {
                          setBusinessIndex(0);
                          setUses(UsesOptions.personal);
                        }}
                      >
                        <FlexRow style={{ marginBottom: 7 }}>
                          <Label>Personal use</Label>
                          <Label style={{ fontSize: 14 }}>
                            {formatETH(convertToFloat(creator.price))} {config.chainSymbol}+
                          </Label>
                        </FlexRow>
                        <Description>Personalized video for you or someone else</Description>
                      </PurchaseOption>
                      {creator.businessPrice > 0 ? (
                        <PurchaseOption
                          style={{
                            marginBottom: 40,
                            border: `${uses === UsesOptions.business ? '1px solid yellow' : '1px solid #2A2A2A'}`,
                          }}
                          onClick={() => setUses(UsesOptions.business)}
                        >
                          <FlexRow style={{ marginBottom: 7 }}>
                            <Label>Business use</Label>
                            <Label style={{ fontSize: 14 }}>
                              {formatETH(convertToFloat(businessPrice))} {config.chainSymbol}+
                            </Label>
                          </FlexRow>
                          <Description>Engaging video content for your company, customers, or employees</Description>
                          {uses === UsesOptions.business ? (
                            <div style={{ marginTop: 18 }}>
                              {creator.customServices.map((elm: any, index) => {
                                elm = JSON.parse(elm);
                                return (
                                  <div style={{ margin: '5px 0' }} key={index}>
                                    <input
                                      style={{ accentColor: 'rgba(237, 230, 65, 1)' }}
                                      type="radio"
                                      id={index.toString()}
                                      name="businessOption"
                                      defaultChecked={index === 0}
                                      value={`${elm.description}: ${elm.time} - ${elm.price} MATIC`}
                                      onChange={(e: any) => {
                                        setBusinessIndex(index);
                                        // setFieldValue('selectedBusinessOptionPrice', elm.price);
                                        setFieldValue('businessRequestType', e.target.value);
                                      }}
                                    />
                                    <label style={{ marginLeft: 10, cursor: 'pointer' }} htmlFor={index.toString()}>
                                      {`${elm.description}: ${elm.time} - ${elm.price} MATIC`}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            ''
                          )}
                        </PurchaseOption>
                      ) : (
                        ''
                      )}

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
                      {uses === UsesOptions.business ? (
                        <div>
                          <div style={{ marginBottom: 40 }}>
                            <TextField
                              label="Business Name"
                              placeholder="Business Name"
                              onChange={handleChange('businessName')}
                              errorMessage={errors.businessName}
                            />
                          </div>

                          <div style={{ marginBottom: 40 }}>
                            <TextField
                              label="Email"
                              type="email"
                              placeholder="jimmy@gmail.com"
                              onChange={handleChange('businessEmail')}
                              errorMessage={errors.businessEmail}
                            />
                          </div>

                          <div style={{ marginBottom: 40 }}>
                            <TextField
                              label="Twitter"
                              placeholder="@jimmy"
                              isSuccess={isTwitterAccount}
                              isLoader={isLoader && !isTwitterAccount && !invalidTwitter}
                              onChange={(e: any) => {
                                setBusinessTwitter(e);
                                setFieldValue('businessTwitter', e);
                              }}
                              errorMessage={errors.businessTwitter || invalidTwitter}
                            />
                          </div>

                          <div style={{ marginBottom: 40 }}>
                            <TextField
                              inputElementType="textarea"
                              maxLength={1000}
                              label="Tell us about your company"
                              placeholder="Tell us what you guys do!"
                              onChange={handleChange('businessInfo')}
                              errorMessage={errors.businessInfo}
                            />
                          </div>
                        </div>
                      ) : (
                        ''
                      )}

                      <div style={{ marginBottom: 40 }}>
                        <TextField
                          inputElementType="textarea"
                          maxLength={1000}
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
                          value={user}
                          isDisabled
                        />
                      </div>

                      <div style={{ marginBottom: 40 }}>
                        <Dropdown formLabel="Select payment type" onChange={handleSelect}>
                          {config.erc20TokenNames.map((tok, i) => {
                            if (i == 0) {
                              <Option key={i} selected value={tok} />;
                            }
                            return <Option key={i} value={tok} />;
                          })}
                        </Dropdown>
                      </div>

                      <div style={{ marginBottom: 40 }}>
                        <TextField
                          inputStyles={{
                            width: 220,
                          }}
                          label="Amount to pay"
                          description={'Increase your bid to get your video earlier'}
                          endText={token}
                          type="number"
                          placeholder={
                            price && price != 0
                              ? removeTrailingZero(price.toFixed(7)) + '+'
                              : uses === UsesOptions.business
                              ? `${businessPrice} +`
                              : formatETH(convertToFloat(creator.price)) + '+'
                          }
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
                        isDisabled={user && chainId === config.chainId ? loading : true}
                      >
                        {user
                          ? chainId === config.chainId
                            ? 'Book now'
                            : `Change Network to ${config.chainName}`
                          : 'Please Connect your wallet'}
                      </PrimaryButton>
                      <Description style={{ fontSize: 12, margin: '15px 0px' }}>
                        *These are unaudited contracts. Clipto.io assumes no responsibility or liability for any
                        transaction errors, faults or losses while making a booking or in the course of a booking being
                        fulfilled or thereafter.
                      </Description>
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
