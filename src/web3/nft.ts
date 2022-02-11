import { CHAIN_NAMES, DEFAULT_CHAIN_ID, EXCHANGE_ADDRESS, getContractLink, getOpensea, getPolygonScan, START_BLOCKS } from "../config/config";
import { CliptoExchange__factory, CliptoToken__factory } from "../contracts";
import { getProvider } from "../hooks/useContracts";
import { Request } from "../pages/Orders";
import { getShortenedAddress } from "../utils/address";

const getExchangeContract = () => {
    const provider = getProvider();
    return CliptoExchange__factory.connect(EXCHANGE_ADDRESS[DEFAULT_CHAIN_ID], provider);
}

const getNftToken = (nftAddress: string) => {
    const provider = getProvider();
    return CliptoToken__factory.connect(nftAddress, provider);
}

const getStartBlock = async (txHash: string): Promise<number> => {
    return (await getProvider().getTransaction(txHash)).blockNumber || 0;
}

const getDate = (timestamp: number) => {
    const date = new Date(0);
    date.setUTCSeconds(timestamp)
    return date.toLocaleDateString();
}

export const getTokenIdAndAddress = async (request: Request) => {
    const startBlock = await getStartBlock(request.txHash);
    const exchangeContract = getExchangeContract();
    const filter = exchangeContract.filters.DeliveredRequest(
        request.creator,
        request.requester
    );
    const events = await exchangeContract.queryFilter(filter, startBlock);
    const filtered = events.filter((event) => {
        const index = event.args.index.toNumber();
        return index === request.requestId;
    });
    return {
        tokenId: filtered[0].args.tokenId.toNumber(),
        tokenAddress: filtered[0].args.tokenAddress,
    }
}

const filterTransferEvents = async (tokenAddress: string, tokenId: number) => {
    try {
        const token = getNftToken(tokenAddress);
        const filter = token.filters.Transfer(null, null, tokenId);
        const events = await token.queryFilter(filter);
        const promises = events.map(async (event) => {
            return {
                from: event.args.from,
                to: event.args.to,
                timestamp: getDate((await event.getBlock()).timestamp)
            }
        });
        const histories = await Promise.all(promises);
        return histories;
    } catch (err) {
        return [];
    }
}

const fetchNFT = async (tokenAddress: string, tokenIndex: number) => {
    const token = getNftToken(tokenAddress);
    const metadata = await token.tokenURI(tokenIndex);
    const details = {
        chain: CHAIN_NAMES[DEFAULT_CHAIN_ID],
        contractAddress: getShortenedAddress(tokenAddress),
        tokenId: tokenIndex,
        etherscan: getPolygonScan(tokenAddress),
        opensea: getOpensea(tokenAddress, tokenIndex),
        contractLink: getContractLink(tokenAddress),
        metadata: `https://arweave.net/${metadata.split('/').pop()}`,
        arweave: metadata.split('/').pop() || '',
    };

    return details;
}

export const getNFTDetails = async (tokenAddress: string, tokenId: number) => {
    try {
        const details = await fetchNFT(tokenAddress, tokenId);
        return details;
    } catch (err) {
        return;
    }
}

export const getNFTHistory = async (tokenAddress: string, tokenId: number) => {
    try {
        const histories = await filterTransferEvents(tokenAddress, tokenId);
        return histories;
    } catch (err) {
        return [];
    }
}