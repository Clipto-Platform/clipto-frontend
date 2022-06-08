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
