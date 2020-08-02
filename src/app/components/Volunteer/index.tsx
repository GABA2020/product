import React, { FC, Fragment, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { getDifferenceTwoDate } from 'helpers/Unity';
import { AddVolunteerModal } from '../Modal/AddVolunteerModal';
import { EditVolunteerModal } from '../Modal/EditVolunteerModal';
interface IVolunteer {
  editMode: boolean;
  userProfile: ENTITIES.UserProfile;
  volunteers: ENTITIES.Volunteer[];
  addNewVolunteer: (volunteer: ENTITIES.Volunteer) => void;
  editVolunteer: (volunteer: ENTITIES.Volunteer) => void;
  deleteVolunteer: (volunteer: ENTITIES.Volunteer) => void;
}
export const Volunteer: FC<IVolunteer> = props => {
  const {
    editMode,
    userProfile,
    volunteers,
    addNewVolunteer,
    editVolunteer,
    deleteVolunteer,
  } = props;
  const [volunteerState, setVolunteerState] = useState<ENTITIES.Volunteer>({
    id: '',
    date_end: '',
    date_start: '',
    description: '',
    job_title: '',
    number_of_hours_served: '',
    organization_address: '',
    organization_name: '',
  });
  /* state modal display */
  const [editVolunteerModalState, setEditVolunteerModalState] = useState<
    boolean
  >(false);
  const [addVolunteerModalState, setAddVolunteerModalState] = useState<boolean>(
    false,
  );

  /* end state modal display */
  useEffect(() => {
    var accordion = new (jQuery as any).DEVFUNC.accordion();
    accordion.handleAccordion();
    /*****Smartphone menu settings*****/
    (jQuery as any).DEVFUNC.spMenu({
      menuBtn: [
        {
          oBtn: '#btn-nav-sp a',
          target: '#sub-menu-sp',
        },
      ],
      closeBtn: '.close_btn',
      addClass: 'spmenu_open',
    });
  }, []);
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
      <div className="experiences-content">
        <div className="experiences-caption">
          <h3>About</h3>
          <p>{userProfile.about}</p>
        </div>
        <div className="main-title">
          <div className="main-title-work">
            <h2>Volunteer</h2>
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
        <div className="accordion">
          {volunteers.map((item, index) => {
            return (
              <Fragment key={index}>
                <div className="accordion-item">
                  <div className="accordion-title">
                    <a href="#">{item.organization_name}</a>
                  </div>
                  <div className="accordion-content">
                    <div className="accordion-content-company">
                      <p>
                        {item.job_title} • {item.organization_address}
                      </p>
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
                    <p>
                      {moment(item.date_start).format('yyyy')} –{' '}
                      {moment(item.date_end).format('yyyy')}{' '}
                      {`${getDifferenceTwoDate(
                        item.date_start,
                        item.date_end,
                      )}`}
                    </p>
                  </div>
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};
