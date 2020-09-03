import React, { Fragment, FC, useState, useEffect } from 'react';
import { useUser } from 'hook/useUser';
import { convertDateToTimestamp } from 'helpers/Unity';
import moment from 'moment';
import { showConfirmMessage } from 'helpers/Swal.module';
import { Message } from 'helpers/Message';
interface IConnectQuetion {
  lastMessage: ENTITIES.LastMessage;
  userProfile: ENTITIES.UserProfile;
  responseConnect: (lastMessage: ENTITIES.LastMessage) => void;
}
export const ConnectQuestion: FC<IConnectQuetion> = props => {
  const { lastMessage, userProfile, responseConnect } = props;
  const [userEmailState, setUserEmailState] = useState('');

  useEffect(() => {
    if (userProfile.email === lastMessage.sender_email) {
      const userEmail = lastMessage.users.find(
        item => userProfile.email !== item,
      );
      setUserEmailState(userEmail ? userEmail : '');
    } else {
      setUserEmailState(lastMessage.sender_email);
    }
  }, [userProfile, lastMessage]);

  const userCache = useUser(userEmailState);

  const onAcceptResponseConnect = async (status: number) => {
    const newCreateDate = convertDateToTimestamp(moment().toISOString());

    const isConfirm = await showConfirmMessage(
      Message.Accept_Question,
      '',
      'question',
    );

    if (isConfirm.value === true) {
      const newLastMessage: ENTITIES.LastMessage = {
        ...lastMessage,
        connect_status: status,
        created_at: {
          seconds: newCreateDate,
        },
        is_received: false,
        sender_email: userProfile.email,
      };
      responseConnect(newLastMessage);
    }
  };

  const onCancelResponseConnect = async (status: number) => {
    const newCreateDate = convertDateToTimestamp(moment().toISOString());

    const isConfirm = await showConfirmMessage(
      Message.Cancel_Question,
      '',
      'question',
    );

    if (isConfirm.value === true) {
      const newLastMessage: ENTITIES.LastMessage = {
        ...lastMessage,
        connect_status: status,
        created_at: {
          seconds: newCreateDate,
        },
        is_received: false,
        sender_email: userProfile.email,
      };
      responseConnect(newLastMessage);
    }
  };
  return (
    <Fragment>
      <div className="wrapper-chat-connect-question">
        {lastMessage.sender_email === userProfile.email ? (
          <Fragment>
            <h4 className="question">
              Waiting for {userCache?.name} accept your request connect
            </h4>
            <div className="btn-chat-connect">
              <button
                onClick={() => {
                  onCancelResponseConnect(0);
                }}
                className="btn-cancel btn-light"
              >
                Cancel
              </button>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <h4 className="question">
              {userCache?.name} want to connect with you ?
            </h4>
            <div className="btn-chat-connect">
              <button
                onClick={() => {
                  onAcceptResponseConnect(2);
                }}
                className="btn-accept btn-success"
              >
                Accept
              </button>
              <button
                onClick={() => {
                  onCancelResponseConnect(0);
                }}
                className="btn-cancel btn-light"
              >
                Cancel
              </button>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};
