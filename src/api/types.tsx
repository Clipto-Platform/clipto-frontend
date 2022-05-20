export interface UploadFileLinkRequest {
  extension: string;
  signed: string;
  address: string; // current user's address
  message: string;
}

export interface FinalizeFileUpload {
  uploadUuid: string;
  name: string;
  description: string;
}

export interface TweetData {
  tweetUrl: string;
  address: string;
}

// types for v2 arch
export interface CreatorData {
  twitterHandle: string; // possible vulnerability - user can put at twitterHandle
  bio: string;
  deliveryTime: number;
  profilePicture: string;
  userName: string;
  price: number;
  demos: string[];
  lensHandle?: string;
  businessPrice: number;
  customServices: [];
}

export interface EntityCreator extends CreatorData {
  id: string;
  address: string;
  metadataURI: string;
  nftTokenAddress: string;
  txHash: string;
  block: number;
  timestamp: number;
}

export interface RequestData {
  description: string;
  deadline: number;
  isBusiness: boolean;
  businessName?: string;
  businessEmail?: string;
  businessTwitter?: string;
  businessInfo?: string;
  businessRequestType?: string;
}

export interface EntityRequest extends RequestData {
  id: string;
  requestId: string;
  creator: EntityCreator;
  requester: string;
  amount: number;
  nftTokenId: number;
  nftTokenUri: string;
  nftTokenAddress: string;
  metadataURI: string;
  version: 'v0' | 'v1';
  refunded: boolean;
  delivered: boolean;
  description: string;
  deadline: number;
  txHash: string;
  block: number;
  erc20: string;
  createdTimestamp: number;
  updatedTimestamp: number;
  isBusiness: boolean;
  businessName?: string;
  businessEmail?: string;
  businessTwitter?: string;
  businessInfo?: string;
}

export interface MetaData {
  name: string;
  metadata: CreatorData | RequestData;
}

export interface IPFS {
  IpfsHash: string;
  PinSize: string;
  Timestamp: string;
}

export interface Transfer {
  from: {
    id: string;
  };
  to: {
    id: string;
  };
  timestamp: string;
}
