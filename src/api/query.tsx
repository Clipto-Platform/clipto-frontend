export const queryGetRequest = `
query GetRequestById (
    $requestId: BigInt!,
    $creator: Bytes!,
    $version: String!
) {
    requests(where: {
        requestId: $requestId,
        creator: $creator,
        version: $version
    }){
      id
      requestId
      requester
      creator {
        id
        address
        nftTokenAddress
        twitterHandle
        bio
        deliveryTime
        demos
        profilePicture
        userName
        price
        txHash
        block
        timestamp
      }
      amount
      description
      deadline
      delivered
      refunded
      erc20
      version
      metadataURI
      nftTokenAddress
      nftTokenId
      nftTokenUri
      txHash
      block
      createdTimestamp
      updatedTimestamp
    }
  }
`;

export const queryGetCreators = `
query GetAllCreators (
  $first: Int!,
  $skip: Int!
) {
    creators(
      first: $first,
      skip: $skip,
      orderBy: timestamp,
      orderDirection: asc
    ){
      id
      address
      metadataURI
      nftTokenAddress
      twitterHandle
      bio
      deliveryTime
      demos
      profilePicture
      userName
      price
      txHash
      block
      timestamp
    }
}
`;

export const queryGetCreatorById = `
query GetCreatorById (
  $id: String!,
) {
  creator(id: $id)
  {
    id
    address
    metadataURI
    nftTokenAddress
    metadataURI
    twitterHandle
    bio
    deliveryTime
    demos
    profilePicture
    userName
    price
    txHash
    block
    timestamp
  }
}
`;

export const queryCreatorRequests = `
query GetCreatorRequests (
  $creator: String!,
  $first: Int!,
  $skip: Int!
) {
  requests(
    where: {
      creator: $creator,
    }, 
    first: $first,
    skip: $skip,
    orderBy: createdTimestamp
    orderDirection: desc
  ) {
    id
    requestId
    requester
    creator {
      id
      address
      metadataURI
      nftTokenAddress
      twitterHandle
      bio
      deliveryTime
      demos
      profilePicture
      userName
      price
      txHash
      block
      timestamp
    }
    amount
    description
    deadline
    delivered
    refunded
    erc20
    version
    metadataURI
    nftTokenAddress
    nftTokenId
    nftTokenUri
    txHash
    block
    createdTimestamp
    updatedTimestamp
  }
}
`;

export const queryUserRequests = `
query GetUserRequests (
  $requester: String!,
  $first: Int!,
  $skip: Int!
) {
  requests(
    where: {
      requester: $requester,
    }, 
    first: $first,
    skip: $skip,
    orderBy: createdTimestamp
    orderDirection: desc
  ) {
    id
    requestId
    requester
    creator {
      id
      address
      nftTokenAddress
      twitterHandle
      bio
      deliveryTime
      demos
      profilePicture
      userName
      price
      txHash
      block
      timestamp
    }
    amount
    description
    deadline
    delivered
    refunded
    erc20
    version
    metadataURI
    nftTokenAddress
    nftTokenId
    nftTokenUri
    txHash
    block
    createdTimestamp
  }
}
`;
export const queryGetFeaturedCreators = `
query GetFeaturedCreators (
  $address: [String]!,
) {
  creators(where: {
    address_in: $address
  })
  {
    id
    address
    metadataURI
    nftTokenAddress
    twitterHandle
    bio
    deliveryTime
    demos
    profilePicture
    userName
    price
    txHash
    block
    timestamp
  }
}
`;

export const queryGetCreatorUserName = `
query GetAllCreators {
    creators(
      orderBy: timestamp,
      orderDirection: asc
    ){
      twitterHandle
    }
}
`;

export const queryGetNFTHistory = `
query GetNFTHistory(
  $nftContract: String!,
  $tokenId: Int!
) {
  transfers (
    where: {
      nftContract: $nftContract,
      tokenId: $tokenId
    },
    orderBy: timestamp,
    orderDirection: desc
  ) {
    from {
      id
    }
    to {
      id
    }
    timestamp
  }
}
`;

export const queryCyberConncetIdentity = `
query Identity($address: String!, $first: Int, $after: String, $namespace: String) {
  identity(address: $address) {
    address
    domain
    avatar
    joinTime
    twitter {
      handle
      avatar
      verified
      source
      followerCount
    }
    github {
      username
      userId
    }
    followerCount
    followingCount
    followings(first: $first, after: $after, namespace: $namespace) {
      pageInfo {
        endCursor
        hasNextPage
      }
      list {
        address
        domain
        avatar
        namespace
        type
        verifiable
      }
    }
    followers(first: $first, after: $after, namespace: $namespace) {
      pageInfo {
        endCursor
        hasNextPage
      }
      list {
        address
        domain
        avatar
        namespace
        type
        verifiable
      }
    }
  }
}
`;

export const queryCyberConncetConnections = `
query Connections($fromAddr: String!, $toAddrList: [String!]!) {
  connections(fromAddr: $fromAddr, toAddrList: $toAddrList) {
    fromAddr
    toAddr
    followStatus {
      isFollowing
      isFollowed
    }
    namespace
    alias
    type
    updatedAt
    createdAt
  }
}
`;

export const queryCyberConncetRecommendations = `
query Recommendations($address: String!, $first: Int, $after: String, $namespace: String) {
  recommendations(address: $address, first: $first, after: $after, namespace: $namespace) {
    data {
      pageInfo {
        endCursor
        hasNextPage
      }
      list {
        address
        domain
        avatar
        followerCount
        recommendationReason
      }
    }
  }
}
`;
