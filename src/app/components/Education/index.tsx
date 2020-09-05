import React, { Fragment, FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
import { AddEducationModal } from '../Modal/AddEducationModal';
import { EditEducationModal } from '../Modal/EditEducationModal';
import moment from 'moment';
import { YearFormat } from 'helpers/Unity';
import { down_arrow } from 'assets/images';
interface IEducation {
  userProfile: ENTITIES.UserProfile;
  educations: ENTITIES.Education[];
  editMode: boolean;
  arrayLength: number;
  loading: boolean;
  addNewEducation: (education: ENTITIES.Education) => void;
  editEducation: (education: ENTITIES.Education) => void;
  deleteEducation: (education: ENTITIES.Education) => void;
  getEducations: () => void;
  getMoreEducations: () => void;
}

const initEducation: ENTITIES.Education = {
  id: '',
  school: '',
  school_address: '',
  degree_type: '',
  major: '',
  honors: '',
  date_end: { seconds: 0 },
  date_start: { seconds: 0 },
};

export const Education: FC<IEducation> = props => {
  const {
    educations,
    editMode,
    arrayLength,
    loading,
    addNewEducation,
    editEducation,
    deleteEducation,
    getEducations,
    getMoreEducations,
    userProfile,
  } = props;
  /* state modal display */
  const [editEducationModalState, setEditEducationModalState] = useState<
    boolean
  >(false);
  const [addEducationModalState, setAddEducationModalState] = useState<boolean>(
    false,
  );
  /* end state modal display */
  const [educationState, setEducationState] = useState<ENTITIES.Education>(
    initEducation,
  );
  useEffect(() => {
    getEducations();
  }, []);

  const onAddNewEducation = (education: ENTITIES.Education) => {
    addNewEducation(education);
    setAddEducationModalState(false);
  };

  const onEditEducation = (education: ENTITIES.Education) => {
    editEducation(education);
    setEditEducationModalState(false);
  };

  const onDeleteEducation = (education: ENTITIES.Education) => {
    deleteEducation(education);
    setEditEducationModalState(false);
  };
  return (
    <Fragment>
      <AddEducationModal
        isShow={addEducationModalState}
        addNewEducation={onAddNewEducation}
        onHide={() => {
          setAddEducationModalState(false);
        }}
      ></AddEducationModal>
      <EditEducationModal
        isShow={editEducationModalState}
        onHide={() => setEditEducationModalState(false)}
        editEducation={onEditEducation}
        deleteEducation={onDeleteEducation}
        education={educationState}
      ></EditEducationModal>
      <div className="experiences-content">
        <div className="experiences-caption">
          <h3>About</h3>
          <p>{userProfile.about}</p>
        </div>
        <div className="main-title">
          <div className="main-title-work">
            <h2> Schools</h2>
            {editMode === true ? (
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  setAddEducationModalState(true);
                }}
              >
                <FontAwesomeIcon icon={faPlusCircle} />
              </a>
            ) : null}
          </div>
        </div>
        {!loading &&
          (educations.length > 0 ? (
            educations.map((item, index) => {
              return (
                <Fragment key={index}>
                  <div className="accordion">
                    <div className="accordion-item">
                      <div className="title-wrapper">
                        <p className="title">{`${item.degree_type} in ${item.major}`}</p>
                        {editMode === true ? (
                          <a
                            onClick={e => {
                              e.preventDefault();
                              setEducationState(item);
                              setEditEducationModalState(true);
                            }}
                            href="#"
                          >
                            <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                          </a>
                        ) : null}
                      </div>
                      <div className="sub-title">
                        <p>{item.school}</p>
                        <p>{item.school_address}</p>
                        <p>
                          {moment
                            .unix(item.date_start.seconds)
                            .format(YearFormat)}
                          {' - '}
                          {moment
                            .unix(item.date_end.seconds)
                            .format(YearFormat)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Fragment>
              );
            })
          ) : (
            <div className="text-empty text-center">
              <p>There is no experiences available</p>
            </div>
          ))}
        {!loading &&
        educations.length > 0 &&
        educations.length < arrayLength ? (
          <div className="load-more-wrapper text-center">
            <a
              className="load-more-btn"
              href="#"
              onClick={e => {
                e.preventDefault();
                getMoreEducations();
              }}
            >
              Load More Experiences <img src={down_arrow} alt="img" />
            </a>
          </div>
        ) : null}
      </div>
    </Fragment>
  );
};
