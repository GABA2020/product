import React, { Fragment, useState, FC, useContext } from 'react';
import 'styles/scss/SectionExperience.scss';
import { Work } from 'app/components/Work';
import { Volunteer } from 'app/components/Volunteer';
import { Research } from 'app/components/Research';
import { Letter } from 'app/components/Letter';
import { Education } from 'app/components/Education';
import { useInjectSaga } from 'utils/redux-injectors';
import {
  sliceKey as userSliceKey,
  actions as userActions,
} from 'redux/User/slice';
import { sliceKey as programSliceKey } from 'redux/Program/slice';
import { sliceKey as storageSliceKey } from 'redux/Storage/slice';
import { UserSaga } from 'redux/User/saga';
import { ProgramSaga } from 'redux/Program/saga';
import { StorageSaga } from 'redux/Storage/saga';
import { userSelector } from 'redux/User/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { AboutModal } from 'app/components/Modal/AboutModal';
import { Context } from 'app/globalContext/GlobalContext';
import { ADD_USER_WORK, ADD_USER_RESEARCH, ADD_USER_VOLUNTEER } from '../../../service/queries';
const arrayWork = ['work', 'research', 'volunteer', 'school', 'letter'];

interface ICVWork {
  editMode: boolean;
}
export const CVWork: FC<ICVWork> = props => {
  const { editMode } = props;
  useInjectSaga({ key: userSliceKey, saga: UserSaga });
  useInjectSaga({ key: programSliceKey, saga: ProgramSaga });
  useInjectSaga({ key: storageSliceKey, saga: StorageSaga });
  const dispatch = useDispatch();
  const {
    // userProfile,
    workExperiences,
    educations,
    volunteers,
    researches,
    letters,
    lastQuery,
    arrayLength,
    loading,
  } = useSelector(userSelector);
  const { graphQLClient, state: { user:userProfile, userWorks } } = useContext(Context);

  const [stateWork, setStateWork] = useState<string>(arrayWork[0]);
  const [aboutModal, setAboutModal] = useState<boolean>(false);

  const renderCVWithCondition = () => {
    switch (stateWork) {
      case arrayWork[0]:
        return (
          <Work
            loading={loading}
            editMode={editMode}
            userProfile={userProfile}
            workExperiences={userWorks||[]}
            arrayLength={arrayLength}
            getWorkExperiences={() => {
              dispatch(
                userActions.getWorkExperiencesAction({
                  email: userProfile.email,
                }),
              );
            }}
            getMoreWorkExperiences={() => {
              dispatch(
                userActions.getMoreWorkExperiencesAction({
                  email: userProfile.email,
                  lastQuery,
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
            addNewWorkExperience={workExperience => {
              graphQLClient.mutate({
                variables:{...workExperience,email:userProfile.email},
                mutation: ADD_USER_WORK,
              })
              .then(result => console.log(result))
              .catch(err => console.log(err));
              // dispatch(
              //   userActions.addNewWorkExperienceAction({
              //     email: userProfile.email,
              //     workExperience,
              //   }),
              // );
            }}
            deleteWorkExperience={workExperience => {
              // dispatch(
              //   userActions.deleteWorkExperienceActionAction({
              //     email: userProfile.email,
              //     // id: workExperience.id,
              //     // id: ''
              //   }),
              // );
            }}
          ></Work>
        );
      case arrayWork[1]:
        return (
          <Research
            researches={researches}
            editMode={editMode}
            userProfile={userProfile}
            arrayLength={arrayLength}
            loading={loading}
            getResearches={() => {
              dispatch(
                userActions.getResearchesAction({ email: userProfile.email }),
              );
            }}
            getMoreResearches={() => {
              dispatch(
                userActions.getMoreResearchesAction({
                  email: userProfile.email,
                  lastQuery,
                }),
              );
            }}
            addNewResearch={research => {
              graphQLClient.mutate({
                variables:{...research,email:userProfile.email},
                mutation: ADD_USER_RESEARCH,
              })
              .then(result => console.log(result))
              .catch(err => console.log(err));
              // dispatch(
              //   userActions.addNewResearchAction({
              //     email: userProfile.email,
              //     research,
              //   }),
              // );
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
          />
        );
      case arrayWork[2]:
        return (
          <Volunteer
            volunteers={volunteers}
            editMode={editMode}
            userProfile={userProfile}
            arrayLength={arrayLength}
            loading={loading}
            getVolunteers={() => {
              dispatch(
                userActions.getVolunteersAction({ email: userProfile.email }),
              );
            }}
            getMoreVolunteers={() => {
              dispatch(
                userActions.getMoreVolunteersAction({
                  email: userProfile.email,
                  lastQuery,
                }),
              );
            }}
            addNewVolunteer={volunteer => {
              graphQLClient.mutate({
                variables:{...volunteer,email:userProfile.email},
                mutation: ADD_USER_VOLUNTEER,
              })
              .then(result => console.log(result))
              .catch(err => console.log(err));
              // dispatch(
              //   userActions.addNewVolunteerAction({
              //     email: userProfile.email,
              //     volunteer,
              //   }),
              // );
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
          />
        );
      case arrayWork[3]:
        return (
          <Education
            editMode={editMode}
            educations={educations}
            userProfile={userProfile}
            arrayLength={arrayLength}
            loading={loading}
            getEducations={() => {
              dispatch(
                userActions.getEducationsAction({ email: userProfile.email }),
              );
            }}
            getMoreEducations={() => {
              dispatch(
                userActions.getMoreEducationsAction({
                  email: userProfile.email,
                  lastQuery,
                }),
              );
            }}
            addNewEducation={education => {
              graphQLClient.mutate({
                variables:{...education,email:userProfile.email},
                mutation: ADD_USER_WORK,
              })
              .then(result => console.log(result))
              .catch(err => console.log(err));
              // dispatch(
              //   userActions.addNewEducationAction({
              //     email: userProfile.email,
              //     education,
              //   }),
              // );
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
          />
        );
      case arrayWork[4]:
        return (
          <Letter
            userProfile={userProfile}
            editMode={editMode}
            letters={letters}
            arrayLength={arrayLength}
            loading={loading}
            getLetters={() => {
              dispatch(
                userActions.getLettersAction({ email: userProfile.email }),
              );
            }}
            getMoreLetters={() => {
              dispatch(
                userActions.getMoreLettersAction({
                  email: userProfile.email,
                  lastQuery,
                }),
              );
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
          />
        );
      default:
        break;
    }
  };

  return (
    <Fragment>
      <AboutModal
        about={userProfile.about}
        isShow={aboutModal}
        onHide={() => {
          setAboutModal(false);
        }}
        editAbout={about => {
          if (about !== userProfile.about) {
            dispatch(
              userActions.updateAboutProfileRequest({
                about,
                email: userProfile.email,
              }),
            );
          }
        }}
      />
      <section className="section-experiences">
        <div className="container">
          <div className="wrap-layout">
            <div className="wrap-content">
              <div className="experiences-slidebar">
                <ul className="experiences-nav">
                  <li
                    className={
                      stateWork === arrayWork[0] ? 'active' : undefined
                    }
                  >
                    <a
                      onClick={e => {
                        e.preventDefault();
                        setStateWork(arrayWork[0]);
                      }}
                      href="#"
                    >
                      Work
                    </a>
                  </li>
                  <li
                    className={
                      stateWork === arrayWork[1] ? 'active' : undefined
                    }
                  >
                    <a
                      onClick={e => {
                        e.preventDefault();
                        setStateWork(arrayWork[1]);
                      }}
                      href="#"
                    >
                      Research
                    </a>
                  </li>
                  <li
                    className={
                      stateWork === arrayWork[2] ? 'active' : undefined
                    }
                  >
                    <a
                      onClick={e => {
                        e.preventDefault();
                        setStateWork(arrayWork[2]);
                      }}
                      href="#"
                    >
                      Volunteering
                    </a>
                  </li>
                  <li
                    className={
                      stateWork === arrayWork[3] ? 'active' : undefined
                    }
                  >
                    <a
                      onClick={e => {
                        e.preventDefault();
                        setStateWork(arrayWork[3]);
                      }}
                      href="#"
                    >
                      Schools
                    </a>
                  </li>
                  <li
                    className={
                      stateWork === arrayWork[4] ? 'active' : undefined
                    }
                  >
                    <a
                      onClick={e => {
                        e.preventDefault();
                        setStateWork(arrayWork[4]);
                      }}
                      href="#"
                    >
                      Letters
                    </a>
                  </li>
                </ul>
              </div>
              <div className="experiences-main">
                <div className="experiences-content">
                  <div className="experiences-caption">
                    <div className="caption">
                      <h3 className="caption-title">About</h3>
                      <a
                        className="caption-title-btn"
                        href="#"
                        onClick={e => {
                          e.preventDefault();
                          setAboutModal(true);
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </a>
                    </div>
                    {userProfile.about.trim() !== '' ? (
                      <p>{userProfile.about}</p>
                    ) : (
                      <p className="text-center">Describe about yourself</p>
                    )}
                  </div>
                  {renderCVWithCondition()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
