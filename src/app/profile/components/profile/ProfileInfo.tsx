import React, { useContext, useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { img_user, verified_check } from 'assets/images';

import { useSelector, useDispatch } from 'react-redux';
import { ChatSelector } from 'redux/Chat/selectors';
import { useInjectSaga } from 'utils/redux-injectors';
import { ChatSaga } from 'redux/Chat/saga';
import { Chat } from 'app/containers/Chat';

import {
  actions as chatActions,
  sliceKey as chatSliceKey,
} from 'redux/Chat/slice';
import { Context } from 'app/globalContext/GlobalContext';
import styled from 'styled-components';
import { Button } from '../../../genericComponents';
import { useMutation, useQuery } from '@apollo/client';
import { CONNECT_TO_USER, DISCONNECT_TO_USER } from 'service/mutations';
import { CONNECTED_USERS } from 'service/queries';

const ConnectButton = styled(Button)`
  background-color: #eeaa35;
  color: ${props => props.theme.color.goodNightColor};
  padding: 15px 14px 14px;
  border-radius: 6px;

  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: 0.1px;
  text-align: center;
  color: $goodNightColor;
  min-width: 120px;
`;
const DisconnectButton = styled(Button)`
  padding: 15px 14px 14px;
  border-radius: 6px;

  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: 0.1px;
  text-align: center;
  color: $goodNightColor;
  min-width: 120px;
  background: ${props => props.theme.color.softPurple};
  color: ${props => props.theme.color.black};
`;

export default function ProfileInfo({
  image,
  setIsShowModalEditProfileState,
  owner,
  userSearchProfile,
}) {
  useInjectSaga({ key: chatSliceKey, saga: ChatSaga });
  const dispatch = useDispatch();
  const { listLastMessage } = useSelector(ChatSelector);
  const [chatModal, setChatModal] = useState(false);
  const {
    state: { user: userProfile },
  } = useContext(Context);

  const {
    loading: loadingConnect,
    data: connectResponse,
    error: connectError,
    refetch: fetchConnect,
  } = useQuery(CONNECTED_USERS, { variables: { email: userProfile.email } });

  const [connectToUser] = useMutation(CONNECT_TO_USER);
  const [disconnectToUser] = useMutation(DISCONNECT_TO_USER);

  const [onConnect, setOnConnect] = useState(false);

  useEffect(() => {
    if (connectResponse) {
      let connectresponseans =
        connectResponse.connectedUsers.filter(
          conusr => userSearchProfile.email === conusr.email,
        ).length > 0;

      setOnConnect(connectresponseans);
    }
  }, [connectResponse]);

  const handleConnectButtonPress = async (
    email: string,
    emailSender: string,
    onConnect: boolean,
  ) => {
    try {
      if (onConnect) {
        //console.log('conectFunc', email, emailSender, onConnect);
        await disconnectToUser({
          variables: {
            reciver_email: email,
            sender_email: emailSender,
          },
        });
      } else {
        //console.log('conectFunc', email, emailSender, onConnect);
        await connectToUser({
          variables: {
            reciver_email: email,
            sender_email: emailSender,
          },
        });
      }
      fetchConnect();
    } catch (err) {
      console.log('Error: ', err);
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${userSearchProfile.name} ${userSearchProfile.last_name}`}</title>
      </Helmet>
      {!owner && (
        <Chat
          isShow={chatModal}
          onHide={() => {
            setChatModal(false);
          }}
        />
      )}
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
                  {(userSearchProfile?.specialties.length > 0) ? (
                    <li>
                      <a href="#" className="btn-profile-tag">
                        {userSearchProfile?.specialties.join(' ')}
                      </a>
                    </li>) : ''}
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
                  {onConnect ? (
                    <DisconnectButton
                      onClick={() => {
                        handleConnectButtonPress(
                          userSearchProfile.email,
                          userProfile.email,
                          onConnect,
                        );
                      }}
                    >
                      Disconect
                    </DisconnectButton>
                  ) : (
                      <ConnectButton
                        onClick={() => {
                          handleConnectButtonPress(
                            userSearchProfile.email,
                            userProfile.email,
                            onConnect,
                          );
                        }}
                      >
                        Connect
                      </ConnectButton>
                    )}
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
