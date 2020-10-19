import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

export interface CreateResourceModalProps {
  onClose: () => void;
  onOpen: () => void;
  open: boolean;
  trigger: React.ReactNode;
}

export const CreateResourceModal = (props: CreateResourceModalProps) => {
  return (
    <Modal
      onClose={props.onClose}
      onOpen={props.onOpen}
      open={props.open}
      trigger={props.trigger}
    >
      <Modal.Header>Select a Photo</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <p>
            We've found the following gravatar image associated with your e-mail
            address.
          </p>
          <p>Is it okay to use this photo?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={props.onClose}>
          Nope
        </Button>
        {/* <Button
          content="Yep, that's me"
          labelPosition="right"
          icon="checkmark"
          onClick={() => setOpen(false)}
          positive
        /> */}
      </Modal.Actions>
    </Modal>
  );
};
