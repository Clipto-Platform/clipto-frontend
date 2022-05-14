export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BlockchainData: any;
  BroadcastId: any;
  ChainId: any;
  CollectModuleData: any;
  ContractAddress: any;
  CreateHandle: any;
  Cursor: any;
  DateTime: any;
  EthereumAddress: any;
  FollowModuleData: any;
  Handle: any;
  HandleClaimIdScalar: any;
  InternalPublicationId: any;
  Jwt: any;
  LimitScalar: any;
  Markdown: any;
  MimeType: any;
  NftOwnershipId: any;
  Nonce: any;
  ProfileId: any;
  PublicationId: any;
  PublicationUrl: any;
  ReferenceModuleData: any;
  Search: any;
  Signature: any;
  Sources: any;
  TimestampScalar: any;
  TxHash: any;
  UnixTimestamp: any;
  Url: any;
  Void: any;
};

export type ApprovedAllowanceAmount = {
  __typename?: 'ApprovedAllowanceAmount';
  allowance: Scalars['String'];
  contractAddress: Scalars['ContractAddress'];
  currency: Scalars['ContractAddress'];
  module: Scalars['String'];
};

export type ApprovedModuleAllowanceAmountRequest = {
  collectModules: Array<CollectModules>;
  currencies: Array<Scalars['ContractAddress']>;
  followModules: Array<FollowModules>;
  referenceModules: Array<ReferenceModules>;
};

export type AttachRequest = {
  mimeType: Scalars['MimeType'];
};

export type AttachResults = {
  __typename?: 'AttachResults';
  key: Scalars['String'];
  signedUrl: Scalars['String'];
};

export type Attribute = {
  __typename?: 'Attribute';
  displayType?: Maybe<MetadataDisplayType>;
  key: Scalars['String'];
  traitType?: Maybe<Scalars['String']>;
  value: Scalars['String'];
};

export type AuthChallengeResult = {
  __typename?: 'AuthChallengeResult';
  text: Scalars['String'];
};

export type AuthenticationResult = {
  __typename?: 'AuthenticationResult';
  accessToken: Scalars['Jwt'];
  refreshToken: Scalars['Jwt'];
};

export type BurnProfileRequest = {
  profileId: Scalars['ProfileId'];
};

export type ChallengeRequest = {
  address: Scalars['EthereumAddress'];
};

export type ClaimHandleRequest = {
  followModule?: InputMaybe<FollowModuleParams>;
  freeTextHandle?: InputMaybe<Scalars['CreateHandle']>;
  id?: InputMaybe<Scalars['HandleClaimIdScalar']>;
};

export type ClaimableHandles = {
  __typename?: 'ClaimableHandles';
  canClaimFreeTextHandle: Scalars['Boolean'];
  reservedHandles: Array<ReservedClaimableHandle>;
};

export type CollectModule =
  | FeeCollectModuleSettings
  | FreeCollectModuleSettings
  | LimitedFeeCollectModuleSettings
  | LimitedTimedFeeCollectModuleSettings
  | RevertCollectModuleSettings
  | TimedFeeCollectModuleSettings;

export type CollectModuleParams = {
  feeCollectModule?: InputMaybe<FeeCollectModuleParams>;
  freeCollectModule?: InputMaybe<FreeCollectModuleParams>;
  limitedFeeCollectModule?: InputMaybe<LimitedFeeCollectModuleParams>;
  limitedTimedFeeCollectModule?: InputMaybe<LimitedTimedFeeCollectModuleParams>;
  revertCollectModule?: InputMaybe<Scalars['Boolean']>;
  timedFeeCollectModule?: InputMaybe<TimedFeeCollectModuleParams>;
};

export enum CollectModules {
  FeeCollectModule = 'FeeCollectModule',
  FreeCollectModule = 'FreeCollectModule',
  LimitedFeeCollectModule = 'LimitedFeeCollectModule',
  LimitedTimedFeeCollectModule = 'LimitedTimedFeeCollectModule',
  RevertCollectModule = 'RevertCollectModule',
  TimedFeeCollectModule = 'TimedFeeCollectModule',
}

export type Comment = {
  __typename?: 'Comment';
  appId?: Maybe<Scalars['Sources']>;
  collectModule: CollectModule;
  collectNftAddress?: Maybe<Scalars['ContractAddress']>;
  collectedBy?: Maybe<Wallet>;
  commentOn?: Maybe<Publication>;
  createdAt: Scalars['DateTime'];
  firstComment?: Maybe<Comment>;
  id: Scalars['InternalPublicationId'];
  mainPost: MainPostReference;
  metadata: MetadataOutput;
  onChainContentURI: Scalars['String'];
  profile: Profile;
  referenceModule?: Maybe<ReferenceModule>;
  stats: PublicationStats;
};

export type CreateBurnEip712TypedData = {
  __typename?: 'CreateBurnEIP712TypedData';
  domain: Eip712TypedDataDomain;
  types: CreateBurnEip712TypedDataTypes;
  value: CreateBurnEip712TypedDataValue;
};

export type CreateBurnEip712TypedDataTypes = {
  __typename?: 'CreateBurnEIP712TypedDataTypes';
  BurnWithSig: Array<Eip712TypedDataField>;
};

export type CreateBurnEip712TypedDataValue = {
  __typename?: 'CreateBurnEIP712TypedDataValue';
  deadline: Scalars['UnixTimestamp'];
  nonce: Scalars['Nonce'];
  tokenId: Scalars['String'];
};

export type CreateBurnProfileBroadcastItemResult = {
  __typename?: 'CreateBurnProfileBroadcastItemResult';
  expiresAt: Scalars['DateTime'];
  id: Scalars['BroadcastId'];
  typedData: CreateBurnEip712TypedData;
};

export type CreateCollectBroadcastItemResult = {
  __typename?: 'CreateCollectBroadcastItemResult';
  expiresAt: Scalars['DateTime'];
  id: Scalars['BroadcastId'];
  typedData: CreateCollectEip712TypedData;
};

export type CreateCollectEip712TypedData = {
  __typename?: 'CreateCollectEIP712TypedData';
  domain: Eip712TypedDataDomain;
  types: CreateCollectEip712TypedDataTypes;
  value: CreateCollectEip712TypedDataValue;
};

export type CreateCollectEip712TypedDataTypes = {
  __typename?: 'CreateCollectEIP712TypedDataTypes';
  CollectWithSig: Array<Eip712TypedDataField>;
};

export type CreateCollectEip712TypedDataValue = {
  __typename?: 'CreateCollectEIP712TypedDataValue';
  data: Scalars['BlockchainData'];
  deadline: Scalars['UnixTimestamp'];
  nonce: Scalars['Nonce'];
  profileId: Scalars['ProfileId'];
  pubId: Scalars['PublicationId'];
};

export type CreateCollectRequest = {
  publicationId: Scalars['InternalPublicationId'];
};

export type CreateCommentBroadcastItemResult = {
  __typename?: 'CreateCommentBroadcastItemResult';
  expiresAt: Scalars['DateTime'];
  id: Scalars['BroadcastId'];
  typedData: CreateCommentEip712TypedData;
};

export type CreateCommentEip712TypedData = {
  __typename?: 'CreateCommentEIP712TypedData';
  domain: Eip712TypedDataDomain;
  types: CreateCommentEip712TypedDataTypes;
  value: CreateCommentEip712TypedDataValue;
};

export type CreateCommentEip712TypedDataTypes = {
  __typename?: 'CreateCommentEIP712TypedDataTypes';
  CommentWithSig: Array<Eip712TypedDataField>;
};

export type CreateCommentEip712TypedDataValue = {
  __typename?: 'CreateCommentEIP712TypedDataValue';
  collectModule: Scalars['ContractAddress'];
  collectModuleData: Scalars['CollectModuleData'];
  contentURI: Scalars['PublicationUrl'];
  deadline: Scalars['UnixTimestamp'];
  nonce: Scalars['Nonce'];
  profileId: Scalars['ProfileId'];
  profileIdPointed: Scalars['ProfileId'];
  pubIdPointed: Scalars['PublicationId'];
  referenceModule: Scalars['ContractAddress'];
  referenceModuleData: Scalars['ReferenceModuleData'];
};

export type CreateFollowBroadcastItemResult = {
  __typename?: 'CreateFollowBroadcastItemResult';
  expiresAt: Scalars['DateTime'];
  id: Scalars['BroadcastId'];
  typedData: CreateFollowEip712TypedData;
};

export type CreateFollowEip712TypedData = {
  __typename?: 'CreateFollowEIP712TypedData';
  domain: Eip712TypedDataDomain;
  types: CreateFollowEip712TypedDataTypes;
  value: CreateFollowEip712TypedDataValue;
};

export type CreateFollowEip712TypedDataTypes = {
  __typename?: 'CreateFollowEIP712TypedDataTypes';
  FollowWithSig: Array<Eip712TypedDataField>;
};

export type CreateFollowEip712TypedDataValue = {
  __typename?: 'CreateFollowEIP712TypedDataValue';
  datas: Array<Scalars['BlockchainData']>;
  deadline: Scalars['UnixTimestamp'];
  nonce: Scalars['Nonce'];
  profileIds: Array<Scalars['ProfileId']>;
};

export type CreateMirrorBroadcastItemResult = {
  __typename?: 'CreateMirrorBroadcastItemResult';
  expiresAt: Scalars['DateTime'];
  id: Scalars['BroadcastId'];
  typedData: CreateMirrorEip712TypedData;
};

export type CreateMirrorEip712TypedData = {
  __typename?: 'CreateMirrorEIP712TypedData';
  domain: Eip712TypedDataDomain;
  types: CreateMirrorEip712TypedDataTypes;
  value: CreateMirrorEip712TypedDataValue;
};

export type CreateMirrorEip712TypedDataTypes = {
  __typename?: 'CreateMirrorEIP712TypedDataTypes';
  MirrorWithSig: Array<Eip712TypedDataField>;
};

export type CreateMirrorEip712TypedDataValue = {
  __typename?: 'CreateMirrorEIP712TypedDataValue';
  deadline: Scalars['UnixTimestamp'];
  nonce: Scalars['Nonce'];
  profileId: Scalars['ProfileId'];
  profileIdPointed: Scalars['ProfileId'];
  pubIdPointed: Scalars['PublicationId'];
  referenceModule: Scalars['ContractAddress'];
  referenceModuleData: Scalars['ReferenceModuleData'];
};

export type CreateMirrorRequest = {
  profileId: Scalars['ProfileId'];
  publicationId: Scalars['InternalPublicationId'];
  referenceModule?: InputMaybe<ReferenceModuleParams>;
};

export type CreatePostBroadcastItemResult = {
  __typename?: 'CreatePostBroadcastItemResult';
  expiresAt: Scalars['DateTime'];
  id: Scalars['BroadcastId'];
  typedData: CreatePostEip712TypedData;
};

export type CreatePostEip712TypedData = {
  __typename?: 'CreatePostEIP712TypedData';
  domain: Eip712TypedDataDomain;
  types: CreatePostEip712TypedDataTypes;
  value: CreatePostEip712TypedDataValue;
};

export type CreatePostEip712TypedDataTypes = {
  __typename?: 'CreatePostEIP712TypedDataTypes';
  PostWithSig: Array<Eip712TypedDataField>;
};

export type CreatePostEip712TypedDataValue = {
  __typename?: 'CreatePostEIP712TypedDataValue';
  collectModule: Scalars['ContractAddress'];
  collectModuleData: Scalars['CollectModuleData'];
  contentURI: Scalars['PublicationUrl'];
  deadline: Scalars['UnixTimestamp'];
  nonce: Scalars['Nonce'];
  profileId: Scalars['ProfileId'];
  referenceModule: Scalars['ContractAddress'];
  referenceModuleData: Scalars['ReferenceModuleData'];
};

