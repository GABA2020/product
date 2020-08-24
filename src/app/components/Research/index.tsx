import React, { FC, Fragment, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { right_arrow } from 'assets/images';
import moment from 'moment';
import { AddResearchModal } from '../Modal/AddResearchModal';
import { EditResearchModal } from '../Modal/EditResearchModal';
interface IResearch {
  editMode: boolean;
  userProfile: ENTITIES.UserProfile;
  researches: ENTITIES.Research[];
  addNewResearch: (research: ENTITIES.Research) => void;
  editResearch: (research: ENTITIES.Research) => void;
  deleteResearch: (research: ENTITIES.Research) => void;
}
export const Research: FC<IResearch> = props => {
  const {
    userProfile,
    editMode,
    researches,
    addNewResearch,
    editResearch,
    deleteResearch,
  } = props;

  const [researchState, setResearchState] = useState<ENTITIES.Research>({
    id: '',
    author: '',
    event_address: '',
    event_date: '',
    event_name: '',
    journal: '',
    link: '',
    is_show_link: false,
    primary_investigator: '',
    research_type: [],
    title_of_work: '',
  });
  /* state modal display */
  const [editResearchModalState, setEditResearchModalState] = useState<boolean>(
    false,
  );
  const [addResearchModalState, setAddResearchModalState] = useState<boolean>(
    false,
  );
  const onAddNewResearch = (research: ENTITIES.Research) => {
    addNewResearch(research);
    setAddResearchModalState(false);
  };
  const onEditResearch = (research: ENTITIES.Research) => {
    editResearch(research);
    setEditResearchModalState(false);
  };
  const onDeleteResearch = (research: ENTITIES.Research) => {
    deleteResearch(research);
    setEditResearchModalState(false);
  };
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

  return (
    <Fragment>
      <AddResearchModal
        isShow={addResearchModalState}
        onHide={() => setAddResearchModalState(false)}
        addNewResearch={onAddNewResearch}
      />
      <EditResearchModal
        isShow={editResearchModalState}
        onHide={() => setEditResearchModalState(false)}
        research={researchState}
        editResearch={onEditResearch}
        deleteResearch={onDeleteResearch}
      />
      <div className="experiences-content">
        <div className="experiences-caption">
          <h3>About</h3>
          <p>{userProfile.about}</p>
        </div>
        <div className="main-title">
          <div className="main-title-work">
            <h2>Research</h2>
            {editMode === true ? (
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  setAddResearchModalState(true);
                }}
              >
                <FontAwesomeIcon icon={faPlusCircle} />
              </a>
            ) : null}
          </div>
        </div>
        <div className="accordion">
          {researches.map((item, index) => {
            return (
              <Fragment key={index}>
                <div className="accordion-item">
                  <div className="accordion-title">
                    <a href="#">{item.title_of_work}</a>
                  </div>
                  <div className="accordion-content">
                    <div className="accordion-content-company">
                      <p>
                        {moment(item.event_date).format('MMM DD, yyyy')} •{' '}
                        {item.event_name}
                      </p>
                      {editMode === true ? (
                        <a
                          onClick={e => {
                            e.preventDefault();
                            setResearchState(item);
                            setEditResearchModalState(true);
                          }}
                          href="#"
                        >
                          <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                        </a>
                      ) : null}
                    </div>
                    {item.is_show_link === true && (
                      <div className="accordion-content-publication text-right">
                        <a href={item.link}>
                          Go to Publication{' '}
                          <img
                            className="right-arrow"
                            src={right_arrow}
                            alt="image"
                          />
                        </a>
                      </div>
                    )}
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
