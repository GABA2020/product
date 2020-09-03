import React, { Fragment, FC } from 'react';
import { img_user } from 'assets/images';
import { useUser } from 'hook/useUser';
import { useStorage } from 'hook/useStorage';
import moment from 'moment';
import { history } from 'utils/history';

interface Message {
  message: ENTITIES.Message;
}

export const InComingMessage: FC<Message> = props => {
  const { message } = props;

  const guestUser = useUser(message.sender_email);
  const userImage = useStorage(`avatars/${guestUser?.avatar ?? ''}`);

  return (
    <Fragment>
      <div className="incoming_msg">
        <div className="incoming_msg_img">
          {' '}
          <img
            onClick={e => {
              window.open(guestUser?.username ? guestUser?.username : '');
            }}
            src={userImage ? userImage : img_user}
            alt="img_user"
          />{' '}
        </div>
        <div className="received_msg">
          <div className="received_withd_msg">
            <p>{message.content}</p>
            <span className="time_date">
              {' '}
              {`${moment
                .unix(message.created_at.seconds)
                .format('HH:mm')} | ${moment
                .unix(message.created_at.seconds)
                .format('DD-MM-yyyy')}`}
            </span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
