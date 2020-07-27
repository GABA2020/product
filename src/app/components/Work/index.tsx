import React, { Fragment, useEffect, FC, useState } from 'react';
import '../../../styles/AccordionContent.scss';
import { faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EditWorkModal } from '../Modal/EditWorkModal';
import { AddWorkModal } from '../Modal/AddWorkModal';
import moment from 'moment';

interface IWork {
  workExperiences: ENTITIES.WorkExperience[];
  userProfile: ENTITIES.UserProfile;
  editMode: boolean;
  editWorkExperience: (workExperience: ENTITIES.WorkExperience) => void;
  addNewWorkExperience: (workExperience: ENTITIES.WorkExperience) => void;
  deleteWorkExperience: (workExperience: ENTITIES.WorkExperience) => void;
}
export const Work: FC<IWork> = props => {
  const {
    workExperiences,
    userProfile,
    editMode,
    editWorkExperience,
    addNewWorkExperience,
    deleteWorkExperience,
  } = props;
  /* state modal display */
  const [isShowModalEditWorkState, setIsShowModalEditWorkState] = useState<
    boolean
  >(false);
  const [isShowModalAddWorkState, setIsShowModalAddWorkState] = useState<
    boolean
  >(false);
  /* end state modal display */
  const [workExperienceState, setWorkExperienceState] = useState<
    ENTITIES.WorkExperience
  >({
    id: '',
    company: '',
    company_address: '',
    date_end: '',
    date_start: '',
    description: '',
    job_title: '',
  });

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
  const onAddNewWorkExperience = (workExperience: ENTITIES.WorkExperience) => {
    addNewWorkExperience(workExperience);
    setIsShowModalAddWorkState(false);
  };
  const onEditNewWorkExperience = (workExperience: ENTITIES.WorkExperience) => {
    editWorkExperience(workExperience);
    setIsShowModalEditWorkState(false);
  };

  const onDeleteWorkExperience = (workExperience: ENTITIES.WorkExperience) => {
    deleteWorkExperience(workExperience);
    setIsShowModalEditWorkState(false);
  };
  return (
    <Fragment>
      <EditWorkModal
        isShow={isShowModalEditWorkState}
        onHide={() => setIsShowModalEditWorkState(false)}
        workExperience={workExperienceState}
        editWorkExperience={onEditNewWorkExperience}
        deleteWorkExperience={onDeleteWorkExperience}
      ></EditWorkModal>
      <AddWorkModal
        addNewWorkExperience={onAddNewWorkExperience}
        isShow={isShowModalAddWorkState}
        onHide={() => setIsShowModalAddWorkState(false)}
      ></AddWorkModal>
      <div className="experiences-content">
        <div className="experiences-caption">
          <h3>About</h3>
          <p>{userProfile.about}</p>
        </div>
        <div className="main-title">
          <div className="main-title-work">
            <h2> Work</h2>
            {editMode === true ? (
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  setIsShowModalAddWorkState(true);
                }}
              >
                <FontAwesomeIcon icon={faPlusCircle} />
              </a>
            ) : null}
          </div>
        </div>
        <div className="accordion">
          {workExperiences.map((item, index) => {
            return (
              <Fragment key={index}>
                <div className="accordion-item">
                  <div className="accordion-title">
                    <a href="#">{item.job_title}</a>
                  </div>
                  <div className="accordion-content">
                    <div className="accordion-content-company">
                      <p>{item.company}</p>
                      {editMode === true ? (
                        <a
                          onClick={e => {
                            e.preventDefault();
                            setWorkExperienceState(item);
                            setIsShowModalEditWorkState(true);
                          }}
                          href="#"
                        >
                          <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                        </a>
                      ) : null}
                    </div>
                    <p>{`${moment(item.date_start).format(
                      'MMM yyyy',
                    )} - ${moment(item.date_end).format('MMM yyyy')}`}</p>
                    <p>{item.company_address}</p>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.description,
                      }}
                    />
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
          </div>
          </div> */}
        </div>
      </div>
    </Fragment>
  );
};
