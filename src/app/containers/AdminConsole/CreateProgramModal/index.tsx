import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button, Form, Label, Modal } from 'semantic-ui-react';
import { FormTagInput } from '../Tags';

export interface CreateProgramModalProps {
  onClose: () => void;
  onOpen: () => void;
  open: boolean;
  trigger: React.ReactNode;
}

const CREATE_PROGRAM = gql`
  mutation($programData: ProgramInput) {
    createProgram(programData: $programData)
  }
`;

export const CreateProgramModal = (props: CreateProgramModalProps) => {
  const [name, setName] = useState<string | null>(null);
  const [description, setDescriptionName] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const [state, setState] = useState<string | null>(null);
  const [specialities, setSpecialities] = useState<string[] | null>(null);
  const [tags, setTags] = useState<string[] | null>(null);
  const [pictureName, setPictureName] = useState<string | null>(null);
  const [rating, setRating] = useState<number | null>(null);

  const [createProgram] = useMutation(CREATE_PROGRAM);

  const onRatingChange = e => {
    const val = e.target.value;
    // If the current value passes the validity test then apply that to state
    if (e.target.validity.valid) setRating(e.target.value);
    // If the current val is just the negation sign, or it's been provided an empty string,
    // then apply that value to state - we still have to validate this input before processing
    // it to some other component or data structure, but it frees up our input the way a user
    // would expect to interact with this component
    else if (val === '') setRating(val);
  };

  const onCreateResource = async () => {
    if (!name || name.length === 0 || !name.trim()) {
      return;
    }

    if (!description || description.length === 0 || !description.trim()) {
      return;
    }

    await createProgram({
      variables: {
        programData: {
          name: name,
          description: description,
          link: link,
          state: state,
          specialities: specialities,
          tags: tags,
          picture_name: pictureName,
          rating: rating,
        },
      },
    });

    props.onClose();
  };

  return (
    <Modal
      onClose={props.onClose}
      onOpen={props.onOpen}
      open={props.open}
      trigger={props.trigger}
    >
      <Modal.Header>Create A New Program</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input
            required
            label="Program Name"
            onChange={e => setName(e.target.value)}
          />
          <Form.TextArea
            required
            type="string"
            label="Description"
            placeholder="Add the information about the program here..."
            onChange={e => setDescriptionName(e.target.value)}
          />
          <Form.Input label="Link" onChange={e => setLink(e.target.value)} />
          <Form.Input label="State" onChange={e => setState(e.target.value)} />
          <FormTagInput
            label="Specialities"
            placeholder="Press enter to add specialities"
            onChange={tags => setSpecialities(tags)}
          />
          <FormTagInput
            label="Tags"
            placeholder="Press enter to add tags"
            onChange={tags => setTags(tags)}
          />
          <Form.Input
            label="Picture Name"
            onChange={e => setPictureName(e.target.value)}
          />
          <Form.Input
            type="tel"
            pattern="^-?[0-5]\d*\.?\d*$"
            label="Rating"
            onChange={onRatingChange}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Form.Button content="Create Program" onClick={onCreateResource} />
      </Modal.Actions>
    </Modal>
  );
};
