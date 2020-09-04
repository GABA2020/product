import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { db } from '../../../../helpers/firebase.module';
import { PDFViewer } from '@react-pdf/renderer';

export const AdminVerifyProfileModal = ({
  selectedImg,
  setSelectedImg,
  name,
  email,
}) => {
  const sendVerificationEmail = async () => {
    const template_params = {
      contactEmail: email,
      contactFirstName: name,
    };

    const service_id = 'default_service';
    const template_id = 'welcome_to_gaba_';
    const user_id = 'user_yIq3IIfTQ8ruKbjBAqYaQ';
    await emailjs.send(service_id, template_id, template_params, user_id);
    console.log('Email sent successfully to ', email);
  };

  const verifyUser = async () => {
    await db.collection('member_data').doc(email).set(
      {
        isVerified: true,
      },
      { merge: true },
    );
    console.log('User successfully verified!');
  };

  const handleClick = e => {
    if (e.target.classList.contains('backdrop')) {
      setSelectedImg(null);
    }
  };

  const handleVerify = () => {
    verifyUser();
    sendVerificationEmail();
    setSelectedImg(null);
  };
  return (
    <div className="backdrop" onClick={handleClick}>
      <img src={selectedImg} alt="enlarged pic" />

      <button
        className="button is-success has-text-centered"
        style={{ display: 'block', margin: 'auto' }}
        onClick={() => handleVerify()}
      >
        Verify
      </button>
    </div>
  );
};
