import { useState, useEffect } from 'react';
import { db } from '../helpers/firebase.module';

export const useFirestoreVerification = collection => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = db
      .collection(collection)
      .where('isVerified', '==', false)
      .orderBy('creationDate', 'desc')
      .onSnapshot(snap => {
        let documents = [];
        snap.forEach(doc => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });
    return () => unsub();
  }, [collection]);
  return { docs };
};

export const useFirestoreMcat = collection => {
  const [mcat, setMcat] = useState([]);

  useEffect(() => {
    const unsub = db
      .collection(collection)
      .where('mcat_review_requested', '==', true)
      .onSnapshot(snap => {
        let documents = [];
        snap.forEach(doc => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setMcat(documents);
      });
    return () => unsub();
  }, [collection]);
  return { mcat };
};

export const useFirestoreStep1 = collection => {
  const [step1, setStep1] = useState([]);

  useEffect(() => {
    const unsub = db
      .collection(collection)
      .where('step_1_review_requested', '==', true)
      .onSnapshot(snap => {
        let documents = [];
        snap.forEach(doc => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setStep1(documents);
      });
    return () => unsub();
  }, [collection]);
  return { step1 };
};

export const useFirestoreStep2 = collection => {
  const [step2, setStep2] = useState([]);

  useEffect(() => {
    const unsub = db
      .collection(collection)
      .where('step_2_review_requested', '==', true)
      .onSnapshot(snap => {
        let documents = [];
        snap.forEach(doc => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setStep2(documents);
      });
    return () => unsub();
  }, [collection]);
  return { step2 };
};

export const useFirestoreStep3 = collection => {
  const [step3, setStep3] = useState([]);

  useEffect(() => {
    const unsub = db
      .collection(collection)
      .where('step_3_review_requested', '==', true)
      .onSnapshot(snap => {
        let documents = [];
        snap.forEach(doc => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setStep3(documents);
      });
    return () => unsub();
  }, [collection]);
  return { step3 };
};