export type CreateProfileRequest = {
  followModule?: InputMaybe<FollowModuleParams>;
  followNFTURI?: InputMaybe<Scalars['Url']>;
  handle: Scalars['CreateHandle'];
  profilePictureUri?: InputMaybe<Scalars['Url']>;
};

export type CreatePublicCommentRequest = {
  collectModule: CollectModuleParams;
  contentURI: Scalars['Url'];
  profileId: Scalars['ProfileId'];
  publicationId: Scalars['InternalPublicationId'];
  referenceModule?: InputMaybe<ReferenceModuleParams>;
};

export type CreatePublicPostRequest = {
  collectModule: CollectModuleParams;
  contentURI: Scalars['Url'];
  profileId: Scalars['ProfileId'];
  referenceModule?: InputMaybe<ReferenceModuleParams>;
};

export type CreatePublicSetProfileMetadataUriRequest = {
  metadata: Scalars['Url'];
  profileId: Scalars['ProfileId'];
};

export type CreateSetDefaultProfileRequest = {
  profileId: Scalars['ProfileId'];
};

export type CreateSetDispatcherBroadcastItemResult = {
  __typename?: 'CreateSetDispatcherBroadcastItemResult';
  expiresAt: Scalars['DateTime'];
  id: Scalars['BroadcastId'];
  typedData: CreateSetDispatcherEip712TypedData;
};

export type CreateSetDispatcherEip712TypedData = {
  __typename?: 'CreateSetDispatcherEIP712TypedData';
  domain: Eip712TypedDataDomain;
  types: CreateSetDispatcherEip712TypedDataTypes;
  value: CreateSetDispatcherEip712TypedDataValue;
};

export type CreateSetDispatcherEip712TypedDataTypes = {
  __typename?: 'CreateSetDispatcherEIP712TypedDataTypes';
  SetDispatcherWithSig: Array<Eip712TypedDataField>;
};

export type CreateSetDispatcherEip712TypedDataValue = {
  __typename?: 'CreateSetDispatcherEIP712TypedDataValue';
  deadline: Scalars['UnixTimestamp'];
  dispatcher: Scalars['EthereumAddress'];
  nonce: Scalars['Nonce'];
  profileId: Scalars['ProfileId'];
};

export type CreateSetFollowModuleBroadcastItemResult = {
  __typename?: 'CreateSetFollowModuleBroadcastItemResult';
  expiresAt: Scalars['DateTime'];
  id: Scalars['BroadcastId'];
  typedData: CreateSetFollowModuleEip712TypedData;
};

export type CreateSetFollowModuleEip712TypedData = {
  __typename?: 'CreateSetFollowModuleEIP712TypedData';
  domain: Eip712TypedDataDomain;
  types: CreateSetFollowModuleEip712TypedDataTypes;
  value: CreateSetFollowModuleEip712TypedDataValue;
};

export type CreateSetFollowModuleEip712TypedDataTypes = {
  __typename?: 'CreateSetFollowModuleEIP712TypedDataTypes';
  SetFollowModuleWithSig: Array<Eip712TypedDataField>;
};

export type CreateSetFollowModuleEip712TypedDataValue = {
  __typename?: 'CreateSetFollowModuleEIP712TypedDataValue';
  deadline: Scalars['UnixTimestamp'];
  followModule: Scalars['ContractAddress'];
  followModuleData: Scalars['FollowModuleData'];
  nonce: Scalars['Nonce'];
  profileId: Scalars['ProfileId'];
};

export type CreateSetFollowModuleRequest = {
  followModule: FollowModuleParams;
  profileId: Scalars['ProfileId'];
};

export type CreateSetFollowNftUriBroadcastItemResult = {
  __typename?: 'CreateSetFollowNFTUriBroadcastItemResult';
  expiresAt: Scalars['DateTime'];
  id: Scalars['BroadcastId'];
  typedData: CreateSetFollowNftUriEip712TypedData;
};

export type CreateSetFollowNftUriEip712TypedData = {
  __typename?: 'CreateSetFollowNFTUriEIP712TypedData';
  domain: Eip712TypedDataDomain;
  types: CreateSetFollowNftUriEip712TypedDataTypes;
  value: CreateSetFollowNftUriEip712TypedDataValue;
};

export type CreateSetFollowNftUriEip712TypedDataTypes = {
  __typename?: 'CreateSetFollowNFTUriEIP712TypedDataTypes';
  SetFollowNFTURIWithSig: Array<Eip712TypedDataField>;
};

export type CreateSetFollowNftUriEip712TypedDataValue = {
  __typename?: 'CreateSetFollowNFTUriEIP712TypedDataValue';
  deadline: Scalars['UnixTimestamp'];
  followNFTURI: Scalars['Url'];
  nonce: Scalars['Nonce'];
  profileId: Scalars['ProfileId'];
};

export type CreateSetFollowNftUriRequest = {
  followNFTURI?: InputMaybe<Scalars['Url']>;
  profileId: Scalars['ProfileId'];
};

export type CreateSetProfileImageUriBroadcastItemResult = {
  __typename?: 'CreateSetProfileImageUriBroadcastItemResult';
  expiresAt: Scalars['DateTime'];
  id: Scalars['BroadcastId'];
  typedData: CreateSetProfileImageUriEip712TypedData;
};

export type CreateSetProfileImageUriEip712TypedData = {
  __typename?: 'CreateSetProfileImageUriEIP712TypedData';
  domain: Eip712TypedDataDomain;
  types: CreateSetProfileImageUriEip712TypedDataTypes;
  value: CreateSetProfileImageUriEip712TypedDataValue;
};

export type CreateSetProfileImageUriEip712TypedDataTypes = {
  __typename?: 'CreateSetProfileImageUriEIP712TypedDataTypes';
  SetProfileImageURIWithSig: Array<Eip712TypedDataField>;
};

export type CreateSetProfileImageUriEip712TypedDataValue = {
  __typename?: 'CreateSetProfileImageUriEIP712TypedDataValue';
  deadline: Scalars['UnixTimestamp'];
  imageURI: Scalars['Url'];
  nonce: Scalars['Nonce'];
  profileId: Scalars['ProfileId'];
};

export type CreateSetProfileMetadataUriBroadcastItemResult = {
  __typename?: 'CreateSetProfileMetadataURIBroadcastItemResult';
  expiresAt: Scalars['DateTime'];
  id: Scalars['BroadcastId'];
  typedData: CreateSetProfileMetadataUrieip712TypedData;
};

export type CreateSetProfileMetadataUrieip712TypedData = {
  __typename?: 'CreateSetProfileMetadataURIEIP712TypedData';
  domain: Eip712TypedDataDomain;
  types: CreateSetProfileMetadataUrieip712TypedDataTypes;
  value: CreateSetProfileMetadataUrieip712TypedDataValue;
};

export type CreateSetProfileMetadataUrieip712TypedDataTypes = {
  __typename?: 'CreateSetProfileMetadataURIEIP712TypedDataTypes';
  SetProfileMetadataURIWithSig: Array<Eip712TypedDataField>;
};

export type CreateSetProfileMetadataUrieip712TypedDataValue = {
  __typename?: 'CreateSetProfileMetadataURIEIP712TypedDataValue';
  deadline: Scalars['UnixTimestamp'];
  metadata: Scalars['Url'];
  nonce: Scalars['Nonce'];
  profileId: Scalars['ProfileId'];
};

export type CreateToggleFollowBroadcastItemResult = {
  __typename?: 'CreateToggleFollowBroadcastItemResult';
  expiresAt: Scalars['DateTime'];
  id: Scalars['BroadcastId'];
  typedData: CreateToggleFollowEip712TypedData;
};

export type CreateToggleFollowEip712TypedData = {
  __typename?: 'CreateToggleFollowEIP712TypedData';
  domain: Eip712TypedDataDomain;
  types: CreateToggleFollowEip712TypedDataTypes;
  value: CreateToggleFollowEip712TypedDataValue;
};

export type CreateToggleFollowEip712TypedDataTypes = {
  __typename?: 'CreateToggleFollowEIP712TypedDataTypes';
  ToggleFollowWithSig: Array<Eip712TypedDataField>;
};

export type CreateToggleFollowEip712TypedDataValue = {
  __typename?: 'CreateToggleFollowEIP712TypedDataValue';
  deadline: Scalars['UnixTimestamp'];
  enables: Array<Scalars['Boolean']>;
  nonce: Scalars['Nonce'];
  profileIds: Array<Scalars['ProfileId']>;
};

export type CreateToggleFollowRequest = {
  enables: Array<Scalars['Boolean']>;
  profileIds: Array<Scalars['ProfileId']>;
};

export type CreateUnfollowBroadcastItemResult = {
  __typename?: 'CreateUnfollowBroadcastItemResult';
  expiresAt: Scalars['DateTime'];
  id: Scalars['BroadcastId'];
  typedData: CreateBurnEip712TypedData;
};

export type DefaultProfileRequest = {
  ethereumAddress: Scalars['EthereumAddress'];
};

export type Dispatcher = {
  __typename?: 'Dispatcher';
  address: Scalars['EthereumAddress'];
  canUseRelay: Scalars['Boolean'];
};

export type DoesFollow = {
  followerAddress: Scalars['EthereumAddress'];
  profileId: Scalars['ProfileId'];
};

export type DoesFollowRequest = {
  followInfos: Array<DoesFollow>;
};

export type DoesFollowResponse = {
  __typename?: 'DoesFollowResponse';
  followerAddress: Scalars['EthereumAddress'];
  follows: Scalars['Boolean'];
  profileId: Scalars['ProfileId'];
};

export type Eip712TypedDataDomain = {
  __typename?: 'EIP712TypedDataDomain';
  chainId: Scalars['ChainId'];
  name: Scalars['String'];
  verifyingContract: Scalars['ContractAddress'];
  version: Scalars['String'];
};

export type Eip712TypedDataField = {
  __typename?: 'EIP712TypedDataField';
  name: Scalars['String'];
  type: Scalars['String'];
};

export type EnabledModule = {
  __typename?: 'EnabledModule';
  contractAddress: Scalars['ContractAddress'];
  inputParams: Array<ModuleInfo>;
  moduleName: Scalars['String'];
  redeemParams: Array<ModuleInfo>;
  returnDataParms: Array<ModuleInfo>;
};

export type EnabledModules = {
  __typename?: 'EnabledModules';
  collectModules: Array<EnabledModule>;
  followModules: Array<EnabledModule>;
  referenceModules: Array<EnabledModule>;
};

export type Erc20 = {
  __typename?: 'Erc20';
  address: Scalars['ContractAddress'];
  decimals: Scalars['Int'];
  name: Scalars['String'];
  symbol: Scalars['String'];
};

export type Erc20Amount = {
  __typename?: 'Erc20Amount';
  asset: Erc20;
  value: Scalars['String'];
};

export type ExplorePublicationRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  excludeProfileIds?: InputMaybe<Array<Scalars['ProfileId']>>;
  limit?: InputMaybe<Scalars['LimitScalar']>;
  noRandomize?: InputMaybe<Scalars['Boolean']>;
  publicationTypes?: InputMaybe<Array<PublicationTypes>>;
  sortCriteria: PublicationSortCriteria;
  sources?: InputMaybe<Array<Scalars['Sources']>>;
  timestamp?: InputMaybe<Scalars['TimestampScalar']>;
};

export type ExplorePublicationResult = {
  __typename?: 'ExplorePublicationResult';
  items: Array<Publication>;
  pageInfo: PaginatedResultInfo;
};

export type FeeCollectModuleParams = {
  amount: ModuleFeeAmountParams;
  followerOnly: Scalars['Boolean'];
  recipient: Scalars['EthereumAddress'];
  referralFee: Scalars['Float'];
};

export type FeeCollectModuleSettings = {
  __typename?: 'FeeCollectModuleSettings';
  amount: ModuleFeeAmount;
  contractAddress: Scalars['ContractAddress'];
  followerOnly: Scalars['Boolean'];
  recipient: Scalars['EthereumAddress'];
  referralFee: Scalars['Float'];
  type: CollectModules;
};

