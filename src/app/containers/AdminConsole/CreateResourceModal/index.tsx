import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Form, Modal, Dropdown } from 'semantic-ui-react';
import { FormTagInput } from '../Tags';
import { CREATE_RESOURCE, UPDATE_RESOURCE } from '../../../../service/mutations'
import { storageFB} from '../../../../helpers/firebase.module';

const options: any = [{
  text: 'Free',
  value: 'free',
  key: 'fr'
},{
  text: 'Pre-Med',
  value: 'pre-med',
  key: 'pm'
},{
  text: 'Step One',
  value: 'step-one',
  key: 'so'
},{
  text: 'Step Two',
  value: 'step-two',
  key: 'tw'
},{
  text: 'Step Three',
  value: 'step-three',
  key: 'st'
}]

export interface CreateResourceModalProps {
  onClose: () => void;
  onOpen: () => void;
  open: boolean;
  trigger: React.ReactNode;
  defaultValues?: {
    name: string;
    description: string;
    link: string;
    categories: string[];
    tags: string[];
    id: string;
    pictureName: string;
  };
}

export const CreateResourceModal = (props: CreateResourceModalProps) => {
  let defaultValues: any = props.defaultValues || {};
  const [resourceName, setResourceName] = useState<string>('');
  const [description, setDescriptionName] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [categories, setCategories] = useState<any>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [pictureName, setPictureName] = useState<string>('');
  const [file, setFile] = useState<any>('')

  const [createResource] = useMutation(CREATE_RESOURCE);
  const [updateResource] = useMutation(UPDATE_RESOURCE);

  const fileStorage = async (img) => {
    let storageRef = storageFB.ref();
    let fileRef = storageRef.child(
      `resources/${img.name}`,
    );
    await fileRef.put(file);
  };

  const onCreateResource = async () => {
    if (!resourceName || resourceName.length === 0 || !resourceName.trim()) {
      return;
    }

    if (!description || description.length === 0 || !description.trim()) {
      return;
    }

    await fileStorage(file)
    await createResource({
      variables: {
        resourceData: {
          name: resourceName,
          description: description,
          link: link,
          categories: categories,
          tags: tags,
          picture_name: file.name || '',
        },
      },
    });

    props.onClose();
  };

  const onUpdateResource = async () => {
    if (!resourceName || resourceName.length === 0 || !resourceName.trim()) {
      return;
    }

    if (!description || description.length === 0 || !description.trim()) {
      return;
    }

    await updateResource({
      variables: {
        idDoc: defaultValues.id,
        updateData: {
          name: resourceName,
          description: description,
          link: link,
          categories: categories,
          tags: tags,
          picture_name: pictureName,
        },
      },
    });

    props.onClose();
  };

  const onChangeFileHandler = e => {
    let selected = e.target.files[0];
    const types = ['image/png', 'image/jpeg', 'application/pdf'];

    if (selected && types.includes(selected.type)) {
      setPictureName(selected.name)
      setFile(selected);
    } else {
      setFile(null);
    }
  };

  useEffect(() => {
    if (Object.keys(defaultValues).length) {
      setResourceName(defaultValues.name || '')
      setDescriptionName(defaultValues.description || '')
      setLink(defaultValues.link || '')
      setCategories(defaultValues.categories || [])
      setTags(defaultValues.tags || [])
      setPictureName(defaultValues.pictureName)
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
        {
          defaultValues.id ? "Edit Resource" : "Create A New Resource"
        }
      </Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input
            required
            label="Resource Name"
            onChange={e => setResourceName(e.target.value)}
            value={resourceName}
          />
          <Form.TextArea
            required
            type="string"
            label="Description"
            placeholder="Add the information about the resource here..."
            onChange={e => setDescriptionName(e.target.value)}
            value={description}
          />
          <Form.Input label="Link" onChange={e => setLink(e.target.value)} value={link}/>
          <label>Categories</label>
          <Dropdown
            placeholder='Select categories'
            value={categories}
            onChange={(_, data) => setCategories(data.value)}
            fluid
            multiple
            selection
            options={options}
          />
          <FormTagInput
            label="Tags"
            placeholder="Press enter to add tags"
            onChange={tags => setTags(tags)}
            initialTags={tags}
          />
          <label>Picture name {pictureName && `- current file: ${pictureName}`}</label>
          <input
            type="file"
            name="pictureName"
            onChange={onChangeFileHandler}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Form.Button content={defaultValues.id ? "Edit Resource" : "Create Resource"} onClick={defaultValues.id ? onUpdateResource : onCreateResource} />
      </Modal.Actions>
    </Modal>
  );
};
