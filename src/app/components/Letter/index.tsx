import React, { Fragment, FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
// import { AddLetterModal } from '../Modal/AddLetterModal';
// import { EditLetterModal } from '../Modal/EditLetterModal';
import moment from 'moment';
import { AddLetterModal } from '../Modal/AddLetterModal';
import { EditLetterModal } from '../Modal/EditLetterModal';
interface ILetter {
  userProfile: ENTITIES.UserProfile;
  letters: ENTITIES.Letter[];
  editMode: boolean;
  addNewLetter: (letter: ENTITIES.Letter) => void;
  editLetter: (letter: ENTITIES.Letter) => void;
  deleteLetter: (letter: ENTITIES.Letter) => void;
}

const initLetter: ENTITIES.Letter = {
  id: '',
  document_name: '',
  document_type: '',
  link: '',
  receive_date: '',
};

export const Letter: FC<ILetter> = props => {
  const {
    letters,
    editMode,
    userProfile,
    addNewLetter,
    editLetter,
    deleteLetter,
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
            <h2> Letter</h2>
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
        <div className="accordion">
          {letters.map((item, index) => {
            return (
              <Fragment key={index}>
                <div className="accordion-item active">
                  <div className="accordion-title">
                    <a href="#">{item.document_type}</a>
                  </div>
                  <div className="accordion-content">
                    <div className="accordion-content-company">
                      <p>{item.document_name}</p>
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
                    <p>{moment(item.receive_date).format('MMM DD, yyyy')}</p>
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
