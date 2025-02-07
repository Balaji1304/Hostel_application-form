export interface ApplicationStatus {
  pending: 'pending';
  sent: 'sent';
  completed: 'completed';
  expired: 'expired';
}

export interface ApplicationCreate {
  residentName: string;
  contactNumber: string;
  formLink: string;
  expiryDate: string;
}

export interface ApplicationUpdate {
  status?: keyof ApplicationStatus;
  completedAt?: string;
}