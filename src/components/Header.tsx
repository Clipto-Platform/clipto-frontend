import { Web3Provider } from '@ethersproject/providers';
import { OverlayContainer } from '@react-aria/overlays';
import { useWeb3React } from '@web3-react/core';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import create, { State } from 'zustand';

import { API_URL, DEV } from '../config/config';
import { useExchangeContract } from '../hooks/useContracts';
import { useEagerConnect } from '../hooks/useEagerConnect';
import { useEns } from '../hooks/useEns';
import { useInactiveListener } from '../hooks/useInactiveListener';
import { UserProfile } from '../hooks/useProfile';
import { MAX_CONTENT_WIDTH_PX } from '../styles/theme';
import { Label } from '../styles/typography';
import { getShortenedAddress } from '../utils/address';
import { immer } from '../utils/zustand';
import { injected, walletconnect } from '../web3/connectors';
import { AvatarComponent, AvatarOrb } from './AvatarOrb';
import { PrimaryButton } from './Button';
import { ModalDialog } from './Dialog';
import { Logo } from './Logo';
// import { MetamaskIcon } from './icons/MetamaskIcon';
// import { WalletConnectIcon } from './icons/WalletConnectIcon';

const MAX_HEADER_WIDTH_IN_PX = MAX_CONTENT_WIDTH_PX;

const HEADER_HEIGHT_IN_PX = '64px';

const HeaderWrapperOuter = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: ${HEADER_HEIGHT_IN_PX};
  max-height: ${HEADER_HEIGHT_IN_PX};
  min-height: ${HEADER_HEIGHT_IN_PX};
  background: ${(props) => props.theme.black};
  z-index: 100;

  padding: 0 32px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 0 16px;
  `}

  position: absolute;
  left: 0;
  right: 0;
`;

const HeaderWrapperInner = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  align-items: center;
  justify-content: space-between;
  max-width: ${MAX_HEADER_WIDTH_IN_PX};

  color: #ffffff;
  margin: 0 auto 0 auto;
`;

const LeftWrapper = styled.div`
  display: flex;
  text-decoration: inherit;
  justify-content: flex-start;
  align-items: center;
`;

const RightWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
`;

const StyledSpan = styled.span`
  display: block;
  text-decoration: none;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  color: #cccccc;
  transition: color 0.15s ease;
  :hover {
    color: #ffffff;
  }
`;

interface HeaderStore extends State {
  showDialog: boolean;
  hasTriedEagerConnecting: boolean;
  setShowDialog: (show: boolean) => void;
  setHasTriedEagerConnecting: (hasEagerConnected: boolean) => void;
}

