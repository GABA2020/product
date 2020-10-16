import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { Form, Input, Divider } from 'semantic-ui-react';
import styled from 'styled-components';

export function SignUp({onSubmit}) {
  return (
    <FormWrapper onSubmit={onSubmit}>
      <h3>Join GAbA</h3>
      <Divider style={{ borderColor: '#eeaa35',marginBottom:40 }} />
      <Form.Group widths="equal">
        <Form.Field required>
          <Label>First name</Label>
          <Input />
        </Form.Field>
        <Form.Field required>
          <Label>Last name</Label>
          <Input />
        </Form.Field>
      </Form.Group>
      <Divider />
      <Form.Field required>
        <Label>
          Username{' '}
          <ExtraLabel>
            Your username will be diplayed on your public profile and reviews
          </ExtraLabel>
        </Label>
        <Input placeholder="@" />
      </Form.Field>
      <Divider />
      <Form.Field required>
        <Label>Email Address </Label>
        <Input icon="mail" iconPosition="left" />
      </Form.Field>
      <Divider />
      <Form.Group widths="equal">
        <Form.Field required>
          <Label>Password</Label>
          <Input type="password" />
        </Form.Field>
        <Form.Field required>
          <Label>Confirm Password</Label>
          <Input type="password" />
        </Form.Field>
      </Form.Group>
      {/* <Divider /> */}
      {/* <Form.Field required>
        <Label>Medical School</Label>
        <Input icon="search" iconPosition="left" />
      </Form.Field>
      <Divider /> */}

      <Divider />
      <Form.Button content='Join GABA' fluid size="huge" />
    </FormWrapper>
  );
}

SignUp.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

const FormWrapper = styled(Form)`
  margin: 32px auto;
  width: 50%;
  @media (max-width: 768px) {
    width: 80%;
  }
`;
const Label = styled.label`
  font-size: 1.34em !important;
`;
const ExtraLabel = styled.label`
  font-size: 0.8em !important;
`;




