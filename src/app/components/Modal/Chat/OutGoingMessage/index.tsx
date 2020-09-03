import React, { Fragment, FC } from 'react';
import moment from 'moment';

interface Message {
  message: ENTITIES.Message;
}

export const OutGoingMessage: FC<Message> = props => {
  const { message } = props;
  return (
    <Fragment>
      <div className="outgoing_msg">
        <div className="sent_msg">
          <p>{message.content}</p>
          <span className="time_date">
            {`${moment
              .unix(message.created_at.seconds)
              .format('HH:mm')} | ${moment
              .unix(message.created_at.seconds)
              .format('DD-MM-yyyy')}`}
          </span>
        </div>
      </div>
    </Fragment>
  );
};
