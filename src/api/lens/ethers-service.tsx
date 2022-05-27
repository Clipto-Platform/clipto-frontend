import { Web3Provider } from '@ethersproject/providers';
import { ethers, utils } from 'ethers';
import omitDeep from 'omit-deep-lodash';

// This code will assume you are using MetaMask.
// It will also assume that you have already done all the connecting to metamask
// this is purely here to show you how the public API hooks together

export const getSigner = (library: Web3Provider) => {
  return library.getSigner();
};

export const getAddressFromSigner = (library: Web3Provider) => {
  return getSigner(library).getAddress();
};

//todo(jonathanng) - delete
// export const init = async() => {
//     const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//   return accounts[0];
// }

export const signedTypeData = (domain: any, types: any, value: any, library: Web3Provider) => {
  const signer = getSigner(library);
  // remove the __typedname from the signature!
  return signer._signTypedData(
    omitDeep(domain, '__typename'),
    omitDeep(types, '__typename') as any,
    omitDeep(value, '__typename'),
  );
};

export const splitSignature = (signature: any) => {
  return utils.splitSignature(signature);
};

export const sendTx = (transaction: any, library: Web3Provider) => {
  const signer = library.getSigner();
  return signer.sendTransaction(transaction);
};
