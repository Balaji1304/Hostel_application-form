import { 
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Resident, ResidentForm } from '../types';

const RESIDENTS_COLLECTION = 'residents';
const FORMS_COLLECTION = 'forms';

export async function addResident(data: Omit<Resident, 'id'>) {
  const docRef = await addDoc(collection(db, RESIDENTS_COLLECTION), {
    ...data,
    submissionDate: new Date().toISOString(), // Ensure consistent ISO string format
    applicationStatus: 'pending'
  });
  return docRef.id;
}

export async function getResidents() {
  const q = query(
    collection(db, RESIDENTS_COLLECTION),
    orderBy('submissionDate', 'desc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => {
    const data = doc.data();
    // Convert Firestore Timestamp to ISO string if needed
    const submissionDate = data.submissionDate instanceof Timestamp 
      ? data.submissionDate.toDate().toISOString()
      : data.submissionDate;
    
    return {
      id: doc.id,
      ...data,
      submissionDate
    };
  }) as Resident[];
}

export async function getResident(id: string) {
  const docRef = doc(db, RESIDENTS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    throw new Error('Resident not found');
  }
  
  const data = docSnap.data();
  // Convert Firestore Timestamp to ISO string if needed
  const submissionDate = data.submissionDate instanceof Timestamp 
    ? data.submissionDate.toDate().toISOString()
    : data.submissionDate;
  
  return { 
    id: docSnap.id,
    ...data,
    submissionDate
  } as Resident;
}

export async function updateResidentStatus(
  id: string,
  status: 'pending' | 'completed'
) {
  const docRef = doc(db, RESIDENTS_COLLECTION, id);
  await updateDoc(docRef, { applicationStatus: status });
}

export async function submitResidentForm(data: Omit<ResidentForm, 'id'>) {
  const residentData: Omit<Resident, 'id'> = {
    fullName: data.fullName,
    contactNumber: data.contactNumber,
    applicationStatus: 'pending',
    submissionDate: new Date().toISOString()
  };

  const residentId = await addResident(residentData);
  
  await addDoc(collection(db, FORMS_COLLECTION), {
    ...data,
    residentId,
    submissionDate: new Date().toISOString()
  });

  return residentId;
}