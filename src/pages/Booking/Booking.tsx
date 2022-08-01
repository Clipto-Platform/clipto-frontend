import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { errors, ethers } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
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
import { getErc20Contract, getProviderOrSigner, useExchangeContractV1 } from '../../hooks/useContracts';
import { useCreator } from '../../hooks/useCreator';
import { useFee } from '../../hooks/useFee';
import { Description, Label } from '../../styles/typography';
import { getShortenedAddress } from '../../utils/address';
import { convertToFloat, convertToInt, formatETH, removeTrailingZero } from '../../utils/format';
import { Number } from '../../utils/validation';
import { isCreatorOnChain } from '../../web3/request';
import { FlexRow, HR, ImagesColumnContainer, PageGrid, PurchaseOption } from './Style';
import { SocialFeed } from '../../components/SocialFeed/SocialFeed';
import { ERC20__factory } from '../../contracts';
import axios from 'axios';
import * as lens from '../../api/lens';
import { useQuery } from 'urql';
import { queryProfile } from '../../api/lens/query';
import { ProfileSearchResult } from '../../generated/graphql';
import { BookingFormValues, UsesOptions } from './types';
import { getTwitterData } from '../../api';
import { FaTwitter } from 'react-icons/fa';
import { Unsubscribe } from '@reduxjs/toolkit';
import { useSocialGraph } from '@/hooks/useSocialGraph';
import styled from 'styled-components';

const OnlyDesktop = styled.div`
  @media (max-width: 955px) {
    display: none;
  }
`;

const OnlyMobile = styled.div`
  @media (min-width: 956px) {
    display: none;
  }
`;

