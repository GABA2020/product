import React, { FC, Fragment, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { YearFormat, getDifferenceYear } from 'helpers/Unity';
import { VolunteerModal } from './VolunteerModal';
import { down_arrow } from 'assets/images';

export function Volunteer(props){
  const {
    editMode,
    volunteers,
    arrayLength,
    loading,
    addNewVolunteer,
    editVolunteer,
    deleteVolunteer,
    getMoreVolunteers,
  } = props;


  /* state modal display */
  const [volunteerState, setVolunteerState] = useState();
  const [isShowvolunteerModal, setIsShowVolunteerModal] = useState(false);

  /* end state modal display */

  function onAddNewVolunteer(volunteer){
    addNewVolunteer(volunteer);
    hideVolunteerModal();
  };

  function onEditVolunteer(volunteer){
    editVolunteer(volunteer);
    hideVolunteerModal();
  };

  function onDeleteVolunteer(volunteer){
    deleteVolunteer(volunteer);
    hideVolunteerModal();
  };

  function hideVolunteerModal() {
    setIsShowVolunteerModal(false);
    setVolunteerState(undefined);
  }

  return (
    <Fragment>
      <VolunteerModal
        isShow={isShowvolunteerModal}
        onHide={hideVolunteerModal}
        addNewVolunteer={onAddNewVolunteer}
        editVolunteer={onEditVolunteer}
        deleteVolunteer={onDeleteVolunteer}
        editValues={volunteerState}
      />
      <div className="main-title">
        <div className="main-title-work">
          <h2>Volunteering</h2>
          {editMode === true ? (
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                setIsShowVolunteerModal(true);
              }}
            >
              <FontAwesomeIcon icon={faPlusCircle} />
            </a>
          ) : null}
        </div>
      </div>
      {!loading &&
        (volunteers.length > 0 ? (
          volunteers.map((item, index) => {
            return (
              <Fragment key={index}>
                <div className="accordion">
                  <div className="accordion-item">
                    <div className="title-wrapper">
                      <p className="title">{item.organization_name}</p>
                      {editMode === true ? (
                        <a
                          onClick={e => {
                            e.preventDefault();
                            setVolunteerState(item);
                            setIsShowVolunteerModal(true);
                          }}
                          href="#"
                        >
                          <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                        </a>
                      ) : null}
                    </div>
                    <div className="sub-title">
                      <p>
                        {item.job_title} - {item.city}
                      </p>
                      <p>
                        {`${moment(item.start_date,"MM/YYYY").format('YYYY')} - ${moment(item.end_date,"MM/YYYY").format('YYYY')}`}
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
      {!loading && volunteers.length > 0 && volunteers.length < arrayLength ? (
        <div className="load-more-wrapper text-center">
          <a
            className="load-more-btn"
            href="#"
            onClick={e => {
              e.preventDefault();
              getMoreVolunteers();
            }}
          >
            Load More Experiences <img src={down_arrow} alt="img" />
          </a>
        </div>
      ) : null}
    </Fragment>
  );
};
