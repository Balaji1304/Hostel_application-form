import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { twilioProvider } from './twilio';
import type { SmsNotification } from './types';

const NOTIFICATIONS_COLLECTION = 'notifications';

export async function sendSms(to: string, message: string): Promise<boolean> {
  try {
    // Create notification record
    const notification: SmsNotification = {
      to,
      message,
      status: 'pending',
      provider: 'twilio',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const notificationRef = await addDoc(
      collection(db, NOTIFICATIONS_COLLECTION), 
      {
        ...notification,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      }
    );

    // Send SMS using Twilio
    const response = await twilioProvider.sendSms(to, message);

    // Update notification status
    await addDoc(
      collection(db, NOTIFICATIONS_COLLECTION, notificationRef.id, 'logs'),
      {
        status: response.success ? 'sent' : 'failed',
        messageId: response.messageId,
        response,
        timestamp: Timestamp.now(),
      }
    );

    return response.success;
  } catch (error) {
    console.error('Failed to send SMS:', error);
    throw error;
  }
}