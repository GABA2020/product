import React, { Fragment, FC, useContext } from 'react';
import { img_user } from 'assets/images';
import moment from 'moment';
import { useUser } from 'hook/useUser';
import { useStorage } from 'hook/useStorage';
import { Context } from 'app/globalContext/GlobalContext';
interface IChatListItem {
  lastMessageItem: ENTITIES.LastMessage;
  openMessage: (userKeyMail: string) => void;
}
export const ChatListitem: FC<IChatListItem> = props => {
  const { lastMessageItem, openMessage } = props;
  const { state: { user:userProfile } } = useContext(Context);
  // const { userProfile } = useSelector(userSelector);

  const guestUser = useUser(
    lastMessageItem.users.filter(item => item !== userProfile.email)[0],
  );

  const userImage = useStorage(`avatars/${guestUser?.avatar ?? ''}`);

  return (
    <Fragment>
      <div className="chat_people">
        <div className="chat_img">
          <img
            onClick={e => {
              window.open(guestUser?.username ? guestUser?.username : '');
            }}
            src={userImage ? userImage : img_user}
            alt="sunil"
          />{' '}
        </div>
        <div
          onClick={() => openMessage(lastMessageItem.users.join(':'))}
          className="chat_ib"
        >
          <h5>
            {guestUser?.username}{' '}
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
