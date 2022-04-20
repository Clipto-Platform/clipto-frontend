export const queryGetRequest = `
query GetRequestById (
    $requestId: BigInt!,
    $creator: Bytes!
) {
    requests(where: {
        requestId: $requestId,
        creator: $creator
    }){
      id
      requestId
      requester
      creator {
        id
        address
        tokenAddress
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
      tokenAddress
      tokenId
      tokenUri
      txHash
      block
      timestamp
      token
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
      tokenAddress
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
    tokenAddress
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
    orderBy: timestamp
    orderDirection: desc
  ) {
    id
    requestId
    requester
    creator {
      id
      address
      tokenAddress
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
    tokenAddress
    tokenId
    tokenUri
    txHash
    block
    timestamp
    token
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
    orderBy: timestamp
    orderDirection: desc
  ) {
    id
    requestId
    requester
    creator {
      id
      address
      tokenAddress
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
    tokenAddress
    tokenId
    tokenUri
    txHash
    block
    timestamp
    token
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
    tokenAddress
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
