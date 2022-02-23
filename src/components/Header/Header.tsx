import { Web3Provider } from '@ethersproject/providers';
import { OverlayContainer, OverlayProvider } from '@react-aria/overlays';
import { useWeb3React } from '@web3-react/core';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import create, { State } from 'zustand';
import menu from '../../assets/svgs/hamburger.svg';
import { API_URL, CHAIN_NAMES, DEFAULT_CHAIN_ID, DEV, DISCORD_LINK } from '../../config/config';
import { useEagerConnect } from '../../hooks/useEagerConnect';
import { useEns } from '../../hooks/useEns';
import { useInactiveListener } from '../../hooks/useInactiveListener';
import { UserProfile } from '../../hooks/useProfile';
import { Label } from '../../styles/typography';
import { getShortenedAddress } from '../../utils/address';
import { immer } from '../../utils/zustand';
import { injected, walletconnect } from '../../web3/connectors';
import { AvatarComponent } from '../AvatarOrb';
import { PrimaryButton } from '../Button';
import { DropDown, ModalDialog } from '../Dialog';
import {
  ChainContainer,
  ConnectWallet,
  ConnectWalletPopup,
  DesktopHeaderWrapper,
  Divider,
  DropDownItem,
  HeaderWrapperInner,
  HeaderWrapperOuter,
  HEADER_HEIGHT_IN_PX,
  LeftWrapper,
  MenuButton,
  MenuContainer,
  MobileHeaderWrapper,
  RightWrapper,
  StyledSpan,
  Wrapper,
  Error,
} from './Style';
import { Logo } from '../Logo';

interface HeaderStore extends State {
  showProfileDropDown: boolean;
  showDialog: boolean;
  hasTriedEagerConnecting: boolean;
  setShowProfileDropDown: (show: boolean) => void;
  setShowDialog: (show: boolean) => void;
  setHasTriedEagerConnecting: (hasEagerConnected: boolean) => void;
}

