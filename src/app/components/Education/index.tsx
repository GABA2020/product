import React, { Fragment, FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
import { AddEducationModal } from '../Modal/AddEducationModal';
import { EditEducationModal } from '../Modal/EditEducationModal';
import moment from 'moment';
interface IEducation {
  userProfile: ENTITIES.UserProfile;
  educations: ENTITIES.Education[];
  editMode: boolean;
  addNewEducation: (education: ENTITIES.Education) => void;
  editEducation: (education: ENTITIES.Education) => void;
  deleteEducation: (education: ENTITIES.Education) => void;
}

const initEducation: ENTITIES.Education = {
  id: '',
  school: '',
  school_address: '',
  degree_type: '',
  major: '',
  honors: '',
  date_end: '',
  date_start: '',
};

export const Education: FC<IEducation> = props => {
  const {
    educations,
    editMode,
    addNewEducation,
    editEducation,
    deleteEducation,
    userProfile,
  } = props;
  /* state modal display */
  const [
    isShowModalEditEducationState,
    setIsShowModalEditEducationState,
  ] = useState<boolean>(false);
  const [
    isShowModalAddEducationState,
    setIsShowModalAddEducationState,
  ] = useState<boolean>(false);
  /* end state modal display */
  const [educationState, setEducationState] = useState<ENTITIES.Education>(
    initEducation,
  );

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
  const onAddNewEducation = (education: ENTITIES.Education) => {
    addNewEducation(education);
    setIsShowModalAddEducationState(false);
  };

  const onEditEducation = (education: ENTITIES.Education) => {
    editEducation(education);
    setIsShowModalEditEducationState(false);
  };

  const onDeleteEducation = (education: ENTITIES.Education) => {
    deleteEducation(education);
    setIsShowModalEditEducationState(false);
  };
  return (
    <Fragment>
      <AddEducationModal
        isShow={isShowModalAddEducationState}
        addNewEducation={onAddNewEducation}
        onHide={() => {
          setIsShowModalAddEducationState(false);
        }}
      ></AddEducationModal>
      <EditEducationModal
        isShow={isShowModalEditEducationState}
        onHide={() => setIsShowModalEditEducationState(false)}
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
            <h2> Education</h2>
            {editMode === true ? (
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  setIsShowModalAddEducationState(true);
                }}
              >
                <FontAwesomeIcon icon={faPlusCircle} />
              </a>
            ) : null}
          </div>
        </div>
        <div className="accordion">
          {educations.map((item, index) => {
            return (
              <Fragment>
                <div key={index} className="accordion-item active">
                  <div className="accordion-title">
                    <a href="#">{`${item.degree_type} in ${item.major}`}</a>
                  </div>
                  <div className="accordion-content">
                    <div className="accordion-content-company">
                      <p>{item.school}</p>
                      {editMode === true ? (
                        <a
                          onClick={e => {
                            e.preventDefault();
                            setEducationState(item);
                            setIsShowModalEditEducationState(true);
                          }}
                          href="#"
                        >
                          <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                        </a>
                      ) : null}
                    </div>
                    <p>{item.school_address}</p>
                    <p>{`${moment(item.date_start).format(
                      'MMM yyyy',
                    )} - ${moment(item.date_end).format('MMM yyyy')}`}</p>
                    <p>{item.honors}</p>
                  </div>
                </div>
              </Fragment>
            );
          })}

          {/* <div className="accordion-item">
            <div className="accordion-title">
              <a href="#">Professional Experience Title and Place 2</a>
            </div>
            <div className="accordion-content">
              <p>Boston, Massachusetts</p>
              <p>Harvard Medical School • Full-time</p>
              <p>Jun 2016 – Present • 4 years 1 month</p>
            </div>
          </div> */}
        </div>
      </div>
    </Fragment>
  );
};
