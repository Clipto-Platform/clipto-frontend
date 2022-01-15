import { Web3Provider } from "@ethersproject/providers";
import { CliptoExchange } from "../contracts";

/**
 *
 * @param library
 * @param account
 * @param message
 * @returns a signed message used to authenticate user for api requests
 */
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
  exchangeContract: CliptoExchange,
  account: string | null | undefined,
): Promise<boolean> => {
  let cliptoTokenAddress: string | undefined;
  if (!account) {
    throw {
      message: 'account does not exist',
    };
  }
  try {
    cliptoTokenAddress = await exchangeContract.creators(account);
  } catch (err) {
    console.log(err);
    console.log(
      'This should never happen unless you put an invalid address or if you redeployed your testnet,I think metamask is still point to the old deployment so thats why there are missing headers',
    );
    console.log('If you get the missing headers metamask error, try switching the network and back');
    throw 'Error : If you get the missing headers metamask error, try switching the network and back';
  }
  if (parseInt(cliptoTokenAddress) === 0) {
    console.log('User is not a registered creator.');
    return false;
  } else {
    return true;
  }
};
