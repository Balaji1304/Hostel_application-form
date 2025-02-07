export interface NotificationStatus {
  pending: 'pending';
  sent: 'sent';
  failed: 'failed';
}

export interface NotificationLog {
  status: keyof NotificationStatus;
  messageId: string;
  response: any;
  timestamp: string;
}

export interface Notification {
  id: string;
  to: string;
  message: string;
  provider: string;
  status: keyof NotificationStatus;
  createdAt: string;
  updatedAt: string;
  logs?: NotificationLog[];
}