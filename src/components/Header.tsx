import { Web3Provider } from '@ethersproject/providers';
import { OverlayContainer, OverlayProvider } from '@react-aria/overlays';
import { useWeb3React } from '@web3-react/core';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import create, { State } from 'zustand';
import { API_URL, CHAIN_NAMES, DEFAULT_CHAIN_ID, DEV, DISCORD_LINK } from '../config/config';
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
import { AvatarComponent } from './AvatarOrb';
import { PrimaryButton } from './Button';
import { DropDown, ModalDialog } from './Dialog';
import { Logo } from './Logo';
import { useSelector, useDispatch } from 'react-redux';
// import { MetamaskIcon } from './icons/MetamaskIcon';
// import { WalletConnectIcon } from './icons/WalletConnectIcon';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import menu from '../assets/svgs/hamburger.svg';
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

const ChainContainer = styled.div`
  position: relative;
  z-index: 0;
  align-items: center;
  text-align: center;
  width: 100%;
  padding: 10px;
  margin-top: ${HEADER_HEIGHT_IN_PX};
  background: ${(props) => props.theme.yellow};
  color: black;
  font-weight: bold;

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

const DropDownItem = styled.div`
  display: block;
  width: 100%;
  padding: 10px 60px 10px 30px;
  color: #888f96;
  font-weight: bold;
  :hover {
    color: #ffffff;
  }
`;

const Divider = styled.hr`
  border: 1px solid #121212;
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

const ConnectWallet = styled.div`
  margin-bottom: 16;
  font-weight: 700;
  font-size: 18;
  text-align: 'left';
`;

const Error = styled.div`
  margin-bottom: 12;
  color: #ff6868;
  text-align: left;
  padding: 10px;
`;

const ConnectWalletPopup = styled.div`
  display: flex;
  vertical-align: middle;
`;

const DesktopHeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  @media screen and (max-width: 600px){
    display:none;
  }
`;

const MobileHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction:column;
  align-items: initial;
  position: absolute;
  right: 0px;
  top: 50px;
  z-index: 100;
  background-color: rgba(0,0,0);
  border: 1px solid #504d4d;
  border-radius: 10px;
  width: auto;
  padding:40px 20px;
  box-sizing:border-box;
  &  ${StyledSpan}{
    margin-bottom:20px;
    border
   }

  @media screen and (min-width: 600px){
    display:none;
  }
`;

const MenuContainer = styled.span`
  padding:5px 0px 0px 5px;
  @media screen and (min-width: 600px){
    display:none;
  }
`;
const MenuButton = styled.button`
  background: none;
  border: none;
`;
const Wrapper = styled.div`
  position: absolute;
  z-index:99;
  top:0;
  width:100vw;
  height:100vh;
`;

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

const DesktopHeader = (props:any) => {
  const {loggedInProfile} = props;
  return(
    <DesktopHeaderWrapper>
      <Link to={'/explore'} >
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
  )
}
const MobileHeader = (props:any) => {
  const {loggedInProfile} = props;
  const [visible,setVisible]  = useState<boolean>(false);
  const handleClick = () =>{
    setVisible(!visible);
  }
  return(
    <>
    
    <MenuContainer>
     <MenuButton onClick={handleClick}><img src={menu} alt='menu'/></MenuButton>
    </MenuContainer>
    
    {visible?(
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
    </Wrapper>):null}
   
    </>
  )
};
const Header: React.FC<HeaderProps> = () => {
  const exchangeContract = useExchangeContract(true);
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
        walletconnect.walletConnectProvider = undefined 
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
                  <DesktopHeader loggedInProfile={loggedInProfile}/>
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
                            containerStyles={{}}
                            isOpen={showProfileDropDown}
                            onClose={() => setShowProfileDropDown(false)}
                            isDismissable
                          >
                            <Link to={'onboarding/profile'}>
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
                  <MobileHeader loggedInProfile={loggedInProfile}/>
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
