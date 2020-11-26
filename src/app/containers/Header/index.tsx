import React, { Fragment, useContext, useEffect, useState } from 'react';
import { authSelector } from 'redux/Auth/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { img_account, gaba, nav_icon } from 'assets/images';
import RoutesTypes from 'types/Routes';
import {
  actions as userActions,
  sliceKey as userSlice,
} from 'redux/User/slice';
import {
  actions as authActions,
  sliceKey as authSlice,
} from 'redux/Auth/slice';
import {
  actions as chatActions,
  sliceKey as chatSlice,
} from 'redux/Chat/slice';
import { useInjectSaga } from 'redux-injectors';
import { userSelector } from 'redux/User/selectors';
import { AuthSaga } from 'redux/Auth/saga';
import { ChatSaga } from 'redux/Chat/saga';
import { UserSaga } from 'redux/User/saga';
import { SearchBox } from 'app/components/SearchBox';
import { Chat } from '../Chat';
import { MessageOutlined } from '@ant-design/icons';
import Badge from 'antd/lib/badge';
import 'styles/scss/header.scss';
import { ChatSelector } from 'redux/Chat/selectors';
import { Context } from 'app/globalContext/GlobalContext';


export const Header = () => {
  useInjectSaga({ key: userSlice, saga: UserSaga });
  useInjectSaga({ key: authSlice, saga: AuthSaga });
  useInjectSaga({ key: chatSlice, saga: ChatSaga });

  // const {dispatch:{ changeShowMenu } } = useContext(Context);

  // const { isAuth, email } = useSelector(authSelector);
  const { state: { isAuth, user }, dispatch:{ changeShowMenu, logout } } = React.useContext(Context);
  const email = user?.email;

  const { userSearchResults } = useSelector(userSelector);
  const { state: { user:userProfile } } = useContext(Context);

  const { listLastMessage } = useSelector(ChatSelector);
  const dispatch = useDispatch();

  const [chatModal, setChatModal] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  

  useEffect(() => {
    if (isAuth) {
      dispatch(userActions.getUserProfileAction(email));
      return;
    }
  }, [isAuth, dispatch]);

  useEffect(() => {
    let count = 0;
    listLastMessage.forEach(item => {
      if (
        item.is_received === false &&
        userProfile.email !== item.sender_email
      ) {
        count = count + 1;
      }
    });
    setNotificationCount(count);
  }, [listLastMessage, userProfile]);

  const onchangeSearchText = (text: string) => {
    if (text.trim() !== '') {
      dispatch(userActions.searchUsersAction({ text }));
    }
  };

  const signOut = () => {
    // dispatch(authActions.logoutAction());
    logout()
  };

  const adminList = ['candice.blacknall@gogaba.co'];

  function handleShowMenu() {
    changeShowMenu(true)
  }


  return (
    <Fragment>
      <Chat
        isShow={chatModal}
        onHide={() => {
          setChatModal(false);
        }}
      />
      <header id="header">
        <div className="brand">
          <div className="nav-action">
            <a className="nav-open" onClick={handleShowMenu} >
              <img src={nav_icon} alt="logo" />
            </a>
          </div>
          <div id="logo">
            <img src={gaba} alt="logo" />
          </div>
        </div>
        <SearchBox
          //searchResults={userSearchResults}
          //onchangeSearchText={onchangeSearchText}
        ></SearchBox>
        {adminList.includes(email as any) && (
          <>
            <Link to={RoutesTypes.ADMIN_CONSOLE}>
              <span className="account-name">Admin Console</span>
            </Link>
          </>
        )}
        <div className="account">
          <div className="notification">
            <a
              className="btn-chat-notification"
              href="#"
              onClick={e => {
                e.preventDefault();
                setChatModal(true);
              }}
            >
              <Badge count={notificationCount}>
                <MessageOutlined
                  style={{ fontSize: '22px', color: '#111741' }}
                />
              </Badge>
            </a>
          </div>
          <div className="account-member dropdown">
            {isAuth && (
              <Fragment>
                <Link
                  to={`/home/${userProfile.username}`}
                  className="account-toggle"
                >
                  <img className="icons" src={img_account} alt="" />
                  <span className="account-name">{`${userProfile.name} ${userProfile.last_name}`}</span>
                </Link>
              </Fragment>
            )}
            <div className="dropdown-content">
              {/* <Link to={RoutesTypes.CV_PREVIEW}>Download CV</Link> */}
              {/* <a
                onClick={e => {
                  e.preventDefault();
                  window.open(RoutesTypes.CV_PREVIEW);
                }}
                href="#"
              >
                Download CV
              </a> */}
              <a onClick={() => signOut()} href="#">
                Sign out
              </a>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};