export type FeeFollowModuleParams = {
  amount: ModuleFeeAmountParams;
  recipient: Scalars['EthereumAddress'];
};

export type FeeFollowModuleRedeemParams = {
  amount: ModuleFeeAmountParams;
};

export type FeeFollowModuleSettings = {
  __typename?: 'FeeFollowModuleSettings';
  amount: ModuleFeeAmount;
  contractAddress: Scalars['ContractAddress'];
  recipient: Scalars['EthereumAddress'];
  type: FollowModules;
};

export type Follow = {
  followModule?: InputMaybe<FollowModuleRedeemParams>;
  profile: Scalars['ProfileId'];
};

export type FollowModule = FeeFollowModuleSettings;

export type FollowModuleParams = {
  emptyFollowModule?: InputMaybe<Scalars['Boolean']>;
  feeFollowModule?: InputMaybe<FeeFollowModuleParams>;
};

export type FollowModuleRedeemParams = {
  feeFollowModule?: InputMaybe<FeeFollowModuleRedeemParams>;
};

export enum FollowModules {
  FeeFollowModule = 'FeeFollowModule',
}

export type FollowOnlyReferenceModuleSettings = {
  __typename?: 'FollowOnlyReferenceModuleSettings';
  contractAddress: Scalars['ContractAddress'];
  type: ReferenceModules;
};

export type FollowRequest = {
  follow: Array<Follow>;
};

export type Follower = {
  __typename?: 'Follower';
  totalAmountOfTimesFollowed: Scalars['Int'];
  wallet: Wallet;
};

export type FollowerNftOwnedTokenIds = {
  __typename?: 'FollowerNftOwnedTokenIds';
  followerNftAddress: Scalars['ContractAddress'];
  tokensIds: Array<Scalars['String']>;
};

export type FollowerNftOwnedTokenIdsRequest = {
  address: Scalars['EthereumAddress'];
  profileId: Scalars['ProfileId'];
};

export type FollowersRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<Scalars['LimitScalar']>;
  profileId: Scalars['ProfileId'];
};

export type Following = {
  __typename?: 'Following';
  profile: Profile;
  totalAmountOfTimesFollowing: Scalars['Int'];
};

export type FollowingRequest = {
  address: Scalars['EthereumAddress'];
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<Scalars['LimitScalar']>;
};

export type FraudReasonInputParams = {
  reason: PublicationReportingReason;
  subreason: PublicationReportingFraudSubreason;
};

export type FreeCollectModuleParams = {
  followerOnly: Scalars['Boolean'];
};

export type FreeCollectModuleSettings = {
  __typename?: 'FreeCollectModuleSettings';
  contractAddress: Scalars['ContractAddress'];
  followerOnly: Scalars['Boolean'];
  type: CollectModules;
};

export type GenerateModuleCurrencyApproval = {
  __typename?: 'GenerateModuleCurrencyApproval';
  data: Scalars['BlockchainData'];
  from: Scalars['EthereumAddress'];
  to: Scalars['ContractAddress'];
};

export type GenerateModuleCurrencyApprovalDataRequest = {
  collectModule?: InputMaybe<CollectModules>;
  currency: Scalars['ContractAddress'];
  followModule?: InputMaybe<FollowModules>;
  referenceModule?: InputMaybe<ReferenceModules>;
  value: Scalars['String'];
};

export type GlobalProtocolStats = {
  __typename?: 'GlobalProtocolStats';
  totalBurntProfiles: Scalars['Int'];
  totalCollects: Scalars['Int'];
  totalComments: Scalars['Int'];
  totalFollows: Scalars['Int'];
  totalMirrors: Scalars['Int'];
  totalPosts: Scalars['Int'];
  totalProfiles: Scalars['Int'];
  totalRevenue: Array<Erc20Amount>;
};

export type GlobalProtocolStatsRequest = {
  fromTimestamp?: InputMaybe<Scalars['UnixTimestamp']>;
  sources?: InputMaybe<Array<Scalars['Sources']>>;
  toTimestamp?: InputMaybe<Scalars['UnixTimestamp']>;
};

export type HasCollectedItem = {
  __typename?: 'HasCollectedItem';
  collected: Scalars['Boolean'];
  collectedTimes: Scalars['Int'];
  publicationId: Scalars['InternalPublicationId'];
};

export type HasCollectedPublicationRequest = {
  publicationIds: Array<Scalars['InternalPublicationId']>;
  walletAddress: Scalars['EthereumAddress'];
};

export type HasCollectedRequest = {
  collectRequests: Array<HasCollectedPublicationRequest>;
};

export type HasCollectedResult = {
  __typename?: 'HasCollectedResult';
  results: Array<HasCollectedItem>;
  walletAddress: Scalars['EthereumAddress'];
};

export type HasMirroredItem = {
  __typename?: 'HasMirroredItem';
  mirrored: Scalars['Boolean'];
  publicationId: Scalars['InternalPublicationId'];
};

export type HasMirroredProfileRequest = {
  profileId: Scalars['ProfileId'];
  publicationIds: Array<Scalars['InternalPublicationId']>;
};

export type HasMirroredRequest = {
  profilesRequest: Array<HasMirroredProfileRequest>;
};

export type HasMirroredResult = {
  __typename?: 'HasMirroredResult';
  profileId: Scalars['ProfileId'];
  results: Array<HasMirroredItem>;
};

export type HasTxHashBeenIndexedRequest = {
  txHash: Scalars['TxHash'];
};

export type HidePublicationRequest = {
  publicationId: Scalars['InternalPublicationId'];
};

export type IllegalReasonInputParams = {
  reason: PublicationReportingReason;
  subreason: PublicationReportingIllegalSubreason;
};

export type LimitedFeeCollectModuleParams = {
  amount: ModuleFeeAmountParams;
  collectLimit: Scalars['String'];
  followerOnly: Scalars['Boolean'];
  recipient: Scalars['EthereumAddress'];
  referralFee: Scalars['Float'];
};

export type LimitedFeeCollectModuleSettings = {
  __typename?: 'LimitedFeeCollectModuleSettings';
  amount: ModuleFeeAmount;
  collectLimit: Scalars['String'];
  contractAddress: Scalars['ContractAddress'];
  followerOnly: Scalars['Boolean'];
  recipient: Scalars['EthereumAddress'];
  referralFee: Scalars['Float'];
  type: CollectModules;
};

export type LimitedTimedFeeCollectModuleParams = {
  amount: ModuleFeeAmountParams;
  collectLimit: Scalars['String'];
  followerOnly: Scalars['Boolean'];
  recipient: Scalars['EthereumAddress'];
  referralFee: Scalars['Float'];
};

export type LimitedTimedFeeCollectModuleSettings = {
  __typename?: 'LimitedTimedFeeCollectModuleSettings';
  amount: ModuleFeeAmount;
  collectLimit: Scalars['String'];
  contractAddress: Scalars['ContractAddress'];
  endTimestamp: Scalars['DateTime'];
  followerOnly: Scalars['Boolean'];
  recipient: Scalars['EthereumAddress'];
  referralFee: Scalars['Float'];
  type: CollectModules;
};

export type Log = {
  __typename?: 'Log';
  address: Scalars['ContractAddress'];
  blockHash: Scalars['String'];
  blockNumber: Scalars['Int'];
  data: Scalars['String'];
  logIndex: Scalars['Int'];
  removed: Scalars['Boolean'];
  topics: Array<Scalars['String']>;
  transactionHash: Scalars['TxHash'];
  transactionIndex: Scalars['Int'];
};

export type MainPostReference = Mirror | Post;

export type Media = {
  __typename?: 'Media';
  height?: Maybe<Scalars['Int']>;
  mimeType?: Maybe<Scalars['MimeType']>;
  size?: Maybe<Scalars['Int']>;
  url: Scalars['Url'];
  width?: Maybe<Scalars['Int']>;
};

export type MediaSet = {
  __typename?: 'MediaSet';
  medium?: Maybe<Media>;
  original: Media;
  small?: Maybe<Media>;
};

export type MentionPublication = Comment | Post;

export type MetadataAttributeOutput = {
  __typename?: 'MetadataAttributeOutput';
  displayType?: Maybe<MetadataDisplayType>;
  traitType?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export enum MetadataDisplayType {
  Date = 'date',
  Number = 'number',
  String = 'string',
}

export type MetadataOutput = {
  __typename?: 'MetadataOutput';
  attributes: Array<MetadataAttributeOutput>;
  content?: Maybe<Scalars['Markdown']>;
  cover?: Maybe<MediaSet>;
  description?: Maybe<Scalars['Markdown']>;
  image?: Maybe<Scalars['Url']>;
  media: Array<MediaSet>;
  name?: Maybe<Scalars['String']>;
};

export type Mirror = {
  __typename?: 'Mirror';
  appId?: Maybe<Scalars['Sources']>;
  collectModule: CollectModule;
  collectNftAddress?: Maybe<Scalars['ContractAddress']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['InternalPublicationId'];
  metadata: MetadataOutput;
  mirrorOf: MirrorablePublication;
  onChainContentURI: Scalars['String'];
  profile: Profile;
  referenceModule?: Maybe<ReferenceModule>;
  stats: PublicationStats;
};

export type MirrorablePublication = Comment | Post;

export type ModuleFeeAmount = {
  __typename?: 'ModuleFeeAmount';
  asset: Erc20;
  value: Scalars['String'];
};

export type ModuleFeeAmountParams = {
  currency: Scalars['ContractAddress'];
  value: Scalars['String'];
};

export type ModuleInfo = {
  __typename?: 'ModuleInfo';
  name: Scalars['String'];
  type: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  attachFile: AttachResults;
  authenticate: AuthenticationResult;
  claim: RelayResult;
  createBurnProfileTypedData: CreateBurnProfileBroadcastItemResult;
  createCollectTypedData: CreateCollectBroadcastItemResult;
  createCommentTypedData: CreateCommentBroadcastItemResult;
  createFollowTypedData: CreateFollowBroadcastItemResult;
  createMirrorTypedData: CreateMirrorBroadcastItemResult;
  createPostTypedData: CreatePostBroadcastItemResult;
  createProfile: RelayResult;
  createSetDefaultProfileTypedData: SetDefaultProfileBroadcastItemResult;
  createSetDispatcherTypedData: CreateSetDispatcherBroadcastItemResult;
  createSetFollowModuleTypedData: CreateSetFollowModuleBroadcastItemResult;
  createSetFollowNFTUriTypedData: CreateSetFollowNftUriBroadcastItemResult;
  createSetProfileImageURITypedData: CreateSetProfileImageUriBroadcastItemResult;
  createSetProfileMetadataTypedData: CreateSetProfileMetadataUriBroadcastItemResult;
  createToggleFollowTypedData: CreateToggleFollowBroadcastItemResult;
  createUnfollowTypedData: CreateUnfollowBroadcastItemResult;
  hidePublication?: Maybe<Scalars['Void']>;
  refresh: AuthenticationResult;
  reportPublication?: Maybe<Scalars['Void']>;
  /** @deprecated Use createSetProfileMetadataTypedData instead  */
  updateProfile: Profile;
};

export type MutationAttachFileArgs = {
  request: AttachRequest;
};

export type MutationAuthenticateArgs = {
  request: SignedAuthChallenge;
};

export type MutationClaimArgs = {
  request: ClaimHandleRequest;
};

export type MutationCreateBurnProfileTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: BurnProfileRequest;
};

export type MutationCreateCollectTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: CreateCollectRequest;
};

export type MutationCreateCommentTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: CreatePublicCommentRequest;
};

export type MutationCreateFollowTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: FollowRequest;
};

export type MutationCreateMirrorTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: CreateMirrorRequest;
};

export type MutationCreatePostTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: CreatePublicPostRequest;
};

