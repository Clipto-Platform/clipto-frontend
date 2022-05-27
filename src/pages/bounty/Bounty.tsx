import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { getTwitterData } from '../../api';
import { PrimaryButton } from '../../components/Button';
import { Dropdown, Option } from '../../components/Dropdown/Dropdown';
import { HeaderSpacer } from '../../components/Header/Header';
import { CenterContainer, ContentWrapper, PageContentWrapper, PageWrapper } from '../../components/layout/Common';
import { TextField } from '../../components/TextField';
import config from '../../config/config';
import { useProfile } from '../../hooks/useProfile';
import { validateBountyData } from '../../utils/validation';
import { BountyConfirmation } from './BountyConfirmation';

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

const FieldWrapper = styled.div`
  margin-bottom: 26px;
`;
export interface errorMessage {
  creator?: string;
  title?: string;
  instructions?: string;
  requestDue?: string;
  offerAmount?: string;
  recipientWallet?: string;
}

const BountyPage = () => {
  const theme = useTheme();
  const userProfile = useProfile();
  const { account } = useWeb3React<Web3Provider>();
  const [creator, setCreator] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [instructions, setIntructions] = useState<string>('');
  const [requestDue, setRequestDue] = useState('');
  const [offerAmount, setOfferAmount] = useState('');
  const [recipientWallet, setRecipientWallet] = useState<string>('');
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<errorMessage>({});
  const [token, setToken] = useState<string>('USDC');
  const [isTwitterAccount, setIsTwitterAccount] = useState<boolean>(false);
  const [isLoader, setIsLoader] = useState<boolean>(false);

  const validateForm = () => {
    const error = validateBountyData({
      creator,
      instructions,
      requestDue,
      offerAmount,
      recipientWallet,
      confirmation,
      token,
      isTwitterAccount,
    });
    if (Object.keys(error).length > 0) {
      setErrorMessage({ ...error });
      setConfirmation(false);
    } else {
      setErrorMessage({});
      setConfirmation(true);
    }
  };

  useEffect(() => {
    setIsTwitterAccount(false);
    setErrorMessage((prevState) => ({ ...prevState, creator: '' }));
    let timer: any;
    if (creator.length) {
      setIsLoader(true);
      clearTimeout();
      timer = setTimeout(async () => {
        try {
          const twitterHandle = await getTwitterData([creator]);
          const isTwitterPrfile =
            !!twitterHandle && twitterHandle.data && twitterHandle.data.data && twitterHandle.data.data.length === 1;
          if (isTwitterPrfile) {
            setIsTwitterAccount(true);
            setErrorMessage((prevState) => ({ ...prevState, creator: '' }));
          } else {
            setIsTwitterAccount(false);
          }
        } catch (error) {
          setIsTwitterAccount(false);
          setErrorMessage((prevState) => ({ ...prevState, creator: 'Invalid twitter handle.' }));
        }
      }, 3000);
    } else {
      setErrorMessage((prevState) => ({ ...prevState, creator: '' }));
      setIsTwitterAccount(false);
      setIsLoader(false);
    }
    return () => clearTimeout(timer);
  }, [creator]);

  return (
    <>
      <PageWrapper>
        <HeaderSpacer />
        <PageContentWrapper>
          {confirmation ? (
            <ContentWrapper>
              <BountyConfirmation
                title={title}
                instructions={instructions}
                requestDue={requestDue}
                offerAmount={offerAmount}
                recipientWallet={recipientWallet}
                token={token}
              />
            </ContentWrapper>
          ) : (
            <ContentWrapper>
              <OnboardTitle>Post a Bounty</OnboardTitle>
              <CenterContainer>
                <FieldWrapper>
                  <TextField
                    onChange={(e) => {
                      setCreator(e);
                    }}
                    label="Who are you requesting this from?"
                    placeholder="Creator's Twitter handle"
                    errorMessage={errorMessage?.creator}
                    isSuccess={isTwitterAccount}
                    isLoader={isLoader && !isTwitterAccount && !errorMessage?.creator}
                  />
                </FieldWrapper>
                <FieldWrapper>
                  <TextField onChange={(e) => setTitle(e)} label="Title" placeholder="Optional" />
                </FieldWrapper>
                <FieldWrapper>
                  <TextField
                    onChange={(e) => setIntructions(e)}
                    label="Instructions"
                    inputElementType="textarea"
                    placeholder="Say something nice..."
                    errorMessage={errorMessage?.instructions}
                  />
                </FieldWrapper>
                <FieldWrapper>
                  <TextField
                    inputStyles={{
                      width: 220,
                    }}
                    type="date"
                    onChange={(e) => setRequestDue(e)}
                    label={`Request deadline (3 days minimum)`}
                    description={
                      "If your video isn't delivered by your requested deadline, you will receive an automatic refund."
                    }
                    errorMessage={errorMessage?.requestDue}
                  />
                </FieldWrapper>
                <FieldWrapper>
                  <Dropdown
                    name="bounty"
                    formLabel="Select payment type"
                    onChange={(e: any) => setToken(e.target.value)}
                  >
                    {config.erc20TokenNames.map((tok, i) => {
                      if (i == 0) {
                        <Option key={i} selected value={tok} />;
                      }
                      return <Option key={i} value={tok} />;
                    })}
                  </Dropdown>
                </FieldWrapper>
                <FieldWrapper>
                  <TextField
                    onChange={(e) => setOfferAmount(e)}
                    inputStyles={{
                      width: 247,
                    }}
                    label="Offer Amount"
                    description={'Increase your bid to get your video earlier'}
                    type="number"
                    placeholder="100+"
                    endText={token}
                    errorMessage={errorMessage?.offerAmount}
                  />
                </FieldWrapper>
                <FieldWrapper>
                  <TextField
                    onChange={(e) => setRecipientWallet(e)}
                    label="Recipient Address for video NFT"
                    placeholder="Wallet address"
                    errorMessage={errorMessage?.recipientWallet}
                  />
                </FieldWrapper>
                <PrimaryButton
                  style={{ marginBottom: '16px' }}
                  onPress={() => {
                    validateForm();
                  }}
                >
                  View Order Summary
                </PrimaryButton>
              </CenterContainer>
            </ContentWrapper>
          )}
        </PageContentWrapper>
      </PageWrapper>
    </>
  );
};

export { BountyPage };
