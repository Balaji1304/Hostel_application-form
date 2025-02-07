import { collection, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const APPLICATIONS_COLLECTION = 'applications';

export const applicationsQueries = {
  getAll: () => 
    query(
      collection(db, APPLICATIONS_COLLECTION),
      orderBy('createdAt', 'desc')
    ),
    
  getPending: () =>
    query(
      collection(db, APPLICATIONS_COLLECTION),
      where('status', '==', 'pending'),
      orderBy('createdAt', 'desc')
    ),
    
  getByStatus: (status: string) =>
    query(
      collection(db, APPLICATIONS_COLLECTION),
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    )
};