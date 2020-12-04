import React, { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { right_arrow, down_arrow } from 'assets/images';
import { windowOpen } from 'helpers/Unity';
import { LetterModal } from './LetterModal';


export function Letter(props){
  const {
    letters,
    editMode,
    arrayLength,
    loading,
    addNewLetter,
    editLetter,
    deleteLetter,
    getMoreLetters,
  } = props;
  const [isShowLetterModal, setIsShowLetterModal] = useState(false);
  /* end state modal display */
  const [letterState, setLetterState] = useState();


  function onAddNewLetter(letter){
    addNewLetter(letter);
    hideLetterModal();
  };

  function onEditLetter(letter){
    editLetter(letter);
    hideLetterModal();
  };

  function onDeleteLetter(letter){
    deleteLetter(letter);
    hideLetterModal();
  };

  function hideLetterModal() {
    setIsShowLetterModal(false);
    setLetterState(undefined);
  }

  return (
    <Fragment>
      <LetterModal
        addNewLetter={onAddNewLetter}
        editLetter={onEditLetter}
        deleteLetter={onDeleteLetter}
        letter={letterState}
        isShow={isShowLetterModal}
        onHide={hideLetterModal}
        editValues={letterState}
      />
      <div className="main-title">
        <div className="main-title-work">
          <h2>Letters</h2>
          {editMode === true ? (
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                setIsShowLetterModal(true);
              }}
            >
              <FontAwesomeIcon icon={faPlusCircle} />
            </a>
          ) : null}
        </div>
      </div>
      {!loading &&
        (letters.length > 0 ? (
          letters.map((item, index) => {
            return (
              <Fragment key={index}>
                <div className="accordion">
                  <div className="accordion-item">
                    <div className="title-wrapper">
                      <p className="title">{item.document_type}</p>
                      {editMode === true ? (
                        <a
                          onClick={e => {
                            e.preventDefault();
                            setLetterState(item);
                            setIsShowLetterModal(true);
                          }}
                          href="#"
                        >
                          <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                        </a>
                      ) : null}
                    </div>
                    <div className="sub-title">
                      <p>
                        {moment(item.receive_date,"DD/MM/YYYY").format('DD/MM/YYYY')}
                           {/* .unix(item.receive_date.seconds) */}
                           {/* .format(DayMonthYearFormat)}{' '} */}
                        • {item.document_name}
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
                            alt=""
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
      {!loading && letters.length > 0 && letters.length < arrayLength ? (
        <div className="load-more-wrapper text-center">
          <a
            className="load-more-btn"
            href="#"
            onClick={e => {
              e.preventDefault();
              getMoreLetters();
            }}
          >
            Load More Experiences <img src={down_arrow} alt="img" />
          </a>
        </div>
      ) : null}
    </Fragment>
  );
};
