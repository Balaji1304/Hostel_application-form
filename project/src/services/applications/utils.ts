import { Timestamp } from 'firebase/firestore';

export function isApplicationExpired(expiryDate: string | Timestamp): boolean {
  const expiry = expiryDate instanceof Timestamp 
    ? expiryDate.toDate() 
    : new Date(expiryDate);
  
  return expiry < new Date();
}

export function formatApplicationDate(date: string | Timestamp): string {
  const dateObj = date instanceof Timestamp ? date.toDate() : new Date(date);
  return dateObj.toISOString();
}

export function validateApplication(data: any): boolean {
  const requiredFields = ['residentName', 'contactNumber', 'formLink', 'expiryDate'];
  return requiredFields.every(field => Boolean(data[field]));
}