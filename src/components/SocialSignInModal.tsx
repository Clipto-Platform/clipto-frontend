import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { useDispatch, useSelector } from 'react-redux';
import { OverlayContainer, OverlayProvider } from '@react-aria/overlays';
import { ModalDialog } from './Dialog';
import { displayLensSignIn, fetchLensLogin } from '@/redux/reducer';
import { ConnectWalletPopup, LensConnect, LensConnectSubtitle, Error } from './Header/Style';
import { PrimaryButton } from './Button';

const SocialSignInModal = () => {
  const showLensModal = useSelector((s: any) => s.displayLensSignIn); //todo - replace with some form of state
  const { account, library } = useWeb3React<Web3Provider>();
  const loading = useSelector((state: any) => state.loading);
  const error = useSelector((state: any) => state.error);
  const dispatch = useDispatch();

  return (
    <>
      {showLensModal && account && (
        <OverlayContainer>
          <ModalDialog
            containerStyles={{
              border: '1px solid #b3b3b3',
              padding: '24px',
            }}
            isOpen
            onClose={() => dispatch(displayLensSignIn(false))}
            isDismissable
          >
            <>
              <LensConnect>Please sign the message.</LensConnect>
              <LensConnectSubtitle>Choose social graphs you want to connect</LensConnectSubtitle>
              {error && <Error style={{ maxWidth: 310 }}>{error}</Error>}

              <PrimaryButton
                variant={'secondary'}
                style={{ marginBottom: 16, minWidth: 310 }}
                isDisabled={loading}
                onPress={() => dispatch(fetchLensLogin(account, library))}
              >
                <ConnectWalletPopup>{'Sign into Lens  🌿'}</ConnectWalletPopup>
              </PrimaryButton>
              {/* <PrimaryButton
                variant={'secondary'}
                style={{ marginBottom: 16, minWidth: 310 }}
                isDisabled={true || loading}
                onPress={() => {}}
              >
                <ConnectWalletPopup>
                  {'🚧 Cyberconnect coming soon 🚧'}
                </ConnectWalletPopup>
              </PrimaryButton> */}
            </>
          </ModalDialog>
        </OverlayContainer>
      )}
    </>
  );
};

export default SocialSignInModal;