export type MutationCreateProfileArgs = {
  request: CreateProfileRequest;
};

export type MutationCreateSetDefaultProfileTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: CreateSetDefaultProfileRequest;
};

export type MutationCreateSetDispatcherTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: SetDispatcherRequest;
};

export type MutationCreateSetFollowModuleTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: CreateSetFollowModuleRequest;
};

export type MutationCreateSetFollowNftUriTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: CreateSetFollowNftUriRequest;
};

export type MutationCreateSetProfileImageUriTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: UpdateProfileImageRequest;
};

export type MutationCreateSetProfileMetadataTypedDataArgs = {
  request: CreatePublicSetProfileMetadataUriRequest;
};

export type MutationCreateToggleFollowTypedDataArgs = {
  request: CreateToggleFollowRequest;
};

export type MutationCreateUnfollowTypedDataArgs = {
  request: UnfollowRequest;
};

export type MutationHidePublicationArgs = {
  request: HidePublicationRequest;
};

export type MutationRefreshArgs = {
  request: RefreshRequest;
};

export type MutationReportPublicationArgs = {
  request: ReportPublicationRequest;
};

export type MutationUpdateProfileArgs = {
  request: UpdateProfileRequest;
};

export type Nft = {
  __typename?: 'NFT';
  chainId: Scalars['ChainId'];
  collectionName: Scalars['String'];
  contentURI: Scalars['String'];
  contractAddress: Scalars['ContractAddress'];
  contractName: Scalars['String'];
  description: Scalars['String'];
  ercType: Scalars['String'];
  name: Scalars['String'];
  originalContent: NftContent;
  owners: Array<Owner>;
  symbol: Scalars['String'];
  tokenId: Scalars['String'];
};

export type NftContent = {
  __typename?: 'NFTContent';
  metaType: Scalars['String'];
  uri: Scalars['String'];
};

export type NftData = {
  id: Scalars['NftOwnershipId'];
  signature: Scalars['Signature'];
};

export type NfTsRequest = {
  chainIds: Array<Scalars['ChainId']>;
  contractAddress?: InputMaybe<Scalars['ContractAddress']>;
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<Scalars['LimitScalar']>;
  ownerAddress: Scalars['EthereumAddress'];
};

export type NfTsResult = {
  __typename?: 'NFTsResult';
  items: Array<Nft>;
  pageInfo: PaginatedResultInfo;
};

export type NewCollectNotification = {
  __typename?: 'NewCollectNotification';
  collectedPublication: Publication;
  createdAt: Scalars['DateTime'];
  wallet: Wallet;
};

export type NewCommentNotification = {
  __typename?: 'NewCommentNotification';
  comment: Comment;
  createdAt: Scalars['DateTime'];
  profile: Profile;
};

export type NewFollowerNotification = {
  __typename?: 'NewFollowerNotification';
  createdAt: Scalars['DateTime'];
  isFollowedByMe: Scalars['Boolean'];
  wallet: Wallet;
};

export type NewMentionNotification = {
  __typename?: 'NewMentionNotification';
  createdAt: Scalars['DateTime'];
  mentionPublication: MentionPublication;
};

export type NewMirrorNotification = {
  __typename?: 'NewMirrorNotification';
  createdAt: Scalars['DateTime'];
  profile: Profile;
  publication: MirrorablePublication;
};

export type NftImage = {
  __typename?: 'NftImage';
  chainId: Scalars['Int'];
  contractAddress: Scalars['ContractAddress'];
  tokenId: Scalars['String'];
  uri: Scalars['Url'];
  verified: Scalars['Boolean'];
};

export type NftOwnershipChallenge = {
  chainId: Scalars['ChainId'];
  contractAddress: Scalars['ContractAddress'];
  tokenId: Scalars['String'];
};

export type NftOwnershipChallengeRequest = {
  ethereumAddress: Scalars['EthereumAddress'];
  nfts: Array<NftOwnershipChallenge>;
};

export type NftOwnershipChallengeResult = {
  __typename?: 'NftOwnershipChallengeResult';
  id: Scalars['NftOwnershipId'];
  text: Scalars['String'];
  timeout: Scalars['TimestampScalar'];
};

export type Notification =
  | NewCollectNotification
  | NewCommentNotification
  | NewFollowerNotification
  | NewMentionNotification
  | NewMirrorNotification;

export type NotificationRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<Scalars['LimitScalar']>;
  profileId?: InputMaybe<Scalars['ProfileId']>;
  sources?: InputMaybe<Array<Scalars['Sources']>>;
};

export type Owner = {
  __typename?: 'Owner';
  address: Scalars['EthereumAddress'];
  amount: Scalars['Float'];
};

