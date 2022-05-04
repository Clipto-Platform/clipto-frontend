import * as api from '../api';
import { EntityRequest } from '../api/types';
import { CHAIN_NAMES, DEFAULT_CHAIN_ID, getContractLink, getOpensea, getPolygonScan } from '../config/config';
import { CliptoToken__factory } from '../contracts';
import { getProvider } from '../hooks/useContracts';
import { getShortenedAddress } from '../utils/address';
import { convertToInt } from '../utils/format';

const getNftToken = (nftAddress: string) => {
  const provider = getProvider();
  return CliptoToken__factory.connect(nftAddress, provider);
};

const getDate = (timestamp: number) => {
  const date = new Date(0);
  date.setUTCSeconds(timestamp);
  return date.toLocaleDateString();
};

export const getTokenIdAndAddress = async (request: EntityRequest) => {
  const response = await api.requestById(request.requestId, request.creator.address);
  if (response.data) {
    const output = response.data?.requests[0];
    return {
      tokenId: convertToInt(output.nftTokenId),
      tokenAddress: output.nftTokenAddress.toString(),
      tokenUri: output.nftTokenUri,
    };
  }
  return undefined;
};

const filterTransferEvents = async (tokenAddress: string, tokenId: number) => {
  try {
    const token = getNftToken(tokenAddress);
    const filter = token.filters.Transfer(null, null, tokenId);
    const events = await token.queryFilter(filter);
    const promises = events.map(async (event) => {
      return {
        from: event.args.from,
        to: event.args.to,
        timestamp: getDate((await event.getBlock()).timestamp),
      };
    });
    const histories = await Promise.all(promises);
    return histories;
  } catch (err) {
    return [];
  }
};

export const getNFTDetails = (tokenAddress: string, tokenId: number, tokenUri: string) => {
  const details = {
    chain: CHAIN_NAMES[DEFAULT_CHAIN_ID],
    contractAddress: getShortenedAddress(tokenAddress),
    tokenId: tokenId,
    etherscan: getPolygonScan(tokenAddress),
    opensea: getOpensea(tokenAddress, tokenId),
    contractLink: getContractLink(tokenAddress),
    metadata: `https://arweave.net/${tokenUri.split('/').pop()}`,
    arweave: tokenUri.split('/').pop() || '',
  };

  return details;
};

export const getNFTHistory = async (tokenAddress: string, tokenId: number) => {
  try {
    const histories = await filterTransferEvents(tokenAddress, tokenId);
    return histories;
  } catch (err) {
    return [];
  }
};
