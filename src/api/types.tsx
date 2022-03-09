export interface CreateRequest {
  requester: string;
  requestId: number;
  creator: string;
  amount: string;
  description: string;
  deadline: number;
  txHash: string;
  signed: string;
  address: string; // current user's address
  message: string;
}

export interface RefundRequest {
  id: string | number;
  signed: string;
  address: string;
  message: string;
}

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

export interface CompleteBooking {
  id: number | string;
  address: string;
  signed: string;
  message: string;
}

export interface TweetData {
  tweetUrl: string;
  address: string;
}

// types for v2 arch
export interface CreatorData {
  twitterHandle: string;
  bio: string;
  deliveryTime: number;
  profilePicture: string;
  userName: string;
  price: number;
  demos: string[];
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
}
