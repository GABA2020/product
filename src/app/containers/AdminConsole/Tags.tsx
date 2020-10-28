import React, { useState } from 'react';
import { Form, Icon, Input, Label } from 'semantic-ui-react';

export interface TagInputProps {
  label?: string;
  placeholder?: string;
  onChange?: (tags: string[]) => void;
}

export const FormTagInput = (props: TagInputProps) => {
  const initialTags: string[] = [];
  const [tags, setTags] = useState(initialTags);
  const addTag = event => {
    if (event.key === 'Enter' && event.target.value !== '') {
      setTags([...tags, event.target.value]);
      event.target.value = '';
      if (props.onChange) {
        props.onChange([...tags]);
      }
    }
  };

  const removeTag = index => {
    setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
    if (props.onChange) {
      props.onChange([...tags]);
    }
  };

  return (
    <>
      <Form.Input
        label={props.label}
        onKeyUp={event => addTag(event)}
        placeholder={props.placeholder}
      />
      {tags.map((tag, index) => (
        <Label>
          {tag}
          <Icon name="delete" onClick={() => removeTag(index)} />
        </Label>
      ))}
    </>
  );
};