export type PaginatedFollowersResult = {
  __typename?: 'PaginatedFollowersResult';
  items: Array<Follower>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedFollowingResult = {
  __typename?: 'PaginatedFollowingResult';
  items: Array<Following>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedNotificationResult = {
  __typename?: 'PaginatedNotificationResult';
  items: Array<Notification>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedProfileResult = {
  __typename?: 'PaginatedProfileResult';
  items: Array<Profile>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedPublicationResult = {
  __typename?: 'PaginatedPublicationResult';
  items: Array<Publication>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedResultInfo = {
  __typename?: 'PaginatedResultInfo';
  next?: Maybe<Scalars['Cursor']>;
  prev?: Maybe<Scalars['Cursor']>;
  totalCount: Scalars['Int'];
};

export type PaginatedTimelineResult = {
  __typename?: 'PaginatedTimelineResult';
  items: Array<Publication>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedWhoCollectedResult = {
  __typename?: 'PaginatedWhoCollectedResult';
  items: Array<Wallet>;
  pageInfo: PaginatedResultInfo;
};

export type PendingApprovalFollowsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<Scalars['LimitScalar']>;
};

export type PendingApproveFollowsResult = {
  __typename?: 'PendingApproveFollowsResult';
  items: Array<Profile>;
  pageInfo: PaginatedResultInfo;
};

export type Post = {
  __typename?: 'Post';
  appId?: Maybe<Scalars['Sources']>;
  collectModule: CollectModule;
  collectNftAddress?: Maybe<Scalars['ContractAddress']>;
  collectedBy?: Maybe<Wallet>;
  createdAt: Scalars['DateTime'];
  id: Scalars['InternalPublicationId'];
  metadata: MetadataOutput;
  onChainContentURI: Scalars['String'];
  profile: Profile;
  referenceModule?: Maybe<ReferenceModule>;
  stats: PublicationStats;
};

export type Profile = {
  __typename?: 'Profile';
  attributes?: Maybe<Array<Attribute>>;
  bio?: Maybe<Scalars['String']>;
  coverPicture?: Maybe<ProfileMedia>;
  depatcher?: Maybe<Dispatcher>;
  followModule?: Maybe<FollowModule>;
  handle: Scalars['Handle'];
  id: Scalars['ProfileId'];
  isDefault: Scalars['Boolean'];
  location?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['Url']>;
  name?: Maybe<Scalars['String']>;
  ownedBy: Scalars['EthereumAddress'];
  picture?: Maybe<ProfileMedia>;
  stats: ProfileStats;
  twitter?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['Url']>;
};

export type ProfileMedia = MediaSet | NftImage;

export type ProfileQueryRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  handles?: InputMaybe<Array<Scalars['Handle']>>;
  limit?: InputMaybe<Scalars['LimitScalar']>;
  ownedBy?: InputMaybe<Array<Scalars['EthereumAddress']>>;
  profileIds?: InputMaybe<Array<Scalars['ProfileId']>>;
  whoMirroredPublicationId?: InputMaybe<Scalars['InternalPublicationId']>;
};

export type ProfileRevenueQueryRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<Scalars['LimitScalar']>;
  profileId: Scalars['ProfileId'];
  sources?: InputMaybe<Array<Scalars['Sources']>>;
  types?: InputMaybe<Array<ProfileRevenueTypes>>;
};

export type ProfileRevenueResult = {
  __typename?: 'ProfileRevenueResult';
  items: Array<PublicationRevenue>;
  pageInfo: PaginatedResultInfo;
};

export enum ProfileRevenueTypes {
  Comment = 'COMMENT',
  Mirror = 'MIRROR',
  Post = 'POST',
}

export type ProfileSearchResult = {
  __typename?: 'ProfileSearchResult';
  items: Array<Profile>;
  pageInfo: PaginatedResultInfo;
  type: SearchRequestTypes;
};

export type ProfileStats = {
  __typename?: 'ProfileStats';
  totalCollects: Scalars['Int'];
  totalComments: Scalars['Int'];
  totalFollowers: Scalars['Int'];
  totalFollowing: Scalars['Int'];
  totalMirrors: Scalars['Int'];
  totalPosts: Scalars['Int'];
  totalPublications: Scalars['Int'];
};

export type Publication = Comment | Mirror | Post;

export type PublicationMetadataStatus = {
  __typename?: 'PublicationMetadataStatus';
  reason?: Maybe<Scalars['String']>;
  status: PublicationMetadataStatusType;
};

export enum PublicationMetadataStatusType {
  MetadataValidationFailed = 'METADATA_VALIDATION_FAILED',
  Pending = 'PENDING',
  Success = 'SUCCESS',
}

export type PublicationQueryRequest = {
  publicationId?: InputMaybe<Scalars['InternalPublicationId']>;
  txHash?: InputMaybe<Scalars['TxHash']>;
};

export enum PublicationReportingFraudSubreason {
  Impersonation = 'IMPERSONATION',
  Scam = 'SCAM',
}

export enum PublicationReportingIllegalSubreason {
  AnimalAbuse = 'ANIMAL_ABUSE',
  HumanAbuse = 'HUMAN_ABUSE',
}

export enum PublicationReportingReason {
  Fraud = 'FRAUD',
  Illegal = 'ILLEGAL',
  Sensitive = 'SENSITIVE',
}

export enum PublicationReportingSensitiveSubreason {
  Nsfw = 'NSFW',
  Offensive = 'OFFENSIVE',
}

export type PublicationRevenue = {
  __typename?: 'PublicationRevenue';
  earnings: Erc20Amount;
  protocolFee: Scalars['Float'];
  publication: Publication;
};

export type PublicationRevenueQueryRequest = {
  publicationId: Scalars['InternalPublicationId'];
};

export type PublicationSearchResult = {
  __typename?: 'PublicationSearchResult';
  items: Array<PublicationSearchResultItem>;
  pageInfo: PaginatedResultInfo;
  type: SearchRequestTypes;
};

export type PublicationSearchResultItem = Comment | Post;

export enum PublicationSortCriteria {
  Latest = 'LATEST',
  TopCollected = 'TOP_COLLECTED',
  TopCommented = 'TOP_COMMENTED',
}

export type PublicationStats = {
  __typename?: 'PublicationStats';
  totalAmountOfCollects: Scalars['Int'];
  totalAmountOfComments: Scalars['Int'];
  totalAmountOfMirrors: Scalars['Int'];
};

export enum PublicationTypes {
  Comment = 'COMMENT',
  Mirror = 'MIRROR',
  Post = 'POST',
}

export type PublicationsQueryRequest = {
  collectedBy?: InputMaybe<Scalars['EthereumAddress']>;
  commentsOf?: InputMaybe<Scalars['InternalPublicationId']>;
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<Scalars['LimitScalar']>;
  profileId?: InputMaybe<Scalars['ProfileId']>;
  publicationIds?: InputMaybe<Array<Scalars['InternalPublicationId']>>;
  publicationTypes?: InputMaybe<Array<PublicationTypes>>;
  sources?: InputMaybe<Array<Scalars['Sources']>>;
};

export type Query = {
  __typename?: 'Query';
  approvedModuleAllowanceAmount: Array<ApprovedAllowanceAmount>;
  challenge: AuthChallengeResult;
  claimableHandles: ClaimableHandles;
  defaultProfile?: Maybe<Profile>;
  doesFollow: Array<DoesFollowResponse>;
  enabledModuleCurrencies: Array<Erc20>;
  enabledModules: EnabledModules;
  explorePublications: ExplorePublicationResult;
  followerNftOwnedTokenIds: FollowerNftOwnedTokenIds;
  followers: PaginatedFollowersResult;
  following: PaginatedFollowingResult;
  generateModuleCurrencyApprovalData: GenerateModuleCurrencyApproval;
  globalProtocolStats: GlobalProtocolStats;
  hasCollected: Array<HasCollectedResult>;
  hasMirrored: Array<HasMirroredResult>;
  hasTxHashBeenIndexed: TransactionResult;
  nftOwnershipChallenge: NftOwnershipChallengeResult;
  nfts: NfTsResult;
  notifications: PaginatedNotificationResult;
  pendingApprovalFollows: PendingApproveFollowsResult;
  ping: Scalars['String'];
  profileRevenue: ProfileRevenueResult;
  profiles: PaginatedProfileResult;
  publication?: Maybe<Publication>;
  publicationRevenue: PublicationRevenue;
  publications: PaginatedPublicationResult;
  recommendedProfiles: Array<Profile>;
  search: SearchResult;
  timeline: PaginatedTimelineResult;
  userSigNonces: UserSigNonces;
  verify: Scalars['Boolean'];
  whoCollectedPublication: PaginatedWhoCollectedResult;
};

export type QueryApprovedModuleAllowanceAmountArgs = {
  request: ApprovedModuleAllowanceAmountRequest;
};

export type QueryChallengeArgs = {
  request: ChallengeRequest;
};

export type QueryDefaultProfileArgs = {
  request: DefaultProfileRequest;
};

export type QueryDoesFollowArgs = {
  request: DoesFollowRequest;
};

export type QueryExplorePublicationsArgs = {
  request: ExplorePublicationRequest;
};

export type QueryFollowerNftOwnedTokenIdsArgs = {
  request: FollowerNftOwnedTokenIdsRequest;
};

export type QueryFollowersArgs = {
  request: FollowersRequest;
};

export type QueryFollowingArgs = {
  request: FollowingRequest;
};

export type QueryGenerateModuleCurrencyApprovalDataArgs = {
  request: GenerateModuleCurrencyApprovalDataRequest;
};

export type QueryGlobalProtocolStatsArgs = {
  request?: InputMaybe<GlobalProtocolStatsRequest>;
};

export type QueryHasCollectedArgs = {
  request: HasCollectedRequest;
};

export type QueryHasMirroredArgs = {
  request: HasMirroredRequest;
};

export type QueryHasTxHashBeenIndexedArgs = {
  request: HasTxHashBeenIndexedRequest;
};

export type QueryNftOwnershipChallengeArgs = {
  request: NftOwnershipChallengeRequest;
};

export type QueryNftsArgs = {
  request: NfTsRequest;
};

export type QueryNotificationsArgs = {
  request: NotificationRequest;
};

export type QueryPendingApprovalFollowsArgs = {
  request: PendingApprovalFollowsRequest;
};

export type QueryProfileRevenueArgs = {
  request: ProfileRevenueQueryRequest;
};

export type QueryProfilesArgs = {
  request: ProfileQueryRequest;
};

export type QueryPublicationArgs = {
  request: PublicationQueryRequest;
};

export type QueryPublicationRevenueArgs = {
  request: PublicationRevenueQueryRequest;
};

export type QueryPublicationsArgs = {
  request: PublicationsQueryRequest;
};

export type QuerySearchArgs = {
  request: SearchQueryRequest;
};

export type QueryTimelineArgs = {
  request: TimelineRequest;
};

export type QueryVerifyArgs = {
  request: VerifyRequest;
};

export type QueryWhoCollectedPublicationArgs = {
  request: WhoCollectedPublicationRequest;
};

export type ReferenceModule = FollowOnlyReferenceModuleSettings;

export type ReferenceModuleParams = {
  followerOnlyReferenceModule?: InputMaybe<Scalars['Boolean']>;
};

export enum ReferenceModules {
  FollowerOnlyReferenceModule = 'FollowerOnlyReferenceModule',
}

export type RefreshRequest = {
  refreshToken: Scalars['Jwt'];
};

export type RelayError = {
  __typename?: 'RelayError';
  reason: RelayErrorReasons;
};

export enum RelayErrorReasons {
  Expired = 'EXPIRED',
  HandleTaken = 'HANDLE_TAKEN',
  Rejected = 'REJECTED',
  WrongWalletSigned = 'WRONG_WALLET_SIGNED',
}

export type RelayResult = RelayError | RelayerResult;

export type RelayerResult = {
  __typename?: 'RelayerResult';
  txHash: Scalars['TxHash'];
};

export type ReportPublicationRequest = {
  additionalComments?: InputMaybe<Scalars['String']>;
  publicationId: Scalars['InternalPublicationId'];
  reason: ReportingReasonInputParams;
};

export type ReportingReasonInputParams = {
  fraudReason?: InputMaybe<FraudReasonInputParams>;
  illegalReason?: InputMaybe<IllegalReasonInputParams>;
  sensitiveReason?: InputMaybe<SensitiveReasonInputParams>;
};

export type ReservedClaimableHandle = {
  __typename?: 'ReservedClaimableHandle';
  expiry: Scalars['DateTime'];
  handle: Scalars['Handle'];
  id: Scalars['HandleClaimIdScalar'];
  source: Scalars['String'];
};

export type RevertCollectModuleSettings = {
  __typename?: 'RevertCollectModuleSettings';
  contractAddress: Scalars['ContractAddress'];
  followerOnly: Scalars['Boolean'];
  type: CollectModules;
};

export type SearchQueryRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<Scalars['LimitScalar']>;
  query: Scalars['Search'];
  sources?: InputMaybe<Array<Scalars['Sources']>>;
  type: SearchRequestTypes;
};

export enum SearchRequestTypes {
  Profile = 'PROFILE',
  Publication = 'PUBLICATION',
}

export type SearchResult = ProfileSearchResult | PublicationSearchResult;

export type SensitiveReasonInputParams = {
  reason: PublicationReportingReason;
  subreason: PublicationReportingSensitiveSubreason;
};

export type SetDefaultProfileBroadcastItemResult = {
  __typename?: 'SetDefaultProfileBroadcastItemResult';
  expiresAt: Scalars['DateTime'];
  id: Scalars['BroadcastId'];
  typedData: SetDefaultProfileEip712TypedData;
};

export type SetDefaultProfileEip712TypedData = {
  __typename?: 'SetDefaultProfileEIP712TypedData';
  domain: Eip712TypedDataDomain;
  types: SetDefaultProfileEip712TypedDataTypes;
  value: SetDefaultProfileEip712TypedDataValue;
};

export type SetDefaultProfileEip712TypedDataTypes = {
  __typename?: 'SetDefaultProfileEIP712TypedDataTypes';
  SetDefaultProfileWithSig: Array<Eip712TypedDataField>;
};

export type SetDefaultProfileEip712TypedDataValue = {
  __typename?: 'SetDefaultProfileEIP712TypedDataValue';
  deadline: Scalars['UnixTimestamp'];
  nonce: Scalars['Nonce'];
  profileId: Scalars['ProfileId'];
  wallet: Scalars['EthereumAddress'];
};

export type SetDispatcherRequest = {
  dispatcher?: InputMaybe<Scalars['EthereumAddress']>;
  enable?: InputMaybe<Scalars['Boolean']>;
  profileId: Scalars['ProfileId'];
};

export type SignedAuthChallenge = {
  address: Scalars['EthereumAddress'];
  signature: Scalars['Signature'];
};

export type TimedFeeCollectModuleParams = {
  amount: ModuleFeeAmountParams;
  followerOnly: Scalars['Boolean'];
  recipient: Scalars['EthereumAddress'];
  referralFee: Scalars['Float'];
};

export type TimedFeeCollectModuleSettings = {
  __typename?: 'TimedFeeCollectModuleSettings';
  amount: ModuleFeeAmount;
  contractAddress: Scalars['ContractAddress'];
  endTimestamp: Scalars['DateTime'];
  followerOnly: Scalars['Boolean'];
  recipient: Scalars['EthereumAddress'];
  referralFee: Scalars['Float'];
  type: CollectModules;
};

export type TimelineRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<Scalars['LimitScalar']>;
  profileId: Scalars['ProfileId'];
  sources?: InputMaybe<Array<Scalars['Sources']>>;
};

export type TransactionError = {
  __typename?: 'TransactionError';
  reason: TransactionErrorReasons;
  txReceipt?: Maybe<TransactionReceipt>;
};

export enum TransactionErrorReasons {
  Reverted = 'REVERTED',
}

export type TransactionIndexedResult = {
  __typename?: 'TransactionIndexedResult';
  indexed: Scalars['Boolean'];
  metadataStatus?: Maybe<PublicationMetadataStatus>;
  txReceipt?: Maybe<TransactionReceipt>;
};

export type TransactionReceipt = {
  __typename?: 'TransactionReceipt';
  blockHash: Scalars['String'];
  blockNumber: Scalars['Int'];
  byzantium: Scalars['Boolean'];
  confirmations: Scalars['Int'];
  contractAddress?: Maybe<Scalars['ContractAddress']>;
  cumulativeGasUsed: Scalars['String'];
  effectiveGasPrice: Scalars['String'];
  from: Scalars['EthereumAddress'];
  gasUsed: Scalars['String'];
  logs: Array<Log>;
  logsBloom: Scalars['String'];
  root?: Maybe<Scalars['String']>;
  status: Scalars['Int'];
  to?: Maybe<Scalars['EthereumAddress']>;
  transactionHash: Scalars['TxHash'];
  transactionIndex: Scalars['Int'];
  type: Scalars['Int'];
};

export type TransactionResult = TransactionError | TransactionIndexedResult;

export type TypedDataOptions = {
  overrideSigNonce: Scalars['Nonce'];
};

export type UnfollowRequest = {
  profile: Scalars['ProfileId'];
};

export type UpdateProfileImageRequest = {
  nftData?: InputMaybe<NftData>;
  profileId: Scalars['ProfileId'];
  url?: InputMaybe<Scalars['Url']>;
};

export type UpdateProfileRequest = {
  bio?: InputMaybe<Scalars['String']>;
  coverPicture?: InputMaybe<Scalars['Url']>;
  location?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  profileId: Scalars['ProfileId'];
  twitterUrl?: InputMaybe<Scalars['Url']>;
  website?: InputMaybe<Scalars['Url']>;
};

export type UserSigNonces = {
  __typename?: 'UserSigNonces';
  lensHubOnChainSigNonce: Scalars['Nonce'];
};

export type VerifyRequest = {
  accessToken: Scalars['Jwt'];
};

export type Wallet = {
  __typename?: 'Wallet';
  address: Scalars['EthereumAddress'];
  defaultProfile?: Maybe<Profile>;
};

export type WhoCollectedPublicationRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<Scalars['LimitScalar']>;
  publicationId: Scalars['InternalPublicationId'];
};

