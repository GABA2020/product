
import styled from 'styled-components';

type Props = {
  color?: 'string';
  backgroundColor?: 'string';
}

const Button = styled.button<Props>`
  font-size: 1.6rem;
  font-weight: 500;
  padding: 9px 14px;
  color: ${props => props.color || props.theme.color.darkBlue};
  background-color: ${props => props.backgroundColor || props.theme.color.softPurple};
  border-radius: 5px;
  margin-top: -20px;
  outline: none;
  border: none;
  margin-top: 5px;
`;

export default Button;