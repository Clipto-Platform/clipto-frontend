export type CreateProfileRequest = {
  handle: string;
  profilePictureUri?: string;
  followModule?: any;
  followNFTURI?: string;
};

export type FollowerNftOwnedTokenIdsRequest = {
  address: EthereumAddress;
  profileId: ProfileId;
};

export type FollowRequest = {
  follow: [Follow];
};

export type Follow = {
  profile: ProfileId;
  followModule: FollowModuleParams;
};

export type FollowModuleParams = {
  // The follower fee follower module
  feeFollowModule: FeeFollowModuleParams;
  // The empty follow module
  emptyFollowModule: Boolean;
};
export type UnfollowRequest = {
  profile: ProfileId;
};

type FeeFollowModuleParams = any;
type EthereumAddress = string;
type ProfileId = string;
