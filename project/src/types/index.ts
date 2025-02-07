export interface FormTrigger {
  fullName: string;
  contactNumber: string;
  status: 'pending' | 'sent' | 'completed' | 'expired';
}

export interface FormApplication {
  id: string;
  residentName: string;
  contactNumber: string;
  status: 'pending' | 'sent' | 'completed' | 'expired';
  formLink: string;
  createdAt: string;
  expiryDate: string;
}

export interface SmsNotification {
  to: string;
  message: string;
  provider: string;
  status: 'pending' | 'sent' | 'failed';
  createdAt: string;
  updatedAt: string;
}