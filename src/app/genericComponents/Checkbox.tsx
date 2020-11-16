import React from 'react';
import { StatisticLabel } from 'semantic-ui-react';
import styled from 'styled-components';

const Container = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 16px;
  -webkit-user-select: none;
  -moz-user-select: none;f
  -ms-user-select: none;
  user-select: none;

/* Hide the browser's default checkbox */
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
    border-radius: 5px;
  }

  /* On mouse-over, add a grey background color */
  &:hover input ~ .checkmark {
    background-color: #ccc;
  }

  /* When the checkbox is checked, add a blue background */
  input:checked ~ .checkmark {
    background-color: rgba(51, 120, 89, 0.22);;
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  .checkmark:after {
    left: 9px;
    top: 5px;
    width: 8px;
    height: 13px;
    border: solid ${props => props.theme.color.darkGreen};
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`

const Checkbox = ({
  label,
  checked,
  onChange
}: { 
  label?: string,
  checked?: boolean,
  onChange?: () => void
}) => (
  <Container>
    {label}
    <input type="checkbox" onChange={() => onChange && onChange()} checked={checked}/>
    <span className="checkmark"></span>
  </Container>
)

export default Checkbox;