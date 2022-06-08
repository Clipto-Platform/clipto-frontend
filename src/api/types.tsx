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
  customServices: string[];
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

export type ConnectionType = 'FOLLOW' | 'LIKE' | 'REPORT' | 'WATCH' | 'VOTE';

export interface CyberConnectPageInfo {
  endCursor: string;
  hasNextPage: boolean;
}

export interface CyberConnectIdentity {
  address: string;
  domain: string;
  avatar: string;
  joinTime: string;
  twitter: {
    handle: string;
    avatar: string;
    verified: boolean;
    source: string;
    followerCount: number;
  };
  github: {
    username: string;
    userId: string;
  };
  followerCount: number;
  followingCount: number;
  followings: {
    pageInfo: CyberConnectPageInfo;
    list: {
      address: string;
      domain: string;
      avatar: string;
      namespace: string;
      type: ConnectionType;
      verifiable: boolean;
    }[];
  };
  followers: {
    pageInfo: CyberConnectPageInfo;
    list: {
      address: string;
      domain: string;
      avatar: string;
      namespace: string;
      type: ConnectionType;
      verifiable: boolean;
    }[];
  };
}

export interface CyberConnectRecommendationsResp {
  data: {
    pageInfo: CyberConnectPageInfo;
    list: {
      address: string;
      domain: string;
      avatar: string;
      followerCount: number;
      recommendationReason: string;
    }[];
  };
}
[];

export interface CyberConnectConnectionResp
  extends Array<{
    fromAddr: string;
    toAddr: string;
    followStatus: {
      isFollowing: boolean;
      isFollowed: boolean;
    };
    namespace: string;
    alias: string;
    type: ConnectionType;
    updatedAt: string;
    createdAt: string;
  }> {}
