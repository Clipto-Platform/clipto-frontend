export const queryChallenge = `query Challenge($address: EthereumAddress!) {
  challenge(request: { address: $address }) {
    text
  }
}`;

export const queryAuth = `mutation Authenticate($address: EthereumAddress!, $signature: Signature!) {
  authenticate(request: {
    address: $address,
    signature: $signature
  }) {
    accessToken
    refreshToken
  }
}`;

export const mutationProfile = `mutation($request: CreateProfileRequest!) { 
  createProfile(request: $request) {
    ... on RelayerResult {
      txHash
    }
    ... on RelayError {
      reason
    }
          __typename
  }
}`;

export const queryProfile = `query Profiles($address: EthereumAddress!) {
  profiles(request: { ownedBy: [$address] }) {
    items {
      id
      name
      bio
      stats {
        ... on ProfileStats {
          totalFollowers
          totalFollowing
        }
      }
      picture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
        __typename
      }
      handle
      coverPicture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
        __typename
      }
      ownedBy
      dispatcher {
        address
        canUseRelay
      }
      stats {
        totalFollowers
        totalFollowing
        totalPosts
        totalComments
        totalMirrors
        totalPublications
        totalCollects
      }
      followModule {
        ... on FeeFollowModuleSettings {
          type
          amount {
            asset {
              symbol
              name
              decimals
              address
            }
            value
          }
          recipient
        }
        __typename
      }
    }
    pageInfo {
      prev
      next
      totalCount
    }
  }
}`;

export const queryProfileByHandle = `
query Profiles ($handle: Handle!){
  profiles(request: { handles: [$handle], limit: 1 }) {
    items {
      followModule {
        __typename # used to check what type of follow module that they are using
      }
      id
      ownedBy
    }
  }
}
`;

export const mutationFollow = `
  mutation CreateFollowTypedData ($profile: ProfileId!){
    createFollowTypedData(request:{
      follow: [
        {
          profile: $profile,
          # followModule: {profileFollowModule: {profileId: $profile}}
        }
      ]
    }) {
      id
      expiresAt
      typedData {
        domain {
          name
          chainId
          version
          verifyingContract
        }
        types {
          FollowWithSig {
            name
            type
          }
        }
        value {
          nonce
          deadline
          profileIds
          datas
        }
      }
    }
  }
`;

export const mutationUnfollow = `
  mutation($profile: ProfileId!) { 
    createUnfollowTypedData(request:{
      profile: $profile,
    }) {
      id
      expiresAt
      typedData {
        domain {
          name
          chainId
          version
          verifyingContract
        }
        types {
          BurnWithSig {
            name
            type
          }
        }
        value {
          nonce
          deadline
          tokenId
        }
      }
    }
  }
`;

export const queryFollowing = `
query($request: FollowingRequest!) {
  following(request: $request) { 
              items {
         profile {
            id
            name
            bio
            handle
            picture {
              ... on NftImage {
                contractAddress
                tokenId
                uri
                verified
              }
              ... on MediaSet {
                original {
                  url
                  width
                  height
                  mimeType
                }
                medium {
                  url
                  width
                  height
                  mimeType
                }
                small {
                  url
                  width
                  height
                  mimeType
                }
              }
            }
            coverPicture {
              ... on NftImage {
                contractAddress
                tokenId
                uri
                verified
              }
              ... on MediaSet {
                original {
                  url
                  width
                  height
                  mimeType
                }
                small {
                  width
                  url
                  height
                  mimeType
                }
                medium {
                  url
                  width
                  height
                  mimeType
                }
              }
            }
            ownedBy
            dispatcher {
              address
              canUseRelay
            }
            stats {
              totalFollowers
              totalFollowing
              totalPosts
              totalComments
              totalMirrors
              totalPublications
              totalCollects
            }
            followModule {
              ... on FeeFollowModuleSettings {
                type
                amount {
                  asset {
                    name
                    symbol
                    decimals
                    address
                  }
                  value
                }
                recipient
              }
          }
        }
      }
     pageInfo {
        prev
        next
        totalCount
     }
      }
}
`;