const useHeaderStore = create<HeaderStore>(
  immer((set) => ({
    showDialog: false,
    hasTriedEagerConnecting: false,
    setShowDialog: (show: boolean) => {
      set((draft) => {
        draft.showDialog = show;
      });
    },
    setHasTriedEagerConnecting: (hasEagerConnected: boolean) => {
      set((draft) => {
        draft.hasTriedEagerConnecting = hasEagerConnected;
      });
    },
  })),
);

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const exchangeContract = useExchangeContract(true);
  const { activate, account, deactivate } = useWeb3React<Web3Provider>();

  const showLoginDialog = useHeaderStore((s) => s.showDialog);
  const setShowLoginDialog = useHeaderStore((s) => s.setShowDialog);
  const setHasTriedEagerConnecting = useHeaderStore((s) => s.setHasTriedEagerConnecting);

  const userEnsName = useEns();

  const hasTriedEagerConnect = useEagerConnect();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loggedInProfile, setLoggedInProfile] = useState<Partial<UserProfile>>();

  useEffect(() => {
    setHasTriedEagerConnecting(hasTriedEagerConnect);
  }, [hasTriedEagerConnect, setHasTriedEagerConnecting]);

  const [currentlyActivating, setCurrentlyActivating] = useState<'metamask' | 'wc' | undefined>(undefined);

  const activeWithMetamask = useCallback(async () => {
    setErrorMessage(null);
    setCurrentlyActivating('metamask');
    try {
      await activate(injected, undefined, true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(e.name);
      if (e.name === 'NoEthereumProviderError' || e.message?.includes('No Ethereum provider was found')) {
        setErrorMessage('No MetaMask detected.');
      } else if (
        e.message.includes('Already processing eth_requestAccounts') ||
        e.message.includes(`Request of type 'wallet_requestPermissions'`)
      ) {
        setErrorMessage('Check MetaMask for an existing login request');
      } else if (e.message.includes('The user rejected the request')) {
        setErrorMessage('The MetaMask login was closed, try connecting again');
      } else {
        setErrorMessage(e.message ?? 'Something went wrong logging in');
        console.log(e, Object.keys(e));
      }
      setCurrentlyActivating(undefined);
      return;
    }
    setShowLoginDialog(false);
    setTimeout(() => {
      setCurrentlyActivating(undefined);
    }, 1500);
  }, [activate, setShowLoginDialog]);

  const activeWithWalletConnect = useCallback(async () => {
    setErrorMessage(null);
    setCurrentlyActivating('wc');
    try {
      await activate(walletconnect, undefined, true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setCurrentlyActivating(undefined);
      setErrorMessage(e.message ?? 'Something went wrong logging in with WalletConnect');
      console.log(e);
      return;
    }
    setShowLoginDialog(false);
    setTimeout(() => {
      setCurrentlyActivating(undefined);
    }, 1500);
  }, [activate, setShowLoginDialog]);

  const logoutUser = useCallback(async () => {
    deactivate();
  }, [deactivate]);

  useInactiveListener(!hasTriedEagerConnect);

  useEffect(() => {
    const getCreatorData = async () => {
      if (account) {
        let userProfile;
        try {
          userProfile = await axios.get(`${API_URL}/user/${account}`);
          setLoggedInProfile(userProfile.data);
        } catch (e) {
          console.log('Failed to find creator account for userProfile');
        }
      }
    };
    getCreatorData();
  }, [account]);

  return (
    <>
      <HeaderWrapperOuter>
        <HeaderWrapperInner>
          <LeftWrapper>
            <Link to={'/'}>
              <Logo />
            </Link>
            {DEV && <Label>In DEV environment</Label>}
          </LeftWrapper>
          {hasTriedEagerConnect && (
            <>
              {!account && (
                <RightWrapper>
                  <PrimaryButton size={'small'} variant={'secondary'} onPress={() => setShowLoginDialog(true)}>
                    Connect Wallet
                  </PrimaryButton>
                </RightWrapper>
              )}
              {account && (
                <>
                  {loggedInProfile && (
                    <RightWrapper>
                      <Link to={'/explore'}>
                        <StyledSpan style={{ marginRight: 40 }}>Explore</StyledSpan>
                      </Link>
                      <Link to={'/orders'}>
                        <StyledSpan style={{ marginRight: 40 }}>Orders</StyledSpan>
                      </Link>
                      <RightWrapper onClick={logoutUser}>
                        <StyledSpan style={{ marginRight: 16 }}>
                          {userEnsName ?? getShortenedAddress(account, 6, 4)}
                        </StyledSpan>
                        <AvatarComponent address={account} url={loggedInProfile?.profilePicture} />
                      </RightWrapper>
                    </RightWrapper>
                  )}
                  {!loggedInProfile && (
                    <RightWrapper>
                      <Link to={'/explore'}>
                        <StyledSpan style={{ marginRight: 40 }}>Explore</StyledSpan>
                      </Link>
                      <Link to={'/orders'}>
                        <StyledSpan style={{ marginRight: 40 }}>Orders</StyledSpan>
                      </Link>
                      <Link to={'/onboarding'}>
                        <StyledSpan style={{ marginRight: 40 }}>Become a creator</StyledSpan>
                      </Link>
                      <RightWrapper onClick={logoutUser}>
                        <StyledSpan style={{ marginRight: 16 }}>
                          {userEnsName ?? getShortenedAddress(account, 6, 4)}
                        </StyledSpan>
                        <AvatarComponent address={account} />
                      </RightWrapper>
                    </RightWrapper>
                  )}
                </>
              )}
            </>
          )}
        </HeaderWrapperInner>
      </HeaderWrapperOuter>

      {showLoginDialog && (
        <OverlayContainer>
          <ModalDialog containerStyles={{}} isOpen onClose={() => setShowLoginDialog(false)} isDismissable>
            <>
              <div
                style={{
                  marginBottom: 16,
                  fontWeight: 700,
                  fontSize: 18,
                  textAlign: 'left',
                }}
              >
                Connect a wallet
              </div>
              {errorMessage && (
                <div style={{ marginBottom: 12, color: '#FF6868', textAlign: 'left' }}>{errorMessage}</div>
              )}

              <PrimaryButton
                variant={'secondary'}
                style={{ marginBottom: 16, minWidth: 310 }}
                isDisabled={currentlyActivating === 'metamask'}
                onPress={activeWithMetamask}
              >
                <div
                  style={{
                    display: 'flex',
                    verticalAlign: 'middle',
                  }}
                >
                  {currentlyActivating === 'metamask' ? <>{'Confirm in your wallet'}</> : 'Continue with Metamask'}
                </div>
              </PrimaryButton>

              <PrimaryButton
                variant={'secondary'}
                style={{ marginBottom: 16, minWidth: 310 }}
                isDisabled={currentlyActivating === 'wc'}
                onPress={activeWithWalletConnect}
              >
                <div
                  style={{
                    display: 'flex',
                    verticalAlign: 'middle',
                  }}
                >
                  {currentlyActivating === 'wc' ? <>{'Confirm in your wallet'}</> : 'Continue with mobile wallet'}
                </div>
              </PrimaryButton>
            </>
          </ModalDialog>
        </OverlayContainer>
      )}
    </>
  );
};

const HeaderSpacer = styled.div`
  height: ${HEADER_HEIGHT_IN_PX};
  width: 100%;
  min-height: ${HEADER_HEIGHT_IN_PX};
  max-height: ${HEADER_HEIGHT_IN_PX};
`;

const SPACE_BETWEEN_HEADER_AND_CONTENT_IN_PX = '88px';
const HeaderContentGapSpacer = styled.div`
  height: ${SPACE_BETWEEN_HEADER_AND_CONTENT_IN_PX};
  width: 100%;
  min-height: ${SPACE_BETWEEN_HEADER_AND_CONTENT_IN_PX};
  max-height: ${SPACE_BETWEEN_HEADER_AND_CONTENT_IN_PX};
`;

export { Header, HeaderContentGapSpacer, HeaderSpacer };
