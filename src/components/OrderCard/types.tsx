import { EntityRequest } from '../../api/types';

export interface OrderCardProps {
  request: EntityRequest;
  txHash?: string;
  key: string;
  isReceived: boolean;
}
