export interface SmsProvider {
  sendSms(to: string, message: string): Promise<SmsResponse>;
}

export interface SmsResponse {
  success: boolean;
  messageId: string;
  status: string;
}

export interface SmsNotification {
  to: string;
  message: string;
  provider: string;
  status: 'pending' | 'sent' | 'failed';
  createdAt: string;
  updatedAt: string;
}