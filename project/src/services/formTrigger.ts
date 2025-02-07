import { addDoc, collection, updateDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { sendSms } from './sms';
import { APP_CONFIG } from '../config/constants';
import type { FormTrigger } from '../types';

const APPLICATIONS_COLLECTION = 'applications';

function generateFormLink(triggerId: string): string {
  const expiryDate = new Date();
  expiryDate.setHours(expiryDate.getHours() + APP_CONFIG.FORM_EXPIRY_HOURS);
  return `${APP_CONFIG.BASE_URL}/form/${triggerId}?expires=${expiryDate.getTime()}`;
}

export async function triggerForm(data: Omit<FormTrigger, 'status'>) {
  try {
    // Create application record
    const docRef = await addDoc(collection(db, APPLICATIONS_COLLECTION), {
      residentName: data.fullName,
      contactNumber: data.contactNumber,
      status: 'pending',
      createdAt: Timestamp.now(),
    });

    // Generate form link and expiry date
    const formLink = generateFormLink(docRef.id);
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + APP_CONFIG.FORM_EXPIRY_HOURS);

    // Update application with form link and expiry
    await updateDoc(doc(db, APPLICATIONS_COLLECTION, docRef.id), {
      formLink,
      expiryDate: Timestamp.fromDate(expiryDate),
      status: 'sent',
    });

    // Send SMS notification
    const message = `Dear ${data.fullName}, please complete your Ladies Hostel application form at: ${formLink}. The link expires in ${APP_CONFIG.FORM_EXPIRY_HOURS} hours.`;
    await sendSms(data.contactNumber, message);

    return {
      success: true,
      formLink,
      expiryDate: expiryDate.toISOString(),
    };
  } catch (error) {
    console.error('Failed to trigger form:', error);
    throw error;
  }
}