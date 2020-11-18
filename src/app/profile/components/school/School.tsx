import React, { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { down_arrow } from 'assets/images';
import {SchoolModal} from './SchoolModal';

export function School(props){
  const {
    schools,
    editMode,
    arrayLength,
    loading,
    addNewSchool,
    editSchool,
    deleteSchool,
    getMoreSchools,
  } = props;
  /* state modal display */
  const [isShowSchoolModal, setIsShowSchoolModal] = useState(false);
  /* end state modal display */
  const [schoolState, setSchoolState] = useState();

  function onAddNewSchool(school){
    addNewSchool(school);
    hideWorkModal();
  };

  function onEditSchool(school){
    editSchool(school);
    hideWorkModal();
  };

  function onDeleteSchool(school){
    deleteSchool(school);
    hideWorkModal();
  };

  function hideWorkModal() {
    setIsShowSchoolModal(false);
    setSchoolState(undefined);
  }

  return (
    <Fragment>
      <SchoolModal
        addNewSchool={onAddNewSchool}
        editSchool={onEditSchool}
        deleteSchool={onDeleteSchool}
        isShow={isShowSchoolModal}
        onHide={hideWorkModal}
        editValues={schoolState}
      />
      <div className="main-title">
        <div className="main-title-work">
          <h2> Schools</h2>
          {editMode === true ? (
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                setIsShowSchoolModal(true);
              }}
            >
              <FontAwesomeIcon icon={faPlusCircle} />
            </a>
          ) : null}
        </div>
      </div>
      {!loading &&
        (schools.length > 0 ? (
          schools.map((item, index) => {
            return (
              <Fragment key={index}>
                <div className="accordion">
                  <div className="accordion-item">
                    <div className="title-wrapper">
                      <p className="title">{`${item.degree_type} in ${item.majors}`}</p>
                      {editMode === true ? (
                        <a
                          onClick={e => {
                            e.preventDefault();
                            setSchoolState(item);
                            setIsShowSchoolModal(true);
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
                      {item.is_present_date === true ? (
                        <p> {`${moment(item.start_date,"MM/YYYY").format('YYYY')} - Present`} </p>
                      ) : (
                        <p> {`${moment(item.start_date,"MM/YYYY").format('YYYY')} - ${moment(item.end_date,"MM/YYYY").format('YYYY')}`} </p>
                      )}
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
      {!loading && schools.length > 0 && schools.length < arrayLength ? (
        <div className="load-more-wrapper text-center">
          <a
            className="load-more-btn"
            href="#"
            onClick={e => {
              e.preventDefault();
              getMoreSchools();
            }}
          >
            Load More Experiences <img src={down_arrow} alt="img" />
          </a>
        </div>
      ) : null}
    </Fragment>
  );
};
