import React, { Fragment, FC, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import '../../../styles/scss/Chat.scss';
import { ChatListitem } from 'app/components/Modal/Chat/ChatListItem';
import { img_user } from 'assets/images';
import { InComingMessage } from 'app/components/Modal/Chat/InComingMessage';
import { OutGoingMessage } from 'app/components/Modal/Chat/OutGoingMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { actions, sliceKey } from 'redux/Chat/slice';
import { ChatSelector } from 'redux/Chat/selectors';
import { ChatSaga } from 'redux/Chat/saga';
import { useInjectSaga } from 'utils/redux-injectors';
import { userSelector } from 'redux/User/selectors';
interface IChat {
  isShow: boolean;
  onHide: () => void;
}

export const Chat: FC<IChat> = props => {
  const { isShow, onHide } = props;

  useInjectSaga({ key: sliceKey, saga: ChatSaga });
  const dispatch = useDispatch();
  const { listLastMessage, loading_listLastMessage } = useSelector(
    ChatSelector,
  );
  const { userProfile } = useSelector(userSelector);

  useEffect(() => {
    if (userProfile.email !== '' && isShow === true) {
      dispatch(actions.getListLastMessageAction({ email: userProfile.email }));
    }
  }, [userProfile.email]);

  const renderListLastMessage = (listLastMessage: ENTITIES.LastMessage[]) => {
    return (
      <Fragment>
        {listLastMessage.map((item, index) => {
          return (
            <div className="chat_list">
              <ChatListitem key={index} lastMessageItem={item} />
            </div>
          );
        })}
      </Fragment>
    );
  };

  return (
    <Fragment>
      <Modal
        dialogClassName="chat-modal"
        bsSize="large"
        backdrop="static"
        show={isShow}
        onHide={onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title>Chat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="messaging">
            <div className="inbox_msg">
              <div className="inbox_people">
                <div className="inbox_chat">
                  {/* <div className="chat_list active_chat">
                    <div className="chat_people">
                      <div className="chat_img">
                        {' '}
                        <img src={img_user} alt="sunil" />{' '}
                      </div>
                      <div className="chat_ib">
                        <h5>
                          Sunil Rajput{' '}
                          <span className="chat_date">Aug 06, 2020 </span>
                        </h5>
                        <p>
                          Test, which is a new approach to have all solutions
                          astrology under one roof.
                        </p>
                      </div>
                    </div>
                  </div> */}
                  {!loading_listLastMessage &&
                    renderListLastMessage(listLastMessage)}
                </div>
              </div>
              <div className="mesgs">
                <div className="msg_history">
                  <InComingMessage />
                  <OutGoingMessage />
                  <InComingMessage />
                  <InComingMessage />
                  <OutGoingMessage />
                  <OutGoingMessage />
                  <OutGoingMessage />
                  <InComingMessage />
                  <InComingMessage />
                  <InComingMessage />
                  <InComingMessage />
                </div>
                <div className="type_msg">
                  <div className="input_msg_write">
                    <input
                      type="text"
                      className="write_msg"
                      placeholder="Type a message"
                    />
                    <button className="msg_send_btn" type="button">
                      <FontAwesomeIcon icon={faReply} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};
