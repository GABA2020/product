import React, { Fragment, FC } from 'react';
import { img_user } from 'assets/images';
import moment from 'moment';
interface IChatListItem {
  lastMessageItem: ENTITIES.LastMessage;
}
export const ChatListitem: FC<IChatListItem> = props => {
  const { lastMessageItem } = props;
  return (
    <Fragment>
      <div className="chat_people">
        <div className="chat_img">
          {' '}
          <img src={img_user} alt="sunil" />{' '}
        </div>
        <div className="chat_ib">
          <h5>
            Sunil Rajput{' '}
            <span className="chat_date">
              {moment
                .unix(lastMessageItem.created_at.seconds)
                .format('DD-MM-yyyy')}
            </span>
          </h5>
          <p>{lastMessageItem.last_message}</p>
        </div>
      </div>
    </Fragment>
  );
};
