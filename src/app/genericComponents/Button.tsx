import React from 'react';
import styled from 'styled-components';

interface GenericButtonProps {
  children: any;
  additionalStyles: String;
  color?: string;
  backgroundColor?: string
}

const Button = styled.button`
  font-size: 1.6rem;
  font-weight: 500;
  padding: 9px 14px;
  line-height: 1.1;
  color: ${(props: any) => props.color || props.theme.color.darkBlue};
  background-color: ${(props: any) => props.backgroundColor || props.theme.color.softPurple};
  border-radius: 2px;
  margin-top: -20px;
  outline: none;
  border: none;
  margin-top: 5px;

  ${(props: any) => props.additionalStyles}
`;

const GenericButton = (props: GenericButtonProps) => {
  const { children } = props;
  return (
    <Button {...props}>
      {children}
    </Button>
  )
};

export default GenericButton;