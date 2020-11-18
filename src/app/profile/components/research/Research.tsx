import React, { FC, Fragment, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { right_arrow, down_arrow } from 'assets/images';
import moment from 'moment';
import { ResearchModal } from '../research/ResearchModal';
import { windowOpen } from 'helpers/Unity';
export function Research(props){
  const {
    editMode,
    researches,
    arrayLength,
    loading,
    addNewResearch,
    editResearch,
    deleteResearch,
    getMoreResearches,
  } = props;

  /* state modal display */
  const [researchState, setResearchState] = useState();
  const [ResearchModalState, setResearchModalState] = useState(false);

  function onAddNewResearch(research){
    addNewResearch(research);
    hideResearchModal();
  };
  function onEditResearch(research){
    editResearch(research);
    hideResearchModal();
  };
  function onDeleteResearch(research){
    deleteResearch(research);
    hideResearchModal();
  };
  function hideResearchModal() {
    setResearchState(undefined)
    setResearchModalState(false);
  }

  return (
    <Fragment>
      <ResearchModal
        addNewResearch={onAddNewResearch}
        editResearch={onEditResearch}
        deleteResearch={onDeleteResearch}
        isShow={ResearchModalState}
        onHide={hideResearchModal}
        editValues={researchState}
      />
      <div className="main-title">
        <div className="main-title-work">
          <h2>Research</h2>
          {editMode === true ? (
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                setResearchModalState(true);
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
                      <p className="title">{item.work_title}</p>
                      {editMode === true ? (
                        <a
                          onClick={e => {
                            e.preventDefault();
                            setResearchState(item);
                            setResearchModalState(true);
                          }}
                          href="#"
                        >
                          <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                        </a>
                      ) : null}
                    </div>
                    <div className="sub-title">
                      <p>
                        {item.event_date}
                        • {item.event_name}
                      </p>
                    </div>
                    {item.show_link === true && (
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
      {!loading && researches.length > 0 && researches.length < arrayLength ? (
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
    </Fragment>
  );
};
