import React, { Fragment, useEffect, FC, useState } from 'react';
import { faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { down_arrow } from '../../../../assets/images';
import { WorkModal } from './WorkModal'


const renderTextArea = (text: string) => {
  return text.replace(/\n/g, '<br>');
};
export function Work(props){
  const {
    workExperiences,
    editMode,
    arrayLength,
    loading,
    editWorkExperience,
    addNewWorkExperience,
    deleteWorkExperience,
    getMoreWorkExperiences,
  } = props;
  /* state modal display */
  const [isShowModalWorkState, setIsShowModalWorkState] = useState(false);
  /* end state modal display */
  const [workExperienceState, setWorkExperienceState] = useState();

  function onAddNewWorkExperience(workExperience) {
    addNewWorkExperience(workExperience);
    hideWorkModal();
  }

  function onEditNewWorkExperience(workExperience){
    editWorkExperience(workExperience);
    hideWorkModal();
  };

  function onDeleteWorkExperience(workExperience){
    deleteWorkExperience(workExperience);
    hideWorkModal();
  };

  function hideWorkModal() {
    setIsShowModalWorkState(false);
    setWorkExperienceState(undefined);
  }


  return (
    <Fragment>
      <WorkModal
        addNewWorkExperience={onAddNewWorkExperience}
        editWorkExPerience={onEditNewWorkExperience}
        deleteWorkExperience={onDeleteWorkExperience}
        isShow={isShowModalWorkState}
        onHide={hideWorkModal}
        editValues={workExperienceState}
      />
      <div className="main-title">
        <div className="main-title-work">
          <h2> Work</h2>
          {editMode === true ? (
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                setIsShowModalWorkState(true);
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
                      <p className="title">{item.title}</p>
                      {editMode === true ? (
                        <a
                          onClick={e => {
                            e.preventDefault();
                            setWorkExperienceState(item);
                            setIsShowModalWorkState(true);
                          }}
                          href="#"
                        >
                          <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                        </a>
                      ) : null}
                    </div>
                    <div className="sub-title">
                      <p>
                        {item.company} • {item.city}
                      </p>
                      <p> {`${item.start_date} - ${item.end_date}`} </p>
                    </div>
                    <div className="content">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: renderTextArea(item.description),
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
      {!loading &&
      workExperiences.length > 0 &&
      workExperiences.length < arrayLength ? (
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
    </Fragment>
  );
};
