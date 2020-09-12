import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'utils/redux-injectors';
import {
  actions as userActions,
  sliceKey as userSliceKey,
} from 'redux/User/slice';
import {
  actions as programActions,
  sliceKey as programSliceKey,
} from 'redux/Program/slice';
import {
  actions as storageActions,
  sliceKey as storageSliceKey,
} from 'redux/Storage/slice';
import { UserSaga } from 'redux/User/saga';
import { ProgramSaga } from 'redux/Program/saga';
import { StorageSaga } from 'redux/Storage/saga';
import { userSelector } from 'redux/User/selectors';
import { programSelector } from 'redux/Program/selectors';
import { ordinal_suffix_of, dataUrlFile } from 'helpers/Unity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { EditProfileModal } from 'app/components/Modal/EditProfileModal';
import { Locker } from '../Locker';
import { CVWork } from '../CVWork';
import { useStorage } from 'hook/useStorage';
import { Score } from '../Score';
import { img_user, verified_check } from 'assets/images';
import { REF } from 'helpers/firebase.module';
import Helmet from 'react-helmet';
import { Chat } from '../Chat';

export const MyProfile = props => {
  useInjectSaga({ key: userSliceKey, saga: UserSaga });
  useInjectSaga({ key: programSliceKey, saga: ProgramSaga });
  useInjectSaga({ key: storageSliceKey, saga: StorageSaga });
  const dispatch = useDispatch();
  const { userProfile, educations } = useSelector(userSelector);
  const { program } = useSelector(programSelector);

  const [editModeState, setEditModeState] = useState<boolean>(true);

  const [
    isShowModalEditProfileState,
    setIsShowModalEditProfileState,
  ] = useState<boolean>(false);

  const image = useStorage(`${REF.avatars}/${userProfile.avatar}`);

  useEffect(() => {
    dispatch(
      programActions.getProgramReviewAction({ email: userProfile.email }),
    );
    dispatch(userActions.getEducationsAction({ email: userProfile.email }));
  }, [userProfile.email]);

  const saveProfile = async (
    newUserProfile: ENTITIES.UserProfile,
    newProgram: ENTITIES.Program,
  ) => {
    if (JSON.stringify(newProgram) !== JSON.stringify(program)) {
      dispatch(
        programActions.updateProgramAction({
          email: userProfile.email,
          program: { ...newProgram },
        }),
      );
    }

    if (JSON.stringify(newUserProfile) !== JSON.stringify(userProfile)) {
      dispatch(
        userActions.updateUserProfileAction({
          userProfile: { ...newUserProfile },
        }),
      );
    }
  };

  const uploadAvatar = (imageBase64: string, name: string) => {
    const file: File = dataUrlFile(imageBase64, name);
    dispatch(
      storageActions.uploadFileAction({ name: `${REF.avatars}/${name}`, file }),
    );
  };

  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{userProfile.name}</title>
      </Helmet>
      <EditProfileModal
        saveProfile={saveProfile}
        uploadAvatar={uploadAvatar}
        program={program}
        userProfile={userProfile}
        isShow={isShowModalEditProfileState}
        onHide={() => {
          setIsShowModalEditProfileState(false);
        }}
      ></EditProfileModal>
      {editModeState === true ? (
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
      ) : null}
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
                    {userProfile.name}
                    <sup>
                      {userProfile.degrees}{' '}
                      {userProfile.verified ?? (
                        <img src={verified_check} alt="" />
                      )}
                    </sup>
                  </p>
                  {educations.length > 0 && (
                    <p className="morehouse-des">
                      {educations[0].school} • {educations[0].school_address}
                    </p>
                  )}
                </div>
                {/* owner profile will use userProfile */}
                <ul className="profile-tag">
                  <li>
                    <a href="#" className="btn-profile-tag">
                      {program.specialty}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="btn-profile-tag">
                      {ordinal_suffix_of(userProfile.year_in_program)} Year
                      Student
                    </a>
                  </li>
                  <li>
                    <a href="#" className="btn-profile-tag">
                      Visual Learner
                    </a>
                  </li>
                  {userProfile.honors.length > 0 &&
                    userProfile.honors.map((item, index) => {
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
      {/* owner profile will use userProfile */}
      <Score />
      {/* CV work */}
      <CVWork editMode={editModeState} />
      {/* locker */}
      <Locker />
      <section className="section-milestones"></section>
    </Fragment>
  );
};
