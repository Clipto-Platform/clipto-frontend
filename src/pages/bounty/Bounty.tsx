import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { PrimaryButton } from '../../components/Button';
import { HeaderContentGapSpacer, HeaderSpacer } from '../../components/Header';
import { CenterContainer, ContentWrapper, PageContentWrapper, PageWrapper } from '../../components/layout/Common';
import { TextField } from '../../components/TextField';
import { useProfile } from '../../hooks/useProfile';
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
  const [confirmation, setConfirmation] = useState(false);

  return (
    <>
      <PageWrapper>
        <HeaderSpacer />
        <HeaderContentGapSpacer />
        <PageContentWrapper>
          {confirmation ? (
            <ContentWrapper>
              <BountyConfirmation
                title={title}
                instructions={instructions}
                requestDue={requestDue}
                offerAmount={offerAmount}
                recipientWallet={recipientWallet}
              />
            </ContentWrapper>
          ) : (
            <ContentWrapper>
              <OnboardTitle>Post a Bounty</OnboardTitle>
              <CenterContainer>
                <FieldWrapper>
                  <TextField
                    onChange={(e) => setCreator(e)}
                    label="Who are you requesting this from?"
                    placeholder="Creator's Twitter handle"
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
                  />
                </FieldWrapper>
                <FieldWrapper>
                  <TextField
                    //TODO(jonathanng) - Date select or some query to verify date input
                    onChange={(e) => setRequestDue(e)}
                    label="Request deadline (3 days minimum)"
                    description="If your video isn't delivered by your requested deadline, you will receive an automatic refund."
                    placeholder={`${new Date().toLocaleString('default', { month: 'long' })} ${
                      new Date().getDate() + 3
                    }, ${new Date().getFullYear()}`}
                  />
                </FieldWrapper>
                <FieldWrapper>
                  {/* TODO(johnrjj) - Add label to input right (e.g. 'USDC') */}
                  <TextField
                    onChange={(e) => setOfferAmount(e)}
                    inputStyles={{
                      width: 172,
                    }}
                    label="Offer Amount"
                    description={'Increase your bid to get your video earlier'}
                    inputMode="numeric"
                    placeholder="100+"
                  />
                </FieldWrapper>
                <FieldWrapper>
                  <TextField
                    onChange={(e) => setRecipientWallet(e)}
                    label="Recipient Address for video NFT"
                    placeholder="Wallet address"
                  />
                </FieldWrapper>
                <PrimaryButton
                  style={{ marginBottom: '16px' }}
                  onPress={() => {
                    //TODO(jonathanng) - input validation
                    setConfirmation(true);
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
