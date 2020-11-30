import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'utils/redux-injectors';
import { sliceKey as userSliceKey } from 'redux/User/slice';
import {
  actions as programActions,
  sliceKey as programSliceKey,
} from 'redux/Program/slice';
import {
  actions as chatActions,
  sliceKey as chatSliceKey,
} from 'redux/Chat/slice';
import { ChatSaga } from 'redux/Chat/saga';
import { UserSaga } from 'redux/User/saga';
import { ProgramSaga } from 'redux/Program/saga';
import { userSelector } from 'redux/User/selectors';
import { programSelector } from 'redux/Program/selectors';
import { ordinal_suffix_of, sortArrayAlphabetString } from 'helpers/Unity';
import { GuestUserLocker } from '../GuestUserLocker';
import { useStorage } from 'hook/useStorage';
import { img_user, verified_check } from 'assets/images';
import Helmet from 'react-helmet';
import { Chat } from '../Chat';
import { ChatSelector } from 'redux/Chat/selectors';
import { isUserConnected } from 'services';
import { showConfirmMessage } from 'helpers/Swal.module';
import { Message } from 'helpers/Message';
import { Context } from 'app/globalContext/GlobalContext';
import { useQuery } from '@apollo/client';

export const GuestUserProfile = props => {
  useInjectSaga({ key: userSliceKey, saga: UserSaga });
  useInjectSaga({ key: programSliceKey, saga: ProgramSaga });
  useInjectSaga({ key: chatSliceKey, saga: ChatSaga });

  const dispatch = useDispatch();
  const { 
    userSearchProfile, 
    // userProfile 
  } = useSelector(userSelector);
  
  // const {
  //   data: searchUserResponse,
  //   loading: loadinUsers,
  //   error: userError,
  // } = useQuery(USER_QUERY_PG_BY);

  const { state: { user:userProfile } } = useContext(Context);
  const { program } = useSelector(programSelector);
  const { listLastMessage } = useSelector(ChatSelector);

  const [chatModal, setChatModal] = useState(false);

  const image = useStorage(`avatars/${userSearchProfile.avatar}`);

  useEffect(() => {
    dispatch(
      programActions.getProgramReviewAction({
        email: userSearchProfile.email,
      }),
    );
  }, [userSearchProfile.username]);

  const connectUser = async () => {
    if (userSearchProfile.email !== '' && userProfile.email !== '') {
      const user_email_array = sortArrayAlphabetString([
        userSearchProfile.email,
        userProfile.email,
      ]);

      const isConnected = await isUserConnected(user_email_array.join(':'));

      if (isConnected) {
        const index = listLastMessage.findIndex(
          item => item.users.join(':') === user_email_array.join(':'),
        );
        dispatch(chatActions.setCurrentUserKey(user_email_array.join(':')));
        setChatModal(true);
      } else {
        const isConfirm = await showConfirmMessage(
          Message.Connect_Question,
          '',
          'question',
        );
        if (isConfirm.value) {
          // dispatch(
          //   chatActions.setCurrentUserKey(user_email_array.join(':')),
          // );
          dispatch(
            chatActions.connectUserAction({
              users_mail_key: user_email_array.join(':'),
              senderEmail: userProfile.email,
            }),
          );
          setChatModal(true);
        }
      }
    }
  };

  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{userSearchProfile.username}</title>
      </Helmet>
      <Chat
        isShow={chatModal}
        onHide={() => {
          setChatModal(false);
        }}
      />
      <section className="section-profile">
        <div className="container">
          <div className="media media-profile">
            <div className="profile-images">
              <a href="#">
                {image !== '' ? (
                  <img
                    alt="user image"
                    src={image ?? ''}
                    width={140}
                    height={140}
                  />
                ) : (
                  <img
                    alt="user image"
                    src={img_user}
                    width={140}
                    height={140}
                  />
                )}
              </a>
            </div>
            <div className="media-body">
              <div className="profile-body">
                <div className="profile-user">
                  <p className="user-name">
                    {userSearchProfile.username}
                    <sup>
                      {userSearchProfile.degrees}{' '}
                      {userSearchProfile.verified ?? (
                        <img src={verified_check} alt="" />
                      )}
                    </sup>
                  </p>
                </div>
                {/* owner profile will use userSearchProfile */}
                <ul className="profile-tag">
                  <li>
                    <a href="#" className="btn-profile-tag">
                      {program?.specialty}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="btn-profile-tag">
                      {userSearchProfile.student_status} Year Student
                    </a>
                  </li>
                  <li>
                    <a href="#" className="btn-profile-tag">
                      Visual Learner
                    </a>
                  </li>
                  {userSearchProfile.honors.length > 0 &&
                    userSearchProfile.honors.map((item, index) => {
                      return (
                        <li key={index}>
                          <a href="#" className="btn-profile-tag">
                            {item}
                          </a>
                        </li>
                      );
                    })}
                </ul>
              </div>
              {/* <div className="profile-connect">
                <a
                  onClick={e => {
                    e.preventDefault();
                    connectUser();
                  }}
                  href="#"
                  className="btn btn-connect"
                >
                  Connect
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </section>
      <GuestUserLocker />
      <section className="section-milestones"></section>
    </Fragment>
  );
};
