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

export const GuestUserProfile = props => {
  useInjectSaga({ key: userSliceKey, saga: UserSaga });
  useInjectSaga({ key: programSliceKey, saga: ProgramSaga });

  const dispatch = useDispatch();
  const { userSearchProfile } = useSelector(userSelector);
  const { program } = useSelector(programSelector);

  const image = useStorage(`avatar/${userSearchProfile.avatar}`);

  useEffect(() => {
    dispatch(
      programActions.getProgramReviewAction({
        email: userSearchProfile.email,
      }),
    );
  }, [userSearchProfile.username]);

  return (
    <Fragment>
      <section className="section-profile">
        <div className="container">
          <div className="media media-profile">
            <div className="profile-images">
              <a href="#">
                <img
                  alt="user image"
                  src={image ?? ''}
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
