import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useMutation } from 'react-apollo';
import { Button, Form, Label, Modal } from 'semantic-ui-react';
import { FormTagInput } from '../Tags';

export interface CreateResourceModalProps {
  onClose: () => void;
  onOpen: () => void;
  open: boolean;
  trigger: React.ReactNode;
}

const CREATE_RESOURCES = gql`
  mutation($resourceData: ResourceInput!) {
    createResource(resourceData: $resourceData)
  }
`;

export const CreateResourceModal = (props: CreateResourceModalProps) => {
  const [resourceName, setResourceName] = useState<string | null>(null);
  const [description, setDescriptionName] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[] | null>(null);
  const [tags, setTags] = useState<string[] | null>(null);
  const [pictureName, setPictureName] = useState<string | null>(null);
  const [rating, setRating] = useState<number | null>(null);

  const [createResource] = useMutation(CREATE_RESOURCES);

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
    if (!resourceName || resourceName.length === 0 || !resourceName.trim()) {
      return;
    }

    if (!description || description.length === 0 || !description.trim()) {
      return;
    }

    await createResource({
      variables: {
        resourceData: {
          name: resourceName,
          description: description,
          link: link,
          categories: categories,
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
      <Modal.Header>Create A New Resource</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input
            required
            label="Resource Name"
            onChange={e => setResourceName(e.target.value)}
          />
          <Form.TextArea
            required
            type="string"
            label="Description"
            placeholder="Add the information about the resource here..."
            onChange={e => setDescriptionName(e.target.value)}
          />
          <Form.Input label="Link" onChange={e => setLink(e.target.value)} />
          <FormTagInput
            label="Categories"
            placeholder="Press enter to add categories"
            onChange={tags => setCategories(tags)}
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
        <Form.Button content="Create Resource" onClick={onCreateResource} />
      </Modal.Actions>
    </Modal>
  );
};
