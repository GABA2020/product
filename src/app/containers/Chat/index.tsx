import React, {
  Fragment,
  FC,
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
  useContext,
} from 'react';
import { Modal } from 'react-bootstrap';
import '../../../styles/scss/Chat.scss';
import { ChatListitem } from 'app/components/Modal/Chat/ChatListItem';
import { InComingMessage } from 'app/components/Modal/Chat/InComingMessage';
import { OutGoingMessage } from 'app/components/Modal/Chat/OutGoingMessage';
import { useDispatch, useSelector } from 'react-redux';
import { actions, sliceKey } from 'redux/Chat/slice';
import { ChatSelector } from 'redux/Chat/selectors';
import { ChatSaga } from 'redux/Chat/saga';
import { useInjectSaga } from 'utils/redux-injectors';
import { userSelector } from 'redux/User/selectors';
import { FormInputText } from 'app/components/Modal/Chat/FormInputText';
import { convertDateToTimestamp } from 'helpers/Unity';
import moment from 'moment';
import { ConnectQuestion } from 'app/components/Modal/Chat/ConnectQuestion';
import { Context } from 'app/globalContext/GlobalContext';

interface IChat {
  isShow: boolean;
  onHide: () => void;
}
const findLastMessageIndex = (
  currentUserKey: string,
  lastMessage: ENTITIES.LastMessage[],
) => {
  return lastMessage.findIndex(item => item.users.join(':') === currentUserKey);
};

export const Chat: FC<IChat> = props => {
  const { isShow, onHide } = props;

  useInjectSaga({ key: sliceKey, saga: ChatSaga });
  const dispatch = useDispatch();
  const {
    listLastMessage,
    loading_listLastMessage,
    listMessages,
    messages_length,
    last_query,
    loading_listMessage,
    currentUserKey,
  } = useSelector(ChatSelector);
  const { state: { user:userProfile } } = useContext(Context);
  // const { userProfile } = useSelector(userSelector);
  const [indexConversion, setIndexConversion] = useState(0);

  // const scrollToBottom = () => {
  //   const element = document.getElementById('msg_history') as HTMLElement;
  //   element.scrollTop = element.scrollHeight;
  // };

  const onScroll = event => {
    const element: HTMLElement = event.target as HTMLElement;
    if (element.scrollTop === 0 && listMessages.length < messages_length) {
      dispatch(
        actions.getMoreListMessageAction({
          users_mail_key: currentUserKey,
          last_query,
        }),
      );
    }
  };

  useEffect(() => {
    if (currentUserKey !== '' && listLastMessage.length > 0) {
      setIndexConversion(findLastMessageIndex(currentUserKey, listLastMessage));
    }
  }, [currentUserKey, listLastMessage]);

  useEffect(() => {
    if (isShow && currentUserKey !== '') {
      dispatch(
        actions.getListMessageAction({
          users_mail_key: currentUserKey,
        }),
      );
    }
  }, [currentUserKey, isShow, dispatch]);

  //listen when list last item when have new message
  useEffect(() => {
    if (userProfile.email !== '') {
      dispatch(
        actions.ListenListLastMessageAction({ email: userProfile.email }),
      );
    }
  }, [userProfile.email, dispatch]);

  //listen when list message when have new message
  useEffect(() => {
    if (isShow === true && currentUserKey !== '') {
      dispatch(
        actions.listenNewMessageAction({
          users_mail_key: currentUserKey,
        }),
      );
    }
  }, [currentUserKey, isShow, dispatch]);

  useEffect(() => {
    const element = document.getElementById('msg_history') as HTMLElement;
    if (isShow === true) {
      element.addEventListener('scroll', onScroll);
      return () => {
        element.removeEventListener('scroll', onScroll);
      };
    }
  }, [listMessages.length, messages_length, isShow]);

  const renderListLastMessage = (listLastMessage: ENTITIES.LastMessage[]) => {
    return (
      <Fragment>
        {listLastMessage.map((item, index) => {
          return (
            <div
              key={index}
              className={`chat_list ${
                item.users.join(':') === currentUserKey && 'active_chat'
              }`}
            >
              <ChatListitem openMessage={openMessage} lastMessageItem={item} />
            </div>
          );
        })}
      </Fragment>
    );
  };

  const renderListMessage = (listMessage: ENTITIES.Message[]) => {
    return (
      <Fragment>
        {listMessage.map((item, index) => {
          return item.sender_email === userProfile.email ? (
            <OutGoingMessage message={item} key={index} />
          ) : (
            <InComingMessage message={item} key={index} />
          );
        })}
      </Fragment>
    );
  };

  // useLayoutEffect(() => {
  //   if (!loading_listMessage && isShow) {
  //     scrollToBottom();
  //   }
  // }, [loading_listMessage, isShow]);

  const openMessage = (userKeyMail: string) => {
    dispatch(actions.setCurrentUserKey(userKeyMail));
    const index = listLastMessage.findIndex(
      item => item.users.join(':') === userKeyMail,
    );

    if (listLastMessage[index].connect_status === 1) {
      if (listLastMessage[index].sender_email !== userProfile.email) {
        dispatch(
          actions.setMessageToReadAction({
            users_mail_key: listLastMessage[index].users.join(':'),
          }),
        );
      }
    } else {
      dispatch(
        actions.setMessageToReadAction({
          users_mail_key: listLastMessage[index].users.join(':'),
        }),
      );
    }
  };

  const sendMessage = (message: string) => {
    const newCreateDate = convertDateToTimestamp(moment().toISOString());
    const newMessage: ENTITIES.Message = {
      id: '',
      content: message,
      sender_email: userProfile.email,
      created_at: {
        seconds: newCreateDate,
      },
    };

    const newLastMessage: ENTITIES.LastMessage = {
      created_at: { seconds: newCreateDate },
      is_received: false,
      last_message: message,
      sender_email: userProfile.email,
      users: listLastMessage[indexConversion].users,
      connect_status: 2,
    };

    dispatch(
      actions.sendMessageAction({
        users_mail_key: listLastMessage[indexConversion].users.join(':'),
        message: { ...newMessage },
        lastMessage: { ...newLastMessage },
      }),
    );
  };

  const responseConnect = (lastMessage: ENTITIES.LastMessage) => {
    if (lastMessage.connect_status === 0) {
      dispatch(actions.setCurrentUserKey(''));
    }
    dispatch(actions.responseConnectAction({ lastMessage }));
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
          <Modal.Title>Massager</Modal.Title>
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
                <div id="msg_history" className="msg_history">
                  {currentUserKey !== '' &&
                    listLastMessage[indexConversion] &&
                    listLastMessage[indexConversion].connect_status === 1 && (
                      <ConnectQuestion
                        responseConnect={responseConnect}
                        userProfile={userProfile}
                        lastMessage={listLastMessage[indexConversion]}
                      />
                    )}
                  {currentUserKey !== '' &&
                    !loading_listMessage &&
                    listLastMessage[indexConversion] &&
                    listLastMessage[indexConversion].connect_status === 2 &&
                    listMessages.length > 0 &&
                    renderListMessage(listMessages)}
                </div>
                {currentUserKey !== '' &&
                  listLastMessage[indexConversion] &&
                  listLastMessage[indexConversion].connect_status === 2 && (
                    <FormInputText sendMessage={sendMessage} />
                  )}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};
