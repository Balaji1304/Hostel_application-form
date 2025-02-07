import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  Timestamp 
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import type { ApplicationCreate, ApplicationUpdate } from './types';

const APPLICATIONS_COLLECTION = 'applications';

export const applicationsMutations = {
  create: async (data: ApplicationCreate) => {
    try {
      const docRef = await addDoc(collection(db, APPLICATIONS_COLLECTION), {
        ...data,
        status: 'pending',
        createdAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Failed to create application:', error);
      throw error;
    }
  },

  update: async (id: string, data: ApplicationUpdate) => {
    try {
      const docRef = doc(db, APPLICATIONS_COLLECTION, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Failed to update application:', error);
      throw error;
    }
  },

  markAsExpired: async (id: string) => {
    try {
      const docRef = doc(db, APPLICATIONS_COLLECTION, id);
      await updateDoc(docRef, {
        status: 'expired',
        expiredAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Failed to mark application as expired:', error);
      throw error;
    }
  },

  markAsCompleted: async (id: string) => {
    try {
      const docRef = doc(db, APPLICATIONS_COLLECTION, id);
      await updateDoc(docRef, {
        status: 'completed',
        completedAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Failed to mark application as completed:', error);
      throw error;
    }
  }
};