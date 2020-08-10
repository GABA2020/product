import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectSaga } from 'utils/redux-injectors';
import {
  sliceKey as userSliceKey,
  actions as userActions,
} from 'redux/User/slice';
import {
  sliceKey as programSliceKey,
  actions as programActions,
} from 'redux/Program/slice';
import {
  sliceKey as storageSliceKey,
  actions as storageActions,
} from 'redux/Storage/slice';
import { UserSaga } from 'redux/User/saga';
import { ProgramSaga } from 'redux/Program/saga';
import { StorageSaga } from 'redux/Storage/saga';
import { userSelector } from 'redux/User/selectors';
import { programSelector } from 'redux/Program/selectors';
import { img_locker } from '../../../assets/images';
import { ordinal_suffix_of } from 'helpers/Unity';
import { Link } from 'react-router-dom';
import RoutesTypes from 'types/Routes';
import { storageSelector } from 'redux/Storage/selectors';
import { GuestUserLocker } from '../GuestUserLocker';

export const GuestUserProfile = props => {
  useInjectSaga({ key: userSliceKey, saga: UserSaga });
  useInjectSaga({ key: programSliceKey, saga: ProgramSaga });
  useInjectSaga({ key: storageSliceKey, saga: StorageSaga });

  const { userSearchProfile } = useSelector(userSelector);
  const { program } = useSelector(programSelector);
  const { avatar_url } = useSelector(storageSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      programActions.getProgramReviewAction({
        email: userSearchProfile.email,
      }),
    );
  }, [userSearchProfile.username]);

  useEffect(() => {
    if (userSearchProfile.avatar !== '') {
      dispatch(
        storageActions.getAvatarURLAction({ name: userSearchProfile.avatar }),
      );
    }
  }, [userSearchProfile.avatar]);

  return (
    <Fragment>
      <section className="section-profile">
        <div className="container">
          <div className="media media-profile">
            <div className="profile-images">
              <a href="#">
                <img
                  alt="user image"
                  src={avatar_url}
                  width={140}
                  height={140}
                />
              </a>
            </div>
            <div className="media-body">
              <div className="profile-body">
                <h2 className="profile-user">
                  {userSearchProfile.verified ? (
                    <span className="tick_mark">
                      {userSearchProfile.name}{' '}
                      <sup>{userSearchProfile.degrees}</sup>
                    </span>
                  ) : (
                    <span>
                      {userSearchProfile.name}{' '}
                      <sup>{userSearchProfile.degrees}</sup>
                    </span>
                  )}
                </h2>

                {/* owner profile will use userProfile */}
                <p className="morehouse-des">{program.program_name}</p>
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
              {/* owner profile will use userProfile */}
              <div className="profile-modifile">
                <a href="#" className="btn btn-edit-profile">
                  Connect
                </a>
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
