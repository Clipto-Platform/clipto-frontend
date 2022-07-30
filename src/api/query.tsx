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
      isBusiness
      businessName
      businessEmail
      businessTwitter
      businessInfo
      businessRequestType
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

export const queryGetCreatorsByLensHandle = `
query GetAllCreators ($lensHandles: [String]!) {
  creators(
    orderBy: id,
    where: {lensHandle_in: $lensHandles}
    orderDirection: asc
  ){
    id
    address
    metadataURI
    nftTokenAddress
    twitterHandle
    bio
    deliveryTime
    lensHandle
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
    lensHandle
    demos
    profilePicture
    userName
    price
    txHash
    block
    timestamp
    businessPrice
    customServices
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
    isBusiness
    businessName
    businessEmail
    businessTwitter
    businessInfo
    businessRequestType
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
    isBusiness
    businessName
    businessEmail
    businessTwitter
    businessInfo
    businessRequestType
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

export const queryGetRequestByHash = `
query GetRequestByTxHash(
  $txHash: String!
) {
  requests (
    where: {
      txHash: $txHash
    }
  ) {
    id
  }
}
`;

export const queryGetCreatorByHash = `
query GetCreatorByTxHash(
  $txHash: String!
) {
  creators (
    where: {
      txHash: $txHash
    }
  ) {
    id
  }
}
`;

export const queryCreatorsByAddresses = `
query CreatorsByAddresses ($addresses: [Bytes!]) {
  creators (where: {address_in: $addresses}) {
    id
    address
    metadataURI
    nftTokenAddress
    twitterHandle
    bio
    deliveryTime
    lensHandle
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
