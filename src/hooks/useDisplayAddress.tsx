import { useWeb3React } from '@web3-react/core';

import { getShortenedAddress } from '../utils/address';
import { useEns } from './useEns';

const useDisplayAddress = () => {
  const { account: maybeUserAccount } = useWeb3React();
  const userEnsName = useEns();

  // always prefer ens
  if (userEnsName) {
    return userEnsName;
  }
  if (!maybeUserAccount) {
    return maybeUserAccount;
  }
  return getShortenedAddress(maybeUserAccount ?? '', 6, 4);
};

export { useDisplayAddress };
