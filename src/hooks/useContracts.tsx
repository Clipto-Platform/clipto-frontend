import { JsonRpcProvider, JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { useMemo } from 'react';
import config from '../config/config';
import { ERCTokenType } from '../config/types';
import { CliptoExchangeV1__factory, CliptoExchange__factory, ERC20__factory } from '../contracts';

export const getSigner = (library: Web3Provider, account: string): JsonRpcSigner => {
  return library.getSigner(account).connectUnchecked();
};

export const getProviderOrSigner = (
  library?: Web3Provider,
  account?: string | null,
): JsonRpcProvider | JsonRpcSigner => {
  return account && library ? getSigner(library, account) : new JsonRpcProvider(config.rpcUrl);
};

export const useExchangeContract = (withSignerIfPossible = false) => {
  const { account, library } = useWeb3React<Web3Provider>();
  return useMemo(() => {
    const provider = getProviderOrSigner(library, withSignerIfPossible && account ? account : undefined);
    return CliptoExchange__factory.connect(config.exchangeAddress, provider);
  }, [account, library, withSignerIfPossible]);
};

export const useExchangeContractV1 = (withSignerIfPossible = false) => {
  const { account, library } = useWeb3React<Web3Provider>();
  return useMemo(() => {
    const provider = getProviderOrSigner(library, withSignerIfPossible && account ? account : undefined);
    return CliptoExchangeV1__factory.connect(config.exchangeAddressV1, provider);
  }, [account, library, withSignerIfPossible]);
};

export const getErc20Contract = (token: ERCTokenType, account: string, library: Web3Provider) => {
  const provider = getProviderOrSigner(library, account ? account : undefined);
  return ERC20__factory.connect(config.erc20[token].address, provider);
};
