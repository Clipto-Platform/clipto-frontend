export interface BookingFormValues {
  description: string;
  amount: string;
  deadline: string;
  businessName?: string;
  businessEmail?: string;
  businessTwitter?: string;
  businessInfo?: string;
  businessRequestType?: string;
}

export enum UsesOptions {
  personal = 'PERSONAL',
  business = 'BUSINESS',
}
