import { Web3Provider } from '@ethersproject/providers';
import { OverlayContainer } from '@react-aria/overlays';
import { useWeb3React } from '@web3-react/core';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as api from '../../api';
import * as lens from '../../api/lens';
import { CreatorData, EntityCreator } from '../../api/types';
import { PrimaryButton } from '../../components/Button';
import { Dropdown, Option } from '../../components/Dropdown/Dropdown';
import { ContentWrapper, PageContentWrapper, PageWrapper } from '../../components/layout/Common';
import { TextField } from '../../components/TextField';
import config from '../../config/config';
import { useExchangeContractV1 } from '../../hooks/useContracts';
import { useFee } from '../../hooks/useFee';
import { useProfile } from '../../hooks/useProfile';
import { Address, Number, TweetUrl, Url } from '../../utils/validation';
import { isCreatorOnChain } from '../../web3/request';
import { OnboardProfile, OnboardTitle, ProfileDetailsContainer } from './Style';
import { ModalDialog } from '../../components/Dialog'
import create, { State } from 'zustand';
import { immer } from '../../utils/zustand';
import Toggle from 'react-toggle';
import './ToggleStyle.css';
import { Description } from '../../styles/typography';
import { BsX } from 'react-icons/bs';

interface HeaderStore extends State {
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
}

const useHeaderStore = create<HeaderStore>(
  immer((set) => ({
    showDialog: false,
    setShowDialog: (show: boolean) => {
      set((draft) => {
        draft.showDialog = show;
      });
    },
  })),
);



