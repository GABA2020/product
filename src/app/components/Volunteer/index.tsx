import React, { FC, Fragment, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { YearFormat, getDifferenceYear } from 'helpers/Unity';
import { AddVolunteerModal } from '../Modal/AddVolunteerModal';
import { EditVolunteerModal } from '../Modal/EditVolunteerModal';
import { down_arrow } from 'assets/images';
interface IVolunteer {
  editMode: boolean;
  userProfile: ENTITIES.UserProfile;
  volunteers: ENTITIES.Volunteer[];
  arrayLength: number;
  loading: boolean;
  addNewVolunteer: (volunteer: ENTITIES.Volunteer) => void;
  editVolunteer: (volunteer: ENTITIES.Volunteer) => void;
  deleteVolunteer: (volunteer: ENTITIES.Volunteer) => void;
  getVolunteers: () => void;
  getMoreVolunteers: () => void;
}
export const Volunteer: FC<IVolunteer> = props => {
  const {
    editMode,
    userProfile,
    volunteers,
    arrayLength,
    loading,
    addNewVolunteer,
    editVolunteer,
    deleteVolunteer,
    getVolunteers,
    getMoreVolunteers,
  } = props;
  const [volunteerState, setVolunteerState] = useState<ENTITIES.Volunteer>({
    id: '',
    date_end: {
      seconds: 0,
    },
    date_start: {
      seconds: 0,
    },
    description: '',
    job_title: '',
    number_of_hours_served: '',
    organization_address: '',
    organization_name: '',
  });

  useEffect(() => {
    getVolunteers();
  }, []);

  /* state modal display */
  const [editVolunteerModalState, setEditVolunteerModalState] = useState<
    boolean
  >(false);
  const [addVolunteerModalState, setAddVolunteerModalState] = useState<boolean>(
    false,
  );

  /* end state modal display */

  const onAddNewVolunteer = (volunteer: ENTITIES.Volunteer) => {
    addNewVolunteer(volunteer);
    setAddVolunteerModalState(false);
  };

  const onEditVolunteer = (volunteer: ENTITIES.Volunteer) => {
    editVolunteer(volunteer);
    setEditVolunteerModalState(false);
  };

  const onDeleteVolunteer = (volunteer: ENTITIES.Volunteer) => {
    deleteVolunteer(volunteer);
    setEditVolunteerModalState(false);
  };

  return (
    <Fragment>
      <AddVolunteerModal
        isShow={addVolunteerModalState}
        onHide={() => setAddVolunteerModalState(false)}
        addNewVolunteer={onAddNewVolunteer}
      ></AddVolunteerModal>
      <EditVolunteerModal
        isShow={editVolunteerModalState}
        onHide={() => setEditVolunteerModalState(false)}
        volunteer={volunteerState}
        editVolunteer={onEditVolunteer}
        deleteVolunteer={onDeleteVolunteer}
      ></EditVolunteerModal>
      <div className="main-title">
        <div className="main-title-work">
          <h2>Volunteering</h2>
          {editMode === true ? (
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                setAddVolunteerModalState(true);
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
                            setEditVolunteerModalState(true);
                          }}
                          href="#"
                        >
                          <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                        </a>
                      ) : null}
                    </div>
                    <div className="sub-title">
                      <p>
                        {item.job_title} - {item.organization_address}
                      </p>
                      <p>
                        {moment
                          .unix(item.date_start.seconds)
                          .format(YearFormat)}{' '}
                        -{' '}
                        {moment.unix(item.date_end.seconds).format(YearFormat)}{' '}
                        {getDifferenceYear(
                          item.date_start.seconds,
                          item.date_end.seconds,
                        )}
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
