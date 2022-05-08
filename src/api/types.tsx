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
}

export interface EntityCreator extends CreatorData {
  id: string;
  address: string;
  tokenAddress: string;
  txHash: string;
  block: number;
  timestamp: number;
}

export interface RequestData {
  description: string;
  deadline: number;
}

export interface EntityRequest extends RequestData {
  id: string;
  requestId: string;
  creator: EntityCreator;
  requester: string;
  amount: number;
  tokenId: number;
  tokenUri: string;
  tokenAddress: string;
  refunded: boolean;
  delivered: boolean;
  description: string;
  deadline: number;
  txHash: string;
  block: number;
  timestamp: number;
  token: string;
}
