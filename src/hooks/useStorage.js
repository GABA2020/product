import { useState } from 'react';
import { storageFB, db } from '../helpers/firebase.module';

const useStorage = file => {
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  // references
  const storageRef = storageFB.ref(file.name);
  const collectionRef = db.collection('member_data');

  storageRef.put(file).then(
    snapshot => {
      console.log('Uploaded file successfully');
    },
    err => {
      setError(err);
    },
    async () => {
      const url = await storageRef.getDownloadURL();
      collectionRef.add({ url });
      setUrl(url);
    },
  );

  return { url, error };
};

export default useStorage;
