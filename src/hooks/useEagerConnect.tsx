import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';

import { injected, walletconnect } from '../web3/connectors';

export function useEagerConnect() {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  const WC = localStorage.getItem('walletconnect');
  const WcObject = WC ? JSON.parse(WC) : null;
  const isWcConnected = WcObject && WcObject.connected; 

  useEffect(() => {
    if(isWcConnected){
      activate(walletconnect, undefined, true);
    }
    else{
    injected.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  }}, []); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}
