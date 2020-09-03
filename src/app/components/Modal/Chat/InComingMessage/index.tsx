import React, { Fragment } from 'react';
import { img_user } from 'assets/images';

export const InComingMessage = () => {
  return (
    <Fragment>
      <div className="incoming_msg">
        <div className="incoming_msg_img">
          {' '}
          <img src={img_user} alt="img_user" />{' '}
        </div>
        <div className="received_msg">
          <div className="received_withd_msg">
            <p>Test which is a new approach to have all solutions</p>
            <span className="time_date"> 11:01 AM | June 9</span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
