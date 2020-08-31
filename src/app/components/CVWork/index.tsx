import React, { Fragment, useState, FC } from 'react';
import { Volunteer } from '../Volunteer';
import { Research } from '../Research';
import { Education } from '../Education';
import { Work } from '../Work';
import { Letter } from '../Letter';
import 'styles/scss/SectionExperience.scss';

const arrayWork = [
  'work',
  'volunteer',
  'research',
  'publication',
  'letter',
  'school',
];

interface ICVWork {
  userProfile: ENTITIES.UserProfile;
  workExperiences: ENTITIES.WorkExperience[];
  educations: ENTITIES.Education[];
  volunteers: ENTITIES.Volunteer[];
  researches: ENTITIES.Research[];
  letters: ENTITIES.Letter[];
  editMode: boolean;
  getWorkExperiences: () => void;
  editWorkExperience: (workExperience: ENTITIES.WorkExperience) => void;
  addNewWorkExperience: (workExperience: ENTITIES.WorkExperience) => void;
  deleteWorkExperience: (workExperience: ENTITIES.WorkExperience) => void;
  getEducations: () => void;
  addNewEducation: (education: ENTITIES.Education) => void;
  editEducation: (education: ENTITIES.Education) => void;
  deleteEducation: (education: ENTITIES.Education) => void;
  getVolunteers: () => void;
  addNewVolunteer: (volunteer: ENTITIES.Volunteer) => void;
  editVolunteer: (volunteer: ENTITIES.Volunteer) => void;
  deleteVolunteer: (volunteer: ENTITIES.Volunteer) => void;
  getResearches: () => void;
  addNewResearch: (research: ENTITIES.Research) => void;
  editResearch: (research: ENTITIES.Research) => void;
  deleteResearch: (research: ENTITIES.Research) => void;
  getLetters: () => void;
  addNewLetter: (letter: ENTITIES.Letter) => void;
  editLetter: (letter: ENTITIES.Letter) => void;
  deleteLetter: (letter: ENTITIES.Letter) => void;
}
export const CVWork: FC<ICVWork> = props => {
  const {
    userProfile,
    workExperiences,
    educations,
    volunteers,
    researches,
    letters,
    editMode,
    editWorkExperience,
    addNewWorkExperience,
    deleteWorkExperience,
    getWorkExperiences,
    getEducations,
    addNewEducation,
    editEducation,
    deleteEducation,
    getVolunteers,
    addNewVolunteer,
    editVolunteer,
    deleteVolunteer,
    getResearches,
    addNewResearch,
    editResearch,
    deleteResearch,
    getLetters,
    addNewLetter,
    editLetter,
    deleteLetter,
  } = props;
  const [stateWork, setStateWork] = useState<string>(arrayWork[0]);

  const renderCVWithCondition = () => {
    // switch (stateWork) {
    //   case arrayWork[0]:
    //     return (
    //       <Work
    //         getWorkExperiences={getWorkExperiences}
    //         editMode={editMode}
    //         userProfile={userProfile}
    //         workExperiences={workExperiences}
    //         editWorkExperience={editWorkExperience}
    //         addNewWorkExperience={addNewWorkExperience}
    //         deleteWorkExperience={deleteWorkExperience}
    //       ></Work>
    //     );
    //   case arrayWork[1]:
    //     return (
    //       <Volunteer
    //         getVolunteers={getVolunteers}
    //         volunteers={volunteers}
    //         editMode={editMode}
    //         userProfile={userProfile}
    //         addNewVolunteer={addNewVolunteer}
    //         editVolunteer={editVolunteer}
    //         deleteVolunteer={deleteVolunteer}
    //       ></Volunteer>
    //     );
    //   case arrayWork[2]:
    //     return (
    //       <Research
    //         getResearches={getResearches}
    //         addNewResearch={addNewResearch}
    //         editResearch={editResearch}
    //         deleteResearch={deleteResearch}
    //         researches={researches}
    //         editMode={editMode}
    //         userProfile={userProfile}
    //       ></Research>
    //     );
    //   case arrayWork[4]:
    //     return (
    //       <Letter
    //         getLetters={getLetters}
    //         userProfile={userProfile}
    //         editMode={editMode}
    //         letters={letters}
    //         addNewLetter={addNewLetter}
    //         editLetter={editLetter}
    //         deleteLetter={deleteLetter}
    //       ></Letter>
    //     );
    //   case arrayWork[5]:
    //     return (
    //       <Education
    //         getEducations={getEducations}
    //         userProfile={userProfile}
    //         addNewEducation={addNewEducation}
    //         editEducation={editEducation}
    //         deleteEducation={deleteEducation}
    //         editMode={editMode}
    //         educations={educations}
    //       ></Education>
    //     );
    //   default:
    //     break;
    // }
  };

  return (
    <Fragment>
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
                      Volunteer
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
                      Research
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
                  <li
                    className={
                      stateWork === arrayWork[5] ? 'active' : undefined
                    }
                  >
                    <a
                      onClick={e => {
                        e.preventDefault();
                        setStateWork(arrayWork[5]);
                      }}
                      href="#"
                    >
                      Schools
                    </a>
                  </li>
                </ul>
              </div>
              {/* <div className="experiences-main">{renderCVWithCondition()}</div> */}
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
