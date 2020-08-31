import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'utils/redux-injectors';
import { sliceKey as userSliceKey } from 'redux/User/slice';
import {
  actions as programActions,
  sliceKey as programSliceKey,
} from 'redux/Program/slice';
import { UserSaga } from 'redux/User/saga';
import { ProgramSaga } from 'redux/Program/saga';
import { userSelector } from 'redux/User/selectors';
import { programSelector } from 'redux/Program/selectors';
import { ordinal_suffix_of } from 'helpers/Unity';
import { GuestUserLocker } from '../GuestUserLocker';
import { useStorage } from 'hook/useStorage';
import { img_user, verified_check } from 'assets/images';
import Helmet from 'react-helmet';

export const GuestUserProfile = props => {
  useInjectSaga({ key: userSliceKey, saga: UserSaga });
  useInjectSaga({ key: programSliceKey, saga: ProgramSaga });

  const dispatch = useDispatch();
  const { userSearchProfile } = useSelector(userSelector);
  const { program } = useSelector(programSelector);

  const image = useStorage(`avatars/${userSearchProfile.avatar}`);

  useEffect(() => {
    dispatch(
      programActions.getProgramReviewAction({
        email: userSearchProfile.email,
      }),
    );
  }, [userSearchProfile.username]);

  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{userSearchProfile.name}</title>
      </Helmet>
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
                    {userSearchProfile.name}
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
                      {program.specialty}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="btn-profile-tag">
                      {ordinal_suffix_of(userSearchProfile.year_in_program)}{' '}
                      Year Student
                    </a>
                  </li>
                  <li>
                    <a href="#" className="btn-profile-tag">
                      Visual Learner
                    </a>
                  </li>
                  <li>
                    <a href="#" className="btn-profile-tag">
                      AOA
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <GuestUserLocker />
      <section className="section-milestones"></section>
    </Fragment>
  );
};