const BookingPage = () => {
  const navigate = useNavigate();
  const ref = useRef(null as any);
  const exchangeContractV1 = useExchangeContractV1(true);

  const { account, library, chainId } = useWeb3React<Web3Provider>();
  const { creatorId } = useParams();
  const { creator, loaded } = useCreator(creatorId);
  const { FeeDescription } = useFee();

  const [loading, setLoading] = useState<boolean>(false);
  const user = useSelector((state: any) => state.user);
  const [token, setToken] = useState<ERCTokenType>('USDC');
  const [price, setPrice] = useState<number>(0);
  const [doesFollow, setDoesFollow] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(true);
  const [creatorLens, setCreatorLens] = useState<any>();
  const [uses, setUses] = useState<UsesOptions>(UsesOptions.personal);
  const [isTwitterAccount, setIsTwitterAccount] = useState<boolean>(false);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [businessTwitter, setBusinessTwitter] = useState<string>('');
  const [invalidTwitter, setInvalidTwitter] = useState<string>('');
  const [businessPrice, setBusinessPrice] = useState<number>(0);
  const [businessIndex, setBusinessIndex] = useState<number>(0);
  const [creatorLensFollowModuleType, setCreatorLensFollowModuleType] = useState<string>();

  const { doSocialGraphAction } = useSocialGraph();

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
  }, [loaded, businessIndex]);

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
          if (uses === UsesOptions.business) setInvalidTwitter('Invalid twitter handle, try to removing @ sign.');
        }
      }, 3000);
    } else {
      setInvalidTwitter('');
      setIsTwitterAccount(false);
      setIsLoader(false);
    }
    return () => clearTimeout(timer);
  }, [businessTwitter]);

  useEffect(() => {
    if (account && creator) {
      let lensProfilePromise;
      if (creator.lensHandle) {
        lensProfilePromise = lens.getProfileByHandle(creator.lensHandle);
      } else {
        // even if a clipto creator didn't set a lensHandle when creating a profile
        // (this happens when you create a clipto account before lens integration)
        lensProfilePromise = lens.getProfile(creator.address);
      }
      if (lensProfilePromise == null) return;
      lensProfilePromise.then((res) => {
        const lensProfile = res.data.profiles.items[0];
        if (lensProfile.ownedBy.toUpperCase() === creator.address.toUpperCase()) {
          setCreatorLens(lensProfile);
          setCreatorLensFollowModuleType(lensProfile.followModule && lensProfile.followModule.__typename);
        } else {
          throw new Error('Validation lens error');
        }

        lens.isFollowing(account, res.data.profiles.items[0].id).then((res) => {
          if (res) {
            setDoesFollow(res.data.doesFollow[0].follows);
          }
        });
      });
    }
  }, [account, toggle, creator]);

  const handleSelect = (e: any) => {
    setToken(e.target.value);
  };

  const waitForTransaction = async (transaction: ethers.ContractTransaction) => {
    toast.dismiss();
    toast.loading('Creating a new booking, waiting for confirmation');
    const timeoutId = setTimeout(() => {
      console.log('Your transaction hash is:', transaction.hash);
      toast.dismiss();
      toast.loading(`Your transaction is pending, you free to come back later.`);
    }, 10000);
    await transaction.wait();
    clearTimeout(timeoutId);
    toast.dismiss();
  };

  const waitForIndexing = async (txHash: string) => {
    // toast.loading('Indexing your request, will be done soon');
    await indexRequest(txHash);
    // toast.dismiss();
  };

  const addAllowance = async (amount: string) => {
    const ERC20 = getErc20Contract(token, account as string, library as Web3Provider);
    const tx = await ERC20.approve(config.exchangeAddressV1, parseUnits(amount, config.erc20[token].decimals));

    toast.loading('Waiting for approval');
    await tx.wait();
    toast.dismiss();
  };

  const followOrUnfollow = async (creatorLensId: string, library: Web3Provider) => {
    try {
      toast.dismiss();
      toast.loading(doesFollow ? 'Awaiting unfollow confirmation' : 'Awaiting follow confirmation');
      const txHash = doesFollow
        ? await lens.unfollow(creatorLensId, library)
        : await lens.follow(creatorLensId, library);

      toast.dismiss();
      toast.loading('Waiting for transaction to complete');
      if (!txHash) {
        console.error('no txHash detected!');
        return;
      }
      const f = await lens.pollUntilIndexed(txHash);
      setToggle(!toggle); //todo(jonathanng) - this is trashcan code!
      toast.dismiss();
      toast.success('Transaction is finished');
    } catch (e: any) {
      toast.dismiss();
      toast.error((e && e.message) || e || 'Unknown error.');
      return;
    }
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
          config.erc20[token].address,
          parseUnits(values.amount, config.erc20[token].decimals),
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

      toast.dismiss();
      toast.success('Booking completed, your Order has been created.');
      navigate('/orders');

      await waitForIndexing(transaction.hash);
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
            {creator && creatorLens && (
              <OnlyDesktop>
                <SocialFeed creator={creator} creatorLens={creatorLens} />
              </OnlyDesktop>
            )}
          </ImagesColumnContainer>
          <RightPanel creator={creator} account={account} loaded={loaded} user={user}>
            {(creator, account) => (
              <BookingCard>
                <FlexRow style={{ marginBottom: 12 }}>
                  <div style={{ width: '75%' }}>
                    <AvatarComponent
                      style={{ marginBottom: 5 }}
                      url={creator.profilePicture}
                      size="medium"
                      twitterHandle={creator.twitterHandle}
                    />
                    <Label style={{ marginBottom: 8 }}>{creator.userName}</Label>
                    <Description style={{ marginBottom: '5px' }}>
                      <a
                        href={`https://twitter.com/${creator.twitterHandle}`}
                        target="_blank"
                        style={{ color: '#EDE641' }}
                      >
                        <FaTwitter style={{ color: '#1C9BEF' }} /> &nbsp;@{creator.twitterHandle}
                      </a>{' '}
                    </Description>
                    {(creator.lensHandle || creatorLens) && (
                      <Description style={{ marginBottom: '5px' }}>
                        <a
                          href={`https://lenster.xyz/u/${creator.lensHandle || (creatorLens && creatorLens.handle)}`}
                          target="_blank"
                          style={{ color: '#EDE641' }}
                        >
                          🌿 &nbsp;@{creator.lensHandle || (creatorLens && creatorLens.handle)}
                        </a>{' '}
                      </Description>
                    )}
                    <Description>Address: {creator && getShortenedAddress(creator.address)}</Description>
                  </div>
                  <div style={{}}>
                    <div>
                      {creatorLens && creatorLens.id && (
                        <PrimaryButton
                          size="small"
                          width="small"
                          isDisabled={creatorLensFollowModuleType != null}
                          // only accepts creators with basic follow module
                          style={
                            doesFollow
                              ? {
                                  margin: 10,
                                  marginLeft: 0,
                                  maxWidth: 100,
                                  background: '#2E2E2E',
                                  color: 'white',
                                }
                              : {
                                  margin: 10,
                                  marginLeft: 0,
                                  maxWidth: 150,
                                  background: '#5F21E2',
                                  color: 'white',
                                  lineHeight: '16px',
                                }
                          }
                          onPress={async (e) => {
                            if (!user) {
                              //this means that you have not connected a wallet
                              toast.dismiss();
                              toast.error('Please connect your wallet');
                              return;
                            }
                            if (!library) {
                              toast.dismiss();
                              toast.error('Please reload the page and reconnect your wallet');
                              return;
                            }
                            doSocialGraphAction(doesFollow ? 'follow' : 'unfollow', () => {
                              followOrUnfollow(creatorLens.id, library);
                            });
                          }}
                        >
                          {doesFollow ? 'Following' : 'Follow'}
                        </PrimaryButton>
                      )}
                      {creatorLens && creatorLens.id && creatorLensFollowModuleType && (
                        <Description style={{ maxWidth: 200 }}>
                          This creator has a follow module of {creatorLensFollowModuleType}. We have disabled the module
                          until we support it. Please let us know if this is an issue.
                        </Description>
                      )}
                    </div>
                  </div>
                </FlexRow>
                <FlexRow style={{ marginBottom: 24 }}>
                  <Description style={{ color: 'white' }}>{creator.bio}</Description>
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
                        return `${elm.description}: ${elm.time} - ${elm.price} USDC`;
                      })[0],
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
                  }) => {
                    const errors: any = {};
                    try {
                      Number.parse(parseFloat(amount));
                      if (uses === UsesOptions.personal && parseFloat(amount) < convertToFloat(creator.price)) {
                        errors.amount = `Amount must be greater than ${price}`;
                      }
                      if (uses === UsesOptions.business && parseFloat(amount) < convertToFloat(price)) {
                        errors.amount = `Amount must be greater than ${price}`;
                      }
                      if (parseFloat(amount) > 700) {
                        errors.amount = `Amount must be less than 700 `;
                      }
                      if (uses === UsesOptions.business && parseFloat(amount) < convertToFloat(price)) {
                        errors.amount = `Amount must be greater than ${price} `;
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
                  onSubmit={async (values: any) => {
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
                            {formatETH(convertToFloat(creator.price))} {config.defaultToken}+
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
                              {formatETH(convertToFloat(businessPrice))} {config.defaultToken}+
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
                                      value={`${elm.description}: ${elm.time} - ${elm.price} USDC`}
                                      onChange={(e: any) => {
                                        setBusinessIndex(index);
                                        // setFieldValue('selectedBusinessOptionPrice', elm.price);
                                        setFieldValue('businessRequestType', e.target.value);
                                      }}
                                    />
                                    <label style={{ marginLeft: 10, cursor: 'pointer' }} htmlFor={index.toString()}>
                                      {`${elm.description}: ${elm.time} - ${elm.price} USDC`}
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
                              placeholder="jimmy"
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
                        <Dropdown name="token" formLabel="Select payment type" onChange={handleSelect}>
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
          {creator && creatorLens && (
            <OnlyMobile>
              <SocialFeed creator={creator} creatorLens={creatorLens} />
            </OnlyMobile>
          )}
        </PageGrid>
      </PageContentWrapper>
    </PageWrapper>
  );
};

export { BookingPage };