export const queryDoesFollow = `
  query DoesFollow ($address: EthereumAddress!, $profileId: ProfileId!) {
    doesFollow(request: { 
                  followInfos: [
                    {
                      followerAddress: $address,
                      profileId: $profileId
                    }
                  ] 
              }) {
      followerAddress
      profileId
      follows
    }
  }
`;

export const queryTxWait = `
query HasTxHashBeenIndexed ($txHash: TxHash!){
  hasTxHashBeenIndexed(request: { txHash: $txHash }) {
    ... on TransactionIndexedResult {
      indexed
      txReceipt {
        to
        from
        contractAddress
        transactionIndex
        root
        gasUsed
        logsBloom
        blockHash
        transactionHash
        blockNumber
        confirmations
        cumulativeGasUsed
        effectiveGasPrice
        byzantium
        type
        status
        logs {
          blockNumber
          blockHash
          transactionIndex
          removed
          address
          data
          topics
          transactionHash
          logIndex
        }
      }
      metadataStatus {
        status
        reason
      }
    }
    ... on TransactionError {
      reason
      txReceipt {
        to
        from
        contractAddress
        transactionIndex
        root
        gasUsed
        logsBloom
        blockHash
        transactionHash
        blockNumber
        confirmations
        cumulativeGasUsed
        effectiveGasPrice
        byzantium
        type
        status
        logs {
          blockNumber
          blockHash
          transactionIndex
          removed
          address
          data
          topics
          transactionHash
          logIndex
        }
      }
    },
    __typename
  }
}
`;

export const queryVerify = `
query Query ($accessToken: Jwt!) {
  verify(request: {
    accessToken:$accessToken
  })
}
`;

export const queryRefresh = `
mutation Refresh ($refreshToken: Jwt!) {
  refresh(request: { refreshToken: $refreshToken }) {
    accessToken
    refreshToken
  }
}
`;

