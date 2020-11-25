import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Column, Row } from '../../genericComponents/Layout';
import theme from '../../../theme';
import { REPLY_COMMENT } from '../../../service/mutations';

const inputFontStyle = `
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.1px;
`;

const ModalContainer = styled(Column)`
  width: 100%;
  height: 100%;
  position: fixed;
  overflow-y: hidden;
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Modal = styled(Column)`
  flex-direction: column;
  position: realtive;
  width: 1000px;
  background-color: white;
  margin-top: 50px;
`;

const ModalHeader = styled.div`
  padding: 41px 200px 26px 200px;
  background-color: white;
  border-bottom: 1px solid ${props => props.theme.color.softGray};
`;

const HeaderTitle = styled.h3`
  width: 100%;
  border-bottom: 2px solid ${props => props.theme.color.gabaYellow};
  padding-bottom: 20px;
`;

const ModalContent = styled(Column)`
  padding: 26px 200px 41px 200px;
  width: 100%;
`;

const Divider = styled.div`
  width: 100%;
  border-bottom: 1px solid lightgray;
  margin: 25px 0;
`;

const FormSection = styled(Row)`
  flex-wrap: wrap;
  label {
    margin-right: 25px;
    margin-top: 10px;
  }

  .react-datepicker-wrapper input {
    height: 40px;
    width: 136px;
    border: 1px solid lightgray;
    text-align: center;
    border-radius: 5px;
    margin-right: 15px;
  }

  .custom-date {
    width: 170px;
  }
`;

const Subtitle = styled.p`
  width: 100%;
  color: rgb(17, 23, 65);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0px;
  margin-bottom: 30px;
  padding-left: 10px;
  position: relative;
  &::before {
    display: inline-block;
    content: '*';
    color: red;
    width: 8px;
    height: 8px;
    font-size: 30px;
    position: absolute;
    left: -7px;
  }
`;

const TextArea = styled.textarea`
  border: 1px solid lightgray;
  border-radius: 5px;
  margin-right: 15px;
  padding-left: 10px;
  width: 100%;
  padding-top: 10px;
  ${inputFontStyle}
`;

const ModalButton = styled.button`
  background: ${(props: { background: string }) => props.background};
  border-radius: 6px;
  height: 48px;
  color: ${props => props.theme.color.darkBlue};
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  width: 48%;
  border: none;
`;

const ButtonsContainer = styled(Row)`
  justify-content: space-between;
  width: 100%;
`;

interface params {
  id: string;
}

const ReplyModal = ({
  onClose,
  commentId,
  handleReload,
}: {
  onClose: () => void;
  commentId: string;
  handleReload: () => void;
}) => {
  //to do: centralize modals
  const [comment, setComment] = useState('');
  const { username } = useSelector((state: any) => state.user.userProfile);

  let { id }: params = useParams();
  const [replyComment] = useMutation(REPLY_COMMENT, {
    onCompleted: () => {
      onClose();
      handleReload();
    },
  });

  const handleSave = () => {
    console.log({ comment, username, commentId });
    replyComment({
      variables: {
        comment,
        username,
        docId: id,
        commentId,
      },
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <ModalContainer>
      <Modal>
        <ModalHeader>
          <HeaderTitle>Write A Reply</HeaderTitle>
        </ModalHeader>
        <ModalContent>
          <FormSection>
            <Subtitle>Review</Subtitle>
            <TextArea
              rows={6}
              value={comment}
              onChange={({ target: { value } }) => setComment(value)}
            />
          </FormSection>
          <Divider />
          <FormSection>
            <ButtonsContainer>
              <ModalButton
                onClick={onClose}
                background={theme.color.softPurple}
              >
                Cancel
              </ModalButton>
              <ModalButton
                onClick={handleSave}
                background={theme.color.darkGray}
              >
                Send Reply
              </ModalButton>
            </ButtonsContainer>
          </FormSection>
        </ModalContent>
      </Modal>
    </ModalContainer>
  );
};

export default ReplyModal;
