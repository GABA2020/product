import React, { Fragment, useState, useEffect } from 'react';
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
import { storageSelector } from 'redux/Storage/selectors';
import { ordinal_suffix_of } from 'helpers/Unity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { EditProfileModal } from 'app/components/Modal/EditProfileModal';
import { Locker } from '../Locker';
import { CVWork } from '../CVWork';

export const MyProfile = props => {
  useInjectSaga({ key: userSliceKey, saga: UserSaga });
  useInjectSaga({ key: programSliceKey, saga: ProgramSaga });
  useInjectSaga({ key: storageSliceKey, saga: StorageSaga });
  const dispatch = useDispatch();
  const {
    userProfile,
    workExperiences,
    educations,
    volunteers,
    researches,
    letters,
  } = useSelector(userSelector);
  const { program } = useSelector(programSelector);
  const { avatar_url } = useSelector(storageSelector);

  const [editModeState, setEditModeState] = useState<boolean>(true);
  const [
    isShowModalEditProfileState,
    setIsShowModalEditProfileState,
  ] = useState<boolean>(false);

  useEffect(() => {
    dispatch(
      programActions.getProgramReviewAction({ email: userProfile.email }),
    );
  }, [userProfile.email]);

  useEffect(() => {
    if (userProfile.avatar !== '') {
      dispatch(storageActions.getAvatarURLAction({ name: userProfile.avatar }));
    }
  }, [userProfile.avatar]);

  const saveProfile = async (
    userProfile: ENTITIES.UserProfile,
    program: ENTITIES.Program,
    imageBase64: string,
  ) => {
    setIsShowModalEditProfileState(false);
    if (imageBase64 !== '') {
      dispatch(
        storageActions.uploadAvatarAction({
          name: userProfile.avatar,
          content: imageBase64,
        }),
      );
      dispatch(userActions.updateUserProfileAction({ userProfile }));
      dispatch(
        programActions.updateProgramAction({
          email: userProfile.email,
          program: program,
        }),
      );
      return;
    }
    dispatch(userActions.updateUserProfileAction({ userProfile }));
    dispatch(
      programActions.updateProgramAction({
        email: userProfile.email,
        program: program,
      }),
    );
  };

  return (
    <Fragment>
      <EditProfileModal
        avatar_url={avatar_url}
        saveProfile={saveProfile}
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
      <section className="section-step-scope">
        <div className="container">
          <ul className="section-step-category">
            <li className="step-item">
              <figure className="box-step">
                <div className="service-icons">
                  <a href="#">
                    <span className="icons-grid">&nbsp;</span>
                  </a>
                </div>
                <figcaption className="step-caption">
                  <h3 className="step-name">
                    <a href="#">MCAT</a>
                  </h3>
                  <p className="step-paragraph">
                    <span className="step-num">{userProfile.mcat}</span>
                    {userProfile.mcat >= 246 && (
                      <span className="step-gloss"> / Pass</span>
                    )}
                  </p>
                  <div className="scope-link">
                    <a href="#">Manage Scores</a>
                  </div>
                </figcaption>
              </figure>
            </li>
            <li className="step-item">
              <figure className="box-step">
                <div className="service-icons">
                  <a href="#">
                    <span className="icons-point">&nbsp;</span>
                  </a>
                </div>
                <figcaption className="step-caption">
                  <h3 className="step-name">
                    <a href="#">Step One</a>
                  </h3>
                  <p className="step-paragraph">
                    <span className="step-num">{userProfile.step_1}</span>
                    {userProfile.step_1 >= 246 && (
                      <span className="step-gloss"> / Pass</span>
                    )}
                  </p>
                  <div className="scope-link">
                    <a href="#">Manage Scores</a>
                  </div>
                </figcaption>
              </figure>
            </li>
            <li className="step-item">
              <figure className="box-step">
                <div className="service-icons">
                  <a href="#">
                    <span className="icons-image">&nbsp;</span>
                  </a>
                </div>
                <figcaption className="step-caption">
                  <h3 className="step-name">
                    <a href="#">Step Two CK / CS</a>
                  </h3>
                  <p className="step-paragraph">
                    <span className="step-num">{userProfile.step_2}</span>
                    {userProfile.step_2 >= 246 && (
                      <span className="step-gloss"> / Pass</span>
                    )}
                  </p>
                  <div className="scope-link">
                    <a href="#">Manage Scores</a>
                  </div>
                </figcaption>
              </figure>
            </li>
            <li className="step-item">
              <figure className="box-step">
                <div className="service-icons">
                  <a href="#">
                    <span className="icons-pi">&nbsp;</span>
                  </a>
                </div>
                <figcaption className="step-caption">
                  <h3 className="step-name">
                    <a href="#">Step Three</a>
                  </h3>
                  <p className="step-paragraph step-paragraph-verify">
                    Once we verify your scores, you will see them here.
                  </p>
                  <div className="scope-link">
                    <a href="#">Manage Scores</a>
                  </div>
                </figcaption>
              </figure>
            </li>
          </ul>
        </div>
      </section>
      {/* CV work */}
      <CVWork editMode={editModeState} />
      {/* <CVWork
        letters={letters}
        researches={researches}
        volunteers={volunteers}
        userProfile={userProfile}
        workExperiences={workExperiences}
        educations={educations}
        editMode={editModeState}
        getWorkExperiences={() => {
          dispatch(
            userActions.getWorkExperiencesAction({ email: userProfile.email }),
          );
        }}
        addNewWorkExperience={workExperience => {
          dispatch(
            userActions.addNewWorkExperienceAction({
              email: userProfile.email,
              workExperience,
            }),
          );
        }}
        editWorkExperience={workExperience => {
          dispatch(
            userActions.editWorkExperienceAction({
              email: userProfile.email,
              workExperience,
            }),
          );
        }}
        deleteWorkExperience={workExperience => {
          dispatch(
            userActions.deleteWorkExperienceActionAction({
              email: userProfile.email,
              id: workExperience.id,
            }),
          );
        }}
        getEducations={() => {
          dispatch(
            userActions.getEducationsAction({ email: userProfile.email }),
          );
        }}
        addNewEducation={education => {
          dispatch(
            userActions.addNewEducationAction({
              email: userProfile.email,
              education,
            }),
          );
        }}
        editEducation={education => {
          dispatch(
            userActions.editEducationAction({
              email: userProfile.email,
              education,
            }),
          );
        }}
        deleteEducation={education => {
          dispatch(
            userActions.deleteEducationAction({
              email: userProfile.email,
              id: education.id,
            }),
          );
        }}
        getVolunteers={() => {
          dispatch(
            userActions.getVolunteersAction({ email: userProfile.email }),
          );
        }}
        addNewVolunteer={volunteer => {
          dispatch(
            userActions.addNewVolunteerAction({
              email: userProfile.email,
              volunteer,
            }),
          );
        }}
        editVolunteer={volunteer => {
          dispatch(
            userActions.editVolunteerAction({
              email: userProfile.email,
              volunteer,
            }),
          );
        }}
        deleteVolunteer={volunteer => {
          dispatch(
            userActions.deleteVolunteerAction({
              email: userProfile.email,
              id: volunteer.id,
            }),
          );
        }}
        getResearches={() => {
          dispatch(
            userActions.getResearchesAction({ email: userProfile.email }),
          );
        }}
        addNewResearch={research => {
          dispatch(
            userActions.addNewResearchAction({
              email: userProfile.email,
              research,
            }),
          );
        }}
        editResearch={research => {
          dispatch(
            userActions.editResearchAction({
              email: userProfile.email,
              research,
            }),
          );
        }}
        deleteResearch={research => {
          dispatch(
            userActions.deleteResearchAction({
              email: userProfile.email,
              id: research.id,
            }),
          );
        }}
        getLetters={() => {
          dispatch(userActions.getLettersAction({ email: userProfile.email }));
        }}
        addNewLetter={letter => {
          dispatch(
            userActions.addNewLetterAction({
              email: userProfile.email,
              letter,
            }),
          );
        }}
        editLetter={letter => {
          dispatch(
            userActions.editLetterAction({
              email: userProfile.email,
              letter,
            }),
          );
        }}
        deleteLetter={letters => {
          dispatch(
            userActions.deleteLetterAction({
              email: userProfile.email,
              id: letters.id,
            }),
          );
        }}
      /> */}
      {/* locker */}
      <Locker />
      <section className="section-milestones"></section>
    </Fragment>
  );
};
