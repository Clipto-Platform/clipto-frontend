import { Request } from '../../pages/Orders/types';

export interface OrderCardProps {
  request: Request;
  txHash?: string;
  key: number;
  isReceived: boolean;
}
