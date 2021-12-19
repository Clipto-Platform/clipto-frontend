import { Web3Provider } from '@ethersproject/providers';
import { useButton } from '@react-aria/button';
import { OverlayContainer } from '@react-aria/overlays';
import { useOverlayTriggerState } from '@react-stately/overlays';
import { useWeb3React } from '@web3-react/core';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import create, { State } from 'zustand';

import { useEagerConnect } from '../hooks/useEagerConnect';
import { useEns } from '../hooks/useEns';
import { useInactiveListener } from '../hooks/useInactiveListener';
import { MAX_CONTENT_WIDTH_PX } from '../styles/theme';
import { getShortenedAddress } from '../utils/address';
import { immer } from '../utils/zustand';
import { injected, walletconnect } from '../web3/connectors';
import { ModalDialog } from './Dialog';
// import { MetamaskIcon } from '../svgs/MetamaskIcon';
// import { WalletConnectIcon } from '../svgs/WalletConnectIcon';
// import { WalletSelectButton } from '../WalletButton';

const MAX_HEADER_WIDTH_IN_PX = MAX_CONTENT_WIDTH_PX;

const HEADER_HEIGHT_IN_PX = '14px';

const HeaderWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  margin-top: 32px;
  max-width: ${MAX_HEADER_WIDTH_IN_PX};
  padding: 0 32px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 0 16px;
  `}
  color: #ffffff;
  margin: 32px auto 0 auto;
  height: ${HEADER_HEIGHT_IN_PX};
  max-height: ${HEADER_HEIGHT_IN_PX};
  min-height: ${HEADER_HEIGHT_IN_PX};
  z-index: 100;

  position: absolute;
  display: flex;
  flex: 1;
  left: 0;
  right: 0;
`;

const LeftWrapper = styled.a`
  display: flex;
  text-decoration: inherit;
  justify-content: flex-start;
  align-items: center;
  width: 180px;
`;

const CenterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 180px;
`;

const StyledSpan = styled.span`
  display: block;
  text-decoration: none;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  color: #ffffff;
  cursor: pointer;
`;

interface HeaderStore extends State {
  showDialog: boolean;
  hasTriedEagerConnecting: boolean;
  setShowDialog: (show: boolean) => void;
  setHasTriedEagerConnecting: (hasEagerConnected: boolean) => void;
}

const useHeaderStore = create<HeaderStore>(
  immer((set, _get) => ({
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
  const { activate, chainId, error, account, deactivate, library } = useWeb3React<Web3Provider>();

  const showLoginDialog = useHeaderStore((s) => s.showDialog);
  const setShowLoginDialog = useHeaderStore((s) => s.setShowDialog);
  const setHasTriedEagerConnecting = useHeaderStore((s) => s.setHasTriedEagerConnecting);

  const state = useOverlayTriggerState({
    isOpen: showLoginDialog,
  });
  const openButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement | null>(null);

  // useButton ensures that focus management is handled correctly,
  // across all browsers. Focus is restored to the button once the
  // dialog closes.
  const { buttonProps: openButtonProps } = useButton(
    {
      onPress: () => setShowLoginDialog(true),
    },
    openButtonRef,
  );

  const { buttonProps: closeButtonProps } = useButton(
    {
      onPress: () => setShowLoginDialog(false),
    },
    closeButtonRef,
  );

  const userEnsName = useEns();

  const hasTriedEagerConnect = useEagerConnect();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setHasTriedEagerConnecting(hasTriedEagerConnect);
  }, [hasTriedEagerConnect, setHasTriedEagerConnecting]);

  const [currentlyActivating, setCurrentlyActivating] = useState<'metamask' | 'wc' | undefined>(undefined);

  const activeWithMetamask = useCallback(async () => {
    setErrorMessage(null);
    setCurrentlyActivating('metamask');
    try {
      await activate(injected, undefined, true);
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

  return (
    <>
      <HeaderWrapper>
        {/* Wrap in react-router link */}
        <LeftWrapper>
          <span style={{ marginLeft: 12 }}>Clipto</span>
        </LeftWrapper>
        <CenterWrapper></CenterWrapper>
        <RightWrapper>
          {!account && (
            <button {...openButtonProps} ref={openButtonRef}>
              {'Connect Wallet'}
            </button>
          )}
          {account && <StyledSpan onClick={logoutUser}>{userEnsName ?? getShortenedAddress(account, 6, 4)}</StyledSpan>}
        </RightWrapper>
      </HeaderWrapper>

      {showLoginDialog && (
        <OverlayContainer>
          <ModalDialog containerStyles={{}} isOpen onClose={() => setShowLoginDialog(false)} isDismissable>
            <>
              <div
                style={{
                  marginBottom: 16,
                  textAlign: 'left',
                  color: '#888F96',
                  fontWeight: 'bold',
                }}
              >
                Connect a wallet
              </div>
              {errorMessage && (
                <div style={{ marginBottom: 12, color: '#FF6868', textAlign: 'left' }}>{errorMessage}</div>
              )}

              <button
                style={{ marginBottom: 16, minWidth: 310 }}
                disabled={currentlyActivating === 'metamask'}
                onClick={activeWithMetamask}
              >
                <div style={{ display: 'flex', marginRight: 14 }}>Metamask Icon here</div>
                <div
                  style={{
                    display: 'flex',
                    verticalAlign: 'middle',
                  }}
                >
                  {currentlyActivating === 'metamask' ? <>{'Confirm in your wallet'}</> : 'Continue with Metamask'}
                </div>
              </button>

              <button
                style={{ marginBottom: 16, minWidth: 310 }}
                disabled={currentlyActivating === 'wc'}
                onClick={activeWithWalletConnect}
              >
                <div style={{ display: 'flex', marginRight: 14 }}>
                  <button />
                </div>
                <div
                  style={{
                    display: 'flex',
                    verticalAlign: 'middle',
                  }}
                >
                  {currentlyActivating === 'wc' ? <>{'Confirm in your wallet'}</> : 'Continue with mobile wallet'}
                </div>
              </button>
            </>
          </ModalDialog>
        </OverlayContainer>
      )}
    </>
  );
};

export { Header };