import { IntrospectionQuery } from 'graphql';
export default {
  __schema: {
    queryType: {
      name: 'Query',
    },
    mutationType: {
      name: 'Mutation',
    },
    subscriptionType: null,
    types: [
      {
        kind: 'OBJECT',
        name: 'ApprovedAllowanceAmount',
        fields: [
          {
            name: 'allowance',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'contractAddress',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'currency',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'module',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'AttachResults',
        fields: [
          {
            name: 'key',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'signedUrl',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'Attribute',
        fields: [
          {
            name: 'displayType',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'key',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'traitType',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'value',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'AuthChallengeResult',
        fields: [
          {
            name: 'text',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'AuthenticationResult',
        fields: [
          {
            name: 'accessToken',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'refreshToken',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'ClaimableHandles',
        fields: [
          {
            name: 'canClaimFreeTextHandle',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'reservedHandles',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'ReservedClaimableHandle',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'UNION',
        name: 'CollectModule',
        possibleTypes: [
          {
            kind: 'OBJECT',
            name: 'FeeCollectModuleSettings',
          },
          {
            kind: 'OBJECT',
            name: 'FreeCollectModuleSettings',
          },
          {
            kind: 'OBJECT',
            name: 'LimitedFeeCollectModuleSettings',
          },
          {
            kind: 'OBJECT',
            name: 'LimitedTimedFeeCollectModuleSettings',
          },
          {
            kind: 'OBJECT',
            name: 'RevertCollectModuleSettings',
          },
          {
            kind: 'OBJECT',
            name: 'TimedFeeCollectModuleSettings',
          },
        ],
      },
      {
        kind: 'OBJECT',
        name: 'Comment',
        fields: [
          {
            name: 'appId',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'collectModule',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'UNION',
                name: 'CollectModule',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'collectNftAddress',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'collectedBy',
            type: {
              kind: 'OBJECT',
              name: 'Wallet',
              ofType: null,
            },
            args: [],
          },
          {
            name: 'commentOn',
            type: {
              kind: 'UNION',
              name: 'Publication',
              ofType: null,
            },
            args: [],
          },
          {
            name: 'createdAt',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'firstComment',
            type: {
              kind: 'OBJECT',
              name: 'Comment',
              ofType: null,
            },
            args: [],
          },
          {
            name: 'id',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'mainPost',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'UNION',
                name: 'MainPostReference',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'metadata',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'MetadataOutput',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'onChainContentURI',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'profile',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Profile',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'referenceModule',
            type: {
              kind: 'UNION',
              name: 'ReferenceModule',
              ofType: null,
            },
            args: [],
          },
          {
            name: 'stats',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'PublicationStats',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateBurnEIP712TypedData',
        fields: [
          {
            name: 'domain',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'EIP712TypedDataDomain',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'types',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateBurnEIP712TypedDataTypes',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'value',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateBurnEIP712TypedDataValue',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateBurnEIP712TypedDataTypes',
        fields: [
          {
            name: 'BurnWithSig',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'EIP712TypedDataField',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateBurnEIP712TypedDataValue',
        fields: [
          {
            name: 'deadline',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'nonce',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'tokenId',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateBurnProfileBroadcastItemResult',
        fields: [
          {
            name: 'expiresAt',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'id',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'typedData',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateBurnEIP712TypedData',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateCollectBroadcastItemResult',
        fields: [
          {
            name: 'expiresAt',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'id',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'typedData',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateCollectEIP712TypedData',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateCollectEIP712TypedData',
        fields: [
          {
            name: 'domain',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'EIP712TypedDataDomain',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'types',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateCollectEIP712TypedDataTypes',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'value',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateCollectEIP712TypedDataValue',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateCollectEIP712TypedDataTypes',
        fields: [
          {
            name: 'CollectWithSig',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'EIP712TypedDataField',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateCollectEIP712TypedDataValue',
        fields: [
          {
            name: 'data',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'deadline',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'nonce',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'profileId',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'pubId',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateCommentBroadcastItemResult',
        fields: [
          {
            name: 'expiresAt',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'id',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'typedData',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateCommentEIP712TypedData',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateCommentEIP712TypedData',
        fields: [
          {
            name: 'domain',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'EIP712TypedDataDomain',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'types',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateCommentEIP712TypedDataTypes',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'value',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateCommentEIP712TypedDataValue',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateCommentEIP712TypedDataTypes',
        fields: [
          {
            name: 'CommentWithSig',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'EIP712TypedDataField',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateCommentEIP712TypedDataValue',
        fields: [
          {
            name: 'collectModule',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'collectModuleData',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'contentURI',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'deadline',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'nonce',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'profileId',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'profileIdPointed',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'pubIdPointed',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'referenceModule',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'referenceModuleData',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateFollowBroadcastItemResult',
        fields: [
          {
            name: 'expiresAt',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'id',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'typedData',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateFollowEIP712TypedData',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateFollowEIP712TypedData',
        fields: [
          {
            name: 'domain',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'EIP712TypedDataDomain',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'types',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateFollowEIP712TypedDataTypes',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'value',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateFollowEIP712TypedDataValue',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateFollowEIP712TypedDataTypes',
        fields: [
          {
            name: 'FollowWithSig',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'EIP712TypedDataField',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateFollowEIP712TypedDataValue',
        fields: [
          {
            name: 'datas',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            },
            args: [],
          },
          {
            name: 'deadline',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'nonce',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'profileIds',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateMirrorBroadcastItemResult',
        fields: [
          {
            name: 'expiresAt',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'id',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'typedData',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateMirrorEIP712TypedData',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateMirrorEIP712TypedData',
        fields: [
          {
            name: 'domain',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'EIP712TypedDataDomain',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'types',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateMirrorEIP712TypedDataTypes',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'value',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateMirrorEIP712TypedDataValue',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateMirrorEIP712TypedDataTypes',
        fields: [
          {
            name: 'MirrorWithSig',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'EIP712TypedDataField',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateMirrorEIP712TypedDataValue',
        fields: [
          {
            name: 'deadline',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'nonce',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'profileId',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'profileIdPointed',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'pubIdPointed',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'referenceModule',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'referenceModuleData',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreatePostBroadcastItemResult',
        fields: [
          {
            name: 'expiresAt',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'id',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'typedData',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreatePostEIP712TypedData',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreatePostEIP712TypedData',
        fields: [
          {
            name: 'domain',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'EIP712TypedDataDomain',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'types',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreatePostEIP712TypedDataTypes',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'value',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreatePostEIP712TypedDataValue',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreatePostEIP712TypedDataTypes',
        fields: [
          {
            name: 'PostWithSig',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'EIP712TypedDataField',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreatePostEIP712TypedDataValue',
        fields: [
          {
            name: 'collectModule',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'collectModuleData',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'contentURI',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'deadline',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'nonce',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'profileId',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'referenceModule',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'referenceModuleData',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateSetDispatcherBroadcastItemResult',
        fields: [
          {
            name: 'expiresAt',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'id',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'typedData',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateSetDispatcherEIP712TypedData',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateSetDispatcherEIP712TypedData',
        fields: [
          {
            name: 'domain',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'EIP712TypedDataDomain',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'types',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateSetDispatcherEIP712TypedDataTypes',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'value',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateSetDispatcherEIP712TypedDataValue',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateSetDispatcherEIP712TypedDataTypes',
        fields: [
          {
            name: 'SetDispatcherWithSig',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'EIP712TypedDataField',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateSetDispatcherEIP712TypedDataValue',
        fields: [
          {
            name: 'deadline',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'dispatcher',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'nonce',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'profileId',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateSetFollowModuleBroadcastItemResult',
        fields: [
          {
            name: 'expiresAt',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'id',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'typedData',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateSetFollowModuleEIP712TypedData',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateSetFollowModuleEIP712TypedData',
        fields: [
          {
            name: 'domain',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'EIP712TypedDataDomain',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'types',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateSetFollowModuleEIP712TypedDataTypes',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'value',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateSetFollowModuleEIP712TypedDataValue',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateSetFollowModuleEIP712TypedDataTypes',
        fields: [
          {
            name: 'SetFollowModuleWithSig',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'EIP712TypedDataField',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateSetFollowModuleEIP712TypedDataValue',
        fields: [
          {
            name: 'deadline',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'followModule',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'followModuleData',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'nonce',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'profileId',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateSetFollowNFTUriBroadcastItemResult',
        fields: [
          {
            name: 'expiresAt',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'id',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'typedData',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateSetFollowNFTUriEIP712TypedData',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateSetFollowNFTUriEIP712TypedData',
        fields: [
          {
            name: 'domain',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'EIP712TypedDataDomain',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'types',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateSetFollowNFTUriEIP712TypedDataTypes',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'value',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateSetFollowNFTUriEIP712TypedDataValue',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateSetFollowNFTUriEIP712TypedDataTypes',
        fields: [
          {
            name: 'SetFollowNFTURIWithSig',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'EIP712TypedDataField',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateSetFollowNFTUriEIP712TypedDataValue',
        fields: [
          {
            name: 'deadline',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'followNFTURI',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'nonce',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'profileId',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateSetProfileImageUriBroadcastItemResult',
        fields: [
          {
            name: 'expiresAt',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'id',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'typedData',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateSetProfileImageUriEIP712TypedData',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateSetProfileImageUriEIP712TypedData',
        fields: [
          {
            name: 'domain',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'EIP712TypedDataDomain',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'types',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateSetProfileImageUriEIP712TypedDataTypes',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'value',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateSetProfileImageUriEIP712TypedDataValue',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateSetProfileImageUriEIP712TypedDataTypes',
        fields: [
          {
            name: 'SetProfileImageURIWithSig',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'EIP712TypedDataField',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateSetProfileImageUriEIP712TypedDataValue',
        fields: [
          {
            name: 'deadline',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'imageURI',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'nonce',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'profileId',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateSetProfileMetadataURIBroadcastItemResult',
        fields: [
          {
            name: 'expiresAt',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'id',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'typedData',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateSetProfileMetadataURIEIP712TypedData',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateSetProfileMetadataURIEIP712TypedData',
        fields: [
          {
            name: 'domain',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'EIP712TypedDataDomain',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'types',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateSetProfileMetadataURIEIP712TypedDataTypes',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'value',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateSetProfileMetadataURIEIP712TypedDataValue',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateSetProfileMetadataURIEIP712TypedDataTypes',
        fields: [
          {
            name: 'SetProfileMetadataURIWithSig',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'EIP712TypedDataField',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateSetProfileMetadataURIEIP712TypedDataValue',
        fields: [
          {
            name: 'deadline',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'metadata',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'nonce',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'profileId',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateToggleFollowBroadcastItemResult',
        fields: [
          {
            name: 'expiresAt',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'id',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'typedData',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateToggleFollowEIP712TypedData',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateToggleFollowEIP712TypedData',
        fields: [
          {
            name: 'domain',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'EIP712TypedDataDomain',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'types',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateToggleFollowEIP712TypedDataTypes',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'value',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateToggleFollowEIP712TypedDataValue',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateToggleFollowEIP712TypedDataTypes',
        fields: [
          {
            name: 'ToggleFollowWithSig',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'EIP712TypedDataField',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateToggleFollowEIP712TypedDataValue',
        fields: [
          {
            name: 'deadline',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'enables',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            },
            args: [],
          },
          {
            name: 'nonce',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'profileIds',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'CreateUnfollowBroadcastItemResult',
        fields: [
          {
            name: 'expiresAt',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'id',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'typedData',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateBurnEIP712TypedData',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'Dispatcher',
        fields: [
          {
            name: 'address',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'canUseRelay',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'DoesFollowResponse',
        fields: [
          {
            name: 'followerAddress',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'follows',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'profileId',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'EIP712TypedDataDomain',
        fields: [
          {
            name: 'chainId',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'name',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'verifyingContract',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'version',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'EIP712TypedDataField',
        fields: [
          {
            name: 'name',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'type',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'EnabledModule',
        fields: [
          {
            name: 'contractAddress',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'inputParams',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'ModuleInfo',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
          {
            name: 'moduleName',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'redeemParams',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'ModuleInfo',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
          {
            name: 'returnDataParms',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'ModuleInfo',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'EnabledModules',
        fields: [
          {
            name: 'collectModules',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'EnabledModule',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
          {
            name: 'followModules',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'EnabledModule',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
          {
            name: 'referenceModules',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'EnabledModule',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'Erc20',
        fields: [
          {
            name: 'address',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'decimals',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'name',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'symbol',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'Erc20Amount',
        fields: [
          {
            name: 'asset',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Erc20',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'value',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'ExplorePublicationResult',
        fields: [
          {
            name: 'items',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'UNION',
                    name: 'Publication',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
          {
            name: 'pageInfo',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'PaginatedResultInfo',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'FeeCollectModuleSettings',
        fields: [
          {
            name: 'amount',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'ModuleFeeAmount',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'contractAddress',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'followerOnly',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'recipient',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'referralFee',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'type',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'FeeFollowModuleSettings',
        fields: [
          {
            name: 'amount',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'ModuleFeeAmount',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'contractAddress',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'recipient',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'type',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'UNION',
        name: 'FollowModule',
        possibleTypes: [
          {
            kind: 'OBJECT',
            name: 'FeeFollowModuleSettings',
          },
        ],
      },
      {
        kind: 'OBJECT',
        name: 'FollowOnlyReferenceModuleSettings',
        fields: [
          {
            name: 'contractAddress',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'type',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'Follower',
        fields: [
          {
            name: 'totalAmountOfTimesFollowed',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'wallet',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Wallet',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'FollowerNftOwnedTokenIds',
        fields: [
          {
            name: 'followerNftAddress',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'tokensIds',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'Following',
        fields: [
          {
            name: 'profile',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Profile',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'totalAmountOfTimesFollowing',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'FreeCollectModuleSettings',
        fields: [
          {
            name: 'contractAddress',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'followerOnly',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'type',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'GenerateModuleCurrencyApproval',
        fields: [
          {
            name: 'data',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'from',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'to',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'GlobalProtocolStats',
        fields: [
          {
            name: 'totalBurntProfiles',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'totalCollects',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'totalComments',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'totalFollows',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'totalMirrors',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'totalPosts',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'totalProfiles',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'totalRevenue',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'Erc20Amount',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'HasCollectedItem',
        fields: [
          {
            name: 'collected',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'collectedTimes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'publicationId',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'HasCollectedResult',
        fields: [
          {
            name: 'results',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'HasCollectedItem',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
          {
            name: 'walletAddress',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'HasMirroredItem',
        fields: [
          {
            name: 'mirrored',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'publicationId',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'HasMirroredResult',
        fields: [
          {
            name: 'profileId',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'results',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'HasMirroredItem',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'LimitedFeeCollectModuleSettings',
        fields: [
          {
            name: 'amount',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'ModuleFeeAmount',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'collectLimit',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'contractAddress',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'followerOnly',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'recipient',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'referralFee',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'type',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'LimitedTimedFeeCollectModuleSettings',
        fields: [
          {
            name: 'amount',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'ModuleFeeAmount',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'collectLimit',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'contractAddress',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'endTimestamp',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'followerOnly',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'recipient',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'referralFee',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'type',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'Log',
        fields: [
          {
            name: 'address',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'blockHash',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'blockNumber',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'data',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'logIndex',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'removed',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'topics',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            },
            args: [],
          },
          {
            name: 'transactionHash',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'transactionIndex',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'UNION',
        name: 'MainPostReference',
        possibleTypes: [
          {
            kind: 'OBJECT',
            name: 'Mirror',
          },
          {
            kind: 'OBJECT',
            name: 'Post',
          },
        ],
      },
      {
        kind: 'OBJECT',
        name: 'Media',
        fields: [
          {
            name: 'height',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'mimeType',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'size',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'url',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'width',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'MediaSet',
        fields: [
          {
            name: 'medium',
            type: {
              kind: 'OBJECT',
              name: 'Media',
              ofType: null,
            },
            args: [],
          },
          {
            name: 'original',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Media',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'small',
            type: {
              kind: 'OBJECT',
              name: 'Media',
              ofType: null,
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'UNION',
        name: 'MentionPublication',
        possibleTypes: [
          {
            kind: 'OBJECT',
            name: 'Comment',
          },
          {
            kind: 'OBJECT',
            name: 'Post',
          },
        ],
      },
      {
        kind: 'OBJECT',
        name: 'MetadataAttributeOutput',
        fields: [
          {
            name: 'displayType',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'traitType',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'value',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'MetadataOutput',
        fields: [
          {
            name: 'attributes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'MetadataAttributeOutput',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
          {
            name: 'content',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'cover',
            type: {
              kind: 'OBJECT',
              name: 'MediaSet',
              ofType: null,
            },
            args: [],
          },
          {
            name: 'description',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'image',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'media',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'MediaSet',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
          {
            name: 'name',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'Mirror',
        fields: [
          {
            name: 'appId',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'collectModule',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'UNION',
                name: 'CollectModule',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'collectNftAddress',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'createdAt',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'id',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'metadata',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'MetadataOutput',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'mirrorOf',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'UNION',
                name: 'MirrorablePublication',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'onChainContentURI',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'profile',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Profile',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'referenceModule',
            type: {
              kind: 'UNION',
              name: 'ReferenceModule',
              ofType: null,
            },
            args: [],
          },
          {
            name: 'stats',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'PublicationStats',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'UNION',
        name: 'MirrorablePublication',
        possibleTypes: [
          {
            kind: 'OBJECT',
            name: 'Comment',
          },
          {
            kind: 'OBJECT',
            name: 'Post',
          },
        ],
      },
      {
        kind: 'OBJECT',
        name: 'ModuleFeeAmount',
        fields: [
          {
            name: 'asset',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Erc20',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'value',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'ModuleInfo',
        fields: [
          {
            name: 'name',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'type',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'Mutation',
        fields: [
          {
            name: 'attachFile',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'AttachResults',
                ofType: null,
              },
            },
            args: [
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'authenticate',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'AuthenticationResult',
                ofType: null,
              },
            },
            args: [
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'claim',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'UNION',
                name: 'RelayResult',
                ofType: null,
              },
            },
            args: [
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'createBurnProfileTypedData',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateBurnProfileBroadcastItemResult',
                ofType: null,
              },
            },
            args: [
              {
                name: 'options',
                type: {
                  kind: 'SCALAR',
                  name: 'Any',
                },
              },
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'createCollectTypedData',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateCollectBroadcastItemResult',
                ofType: null,
              },
            },
            args: [
              {
                name: 'options',
                type: {
                  kind: 'SCALAR',
                  name: 'Any',
                },
              },
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'createCommentTypedData',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateCommentBroadcastItemResult',
                ofType: null,
              },
            },
            args: [
              {
                name: 'options',
                type: {
                  kind: 'SCALAR',
                  name: 'Any',
                },
              },
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'createFollowTypedData',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateFollowBroadcastItemResult',
                ofType: null,
              },
            },
            args: [
              {
                name: 'options',
                type: {
                  kind: 'SCALAR',
                  name: 'Any',
                },
              },
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'createMirrorTypedData',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateMirrorBroadcastItemResult',
                ofType: null,
              },
            },
            args: [
              {
                name: 'options',
                type: {
                  kind: 'SCALAR',
                  name: 'Any',
                },
              },
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'createPostTypedData',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreatePostBroadcastItemResult',
                ofType: null,
              },
            },
            args: [
              {
                name: 'options',
                type: {
                  kind: 'SCALAR',
                  name: 'Any',
                },
              },
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'createProfile',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'UNION',
                name: 'RelayResult',
                ofType: null,
              },
            },
            args: [
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'createSetDefaultProfileTypedData',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'SetDefaultProfileBroadcastItemResult',
                ofType: null,
              },
            },
            args: [
              {
                name: 'options',
                type: {
                  kind: 'SCALAR',
                  name: 'Any',
                },
              },
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'createSetDispatcherTypedData',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateSetDispatcherBroadcastItemResult',
                ofType: null,
              },
            },
            args: [
              {
                name: 'options',
                type: {
                  kind: 'SCALAR',
                  name: 'Any',
                },
              },
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'createSetFollowModuleTypedData',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateSetFollowModuleBroadcastItemResult',
                ofType: null,
              },
            },
            args: [
              {
                name: 'options',
                type: {
                  kind: 'SCALAR',
                  name: 'Any',
                },
              },
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'createSetFollowNFTUriTypedData',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateSetFollowNFTUriBroadcastItemResult',
                ofType: null,
              },
            },
            args: [
              {
                name: 'options',
                type: {
                  kind: 'SCALAR',
                  name: 'Any',
                },
              },
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'createSetProfileImageURITypedData',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateSetProfileImageUriBroadcastItemResult',
                ofType: null,
              },
            },
            args: [
              {
                name: 'options',
                type: {
                  kind: 'SCALAR',
                  name: 'Any',
                },
              },
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'createSetProfileMetadataTypedData',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateSetProfileMetadataURIBroadcastItemResult',
                ofType: null,
              },
            },
            args: [
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'createToggleFollowTypedData',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateToggleFollowBroadcastItemResult',
                ofType: null,
              },
            },
            args: [
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'createUnfollowTypedData',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CreateUnfollowBroadcastItemResult',
                ofType: null,
              },
            },
            args: [
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'hidePublication',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'refresh',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'AuthenticationResult',
                ofType: null,
              },
            },
            args: [
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'reportPublication',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'updateProfile',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Profile',
                ofType: null,
              },
            },
            args: [
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'NFT',
        fields: [
          {
            name: 'chainId',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'collectionName',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'contentURI',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'contractAddress',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'contractName',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'description',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'ercType',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'name',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'originalContent',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'NFTContent',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'owners',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'Owner',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
          {
            name: 'symbol',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'tokenId',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'NFTContent',
        fields: [
          {
            name: 'metaType',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'uri',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'NFTsResult',
        fields: [
          {
            name: 'items',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'NFT',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
          {
            name: 'pageInfo',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'PaginatedResultInfo',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'NewCollectNotification',
        fields: [
          {
            name: 'collectedPublication',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'UNION',
                name: 'Publication',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'createdAt',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'wallet',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Wallet',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'NewCommentNotification',
        fields: [
          {
            name: 'comment',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Comment',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'createdAt',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'profile',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Profile',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'NewFollowerNotification',
        fields: [
          {
            name: 'createdAt',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'isFollowedByMe',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'wallet',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Wallet',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'NewMentionNotification',
        fields: [
          {
            name: 'createdAt',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'mentionPublication',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'UNION',
                name: 'MentionPublication',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'NewMirrorNotification',
        fields: [
          {
            name: 'createdAt',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'profile',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Profile',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'publication',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'UNION',
                name: 'MirrorablePublication',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'NftImage',
        fields: [
          {
            name: 'chainId',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'contractAddress',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'tokenId',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'uri',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'verified',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'NftOwnershipChallengeResult',
        fields: [
          {
            name: 'id',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'text',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'timeout',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'UNION',
        name: 'Notification',
        possibleTypes: [
          {
            kind: 'OBJECT',
            name: 'NewCollectNotification',
          },
          {
            kind: 'OBJECT',
            name: 'NewCommentNotification',
          },
          {
            kind: 'OBJECT',
            name: 'NewFollowerNotification',
          },
          {
            kind: 'OBJECT',
            name: 'NewMentionNotification',
          },
          {
            kind: 'OBJECT',
            name: 'NewMirrorNotification',
          },
        ],
      },
      {
        kind: 'OBJECT',
        name: 'Owner',
        fields: [
          {
            name: 'address',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'amount',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'PaginatedFollowersResult',
        fields: [
          {
            name: 'items',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'Follower',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
          {
            name: 'pageInfo',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'PaginatedResultInfo',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'PaginatedFollowingResult',
        fields: [
          {
            name: 'items',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'Following',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
          {
            name: 'pageInfo',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'PaginatedResultInfo',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'PaginatedNotificationResult',
        fields: [
          {
            name: 'items',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'UNION',
                    name: 'Notification',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
          {
            name: 'pageInfo',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'PaginatedResultInfo',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'PaginatedProfileResult',
        fields: [
          {
            name: 'items',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'Profile',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
          {
            name: 'pageInfo',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'PaginatedResultInfo',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'PaginatedPublicationResult',
        fields: [
          {
            name: 'items',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'UNION',
                    name: 'Publication',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
          {
            name: 'pageInfo',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'PaginatedResultInfo',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'PaginatedResultInfo',
        fields: [
          {
            name: 'next',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'prev',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'totalCount',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'PaginatedTimelineResult',
        fields: [
          {
            name: 'items',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'UNION',
                    name: 'Publication',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
          {
            name: 'pageInfo',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'PaginatedResultInfo',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'PaginatedWhoCollectedResult',
        fields: [
          {
            name: 'items',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'Wallet',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
          {
            name: 'pageInfo',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'PaginatedResultInfo',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'PendingApproveFollowsResult',
        fields: [
          {
            name: 'items',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'Profile',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
          {
            name: 'pageInfo',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'PaginatedResultInfo',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'Post',
        fields: [
          {
            name: 'appId',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'collectModule',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'UNION',
                name: 'CollectModule',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'collectNftAddress',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'collectedBy',
            type: {
              kind: 'OBJECT',
              name: 'Wallet',
              ofType: null,
            },
            args: [],
          },
          {
            name: 'createdAt',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'id',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'metadata',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'MetadataOutput',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'onChainContentURI',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'profile',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Profile',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'referenceModule',
            type: {
              kind: 'UNION',
              name: 'ReferenceModule',
              ofType: null,
            },
            args: [],
          },
          {
            name: 'stats',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'PublicationStats',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'Profile',
        fields: [
          {
            name: 'attributes',
            type: {
              kind: 'LIST',
              ofType: {
                kind: 'NON_NULL',
                ofType: {
                  kind: 'OBJECT',
                  name: 'Attribute',
                  ofType: null,
                },
              },
            },
            args: [],
          },
          {
            name: 'bio',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'coverPicture',
            type: {
              kind: 'UNION',
              name: 'ProfileMedia',
              ofType: null,
            },
            args: [],
          },
          {
            name: 'depatcher',
            type: {
              kind: 'OBJECT',
              name: 'Dispatcher',
              ofType: null,
            },
            args: [],
          },
          {
            name: 'followModule',
            type: {
              kind: 'UNION',
              name: 'FollowModule',
              ofType: null,
            },
            args: [],
          },
          {
            name: 'handle',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'id',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'isDefault',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'location',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'metadata',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'name',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'ownedBy',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'picture',
            type: {
              kind: 'UNION',
              name: 'ProfileMedia',
              ofType: null,
            },
            args: [],
          },
          {
            name: 'stats',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'ProfileStats',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'twitter',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'website',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'UNION',
        name: 'ProfileMedia',
        possibleTypes: [
          {
            kind: 'OBJECT',
            name: 'MediaSet',
          },
          {
            kind: 'OBJECT',
            name: 'NftImage',
          },
        ],
      },
      {
        kind: 'OBJECT',
        name: 'ProfileRevenueResult',
        fields: [
          {
            name: 'items',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'PublicationRevenue',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
          {
            name: 'pageInfo',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'PaginatedResultInfo',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'ProfileSearchResult',
        fields: [
          {
            name: 'items',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'Profile',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
          {
            name: 'pageInfo',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'PaginatedResultInfo',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'type',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'ProfileStats',
        fields: [
          {
            name: 'totalCollects',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'totalComments',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'totalFollowers',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'totalFollowing',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'totalMirrors',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'totalPosts',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'totalPublications',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'UNION',
        name: 'Publication',
        possibleTypes: [
          {
            kind: 'OBJECT',
            name: 'Comment',
          },
          {
            kind: 'OBJECT',
            name: 'Mirror',
          },
          {
            kind: 'OBJECT',
            name: 'Post',
          },
        ],
      },
      {
        kind: 'OBJECT',
        name: 'PublicationMetadataStatus',
        fields: [
          {
            name: 'reason',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'status',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'PublicationRevenue',
        fields: [
          {
            name: 'earnings',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Erc20Amount',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'protocolFee',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'publication',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'UNION',
                name: 'Publication',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'PublicationSearchResult',
        fields: [
          {
            name: 'items',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'UNION',
                    name: 'PublicationSearchResultItem',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
          {
            name: 'pageInfo',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'PaginatedResultInfo',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'type',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'UNION',
        name: 'PublicationSearchResultItem',
        possibleTypes: [
          {
            kind: 'OBJECT',
            name: 'Comment',
          },
          {
            kind: 'OBJECT',
            name: 'Post',
          },
        ],
      },
      {
        kind: 'OBJECT',
        name: 'PublicationStats',
        fields: [
          {
            name: 'totalAmountOfCollects',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'totalAmountOfComments',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'totalAmountOfMirrors',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'Query',
        fields: [
          {
            name: 'approvedModuleAllowanceAmount',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'ApprovedAllowanceAmount',
                    ofType: null,
                  },
                },
              },
            },
            args: [
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'challenge',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'AuthChallengeResult',
                ofType: null,
              },
            },
            args: [
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'claimableHandles',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'ClaimableHandles',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'defaultProfile',
            type: {
              kind: 'OBJECT',
              name: 'Profile',
              ofType: null,
            },
            args: [
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'doesFollow',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'DoesFollowResponse',
                    ofType: null,
                  },
                },
              },
            },
            args: [
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'enabledModuleCurrencies',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'Erc20',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
          {
            name: 'enabledModules',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'EnabledModules',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'explorePublications',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'ExplorePublicationResult',
                ofType: null,
              },
            },
            args: [
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'followerNftOwnedTokenIds',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'FollowerNftOwnedTokenIds',
                ofType: null,
              },
            },
            args: [
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'followers',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'PaginatedFollowersResult',
                ofType: null,
              },
            },
            args: [
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'following',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'PaginatedFollowingResult',
                ofType: null,
              },
            },
            args: [
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'generateModuleCurrencyApprovalData',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'GenerateModuleCurrencyApproval',
                ofType: null,
              },
            },
            args: [
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'globalProtocolStats',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'GlobalProtocolStats',
                ofType: null,
              },
            },
            args: [
              {
                name: 'request',
                type: {
                  kind: 'SCALAR',
                  name: 'Any',
                },
              },
            ],
          },
          {
            name: 'hasCollected',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'HasCollectedResult',
                    ofType: null,
                  },
                },
              },
            },
            args: [
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'hasMirrored',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'HasMirroredResult',
                    ofType: null,
                  },
                },
              },
            },
            args: [
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'hasTxHashBeenIndexed',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'UNION',
                name: 'TransactionResult',
                ofType: null,
              },
            },
            args: [
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'nftOwnershipChallenge',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'NftOwnershipChallengeResult',
                ofType: null,
              },
            },
            args: [
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'nfts',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'NFTsResult',
                ofType: null,
              },
            },
            args: [
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'notifications',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'PaginatedNotificationResult',
                ofType: null,
              },
            },
            args: [
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'pendingApprovalFollows',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'PendingApproveFollowsResult',
                ofType: null,
              },
            },
            args: [
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'ping',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'profileRevenue',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'ProfileRevenueResult',
                ofType: null,
              },
            },
            args: [
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'profiles',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'PaginatedProfileResult',
                ofType: null,
              },
            },
            args: [
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'publication',
            type: {
              kind: 'UNION',
              name: 'Publication',
              ofType: null,
            },
            args: [
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'publicationRevenue',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'PublicationRevenue',
                ofType: null,
              },
            },
            args: [
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'publications',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'PaginatedPublicationResult',
                ofType: null,
              },
            },
            args: [
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'recommendedProfiles',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'Profile',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
          {
            name: 'search',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'UNION',
                name: 'SearchResult',
                ofType: null,
              },
            },
            args: [
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'timeline',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'PaginatedTimelineResult',
                ofType: null,
              },
            },
            args: [
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'userSigNonces',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'UserSigNonces',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'verify',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
          {
            name: 'whoCollectedPublication',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'PaginatedWhoCollectedResult',
                ofType: null,
              },
            },
            args: [
              {
                name: 'request',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any',
                  },
                },
              },
            ],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'UNION',
        name: 'ReferenceModule',
        possibleTypes: [
          {
            kind: 'OBJECT',
            name: 'FollowOnlyReferenceModuleSettings',
          },
        ],
      },
      {
        kind: 'OBJECT',
        name: 'RelayError',
        fields: [
          {
            name: 'reason',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'UNION',
        name: 'RelayResult',
        possibleTypes: [
          {
            kind: 'OBJECT',
            name: 'RelayError',
          },
          {
            kind: 'OBJECT',
            name: 'RelayerResult',
          },
        ],
      },
      {
        kind: 'OBJECT',
        name: 'RelayerResult',
        fields: [
          {
            name: 'txHash',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'ReservedClaimableHandle',
        fields: [
          {
            name: 'expiry',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'handle',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'id',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'source',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'RevertCollectModuleSettings',
        fields: [
          {
            name: 'contractAddress',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'followerOnly',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'type',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'UNION',
        name: 'SearchResult',
        possibleTypes: [
          {
            kind: 'OBJECT',
            name: 'ProfileSearchResult',
          },
          {
            kind: 'OBJECT',
            name: 'PublicationSearchResult',
          },
        ],
      },
      {
        kind: 'OBJECT',
        name: 'SetDefaultProfileBroadcastItemResult',
        fields: [
          {
            name: 'expiresAt',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'id',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'typedData',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'SetDefaultProfileEIP712TypedData',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'SetDefaultProfileEIP712TypedData',
        fields: [
          {
            name: 'domain',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'EIP712TypedDataDomain',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'types',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'SetDefaultProfileEIP712TypedDataTypes',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'value',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'SetDefaultProfileEIP712TypedDataValue',
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'SetDefaultProfileEIP712TypedDataTypes',
        fields: [
          {
            name: 'SetDefaultProfileWithSig',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'EIP712TypedDataField',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'SetDefaultProfileEIP712TypedDataValue',
        fields: [
          {
            name: 'deadline',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'nonce',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'profileId',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'wallet',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'TimedFeeCollectModuleSettings',
        fields: [
          {
            name: 'amount',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'ModuleFeeAmount',
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: 'contractAddress',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'endTimestamp',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'followerOnly',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'recipient',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'referralFee',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'type',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'TransactionError',
        fields: [
          {
            name: 'reason',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'txReceipt',
            type: {
              kind: 'OBJECT',
              name: 'TransactionReceipt',
              ofType: null,
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'TransactionIndexedResult',
        fields: [
          {
            name: 'indexed',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'metadataStatus',
            type: {
              kind: 'OBJECT',
              name: 'PublicationMetadataStatus',
              ofType: null,
            },
            args: [],
          },
          {
            name: 'txReceipt',
            type: {
              kind: 'OBJECT',
              name: 'TransactionReceipt',
              ofType: null,
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'TransactionReceipt',
        fields: [
          {
            name: 'blockHash',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'blockNumber',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'byzantium',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'confirmations',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'contractAddress',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'cumulativeGasUsed',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'effectiveGasPrice',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'from',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'gasUsed',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'logs',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'Log',
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
          {
            name: 'logsBloom',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'root',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'status',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'to',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'transactionHash',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'transactionIndex',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'type',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'UNION',
        name: 'TransactionResult',
        possibleTypes: [
          {
            kind: 'OBJECT',
            name: 'TransactionError',
          },
          {
            kind: 'OBJECT',
            name: 'TransactionIndexedResult',
          },
        ],
      },
      {
        kind: 'OBJECT',
        name: 'UserSigNonces',
        fields: [
          {
            name: 'lensHubOnChainSigNonce',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'Wallet',
        fields: [
          {
            name: 'address',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'defaultProfile',
            type: {
              kind: 'OBJECT',
              name: 'Profile',
              ofType: null,
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'SCALAR',
        name: 'Any',
      },
    ],
    directives: [],
  },
} as unknown as IntrospectionQuery;
