import { Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import config from '../config/config';
import { CliptoExchangeV1 } from '../contracts';

export const signMessage = async (
  library: Web3Provider | undefined,
  account: string | null | undefined,
  message: string,
): Promise<any> => {
  if (!library) {
    throw {
      message: 'Library does not exist',
    };
  }
  if (!account) {
    throw {
      message: 'account does not exist',
    };
  }
  //for auth
  const msg = `0x${Buffer.from(message, 'utf8').toString('hex')}`;
  const signed = await library.send('personal_sign', [msg, account]);
  return signed;
};

//note(jonathanng) - If this function errors, this means that your wallet is not properly connected to the contracts.
export const isCreatorOnChain = async (
  exchangeContractV1: CliptoExchangeV1,
  account: string | null | undefined,
): Promise<boolean> => {
  let cliptoTokenAddress: string;
  if (!account) {
    throw {
      message: 'account does not exist',
    };
  }
  try {
    cliptoTokenAddress = await exchangeContractV1.creators(account);
  } catch (err) {
    throw 'Error : If you get the missing headers metamask error, try switching the network and back';
  }
  if (parseInt(cliptoTokenAddress) === 0) {
    return false;
  } else {
    return true;
  }
};

//TODO - this only works in PROD environment
export const switchNetwork = async () => {
  // @ts-ignore - need to find right type
  const ethereum = window.ethereum;
  if (!ethereum) {
    console.error('Metamask is not detected.');
  }

  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: ethers.utils.hexlify(config.chainId) }],
    });
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: ethers.utils.hexlify(config.chainId),
              chainName: config.chainName,
              rpcUrls: ['https://polygon-rpc.com'] /* ... */,
              nativeCurrency: {
                name: 'Matic Token',
                symbol: 'MATIC',
                decimals: 18,
              },
            },
          ],
        });
      } catch (addError) {
        // handle "add" error
      }
    }
    // handle other "switch" errors
  }
};
