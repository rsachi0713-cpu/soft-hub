import { db } from '../firebase/config';
import { collection, addDoc, getDocs, getDoc, updateDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';

const COLLECTION_NAME = 'software';

export const getSoftware = async () => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getSoftwareById = async (id) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
};

export const addSoftware = async (data) => {
  return await addDoc(collection(db, COLLECTION_NAME), {
    ...data,
    createdAt: serverTimestamp(),
  });
};

export const updateSoftware = async (id, data) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() });
};

export const deleteSoftware = async (id) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return await deleteDoc(docRef);
};
