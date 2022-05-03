export const queryChallenge = `query Challenge($address: EthereumAddress!) {
  challenge(request: { address: $address }) {
    text
  }
}`

export const queryAuth = `mutation Authenticate($address: EthereumAddress!, $signature: Signature!) {
  authenticate(request: {
    address: $address,
    signature: $signature
  }) {
    accessToken
    refreshToken
  }
}`

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
}`

export const queryProfile = `query Profiles($address: EthereumAddress!) {
  profiles(request: { ownedBy: [$address], limit: 10 }) {
    items {
      id
      name
      bio
      location
      website
      twitter
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
      depatcher {
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
}`


export const mutationFollow = `
  mutation CreateFollowTypedData {
    createFollowTypedData(request:{
      follow: [
        {
          profile: "0x01",
          followModule: null
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
`

export const mutationUnfollow = `
  mutation($request: UnfollowRequest!) { 
    createUnfollowTypedData(request: $request) {
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
`

export const queryFollowerNFTs = `
  query($request: FollowerNftOwnedTokenIdsRequest!) {
    followerNftOwnedTokenIds(request: $request) { 
            followerNftAddress
        tokensIds
        }
  }
`