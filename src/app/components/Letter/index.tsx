import React, { Fragment, FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
// import { AddLetterModal } from '../Modal/AddLetterModal';
// import { EditLetterModal } from '../Modal/EditLetterModal';
import moment from 'moment';
import { AddLetterModal } from '../Modal/AddLetterModal';
import { EditLetterModal } from '../Modal/EditLetterModal';
import { right_arrow, down_arrow } from 'assets/images';
import { DayMonthYearFormat } from 'helpers/Unity';
interface ILetter {
  userProfile: ENTITIES.UserProfile;
  letters: ENTITIES.Letter[];
  editMode: boolean;
  arrayLength: number;
  loading: boolean;
  addNewLetter: (letter: ENTITIES.Letter) => void;
  editLetter: (letter: ENTITIES.Letter) => void;
  deleteLetter: (letter: ENTITIES.Letter) => void;
  getLetters: () => void;
  getMoreLetters: () => void;
}

const initLetter: ENTITIES.Letter = {
  id: '',
  document_name: '',
  document_type: '',
  link: '',
  receive_date: {
    seconds: 0,
  },
  is_show_link: false,
};

export const Letter: FC<ILetter> = props => {
  const {
    letters,
    editMode,
    userProfile,
    arrayLength,
    loading,
    addNewLetter,
    editLetter,
    deleteLetter,
    getLetters,
    getMoreLetters,
  } = props;
  /* state modal display */
  const [addLetterModalState, setAddLetterModalState] = useState<boolean>(
    false,
  );
  const [editLetterModalState, setEditLetterModalState] = useState<boolean>(
    false,
  );
  /* end state modal display */
  const [letterState, setLetterState] = useState<ENTITIES.Letter>(initLetter);

  useEffect(() => {
    getLetters();
  }, []);

  const onAddNewLetter = (letter: ENTITIES.Letter) => {
    addNewLetter(letter);
    setAddLetterModalState(false);
  };

  const onEditLetter = (letter: ENTITIES.Letter) => {
    editLetter(letter);
    setEditLetterModalState(false);
  };

  const onDeleteLetter = (letter: ENTITIES.Letter) => {
    deleteLetter(letter);
    setEditLetterModalState(false);
  };
  return (
    <Fragment>
      <AddLetterModal
        isShow={addLetterModalState}
        addNewLetter={onAddNewLetter}
        onHide={() => {
          setAddLetterModalState(false);
        }}
      />
      <EditLetterModal
        isShow={editLetterModalState}
        onHide={() => setEditLetterModalState(false)}
        editLetter={onEditLetter}
        deleteLetter={onDeleteLetter}
        letter={letterState}
      />
      <div className="experiences-content">
        <div className="experiences-caption">
          <h3>About</h3>
          <p>{userProfile.about}</p>
        </div>
        <div className="main-title">
          <div className="main-title-work">
            <h2>Letters</h2>
            {editMode === true ? (
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  setAddLetterModalState(true);
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
                              setEditLetterModalState(true);
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
                            .unix(item.receive_date.seconds)
                            .format(DayMonthYearFormat)}{' '}
                          • {item.document_name}
                        </p>
                      </div>
                      {item.is_show_link === true && (
                        <div className="content-publication text-right">
                          <a href={item.link} target="_blank">
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
        {letters.length > 0 && letters.length < arrayLength ? (
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
      </div>
    </Fragment>
  );
};
