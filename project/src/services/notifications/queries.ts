import { collection, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const NOTIFICATIONS_COLLECTION = 'notifications';

export const notificationQueries = {
  getAll: () => 
    query(
      collection(db, NOTIFICATIONS_COLLECTION),
      orderBy('createdAt', 'desc')
    ),
    
  getByStatus: (status: string) =>
    query(
      collection(db, NOTIFICATIONS_COLLECTION),
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    ),
    
  getByPhone: (phone: string) =>
    query(
      collection(db, NOTIFICATIONS_COLLECTION),
      where('to', '==', phone),
      orderBy('createdAt', 'desc')
    )
};