export const queryTwitterPosts = `
query ProfileFeed($request: PublicationsQueryRequest!, $reactionRequest: ReactionFieldResolverRequest) {
  publications(request: $request) {
    items {
      ... on Post {
        ...PostFields
        __typename
      }
      ... on Comment {
        ...CommentFields
        __typename
      }
      ... on Mirror {
        ...MirrorFields
        __typename
      }
      __typename
    }
    pageInfo {
      totalCount
      next
      __typename
    }
    __typename
  }
}

fragment PostFields on Post {
  
  id
  reaction(request: $reactionRequest)
  profile {
    ...MinimalProfileFields
    __typename
  }
  collectedBy {
    address
    defaultProfile {
      handle
      __typename
    }
    __typename
  }
  collectModule {
    ...MinimalCollectModuleFields
    __typename
  }
  hidden
  hasCollectedByMe
  stats {
    totalAmountOfComments
    totalAmountOfCollects
    totalAmountOfMirrors
    totalUpvotes
    totalDownvotes
    __typename
  }
  metadata {
    name
    description
    content
    
    description
    media {
      original {
        url
        mimeType
        __typename
      }
      __typename
    }
    cover {
      original {
        url
        __typename
      }
      __typename
    }
    attributes {
      value
      
      traitType
      __typename
    }
    __typename
  }
  createdAt
  appId
  __typename
}

fragment MinimalProfileFields on Profile {
  id
  name
  handle
  bio
  ownedBy
  isFollowedByMe
  attributes {
    key
    value
    __typename
  }
  stats {
    totalFollowers
    totalPosts
    __typename
  }
  picture {
    ... on MediaSet {
      original {
        url
        __typename
      }
      __typename
    }
    ... on NftImage {
      uri
      __typename
    }
    __typename
  }
  followModule {
    __typename
  }
  __typename
}

fragment MinimalCollectModuleFields on CollectModule {
  ... on FreeCollectModuleSettings {
    type
    followerOnly
    __typename
  }
  ... on FeeCollectModuleSettings {
    type
    amount {
      asset {
        address
        __typename
      }
      __typename
    }
    __typename
  }
  ... on LimitedFeeCollectModuleSettings {
    type
    amount {
      asset {
        address
        __typename
      }
      __typename
    }
    __typename
  }
  ... on LimitedTimedFeeCollectModuleSettings {
    type
    amount {
      asset {
        address
        __typename
      }
      __typename
    }
    __typename
  }
  ... on TimedFeeCollectModuleSettings {
    type
    amount {
      asset {
        address
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}

fragment CommentFields on Comment {
  id
  profile {
    ...MinimalProfileFields
    __typename
  }
  reaction(request: $reactionRequest)
  collectedBy {
    address
    defaultProfile {
      handle
      __typename
    }
    __typename
  }
  hidden
  collectModule {
    ...MinimalCollectModuleFields
    __typename
  }
  stats {
    totalAmountOfComments
    totalAmountOfCollects
    totalAmountOfMirrors
    totalDownvotes
    totalUpvotes
    __typename
  }
  metadata {
    name
    description
    content
    description
    media {
      original {
        url
        mimeType
        __typename
      }
      __typename
    }
    attributes {
      traitType
      value
      __typename
    }
    __typename
  }
  commentOn {
    ... on Post {
      pubId: id
      createdAt
      profile {
        ...MinimalProfileFields
        __typename
      }
      metadata {
        name
        content
        cover {
          original {
            url
            __typename
          }
          __typename
        }
        attributes {
          value
          traitType
          __typename
        }
        __typename
      }
      __typename
    }
    ... on Comment {
      id
      profile {
        ...MinimalProfileFields
        __typename
      }
      reaction(request: $reactionRequest)
      metadata {
        name
        content
        __typename
      }
      __typename
    }
    __typename
  }
  createdAt
  appId
  __typename
}

fragment MirrorFields on Mirror {
  id
  profile {
    name
    handle
    __typename
  }
  reaction(request: $reactionRequest)
  collectModule {
    ...MinimalCollectModuleFields
    __typename
  }
  stats {
    totalUpvotes
    totalAmountOfMirrors
    totalAmountOfCollects
    totalAmountOfComments
    __typename
  }
  metadata {
    ...MetadataFields
    __typename
  }
  mirrorOf {
    ... on Post {
      id
      profile {
        ...MinimalProfileFields
        __typename
      }
      metadata {
        ...MetadataFields
        __typename
      }
      reaction(request: $reactionRequest)
      stats {
        totalUpvotes
        totalAmountOfMirrors
        totalAmountOfCollects
        totalAmountOfComments
        __typename
      }
      __typename
    }
    ... on Comment {
      id
      profile {
        ...MinimalProfileFields
        __typename
      }
      reaction(request: $reactionRequest)
      stats {
        totalUpvotes
        totalAmountOfMirrors
        totalAmountOfCollects
        totalAmountOfComments
        __typename
      }
      __typename
    }
    __typename
  }
  createdAt
  appId
  __typename
}

fragment MetadataFields on MetadataOutput {
  name
  description
  content
  cover {
    original {
      url
      __typename
    }
    __typename
  }
  media {
    original {
      url
      mimeType
      __typename
    }
    __typename
  }
  attributes {
    value
    traitType
    __typename
  }
  __typename
}
`;

//publications

export const mutationCreatePostTypedData = `
mutation CreatePostTypedData($options: TypedDataOptions, $request: CreatePublicPostRequest!) {
  createPostTypedData(options: $options, request: $request) {
    id
    expiresAt
    typedData {
      types {
        PostWithSig {
          name
          type
          __typename
        }
        __typename
      }
      domain {
        name
        chainId
        version
        verifyingContract
        __typename
      }
      value {
        nonce
        deadline
        profileId
        contentURI
        collectModule
        collectModuleInitData
        referenceModule
        referenceModuleInitData
        __typename
      }
      __typename
    }
    __typename
  }
}
`;

export const mutationBroadcast = `
mutation Broadcast($request: BroadcastRequest!) {
  broadcast(request: $request) {
    ... on RelayerResult {
      txHash
      __typename
    }
    ... on RelayError {
      reason
      __typename
    }
    __typename
  }
}
`;
