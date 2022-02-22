export type Request = {
  id: number;
  requestId: number;
  requester: string;
  creator: string;
  amount: string;
  description: string;
  deadline: number;
  delivered: boolean;
  txHash: string;
  created: string;
  refunded: boolean;
};
