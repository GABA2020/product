import React from 'react';
import emailjs from 'emailjs-com';
import { db } from '../../../../helpers/firebase.module';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_VALIDATION } from '../../../../service/mutations';
import { useStorage } from 'hook/useStorage';

export const AdminVerifyProfileModal = ({
  selectedImg,
  setSelectedImg,
  name,
  email,
  refetch,
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
  };

  const [validateUser] = useMutation(UPDATE_USER_VALIDATION);

  const verifyUser = async () => {
    await validateUser({
      variables: {
        email: email,
      },
    });
    // await db.collection('member_data').doc(email).set(
    //   {
    //     verified: true,
    //   },
    //   { merge: true },
    // );
  };
  const url = useStorage(`files/${email}/verification/${selectedImg}`);

  const handleClick = e => {
    if (e.target.classList.contains('backdrop')) {
      setSelectedImg(null);
    }
  };

  const handleVerify = async () => {
    console.log('onclick');
    await verifyUser();
    sendVerificationEmail();
    setSelectedImg(null);
    refetch();
  };
  return (
    <div className="backdrop" onClick={handleClick}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img
          className="img-fluid img-thumbnail"
          style={{
            maxWidth: '60%',
            maxHeight: '80%',
            display: 'block',
            margin: 'auto',
          }}
          src={url}
          alt="Click here to open PDF in another tab."
        />
      </a>

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
