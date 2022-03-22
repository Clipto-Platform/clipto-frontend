import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as api from '../../api';
import { CreatorData, EntityCreator } from '../../api/types';
import { PrimaryButton } from '../../components/Button';
import { HeaderContentGapSpacer, HeaderSpacer } from '../../components/Header/Header';
import { ContentWrapper, PageContentWrapper, PageWrapper } from '../../components/layout/Common';
import { TextField } from '../../components/TextField';
import { SYMBOL } from '../../config/config';
import { useExchangeContract } from '../../hooks/useContracts';
import { useFee } from '../../hooks/useFee';
import { useProfile } from '../../hooks/useProfile';
import { Address, Number, TweetUrl, Url } from '../../utils/validation';
import { isCreatorOnChain } from '../../web3/request';
import { OnboardProfile, OnboardTitle, ProfileDetailsContainer } from './Style';

const OnboardProfilePage = () => {
  const userProfile = useProfile();
  const { account, library } = useWeb3React<Web3Provider>();
  const exchangeContract = useExchangeContract(true);
  const [loading, setLoading] = useState(false); //state of form button
  const [hasAccount, setHasAccount] = useState<boolean>(false); //state of if the user is a creator or not
  const [userProfileDB, setUserProfileDB] = useState<EntityCreator>();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState<boolean>(false);
  const { FeeDescription } = useFee();

  const updateUserProfile = async (creatorData: CreatorData) => {
    try {
      const txResult = await exchangeContract.updateCreator(JSON.stringify(creatorData));
      toast.loading('Profile updating, waiting for confirmation!');
      await txResult.wait();
      navigate(`/creator/${account}`);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      toast.dismiss();
      toast.success('Changes will be reflected soon!');
    }
  };

  const createUserProfile = async (creatorData: CreatorData) => {
    let userOnChain;
    try {
      userOnChain = await isCreatorOnChain(exchangeContract, account);
    } catch (err) {
      toast.error('Error connecting to wallet. Toggle your networks and reload.');
      return;
    }

    if (!userOnChain) {
      try {
        const txResult = await exchangeContract.registerCreator(creatorData.userName, JSON.stringify(creatorData));
        toast.loading('Profile created, waiting for confirmation!');
        await txResult.wait();
        navigate(`/creator/${account}`);
      } catch (err: any) {
        if (err.message) {
          toast.error(err.message);
        } else if (err.data && err.data.message) {
          toast.error(err.data.message);
        }
      } finally {
        toast.dismiss();
        toast.success('Your account will be reflected here soon!');
      }
    }
  };

  useEffect(() => {
    if (account) {
      api
        .creatorById(account)
        .then((res) => {
          if (res.data && res.data.creator) {
            const creator = res.data.creator;

            setHasAccount(true);
            setUserProfileDB(creator);
          }

          setLoaded(true);
        })
        .catch(() => {
          if (!userProfile.tweetUrl) {
            navigate('/onboarding');
          } else {
            setLoaded(true);
          }
        });
    }
  }, [account]);

  return (
    <>
      {loaded && (
        <PageWrapper>
          <PageContentWrapper>
            <ContentWrapper>
              <ProfileDetailsContainer>
                <OnboardTitle style={{ marginBottom: '50px' }}>
                  {hasAccount ? 'Edit your creator profile' : 'Set up your creator profile'}
                </OnboardTitle>
                <OnboardProfile
                  style={{ marginBottom: '50px' }}
                  src={userProfile.profilePicture || userProfileDB?.profilePicture}
                  alt="user profile picture"
                />
                <Formik
                  initialValues={{
                    bio: userProfile.bio || userProfileDB?.bio || '',
                    userName: userProfile.userName || userProfileDB?.userName || '',
                    profilePicture: userProfile.profilePicture || userProfileDB?.profilePicture || '',
                    deliveryTime: userProfile.deliveryTime?.toString() || userProfileDB?.deliveryTime?.toString() || '',
                    price: userProfile.price?.toString() || userProfileDB?.price?.toString() || '',
                    tweetUrl: userProfile.tweetUrl || '',
                    address: userProfile.address || account || '',
                    demo1: userProfile.demos[0] || userProfileDB?.demos[0] || '',
                    demo2: userProfile.demos[1] || userProfileDB?.demos[1] || '',
                    demo3: userProfile.demos[2] || userProfileDB?.demos[2] || '',
                  }}
                  onSubmit={async (values) => {
                    setLoading(true);

                    const demos = [];
                    values.demo1 && demos.push(values.demo1);
                    values.demo2 && demos.push(values.demo2);
                    values.demo3 && demos.push(values.demo3);

                    const creatorData: CreatorData = {
                      userName: values.userName,
                      bio: values.bio,
                      twitterHandle: userProfileDB?.twitterHandle || userProfile.twitterHandle ||  values.userName,
                      deliveryTime: parseInt(values.deliveryTime),
                      demos: demos,
                      price: parseFloat(values.price),
                      profilePicture: values.profilePicture,
                    };
                    hasAccount ? await updateUserProfile(creatorData) : await createUserProfile(creatorData);
                    setLoading(false);
                  }}
                  validate={(values) => {
                    const errors: any = {};
                    const { bio, userName, profilePicture, deliveryTime, price, tweetUrl, address } = values;
                    const demo1 = values['demo1'];
                    const demo2 = values['demo2'];
                    const demo3 = values['demo3'];

                    if (bio == '') {
                      errors.bio = 'Please enter a bio.';
                    }
                    if (userName == '') {
                      errors.userName = 'Username cannot be empty.';
                    }
                    if (profilePicture == '') {
                      errors.profilePicture = 'Profile picture can not be empty.';
                    } else {
                      try {
                        Url.parse(profilePicture);
                      } catch (error) {
                        errors.profilePicture = 'Profile picture must be an url.';
                      }
                    }
                    const dTime: number = parseInt(deliveryTime);
                    try {
                      Number.parse(dTime);
                      if (dTime.toString() != deliveryTime) {
                        errors.deliveryTime = 'Delivery time cannot be a decimal or have leading zeros.';
                      }
                      if (dTime <= 0) {
                        errors.deliveryTime = 'Delivery time must be greater than 0 days.';
                      }
                    } catch (error) {
                      errors.deliveryTime = 'Delivery time is not a number.';
                    }

                    //TODO(jonathanng) - bad code
                    try {
                      demo1 != '' && TweetUrl.parse(demo1);
                    } catch {
                      errors.demo1 = 'This link is invalid.';
                    }

                    try {
                      demo2 != '' && TweetUrl.parse(demo2);
                    } catch {
                      errors.demo2 = 'This link is invalid.';
                    }

                    try {
                      demo3 != '' && TweetUrl.parse(demo3);
                    } catch {
                      errors.demo3 = 'This link is invalid.';
                    }
                    const p: number = parseFloat(price);
                    try {
                      Number.parse(p);
                      if (p <= 0) {
                        errors.price = 'Price must be greater than 0.';
                      }
                      if (p > 700) {
                        errors.price = `Amount must be less than 700 Matic`;
                      }
                    } catch (error) {
                      errors.price = 'Price is not a number.';
                    }
                    //update profile does not need this validation
                    if (!hasAccount) {
                      if (tweetUrl == '') {
                        errors.tweetUrl = 'Tweet url can not be empty.';
                      } else {
                        try {
                          Url.parse(tweetUrl);
                        } catch (error) {
                          errors.tweetUrl = 'Tweet url must be an url.';
                        }
                      }
                    }

                    try {
                      Address.parse(address);
                    } catch (error) {
                      errors.address = 'Please enter a valid address.';
                    }
                    return errors;
                  }}
                  validateOnBlur={false}
                  validateOnChange={false}
                >
                  {({ handleChange, handleBlur, handleSubmit, values, errors, touched, validateForm }) => {
                    return (
                      <>
                        {hasAccount && (
                          <div style={{ marginBottom: 48 }}>
                            <TextField
                              onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                                userProfile.setProfilePicture(e.target.value)
                              }
                              onChange={handleChange('profilePicture')}
                              label="Profile Picture"
                              placeholder={values.profilePicture}
                              value={values.profilePicture}
                              onBlur={handleBlur}
                              errorMessage={errors.profilePicture}
                            />
                          </div>
                        )}
                        <div style={{ marginBottom: 48 }}>
                          <TextField
                            onChange={handleChange('userName')}
                            label="Name"
                            maxLength={50}
                            placeholder={values.userName}
                            value={values.userName}
                            onBlur={handleBlur}
                            errorMessage={errors.userName}
                          />
                        </div>

                        <div style={{ marginBottom: 48 }}>
                          <TextField
                            label="Wallet Address"
                            description="You will receive payments to this address"
                            isReadOnly={true}
                            placeholder={account!}
                            value={account!}
                            onBlur={handleBlur}
                            errorMessage={errors.address}
                          />
                        </div>

                        <div style={{ marginBottom: 48 }}>
                          <TextField
                            inputElementType="textarea"
                            onChange={handleChange('bio')}
                            label="Bio"
                            maxLength={500}
                            placeholder={'Say something nice'}
                            value={values.bio}
                            onBlur={handleBlur}
                            errorMessage={errors.bio}
                          />
                        </div>

                        <div style={{ marginBottom: 48 }}>
                          <TextField
                            onChange={handleChange('deliveryTime')}
                            label="Minimum time to deliver"
                            type="number"
                            placeholder="3"
                            value={values.deliveryTime}
                            endText="Days"
                            onBlur={handleBlur}
                            errorMessage={errors.deliveryTime}
                          />
                        </div>

                        <div style={{ marginBottom: 48 }}>
                          <TextField
                            onChange={handleChange('price')}
                            label="Minimum amount to charge for bookings"
                            description={`Fans will be able to pay this in ${SYMBOL}`}
                            placeholder="0.5"
                            value={values.price}
                            type="number"
                            endText={SYMBOL}
                            onBlur={handleBlur}
                            errorMessage={errors.price}
                          />
                          <FeeDescription />
                        </div>

                        <div style={{ marginBottom: 12 }}>
                          <TextField
                            onChange={handleChange('demo1')}
                            label="Tweets"
                            description="Add links for demo videos that will display on your bookings page"
                            placeholder="Demo tweet video link 1"
                            value={values.demo1}
                            onBlur={handleBlur}
                            errorMessage={errors.demo1}
                          />
                        </div>
                        <div style={{ marginBottom: 12 }}>
                          <TextField
                            onChange={handleChange('demo2')}
                            placeholder="Demo tweet video link 2"
                            value={values.demo2}
                            onBlur={handleBlur}
                            errorMessage={errors.demo2}
                          />
                        </div>
                        <div style={{ marginBottom: 12 }}>
                          <TextField
                            onChange={handleChange('demo3')}
                            placeholder="Demo tweet video link 3"
                            value={values.demo3}
                            onBlur={handleBlur}
                            errorMessage={errors.demo3}
                          />
                        </div>

                        <PrimaryButton
                          style={{ marginBottom: '16px' }}
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
                          {hasAccount ? 'Update profile' : 'Set up profile'}
                        </PrimaryButton>
                      </>
                    );
                  }}
                </Formik>
              </ProfileDetailsContainer>
            </ContentWrapper>
          </PageContentWrapper>
        </PageWrapper>
      )}
    </>
  );
};

export { OnboardProfilePage };
