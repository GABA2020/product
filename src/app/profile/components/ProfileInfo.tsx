import React, { useContext, useState } from 'react';
import Helmet from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { img_user, verified_check } from 'assets/images';
import { sortArrayAlphabetString } from 'helpers/Unity';
import { isUserConnected } from 'services';
import { useSelector, useDispatch } from 'react-redux';
import { ChatSelector } from 'redux/Chat/selectors';
import { useInjectSaga } from 'utils/redux-injectors';
import { ChatSaga } from 'redux/Chat/saga';
import { Chat } from 'app/containers/Chat';
import { showConfirmMessage } from 'helpers/Swal.module';
import { Message } from 'helpers/Message';
import {
  actions as chatActions,
  sliceKey as chatSliceKey,
} from 'redux/Chat/slice';
import { Context } from 'app/globalContext/GlobalContext';


export function ProfileInfo({
  image,
  setIsShowModalEditProfileState,
  owner,
  userSearchProfile
}) {
  useInjectSaga({ key: chatSliceKey, saga: ChatSaga });
  const dispatch = useDispatch();
  const { listLastMessage } = useSelector(ChatSelector);
  const [chatModal, setChatModal] = useState(false);
  const {
    state: { user: userProfile },
  } = useContext(Context);

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
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${userSearchProfile.name} ${userSearchProfile.last_name}`}</title>
      </Helmet>
      {!owner&&<Chat
        isShow={chatModal}
        onHide={() => {
          setChatModal(false);
        }}
      />}
      {owner && (
        <section className="section-profile-edit text-right">
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              setIsShowModalEditProfileState(true);
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </a>
        </section>
      )}
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
                    {`${userSearchProfile.name} ${userSearchProfile.last_name}`}
                    <sup>
                      {userSearchProfile.degrees.join(', ')}{' '}
                      {userSearchProfile.verified ?? (
                        <img src={verified_check} alt="" />
                      )}
                    </sup>
                  </p>
                  {userSearchProfile.medical_school.length > 0 && (
                    <p className="morehouse-des">
                      {userSearchProfile.medical_school}
                    </p>
                  )}
                </div>
                {/* owner profile will use userProfile */}
                <ul className="profile-tag">
                  <li>
                    <a href="#" className="btn-profile-tag">
                      {userSearchProfile?.specialties.join(' ')}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="btn-profile-tag">
                      {userSearchProfile.school_year} Student
                    </a>
                  </li>
                  {/* <li>
                    <a href="#" className="btn-profile-tag">
                      Visual Learner
                    </a>
                  </li> */}
                  {userSearchProfile.honors?.length > 0 &&
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
              {!owner && (
                <div className="profile-connect">
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
                </div>
              )}
              {/* owner profile will use userProfile */}
              {/* <div className="profile-modifile">
                {editModeState === false ? (
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      setEditModeState(true);
                    }}
                    className="btn btn-edit-profile"
                  >
                    Edit Profile
                  </a>
                ) : (
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      setEditModeState(false);
                    }}
                    className="btn btn-edit-profile"
                  >
                    Save Profile
                  </a>
                )}
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
