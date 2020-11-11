import gql from 'graphql-tag';
import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button, Form, Label, Modal } from 'semantic-ui-react';
import { FormTagInput } from '../Tags';
import { storageFB} from '../../../../helpers/firebase.module';
import {  CREATE_PROGRAM, UPDATE_PROGRAM } from '../../../../service/mutations'

export interface CreateProgramModalProps {
  onClose: () => void;
  onOpen: () => void;
  open: boolean;
  trigger: React.ReactNode;
  defaultValues?: {
    name: string;
    description: string;
    link: string;
    state: string;
    specialities: string[];
    tags: string[];
    id: string;
  }
}

export const CreateProgramModal = (props: CreateProgramModalProps) => {
  let defaultValues: any = props.defaultValues || {};

  const [name, setName] = useState<string>('');
  const [description, setDescriptionName] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [specialities, setSpecialities] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [pictureName, setPictureName] = useState<string>('');
  const [file, setFile] = useState<any>('')

  const [createProgram] = useMutation(CREATE_PROGRAM);
  const [updateProgram] = useMutation(UPDATE_PROGRAM);

  const onChangeFileHandler = e => {
    let selected = e.target.files[0];
    const types = ['image/png', 'image/jpeg', 'application/pdf'];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
    } else {
      setFile(null);
    }
  };

  const fileStorage = async (img) => {
    let storageRef = storageFB.ref();
    let fileRef = storageRef.child(
      `resources/${img.name}`,
    );
    await fileRef.put(file);
  };

  const onCreateResource = async () => {
    if (!name || name.length === 0 || !name.trim()) {
      return;
    }

    if (!description || description.length === 0 || !description.trim()) {
      return;
    }

    await fileStorage(file)
    await createProgram({
      variables: {
        programData: {
          name: name,
          description: description,
          link: link,
          state: state,
          specialities: specialities,
          tags: tags,
          picture_name: file.name || '',
        },
      },
    });

    props.onClose();
  };

  const onUpdateResource = async() => {
    if (!name || name.length === 0 || !name.trim()) {
      return;
    }

    if (!description || description.length === 0 || !description.trim()) {
      return;
    }
    
    await updateProgram({
      variables: {
        idDoc: defaultValues.id,
        updateData: {
          name: name,
          description: description,
          link: link,
          state: state,
          specialities: specialities,
          tags: tags,
          picture_name: file.name || '',
        }
      },
    });

    props.onClose();
  }

  useEffect(() => {
    if (Object.keys(defaultValues).length) {
      setName(defaultValues.name || '')
      setDescriptionName(defaultValues.description || '')
      setLink(defaultValues.link || '')
      setState(defaultValues.state || '')
      setSpecialities(defaultValues.specialities || [])
      setTags(defaultValues.tags || [])
    }
  }, [defaultValues])

  return (
    <Modal
      onClose={props.onClose}
      onOpen={props.onOpen}
      open={props.open}
      trigger={props.trigger}
    >
      <Modal.Header>
        {defaultValues.id ? 'Edit Program' : 'Create A New Program'}
      </Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input
            required
            label="Program Name"
            onChange={e => setName(e.target.value)}
            value={name}
          />
          <Form.TextArea
            required
            type="string"
            label="Description"
            placeholder="Add the information about the program here..."
            onChange={e => setDescriptionName(e.target.value)}
            value={description}
          />
          <Form.Input label="Link" value={link} onChange={e => setLink(e.target.value)} />
          <Form.Input label="State" value={state} onChange={e => setState(e.target.value)} />
          <FormTagInput
            label="Specialitiesss"
            placeholder="Press enter to add specialities"
            onChange={tags => setSpecialities(tags)}
            initialTags={specialities}
          />
          <FormTagInput
            label="Tags"
            placeholder="Press enter to add tags"
            onChange={tags => setTags(tags)}
            initialTags={tags}
          />
          <label>Picture name</label>
          <input
            type="file"
            name="pictureName"
            onChange={onChangeFileHandler}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Form.Button
          content={defaultValues.id ? 'Edit Program' : 'Create Program'}
          onClick={defaultValues.id ? onUpdateResource : onCreateResource} 
        />
      </Modal.Actions>
    </Modal>
  );
};
