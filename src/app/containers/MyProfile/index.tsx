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
import { img_user } from 'assets/images';
import { REF } from 'helpers/firebase.module';

export const MyProfile = props => {
  useInjectSaga({ key: userSliceKey, saga: UserSaga });
  useInjectSaga({ key: programSliceKey, saga: ProgramSaga });
  useInjectSaga({ key: storageSliceKey, saga: StorageSaga });
  const dispatch = useDispatch();
  const { userProfile, educations, imageUploadPreview } = useSelector(
    userSelector,
  );
  const { program } = useSelector(programSelector);

  const [editModeState, setEditModeState] = useState<boolean>(true);
  const [userProfileState, setUserProfileState] = useState<
    ENTITIES.UserProfile
  >({ ...userProfile });
  const [
    isShowModalEditProfileState,
    setIsShowModalEditProfileState,
  ] = useState<boolean>(false);

  const image = useStorage(`${REF.avatars}/${userProfile.avatar}`);

  const image_preview_url = useStorage(
    `${REF.avatars}/${userProfileState.avatar}`,
  );

  useEffect(() => {
    dispatch(
      programActions.getProgramReviewAction({ email: userProfile.email }),
    );
  }, [userProfile.email]);

  useEffect(() => {
    if (imageUploadPreview !== '') {
      setUserProfileState({ ...userProfile, avatar: imageUploadPreview });
    }
  }, [imageUploadPreview]);

  const saveProfile = async (
    userProfile: ENTITIES.UserProfile,
    program: ENTITIES.Program,
  ) => {
    setIsShowModalEditProfileState(false);
    dispatch(userActions.updateUserProfileAction({ userProfile }));
    dispatch(
      programActions.updateProgramAction({
        email: userProfile.email,
        program: program,
      }),
    );
  };

  const saveAvatar = (imageBase64: string, name: string) => {
    const file: File = dataUrlFile(imageBase64, name);
    dispatch(
      userActions.uploadAvatarAction({
        file,
      }),
    );
  };

  return (
    <Fragment>
      <EditProfileModal
        image_preview_url={image_preview_url}
        saveProfile={saveProfile}
        saveAvatar={saveAvatar}
        program={program}
        userProfile={userProfileState}
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
              setUserProfileState(userProfile);
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
                <h2 className="profile-user">
                  {userProfile.verified ? (
                    <span className="tick_mark">
                      {userProfile.name} <sup>{userProfile.degrees}</sup>
                    </span>
                  ) : (
                    <span>
                      {userProfile.name} <sup>{userProfile.degrees}</sup>
                    </span>
                  )}
                </h2>

                {/* owner profile will use userProfile */}
                {educations.length > 0 && (
                  <p className="morehouse-des">
                    {educations[0].school} • {educations[0].school_address}
                  </p>
                )}
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
                  <li>
                    <a href="#" className="btn-profile-tag">
                      AOA
                    </a>
                  </li>
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
