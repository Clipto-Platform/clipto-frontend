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
