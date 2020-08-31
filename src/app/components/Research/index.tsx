import React, { FC, Fragment, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { right_arrow, down_arrow } from 'assets/images';
import moment from 'moment';
import { AddResearchModal } from '../Modal/AddResearchModal';
import { EditResearchModal } from '../Modal/EditResearchModal';
import { DayMonthYearFormat, windowOpen } from 'helpers/Unity';
interface IResearch {
  editMode: boolean;
  userProfile: ENTITIES.UserProfile;
  researches: ENTITIES.Research[];
  arrayLength: number;
  loading: boolean;
  addNewResearch: (research: ENTITIES.Research) => void;
  editResearch: (research: ENTITIES.Research) => void;
  deleteResearch: (research: ENTITIES.Research) => void;
  getResearches: () => void;
  getMoreResearches: () => void;
}
export const Research: FC<IResearch> = props => {
  const {
    userProfile,
    editMode,
    researches,
    arrayLength,
    loading,
    addNewResearch,
    editResearch,
    deleteResearch,
    getResearches,
    getMoreResearches,
  } = props;

  const [researchState, setResearchState] = useState<ENTITIES.Research>({
    id: '',
    author: '',
    event_address: '',
    event_date: {
      seconds: 0,
    },
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
    getResearches();
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
        {!loading &&
          (researches.length > 0 ? (
            researches.map((item, index) => {
              return (
                <Fragment key={index}>
                  <div className="accordion">
                    <div className="accordion-item">
                      <div className="title-wrapper">
                        <p className="title">{item.title_of_work}</p>
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
                      <div className="sub-title">
                        <p>
                          {moment
                            .unix(item.event_date.seconds)
                            .format(DayMonthYearFormat)}{' '}
                          • {item.event_name}
                        </p>
                      </div>
                      {item.is_show_link === true && (
                        <div className="content-publication text-right">
                          <a
                            onClick={e => {
                              e.preventDefault();
                              windowOpen(item.link);
                            }}
                            href={item.link}
                          >
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
            })
          ) : (
            <div className="text-empty text-center">
              <p>There is no experiences available</p>
            </div>
          ))}
        {researches.length > 0 && researches.length < arrayLength ? (
          <div className="load-more-wrapper text-center">
            <a
              className="load-more-btn"
              href="#"
              onClick={e => {
                e.preventDefault();
                getMoreResearches();
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
