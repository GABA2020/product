import React from 'react';
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';

import loaderVector from '../../assets/images/front/loader.svg';


export default function LoaderModal(props) {

  return (
    <ModalCont
      backdrop="static"
      show={true}
      dialogClassName="modal-w"
      size="lg"
    >
      <ModalBody>
        <img src={loaderVector} alt="" />
      </ModalBody>

    </ModalCont >)
}

const ModalCont = styled(Modal)`
  .modal-w {
    width: 70%;
    max-width: 800px;
  }
  
  @media (max-width: 768px) {
    .modal-w {
      width: 97%;
    }
  }
`;

const ModalBody = styled.div`
  width: 100%;
  text-align:center;
  padding: 20px 16%;
  background:transparent;  
`;