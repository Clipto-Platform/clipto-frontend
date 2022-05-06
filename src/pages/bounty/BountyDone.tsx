import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import styled, { useTheme } from 'styled-components';
import { XAvatarOrb } from '../../components/AvatarOrb';
import { PrimaryButton } from '../../components/Button';
import { HeaderSpacer } from '../../components/Header/Header';
import SuccessIcon from '../../components/icons/SuccessIcon';
import TwitterIcon from '../../components/icons/TwitterIcon';
import { CenterContainer, PageContentWrapper, PageWrapper } from '../../components/layout/Common';
import { useProfile } from '../../hooks/useProfile';
import { Description, Label } from '../../styles/typography';
import { colors } from '../../styles/theme';

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

const BountyDone = (props: any) => {
  const theme = useTheme();
  const userProfile = useProfile();
  const { account } = useWeb3React<Web3Provider>();
  return (
    <>
      <PageWrapper>
        <HeaderSpacer />
        <PageContentWrapper>
          <CenterContainer style={{ textAlign: 'center', maxWidth: 700 }}>
            <SuccessIcon />
            <OnboardTitle style={{ marginTop: '14px' }}>Success</OnboardTitle>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <XAvatarOrb />
              <hr style={{ width: '30%', marginLeft: '20px' }} />
              <div style={{ marginRight: '20px', marginLeft: -8 }}>{'>'}</div>
              <XAvatarOrb />
            </div>
            <br />
            <br />
            {/* TODO(jonathanng) - add names below XAvatorOrb */}
            <Label as={'label'} style={{ marginTop: '14px' }}>
              Your bounty request has been posted!
            </Label>
            <Description style={{ marginTop: '14px' }}>
              Share and invite the creator to complete your request
            </Description>
            <br />
            <PrimaryButton
              style={{
                backgroundColor: theme.twitterBlue,
                color: 'white',
                marginTop: '30px',
                marginBottom: '20px',
              }}
            >
              <TwitterIcon />
              Share on Twitter
            </PrimaryButton>
            <PrimaryButton
              style={{
                borderWidth: 1,
                color: colors.yellow,
                borderColor: colors.yellow,
              }}
              variant="secondary"
            >
              Copy Shareable Link
            </PrimaryButton>
          </CenterContainer>
        </PageContentWrapper>
      </PageWrapper>
    </>
  );
};

export { BountyDone };
