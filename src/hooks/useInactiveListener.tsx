import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';

import { injected, walletconnect } from '../web3/connectors';

export function useInactiveListener(suppress = false) {
  const { active, error, activate } = useWeb3React();
  const WC = localStorage.getItem('walletconnect');
  const WcObject = WC ? JSON.parse(WC) : null;
  const isWcConnected = WcObject && WcObject.connected;
  useEffect((): any => {
    const { ethereum } = window as any;
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        if (isWcConnected) {
          activate(walletconnect);
        } else {
          activate(injected);
        }
      };
      const handleChainChanged = (chainId: string | number) => {
        if (isWcConnected) {
          activate(walletconnect);
        } else {
          activate(injected);
        }
      };
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          if (isWcConnected) {
            activate(walletconnect);
          } else {
            activate(injected);
          }
        }
      };
      const handleNetworkChanged = (networkId: string | number) => {
        if (isWcConnected) {
          activate(walletconnect);
        } else {
          activate(injected);
        }
      };

      ethereum.on('connect', handleConnect);
      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('networkChanged', handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect);
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
          ethereum.removeListener('networkChanged', handleNetworkChanged);
        }
      };
    }
  }, [active, error, suppress, activate]);
}
