export interface ArweaveResponse {
  name: string;
  description: string;
  image: string;
  animation_url: string;
}

export interface NFTDetailsType {
  contractAddress: string;
  contractLink: string;
  etherscan: string;
  opensea: string;
  metadata: string;
  tokenId: number;
  chain: string;
}

export interface NFTFormError {
  name?: string;
  description?: string;
}

export interface NFTHistories {
  from: string;
  to: string;
  timestamp: string;
}
