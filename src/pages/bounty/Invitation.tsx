import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import styled, { useTheme } from 'styled-components';
import { PrimaryButton } from '../../components/Button';
import { HeaderSpacer } from '../../components/Header/Header';
import TwitterIcon from '../../components/icons/TwitterIcon';
import { CenterContainer, PageContentWrapper, PageWrapper } from '../../components/layout/Common';
import { useProfile } from '../../hooks/useProfile';
import { colors } from '../../styles/theme';
import { Description } from '../../styles/typography';

// TODO(johnrjj) - Consolidate final typography into stylesheet
const OnboardTitle = styled.h1`
  font-family: 'Scto Grotesk A';
  font-weight: normal;
  text-align: center;
  font-size: 32px;
  line-height: 140%;
  font-style: normal;
  font-weight: bold;
  max-width: 700px;
  display: block;
  margin: auto;
  margin-bottom: 30px;
`;

const InvitationPage = (props: any) => {
  const theme = useTheme();
  const userProfile = useProfile();
  const { account } = useWeb3React<Web3Provider>();
  return (
    <>
      <PageWrapper>
        <HeaderSpacer />
        <HeaderSpacer />
        <PageContentWrapper>
          {/* TODO(jonathanng) - fix spacing to better match figma */}
          {/* paddingTop will probably need to change depending on what containers it is put in */}
          <CenterContainer style={{ textAlign: 'center', maxWidth: 1000 }}>
            <OnboardTitle style={{ marginTop: '14px' }}>You have been invited to create a video NFT</OnboardTitle>
            {/* TODO(jonathanng) - add names below XAvatorOrb */}
            <Description style={{ marginTop: '50px', color: colors.white }}>
              Post a public tweet that contains your wallet address.
            </Description>
            <PrimaryButton
              style={{
                backgroundColor: theme.twitterBlue,
                color: 'white',
                margin: '60px auto 0px', //top left/right bot
              }}
            >
              <TwitterIcon />
              Post a Tweet
            </PrimaryButton>
          </CenterContainer>
        </PageContentWrapper>
      </PageWrapper>
    </>
  );
};

export { InvitationPage };
