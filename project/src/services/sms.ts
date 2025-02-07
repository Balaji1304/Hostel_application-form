import { addDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { SmsNotification } from '../types';

const NOTIFICATIONS_COLLECTION = 'notifications';

export async function sendSms(notification: SmsNotification) {
  // In a production environment, you would integrate with a real SMS service
  // For now, we'll just log the notification to Firestore
  try {
    await addDoc(collection(db, NOTIFICATIONS_COLLECTION), {
      ...notification,
      status: 'pending',
      createdAt: new Date().toISOString(),
    });
    
    console.log('SMS notification queued:', notification);
    return true;
  } catch (error) {
    console.error('Failed to queue SMS notification:', error);
    throw error;
  }
}