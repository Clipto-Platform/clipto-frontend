export const queryGetRequest = `
query GetCompletedRequests (
    $requestId: BigInt!,
    $creator: Bytes!,
    $requester: Bytes!
) {
    requests(where: {
        requestId: $requestId,
        creator: $creator,
        requester: $requester
    }) {
      id
      requestId
      requester
      creator
      amount
      delivered
      refunded
      tokenAddress
      tokenId
      tokenUri
      txHash
      block
      timestamp
    }
}
`;