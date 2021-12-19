import type { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { useCallback, useEffect, useState } from 'react';

const useEns = () => {
  const { account, library } = useWeb3React<Web3Provider>();
  const getEnsNameFromAddress = useCallback(
    async (walletAddress: string): Promise<string | undefined | null> => {
      if (!library) {
        return undefined;
      }
      try {
        const maybeEnsName = await library?.lookupAddress(walletAddress);
        return maybeEnsName || null;
      } catch (e) {
        return null;
      }
    },
    [library],
  );

  const [userEnsName, setUserEnsName] = useState<string | undefined | null>(undefined);

  useEffect(() => {
    if (!account) {
      setUserEnsName(undefined);
      return;
    }
    const getEnsName = async () => {
      const ensName = await getEnsNameFromAddress(account);
      if (ensName) {
        setUserEnsName(ensName);
        return;
      } else {
        setUserEnsName(null);
        return;
      }
    };
    getEnsName();
  }, [account, getEnsNameFromAddress]);
  return userEnsName;
};

export { useEns };
