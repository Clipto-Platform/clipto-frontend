import { JsonRpcProvider, JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { useMemo } from 'react';

import { DEFAULT_CHAIN_ID, EXCHANGE_ADDRESS, RPC_URLS } from '../config/config';
import { CliptoExchange__factory, CliptoToken__factory } from '../contracts';

export const getSigner = (library: Web3Provider, account: string): JsonRpcSigner => {
  return library.getSigner(account).connectUnchecked();
};

export const getProviderOrSigner = (
  library?: Web3Provider,
  account?: string | null,
): JsonRpcProvider | JsonRpcSigner => {
  return account && library
    ? getSigner(library, account)
    : new JsonRpcProvider(RPC_URLS[DEFAULT_CHAIN_ID], DEFAULT_CHAIN_ID);
};

export const getProvider = (): JsonRpcProvider => {
  return new JsonRpcProvider(RPC_URLS[DEFAULT_CHAIN_ID], DEFAULT_CHAIN_ID);
};

export const useExchangeContract = (withSignerIfPossible = false) => {
  const { account, library } = useWeb3React<Web3Provider>();
  return useMemo(() => {
    const provider = getProviderOrSigner(library, withSignerIfPossible && account ? account : undefined);
    return CliptoExchange__factory.connect(EXCHANGE_ADDRESS[DEFAULT_CHAIN_ID], provider);
  }, [account, library, withSignerIfPossible]);
};

export const useNFTContract = (nftAddress: string, withSignerIfPossible = false) => {
  const { account, library } = useWeb3React<Web3Provider>();
  return useMemo(() => {
    const provider = getProviderOrSigner(library, withSignerIfPossible && account ? account : undefined);
    return CliptoToken__factory.connect(nftAddress, provider);
  }, [account, library, withSignerIfPossible]);
};
