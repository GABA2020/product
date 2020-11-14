import React, { useState, useEffect } from 'react';
import { Form, Icon, Label } from 'semantic-ui-react';

export interface TagInputProps {
  label?: string;
  placeholder?: string;
  onChange?: (tags: string[]) => void;
  initialTags?: Array<any>;
}

export const FormTagInput = (props: TagInputProps) => {
  const [tags, setTags] = useState<any>([]);
  const addTag = event => {
    if (event.key === 'Enter' && event.target.value !== '') {
      const newTags = [...tags, event.target.value]
      setTags(newTags);
      props.onChange && props.onChange(newTags);
      event.target.value = '';
    }
  };

  const removeTag = index => {
    setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
  };

  useEffect(() => {
    setTags(props.initialTags || [])
  })

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
