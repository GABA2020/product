import { useStorage } from 'hook/useStorage';
import React from 'react';

export interface VerificationImageProps {
  test?: string;
  filename?: string;
  email?: string;
}

export const VerificationImage =  (props: VerificationImageProps) => {
  //console.log('files', props.email, props.test, props.filename);
  const url = useStorage(
    `files/${props.email}/${props.test}/${props.filename}`,
  );
  //console.log('url', url);
  return (
    <>
      <label>image</label>
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
    </>
  );
};
