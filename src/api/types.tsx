export interface CreateRequest {
    requester: string;
    requestId: number;
    creator: string;
    amount: string;
    description: string;
    deadline: number;
    txHash: string;
    signed: string;
    address: string;  // current user's address
    message: string;
}