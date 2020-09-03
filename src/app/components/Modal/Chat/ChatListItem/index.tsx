import React, { Fragment, FC } from 'react';
import { img_user } from 'assets/images';
import moment from 'moment';
import { useUser } from 'hook/useUser';
import { userSelector } from 'redux/User/selectors';
import { useSelector } from 'react-redux';
import { useStorage } from 'hook/useStorage';
interface IChatListItem {
  lastMessageItem: ENTITIES.LastMessage;
  openMessage: (lastMessageItem: ENTITIES.LastMessage, index: number) => void;
  index: number;
}
export const ChatListitem: FC<IChatListItem> = props => {
  const { lastMessageItem, index, openMessage } = props;
  const { userProfile } = useSelector(userSelector);

  const guestUser = useUser(
    lastMessageItem.users.filter(item => item !== userProfile.email)[0],
  );

  const userImage = useStorage(`avatars/${guestUser?.avatar ?? ''}`);

  return (
    <Fragment>
      <div
        onClick={() => openMessage(lastMessageItem, index)}
        className="chat_people"
      >
        <div className="chat_img">
          <img src={userImage ? userImage : img_user} alt="sunil" />{' '}
        </div>
        <div className="chat_ib">
          <h5>
            {guestUser?.name}{' '}
            <span className="chat_date">
              {moment.unix(lastMessageItem.created_at.seconds).format('HH:mm')}
            </span>
          </h5>
          {lastMessageItem.is_received === true ? (
            <p>
              {lastMessageItem.last_message.length > 90
                ? lastMessageItem.last_message.slice(0, 89)
                : lastMessageItem.last_message}
            </p>
          ) : lastMessageItem.sender_email === userProfile.email ? (
            <p>
              {lastMessageItem.last_message.length > 90
                ? lastMessageItem.last_message.slice(0, 89)
                : lastMessageItem.last_message}
            </p>
          ) : (
            <p style={{ color: 'black', fontWeight: 'bold' }}>
              {lastMessageItem.last_message.length > 90
                ? lastMessageItem.last_message.slice(0, 89)
                : lastMessageItem.last_message}
            </p>
          )}
        </div>
      </div>
    </Fragment>
  );
};