const useHeaderStore = create<HeaderStore>(
  immer((set) => ({
    showProfileDropDown: false,
    showDialog: false,
    hasTriedEagerConnecting: false,
    setShowProfileDropDown: (show: boolean) => {
      set((draft) => {
        draft.showProfileDropDown = show;
      });
    },
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

const DesktopHeader = (props: any) => {
  const { loggedInProfile } = props;
  return (
    <DesktopHeaderWrapper>
      <Link to={'/explore'}>
        <StyledSpan style={{ marginRight: 40 }}>Explore</StyledSpan>
      </Link>
      <Link to={'/orders'}>
        <StyledSpan style={{ marginRight: 40 }}>Orders</StyledSpan>
      </Link>
      {!loggedInProfile && (
        <Link to={'/onboarding'}>
          <StyledSpan style={{ marginRight: 40, width: 140 }}>Become a creator</StyledSpan>
        </Link>
      )}
      <PrimaryButton
        size="small"
        width="small"
        style={{ marginRight: 40, maxWidth: 150, background: '#5865F2', color: 'white' }}
        onPress={() => {
          window.open(DISCORD_LINK);
        }}
      >
        Join Discord <HiOutlineArrowRight style={{ marginLeft: 5 }} />
      </PrimaryButton>
    </DesktopHeaderWrapper>
  );
};
const MobileHeader = (props: any) => {
  const { loggedInProfile } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const handleClick = () => {
    setVisible(!visible);
  };
  return (
    <>
      <MenuContainer>
        <MenuButton onClick={handleClick}>
          <img src={menu} alt="menu" />
        </MenuButton>
      </MenuContainer>

      {visible ? (
        <Wrapper onClick={handleClick}>
          <MobileHeaderWrapper>
            <Link to={'/explore'} onClick={handleClick}>
              <StyledSpan>Explore</StyledSpan>
            </Link>
            <Link to={'/orders'} onClick={handleClick}>
              <StyledSpan>Orders</StyledSpan>
            </Link>
            {!loggedInProfile && (
              <Link to={'/onboarding'} onClick={handleClick}>
                <StyledSpan>Become a creator</StyledSpan>
              </Link>
            )}
            <PrimaryButton
              size="small"
              width="small"
              style={{ maxWidth: 150, background: '#5865F2', color: 'white' }}
              onPress={() => {
                window.open(DISCORD_LINK);
                handleClick();
              }}
            >
              Join Discord <HiOutlineArrowRight style={{ marginLeft: 5 }} />
            </PrimaryButton>
          </MobileHeaderWrapper>
        </Wrapper>
      ) : null}
    </>
  );
};
const Header: React.FC<HeaderProps> = () => {
  const [checkLogin, setCheckLogin] = useState<boolean | null>(false);
  const { activate, account, deactivate, chainId } = useWeb3React<Web3Provider>();
  const [chainDialog, setChainDialog] = useState<boolean | null>(false);
  const currentChainName = CHAIN_NAMES[DEFAULT_CHAIN_ID];

  const showLoginDialog = useHeaderStore((s) => s.showDialog);
  const setShowLoginDialog = useHeaderStore((s) => s.setShowDialog);
  const setHasTriedEagerConnecting = useHeaderStore((s) => s.setHasTriedEagerConnecting);

  const showProfileDropDown = useHeaderStore((s) => s.showProfileDropDown);
  const setShowProfileDropDown = useHeaderStore((s) => s.setShowProfileDropDown);
  const dropDropRef = React.useRef<HTMLDivElement>(null);

  const userEnsName = useEns();

  const hasTriedEagerConnect = useEagerConnect();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loggedInProfile, setLoggedInProfile] = useState<Partial<UserProfile> | null>();

  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    setHasTriedEagerConnecting(hasTriedEagerConnect);
  }, [hasTriedEagerConnect, setHasTriedEagerConnecting]);

  const [currentlyActivating, setCurrentlyActivating] = useState<'metamask' | 'wc' | undefined>(undefined);

  const activeWithMetamask = useCallback(async () => {
    setErrorMessage(null);
    setCurrentlyActivating('metamask');
    try {
      await activate(injected, undefined, true);
      setCheckLogin(true);
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
      if (walletconnect instanceof WalletConnectConnector) {
        walletconnect.walletConnectProvider = undefined;
      }
      await activate(walletconnect, undefined, true);
      setCheckLogin(true);
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
    setShowProfileDropDown(false);
    dispatch({ type: 'logout', payload: { user: null } });
    setCheckLogin(false);
    navigate('/');
  }, [deactivate]);

  useInactiveListener(!hasTriedEagerConnect);

  useEffect(() => {
    const getCreatorData = async () => {
      if (account) {
        if (user && user === account) {
          setCheckLogin(true);
        } else if (user && user !== account) {
          dispatch({ type: 'login', payload: { user: account } });
        }
        let userProfile;
        try {
          userProfile = await axios.get(`${API_URL}/user/${account}`);
          setLoggedInProfile(userProfile.data);
        } catch (e) {
          console.log('Failed to find creator account for userProfile');
          setLoggedInProfile(null);
        }
      }
    };
    getCreatorData();
  }, [account]);

  useEffect(() => {
    if (checkLogin && account) {
      dispatch({ type: 'login', payload: { user: account } });
    }
  }, [checkLogin]);

  useEffect(() => {
    if (chainId !== DEFAULT_CHAIN_ID) {
      setChainDialog(true);
    } else if (chainId) {
      setChainDialog(false);
    }
  }, [chainId]);

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
              {!checkLogin && (
                <RightWrapper>
                  <PrimaryButton size={'small'} variant={'secondary'} onPress={() => setShowLoginDialog(true)}>
                    Connect Wallet
                  </PrimaryButton>
                </RightWrapper>
              )}
              {checkLogin && account && (
                <RightWrapper>
                  <DesktopHeader loggedInProfile={loggedInProfile} />
                  {!loggedInProfile && (
                    <RightWrapper
                      ref={dropDropRef}
                      onClick={() => {
                        setShowProfileDropDown(true);
                      }}
                      style={{ position: 'relative' }}
                    >
                      <StyledSpan style={{ marginRight: 16 }}>
                        {userEnsName ?? getShortenedAddress(account, 6, 4)}
                      </StyledSpan>
                      <AvatarComponent address={account} />
                      {showProfileDropDown && (
                        <OverlayProvider>
                          <DropDown
                            triggerRef={dropDropRef}
                            containerStyles={{}}
                            isOpen={showProfileDropDown}
                            onClose={() => setShowProfileDropDown(false)}
                            isDismissable
                          >
                            <DropDownItem
                              onClick={(e) => {
                                e.stopPropagation();
                                logoutUser();
                              }}
                            >
                              Logout
                            </DropDownItem>
                          </DropDown>
                        </OverlayProvider>
                      )}
                    </RightWrapper>
                  )}
                  {loggedInProfile && (
                    <RightWrapper
                      ref={dropDropRef}
                      onClick={() => {
                        setShowProfileDropDown(true);
                      }}
                      style={{ position: 'relative' }}
                    >
                      <StyledSpan style={{ marginRight: 16 }}>
                        {userEnsName ?? getShortenedAddress(account, 6, 4)}
                      </StyledSpan>
                      <AvatarComponent address={account} url={loggedInProfile?.profilePicture} />
                      {showProfileDropDown && (
                        <OverlayProvider>
                          <DropDown
                            triggerRef={dropDropRef}
                            containerStyles={{right:'0'}}
                            isOpen={showProfileDropDown}
                            onClose={() => setShowProfileDropDown(false)}
                            isDismissable
                          >
                            <Link to={'onboarding/profile'}  
                                onClick={(e) => {
                                e.stopPropagation();
                                setShowProfileDropDown(false);
                              }}
                              >
                              <DropDownItem>Settings</DropDownItem>
                            </Link>
                            <Divider />
                            <DropDownItem
                              onClick={(e) => {
                                e.stopPropagation();
                                logoutUser();
                              }}
                            >
                              Log out
                            </DropDownItem>
                          </DropDown>
                        </OverlayProvider>
                      )}
                    </RightWrapper>
                  )}
                  <MobileHeader loggedInProfile={loggedInProfile} />
                </RightWrapper>
              )}
            </>
          )}
        </HeaderWrapperInner>
      </HeaderWrapperOuter>

      {showLoginDialog && (
        <OverlayContainer>
          <ModalDialog
            containerStyles={{
              border: '1px solid #b3b3b3',
              padding: '24px',
            }}
            isOpen
            onClose={() => setShowLoginDialog(false)}
            isDismissable
          >
            <>
              <ConnectWallet>Connect a wallet</ConnectWallet>
              {errorMessage && <Error>{errorMessage}</Error>}

              <PrimaryButton
                variant={'secondary'}
                style={{ marginBottom: 16, minWidth: 310 }}
                isDisabled={currentlyActivating === 'metamask' && user}
                onPress={() => activeWithMetamask()}
              >
                <ConnectWalletPopup>
                  {currentlyActivating === 'metamask' ? <>{'Confirm in your wallet'}</> : 'Continue with Metamask'}
                </ConnectWalletPopup>
              </PrimaryButton>

              <PrimaryButton
                variant={'secondary'}
                style={{ marginBottom: 16, minWidth: 310 }}
                isDisabled={currentlyActivating === 'wc' && user}
                onPress={() => activeWithWalletConnect()}
              >
                <ConnectWalletPopup>
                  {currentlyActivating === 'wc' ? <>{'Confirm in your wallet'}</> : 'Continue with mobile wallet'}
                </ConnectWalletPopup>
              </PrimaryButton>
            </>
          </ModalDialog>
        </OverlayContainer>
      )}

      {checkLogin && chainDialog && (
        <>
          <ChainContainer>
            {`Please change your network chain to ${currentChainName}(${DEFAULT_CHAIN_ID}) in your metamask`}
          </ChainContainer>
        </>
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
