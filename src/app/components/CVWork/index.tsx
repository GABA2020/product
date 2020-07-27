import React, { Fragment, useState, FC } from 'react';
import { Volunteer } from '../Volunteer';
import { Research } from '../Research';
import { Education } from '../Education';
import { Work } from '../Work';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { AddWorkModal } from '../Modal/AddWorkModal';
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
  editMode: boolean;
  editWorkExperience: (workExperience: ENTITIES.WorkExperience) => void;
  addNewWorkExperience: (workExperience: ENTITIES.WorkExperience) => void;
  deleteWorkExperience: (workExperience: ENTITIES.WorkExperience) => void;
}
export const CVWork: FC<ICVWork> = props => {
  const {
    userProfile,
    workExperiences,
    educations,
    editMode,
    editWorkExperience,
    addNewWorkExperience,
    deleteWorkExperience,
  } = props;
  const [stateWork, setStateWork] = useState<string>(arrayWork[0]);

  const renderCVWithCondition = () => {
    switch (stateWork) {
      case arrayWork[0]:
        return (
          <Work
            editMode={editMode}
            userProfile={userProfile}
            workExperiences={workExperiences}
            editWorkExperience={editWorkExperience}
            addNewWorkExperience={addNewWorkExperience}
            deleteWorkExperience={deleteWorkExperience}
          ></Work>
        );
      case arrayWork[1]:
        return <Volunteer></Volunteer>;
      case arrayWork[2]:
        return <Research></Research>;
      case arrayWork[5]:
        return <Education educations={educations}></Education>;
      default:
        break;
    }
  };

  return (
    <Fragment>
      <section className="section-experiences">
        <div className="container">
          <div className="wrap-layout">
            <div className="wrap-content">
              <div className="experiences-slidebar">
                <nav className="experiences-nav">
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
                  <li>
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
                  <li>
                    <a
                      onClick={e => {
                        e.preventDefault();
                        setStateWork(arrayWork[3]);
                      }}
                      href="#"
                    >
                      Publications
                    </a>
                  </li>
                  <li>
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
                  <li>
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
                </nav>
              </div>
              <div className="experiences-main">{renderCVWithCondition()}</div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
