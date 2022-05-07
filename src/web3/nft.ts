import * as api from '../api';
import * as config from '../config/config';
import { NFTHistories } from '../pages/SelectedOrder/types';
import { getShortenedAddress } from '../utils/address';
import * as time from '../utils/time';

export const getNFTDetails = (tokenAddress: string, tokenId: number, tokenUri: string) => {
  const details = {
    chain: config.CHAIN_NAMES[config.DEFAULT_CHAIN_ID],
    contractAddress: getShortenedAddress(tokenAddress),
    tokenId: tokenId,
    etherscan: config.getPolygonScan(tokenAddress),
    opensea: config.getOpensea(tokenAddress, tokenId),
    contractLink: config.getContractLink(tokenAddress),
    metadata: `https://arweave.net/${tokenUri.split('/').pop()}`,
    arweave: tokenUri.split('/').pop() || '',
  };

  return details;
};

export const getNFTHistory = async (tokenAddress: string, tokenId: number): Promise<NFTHistories[]> => {
  try {
    const histories = await api.getNFTHistory(tokenAddress, tokenId);
    if (histories.data) {
      return histories.data.transfers.map((transfer) => {
        return {
          from: transfer.from.id,
          to: transfer.from.id,
          timestamp: time.getDateFromTimestamp(transfer.timestamp),
        };
      });
    }

    return [];
  } catch (err) {
    return [];
  }
};
