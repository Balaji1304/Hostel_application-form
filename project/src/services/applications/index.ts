import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import type { FormApplication } from '../../types';

const APPLICATIONS_COLLECTION = 'applications';

export async function getApplications(): Promise<FormApplication[]> {
  try {
    const q = query(
      collection(db, APPLICATIONS_COLLECTION),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        residentName: data.residentName,
        contactNumber: data.contactNumber,
        status: data.status,
        formLink: data.formLink || '',
        createdAt: data.createdAt instanceof Timestamp 
          ? data.createdAt.toDate().toISOString()
          : data.createdAt,
        expiryDate: data.expiryDate instanceof Timestamp 
          ? data.expiryDate.toDate().toISOString()
          : data.expiryDate
      };
    });
  } catch (error) {
    console.error('Failed to fetch applications:', error);
    throw error;
  }
}