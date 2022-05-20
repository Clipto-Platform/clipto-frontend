import { EntityRequest } from '../../api/types';

export interface OrderCardProps {
  request: EntityRequest;
  txHash?: string;
  key: string;
  isReceived: boolean;
  isBusiness: boolean;
  businessName?: string;
  businessEmail?: string;
  businessTwitter?: string;
  businessInfo?: string;
  displayBusiness: boolean;
}