const OnboardProfilePage = () => {
  const CREATE_LENS_TEXT = 'Create new Lens Profile 🌿'
  const userProfile = useProfile();
  const navigate = useNavigate();

  const exchangeContractV1 = useExchangeContractV1(true);
  const { FeeDescription } = useFee();
  const { account, library } = useWeb3React<Web3Provider>();

  const [loading, setLoading] = useState(false); //state of form button
  const [hasAccount, setHasAccount] = useState<boolean>(false); //state of if the user is a creator or not
  const [userProfileDB, setUserProfileDB] = useState<EntityCreator>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [lensProfiles, setLensProfiles] = useState<Array<{ id: string; handle: string }>>([]);
  const showLensDialog = useHeaderStore((s) => s.showDialog);
  const setShowLensDialog = useHeaderStore((s) => s.setShowDialog);
  const [createLens, setCreateLens] = useState(false)

  const createLensProfile = async (lensHandle : string) => {
    if (!account) {
      toast.error('No account detected!')
      return {error: 'No account detected'};
    }
    const accessRes = await lens.getAccess(account);
    if (!accessRes) return;
    const access = accessRes.data.authenticate.accessToken;
    toast.loading('Creating lens profile');
    const profileRes = await lens.createProfile(
      {
        handle: lensHandle,
      },
      access,
    ); console.log(profileRes)
    const profileResVal =
      (profileRes && profileRes.data &&
        profileRes.data.createProfile &&
        profileRes.data.createProfile.reason) ||
      (profileRes && profileRes.data.createProfile && profileRes.data.createProfile);
    if (profileResVal == 'HANDLE_TAKEN') {
      toast.dismiss();
      toast.error('Handle is taken');
      return profileRes
    }
    await lens.pollUntilIndexed(profileRes.data.createProfile.txHash, access);
    toast.dismiss();
    toast.success('Lens profile created');

    if (
      profileRes &&
      profileRes.data.createProfile &&
      !profileRes.data.createProfile.reason
    ) {
      getProfiles(account);
    }
    return profileRes
  }

  const [isBusiness, setIsBusiness] = useState<boolean>(false);
  const [customServicesData, setCustomServicesData] = useState<any>([
    {
      description: 'Standard video',
      time: 'Up to 1 min',
      price: '300',
      placeholderDesc: 'Standard video',
      placeHolderTime: 'Up to 1 min',
    },
    { description: '', time: '', price: '', placeholderDesc: 'Twitter video', placeHolderTime: 'Under 1 min' },
    { description: '', time: '', price: '', placeholderDesc: 'How-to video', placeHolderTime: 'Up to 30 sec' },
  ]);

  const waitForIndexing = async (txHash: string) => {
    toast.dismiss();
    toast.loading('Indexing your data, will be done soon');
    await api.indexCreator(txHash);
    toast.dismiss();
  };

  const addFormFields = () => {
    setCustomServicesData([
      ...customServicesData,
      { description: '', time: '', price: '', placeholderDesc: 'How-to video', placeHolderTime: 'Up to 30 sec' },
    ]);
  };

  const removeFormFields = (i: any) => {
    let newFormValues = [...customServicesData];
    newFormValues.splice(i, 1);
    setCustomServicesData(newFormValues);
  };

  const handleChangeCustomForm = (i: any, name: string, value: string) => {
    const newFormValues = [...customServicesData];
    if (name === 'description') newFormValues[i].description = value;
    if (name === 'time') newFormValues[i].time = value;
    if (name === 'price') newFormValues[i].price = value;
    setCustomServicesData(newFormValues);
  };

  const updateUserProfile = async (creatorData: CreatorData) => {
    try {
      toast.loading('Profile updating, waiting for confirmation!');
      const txResult = await exchangeContractV1.updateCreator(JSON.stringify(creatorData));

      await txResult.wait();
      await waitForIndexing(txResult.hash);

      toast.success('Changes will be reflected soon!');
      navigate(`/creator/${account}`);
    } catch (err: any) {
      toast.dismiss();
      toast.error(err.message);
    }
  };

  const createUserProfile = async (creatorData: CreatorData) => {
    let userOnChain;
    try {
      userOnChain = await isCreatorOnChain(exchangeContractV1, account);
    } catch (err) {
      toast.error('Error connecting to wallet. Toggle your networks and reload.');
      return;
    }

    if (!userOnChain) {
      try {
        const txResult = await exchangeContractV1.registerCreator(creatorData.userName, JSON.stringify(creatorData));
        toast.loading('Profile created, waiting for confirmation!');

        await txResult.wait();
        await waitForIndexing(txResult.hash);

        toast.success('Your account will be reflected here soon!');
        navigate(`/creator/${account}`);
      } catch (err: any) {
        toast.dismiss();
        if (err.message) {
          toast.error(err.message);
        } else if (err.data && err.data.message) {
          toast.error(err.data.message);
        }
      }
    }
  };
  const getProfiles = (account: any) =>
    lens.getProfile(account).then((res) => {
      if (res && res.data) {
        setLensProfiles(res.data.profiles.items.map((item: any) => ({ id: item.id, handle: item.handle })));
      }
  });



  useEffect(() => {
    console.log(account)
    if (account) {
      api
        .creatorById(account)
        .then((res) => {
          console.log(res)
          if (res.data && res.data.creator) {
            const creator = res.data.creator;
            console.log(creator)
            if (creator.businessPrice > 0) setIsBusiness(true);
            if (!!creator.customServices && creator.customServices.length) {
              setCustomServicesData(creator.customServices.map((it) => JSON.parse(it)));
            }
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
      getProfiles(account);
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
                    lensHandle: userProfile.lensHandle || userProfileDB?.lensHandle || '',
                    businessPrice: userProfile.businessPrice || userProfileDB?.businessPrice || 0,
                    isBusiness: isBusiness,
                    customServices: [],
                  }}

                  onSubmit={async (values) => {
                    setLoading(true);
                    if (createLens) {
                      await createLensProfile(values.lensHandle)
                    } 
                    
                    const demos = [];
                    values.demo1 && demos.push(values.demo1);
                    values.demo2 && demos.push(values.demo2);
                    values.demo3 && demos.push(values.demo3);

                    const creatorData: CreatorData = {
                      userName: values.userName,
                      bio: values.bio,
                      twitterHandle: userProfileDB?.twitterHandle || userProfile.twitterHandle || values.userName,
                      deliveryTime: parseInt(values.deliveryTime),
                      demos: demos,
                      price: parseFloat(values.price),
                      profilePicture: values.profilePicture,
                      lensHandle: config.lens.getHandleToSearch(values.lensHandle),
                      businessPrice: isBusiness ? values.businessPrice : 0,
                      customServices: customServicesData.map((it: any) => {
                        return JSON.stringify({
                          description: it.description,
                          time: it.time,
                          price: it.price,
                        });
                      }),
                    };
                    hasAccount ? await updateUserProfile(creatorData) : await createUserProfile(creatorData);
                    setLoading(false);
                  }}
                  validate={async (values) => {
                    const errors: any = {};
                    const { bio, userName, profilePicture, deliveryTime, price, tweetUrl, address, lensHandle } = values;
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
                    //lens validation
                    if (createLens) {
                      const getProfileByHandleRes = await lens.getProfileByHandle(config.lens.getHandleToSearch(lensHandle == CREATE_LENS_TEXT ? userProfileDB?.twitterHandle || userProfile.twitterHandle || values.userName : lensHandle))
                      console.log(getProfileByHandleRes)
                      if (!getProfileByHandleRes.data) {
                        errors.lensHandle = 'Unable to validate handle'
                      }
                      if (getProfileByHandleRes.error) {
                        errors.lensHandle = getProfileByHandleRes.error.message 
                        return errors;
                      }
                      if (getProfileByHandleRes.data.profiles.items.length > 0) {
                        errors.lensHandle = 'profile handle taken'
                        setShowLensDialog(true)
                        return errors;
                      }
                    }
                    return errors;
                  }}
                  validateOnBlur={false}
                  validateOnChange={false}
                >
                  {({ handleChange, handleBlur, handleSubmit, values, errors, touched, validateForm }) => {
                    return (
                      <>
                        <OverlayContainer>
                          {showLensDialog && <ModalDialog
                            containerStyles={{
                              border: '1px solid #b3b3b3',
                              padding: '24px',
                            }}
                            isOpen
                            onClose={() => setShowLensDialog(false)}
                            isDismissable
                          >
                            <div style={{ marginBottom: 48 }}>
                              <TextField
                                label="Lens Handle"
                                description="Your lens handle is taken, select another one."
                                placeholder={userProfile.lensHandle}
                                value={userProfile.lensHandle}
                                errorMessage={errors.lensHandle}
                                onChange={handleChange('lensHandle')}
                              />
                              <PrimaryButton
                                style={{ marginBottom: '16px' }}
                                onPress={async () => {
                                  setLoading(true);
                                  const errors = await validateForm();
                                  if (Object.keys(errors).length != 0) {
                                    console.error(errors)
                                    toast.error('Please fix the errors.');
                                  } else {
                                    setShowLensDialog(false)
                                    handleSubmit();
                                  }
                                  setLoading(false);
                                }}
                                
                                isDisabled={loading}
                              >
                                {hasAccount ? 'Update profile' : 'Set up profile'}
                              </PrimaryButton>
                            </div>
                          </ModalDialog>}
                        </OverlayContainer>
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

                        <div style={{ marginBottom: 24 }}>
                          <TextField
                            onChange={handleChange('price')}
                            label="Minimum amount to charge for bookings"
                            description={`Fans will be able to pay this in ${config.chainSymbol}`}
                            placeholder="0.5"
                            value={values.price}
                            type="number"
                            endText={config.chainSymbol}
                            onBlur={handleBlur}
                            errorMessage={errors.price}
                          />
                          <FeeDescription />
                        </div>
                        <div style={{ marginBottom: 12 }}>
                          {lensProfiles && lensProfiles.length > 0 && <Dropdown
                            formLabel="Connect Lens Profile"
                            onChange={async (e) => {
                              if (e.target.value === CREATE_LENS_TEXT) {
                                setCreateLens(true)
                              } else {
                                setCreateLens(false)
                              }
                              handleChange('lensHandle')(e);
                            }}
                            name="lens"
                          >
                            {/* Creates an array of existing lens profiles and gives user to create a new lens profile */}
                            {[
                              // { id: '', handle: '' },
                              // { id: '', handle: CREATE_LENS_TEXT }, //uncomment to have some shitty create a lens profile code that doesn't work now
                              ...(lensProfiles || []),
                            ].map(({ id, handle }, i) => {
                              if ((userProfileDB?.lensHandle || userProfile.lensHandle) === handle) {
                                return <Option key={i} selected value={handle} />;
                              }
                              return <Option key={i} value={handle} label={handle} />;
                            })}
                          </Dropdown>}
                        </div>

                        <div style={{ marginBottom: 24 }}>
                          <TextField
                            onChange={handleChange('businessPrice')}
                            label="Minimum amount to charge for business bookings"
                            description={`Fans will be able to pay this in ${config.chainSymbol}`}
                            placeholder="0.5"
                            value={values.businessPrice.toString()}
                            type="number"
                            endText={config.chainSymbol}
                            onBlur={handleBlur}
                            errorMessage={errors.businessPrice}
                          />
                          <FeeDescription />
                        </div>

                        <div style={{ marginBottom: 48, display: 'flex', alignItems: 'center' }}>
                          <Toggle
                            defaultChecked={isBusiness}
                            icons={false}
                            onChange={(e: any) => setIsBusiness(e.target.checked)}
                          />
                          <span style={{ paddingLeft: '10px' }}>Open to receive booking requests</span>
                        </div>

                        <div style={{ fontWeight: 'bold' }}>Custom Services</div>
                        <Description style={{ marginTop: 7 }}>
                          Add in custom services (Service + Time+ Price)
                        </Description>
                        <div style={{ marginBottom: 48 }}>
                          {customServicesData.map((elm: any, index: any) => (
                            <div style={{ display: 'flex' }} key={index}>
                              <TextField
                                placeholder={elm.placeholderDesc}
                                inputStyles={{ width: 265, marginRight: 15 }}
                                value={elm.description || ''}
                                onChange={(e) => handleChangeCustomForm(index, 'description', e)}
                              />
                              <TextField
                                placeholder={elm.placeHolderTime}
                                inputStyles={{ width: 145, marginRight: 15 }}
                                value={elm.time || ''}
                                onChange={(e) => handleChangeCustomForm(index, 'time', e)}
                              />
                              <TextField
                                endText="MATIC"
                                type="number"
                                inputStyles={{ width: 220 }}
                                value={index === 0 && values.businessPrice ? values.businessPrice : elm.price}
                                onChange={(e) => handleChangeCustomForm(index, 'price', e)}
                              />
                              {index ? (
                                <div
                                  style={{
                                    marginTop: 25,
                                    marginLeft: 20,
                                    color: 'rgba(179, 179, 179, 1)',
                                    fontWeight: 'normal',
                                  }}
                                >
                                  <BsX
                                    size={30}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => removeFormFields(index)}
                                  />
                                </div>
                              ) : (
                                ''
                              )}
                            </div>
                          ))}
                          <div style={{ marginTop: 15 }}>
                            <a
                              onClick={() => addFormFields()}
                              target="_blank"
                              style={{
                                color: '#EDE641',
                                textDecoration: 'underline',
                                cursor: 'pointer',
                              }}
                            >
                              + Add
                            </a>{' '}
                          </div>
                        </div>

                        <div style={{ marginBottom: 12 }}>
                          <TextField
                            onChange={handleChange('demo1')}
                            label="Tweets"
                            aria-label="demo1"
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
                            aria-label="demo2"
                            placeholder="Demo tweet video link 2"
                            value={values.demo2}
                            onBlur={handleBlur}
                            errorMessage={errors.demo2}
                          />
                        </div>
                        <div style={{ marginBottom: 12 }}>
                          <TextField
                            onChange={handleChange('demo3')}
                            aria-label="demo3"
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
                            console.log(errors)
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


