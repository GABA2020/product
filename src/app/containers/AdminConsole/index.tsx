import React, { useState } from 'react';
import useFirestore from '../../../hooks/useFirestore';
import { AdminVerifyProfileModal } from '../../components/Modal/AdminVerifyProfileModal';

export const AdminConsole = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);

  const { docs } = useFirestore('member_data') as any;
  console.log('docs', docs);
  return (
    <>
      {docs &&
        docs.map(doc => (
          <div className="tile is-child box" key={doc.id}>
            <p>Username: {doc.id}</p>
            <p>
              Name : {doc.firstName} {doc.lastName}
            </p>
            <p>Email: {doc.email}</p>
            <p>Medical School: {doc.medicalSchool}</p>
            <p>Year: {doc.medicalSchoolYear}</p>
            <button
              onClick={() => {
                setSelectedImg(doc.schoolVerification);
                setName(doc.firstName);
                setEmail(doc.email);
              }}
              className="button"
            >
              School Verification
            </button>
          </div>
        ))}
      {selectedImg && (
        <AdminVerifyProfileModal
          selectedImg={selectedImg}
          setSelectedImg={setSelectedImg}
          name={name}
          email={email}
        />
      )}
    </>
  );
};
