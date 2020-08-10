import React, { Fragment, useEffect, FC, useState } from 'react';
import { faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EditWorkModal } from '../Modal/EditWorkModal';
import { AddWorkModal } from '../Modal/AddWorkModal';
import moment from 'moment';
import { MonthYearFormat, getDifferenceMonthYear } from 'helpers/Unity';
import { down_arrow } from 'assets/images';

interface IWork {
  workExperiences: ENTITIES.WorkExperience[];
  userProfile: ENTITIES.UserProfile;
  editMode: boolean;
  arrayLength: number;
  loading: boolean;
  editWorkExperience: (workExperience: ENTITIES.WorkExperience) => void;
  addNewWorkExperience: (workExperience: ENTITIES.WorkExperience) => void;
  deleteWorkExperience: (workExperience: ENTITIES.WorkExperience) => void;
  getWorkExperiences: () => void;
  getMoreWorkExperiences: () => void;
}

const text = `<p>- Developed new operational procedures and implemented new technology to optimize patient experience while reducing physician workload by approx. 35%.</p> <p>- Assisted physicians with all clinic procedures including minor surgeries, physical exams, exam documentation and patient triage</p>`;
export const Work: FC<IWork> = props => {
  const {
    workExperiences,
    userProfile,
    editMode,
    arrayLength,
    loading,
    getWorkExperiences,
    editWorkExperience,
    addNewWorkExperience,
    deleteWorkExperience,
    getMoreWorkExperiences,
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
    date_end: {
      seconds: 0,
    },
    date_start: {
      seconds: 0,
    },
    description: '',
    job_title: '',
  });

  useEffect(() => {
    getWorkExperiences();
  }, []);

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
        {!loading &&
          (workExperiences.length > 0 ? (
            workExperiences.map((item, index) => {
              return (
                <Fragment key={index}>
                  <div className="accordion">
                    <div className="accordion-item">
                      <div className="title-wrapper">
                        <p className="title">{item.job_title}</p>
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
                      <div className="sub-title">
                        <p>
                          {item.company} • {item.company_address}
                        </p>
                        <p>
                          {moment
                            .unix(item.date_start.seconds)
                            .format(MonthYearFormat)}{' '}
                          –{' '}
                          {moment
                            .unix(item.date_end.seconds)
                            .format(MonthYearFormat)}{' '}
                          {getDifferenceMonthYear(
                            item.date_start.seconds,
                            item.date_end.seconds,
                          )}
                        </p>
                      </div>
                      <div className="content">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.description,
                          }}
                        ></div>
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
        {workExperiences.length > 0 && workExperiences.length < arrayLength ? (
          <div className="load-more-wrapper text-center">
            <a
              className="load-more-btn"
              href="#"
              onClick={e => {
                e.preventDefault();
                getMoreWorkExperiences();
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
