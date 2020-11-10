import React, { useState, useEffect } from 'react';
import { Form, Icon, Label } from 'semantic-ui-react';

export interface TagInputProps {
  label?: string;
  placeholder?: string;
  onChange?: (tags: string[]) => void;
  initialTags?: Array<any>;
}

export const FormTagInput = (props: TagInputProps) => {
  const initialTags: string[] = props.initialTags || [];
  const [tags, setTags] = useState(initialTags);
  const addTag = event => {
    if (event.key === 'Enter' && event.target.value !== '') {
      setTags([...tags, event.target.value]);
      event.target.value = '';
    }
  };

  const removeTag = index => {
    setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
  };

  useEffect(() => {
    if (props.onChange)
      props.onChange(tags)
  }, [tags])

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
