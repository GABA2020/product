import React, { Fragment, useState, FC, useContext } from 'react';
import 'styles/scss/SectionExperience.scss';
import { Work } from 'app/profile/components/work/Work';
import { Research } from 'app/profile/components/research/Research';
import { Volunteer } from 'app/profile/components/volunteer/Volunteer';
import { Letter } from 'app/profile/components/letter/Letter';
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
import {
  DELETE_USER_SUBCOLLECTION,
  EDIT_USER_SUBCOLLECTION,
  ADD_USER_SUBCOLLECTION,
} from '../../../service/mutations';
import { School } from 'app/profile/components/school/School';
import styled from 'styled-components';
const arrayWork = ['work', 'research', 'volunteer', 'school', 'letter'];

const HeaderTitle = styled.h2`
  font-size: 32px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: -0.4px;
  color: #111741;
  margin: 0px 15px 10px 0px;
  font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
`;

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
  const {
    graphQLClient,
    state: {
      user: userProfile,
      userWorks,
      userResearchs,
      userVolunteers,
      userSchools,
      userLetters,
    },
    dispatch: {
      setUserWorwks,
      setUserVolunteers,
      setUserSchools,
      setUserResearchs,
      setUserLetters,
    },
  } = useContext(Context);

  const [stateWork, setStateWork] = useState<string>(arrayWork[0]);
  const [aboutModal, setAboutModal] = useState<boolean>(false);

  // -------------------addUserSubcollection-------------------------
  function addUserSubcollection(subcollection) {
    return new Promise((resolve, reject) => {
      graphQLClient
        .mutate({
          variables: { ...subcollection, email: userProfile.email },
          mutation: ADD_USER_SUBCOLLECTION,
        })
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }
  function addWorkExperience(workExperience) {
    addUserSubcollection(workExperience).then((r: any) => {
      const id = r?.data?.addUserSubCollection?.id;
      workExperience.id = id;
      setUserWorwks([workExperience, ...userWorks]);
    });
  }
  function addResearch(research) {
    addUserSubcollection(research).then((r: any) => {
      const id = r?.data?.addUserSubCollection?.id;
      research.id = id;
      setUserResearchs([research, ...userResearchs]);
    });
  }
  function addVolunteer(volunteer) {
    addUserSubcollection(volunteer).then((r: any) => {
      const id = r?.data?.addUserSubCollection?.id;
      volunteer.id = id;
      setUserVolunteers([volunteer, ...userVolunteers]);
    });
  }
  function addSchool(school) {
    addUserSubcollection(school).then((r: any) => {
      const id = r?.data?.addUserSubCollection?.id;
      school.id = id;
      setUserSchools([school, ...userSchools]);
    });
  }
  function addNewLetter(letter) {
    addUserSubcollection(letter).then((r: any) => {
      const id = r?.data?.addUserSubCollection?.id;
      letter.id = id;
      setUserLetters([letter, ...userLetters]);
    });
  }
  // ----------------------editUserSubcollection-----------------------------
  function editUserSubcollection(subcollection) {
    return new Promise((resolve, reject) => {
      graphQLClient
        .mutate({
          variables: { ...subcollection, email: userProfile.email },
          mutation: EDIT_USER_SUBCOLLECTION,
        })
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }
  function editWorkExperience(workExperience) {
    editUserSubcollection(workExperience).then(r => {
      const newUserWork = userWorks.slice();
      const index = newUserWork.findIndex(i => i.id === workExperience.id);
      newUserWork.splice(index, 1, workExperience);
      setUserWorwks(newUserWork);
    });
  }
  function editResearch(research) {
    editUserSubcollection(research).then(r => {
      const newUserResearch = userResearchs.slice();
      const index = newUserResearch.findIndex(i => i.id === research.id);
      newUserResearch.splice(index, 1, research);
      setUserResearchs(newUserResearch);
    });
  }
  function editVolunteer(volunteer) {
    editUserSubcollection(volunteer).then(r => {
      const newUserVolunteer = userVolunteers.slice();
      const index = newUserVolunteer.findIndex(i => i.id === volunteer.id);
      newUserVolunteer.splice(index, 1, volunteer);
      setUserVolunteers(newUserVolunteer);
    });
  }
  function editSchool(school) {
    editUserSubcollection(school).then(r => {
      const newUserSchool = userSchools.slice();
      const index = newUserSchool.findIndex(i => i.id === school.id);
      newUserSchool.splice(index, 1, school);
      setUserSchools(newUserSchool);
    });
  }
  function editLetter(letter) {
    editUserSubcollection(letter).then(r => {
      const newUserLetter = userLetters.slice();
      const index = newUserLetter.findIndex(i => i.id === letter.id);
      newUserLetter.splice(index, 1, letter);
      setUserLetters(newUserLetter);
    });
  }
  // ---------------------deleteUserSubcollection------------------------------
  function deleteUserSubcollection(subcollection) {
    return new Promise((resolve, reject) => {
      graphQLClient
        .mutate({
          variables: { ...subcollection, email: userProfile.email },
          mutation: DELETE_USER_SUBCOLLECTION,
        })
        .then(result => resolve(subcollection.subcollectionId))
        .catch(err => reject(err));
    });
  }
  function deleteWorkExperience(workExperience) {
    deleteUserSubcollection(workExperience).then(id => {
      const newUserWork = userWorks.filter(r => r.id !== id);
      setUserWorwks(newUserWork);
    });
  }
  function deleteResearch(research) {
    deleteUserSubcollection(research).then(id => {
      const newUserResearch = userResearchs.filter(r => r.id !== id);
      setUserResearchs(newUserResearch);
    });
  }
  function deleteVolunteer(volunteer) {
    deleteUserSubcollection(volunteer).then(id => {
      const newUserVolunteer = userVolunteers.filter(r => r.id !== id);
      setUserVolunteers(newUserVolunteer);
    });
  }
  function deleteSchool(school) {
    deleteUserSubcollection(school).then(id => {
      const newUserSchools = userSchools.filter(r => r.id !== id);
      setUserSchools(newUserSchools);
    });
  }
  function deleteLetter(letter) {
    deleteUserSubcollection(letter).then(id => {
      const newUserLetters = userLetters.filter(r => r.id !== id);
      setUserLetters(newUserLetters);
    });
  }

  const renderCVWithCondition = () => {
    switch (stateWork) {
      case arrayWork[0]:
        return (
          <Work
            loading={loading}
            editMode={editMode}
            userProfile={userProfile}
            workExperiences={userWorks || []}
            arrayLength={arrayLength}
            editWorkExperience={editWorkExperience}
            addNewWorkExperience={addWorkExperience}
            deleteWorkExperience={deleteWorkExperience}
          ></Work>
        );
      case arrayWork[1]:
        return (
          <Research
            researches={userResearchs || []}
            editMode={editMode}
            userProfile={userProfile}
            arrayLength={arrayLength}
            loading={loading}
            addNewResearch={addResearch}
            editResearch={editResearch}
            deleteResearch={deleteResearch}
          />
        );
      case arrayWork[2]:
        return (
          <Volunteer
            volunteers={userVolunteers || []}
            editMode={editMode}
            arrayLength={arrayLength}
            loading={loading}
            addNewVolunteer={addVolunteer}
            editVolunteer={editVolunteer}
            deleteVolunteer={deleteVolunteer}
          />
        );
      case arrayWork[3]:
        return (
          <School
            schools={userSchools}
            editMode={editMode}
            arrayLength={arrayLength}
            loading={loading}
            addNewSchool={addSchool}
            editSchool={editSchool}
            deleteSchool={deleteSchool}
          />
        );
      case arrayWork[4]:
        return (
          <Letter
            userProfile={userProfile}
            editMode={editMode}
            letters={userLetters}
            arrayLength={arrayLength}
            loading={loading}
            addNewLetter={addNewLetter}
            editLetter={editLetter}
            deleteLetter={deleteLetter}
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
          <HeaderTitle>Experiences</HeaderTitle>
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
