import React, { Fragment, useContext, useState } from 'react';
import {
  mcat,
  step_one,
  right_arrow_black,
  step_two,
  step_three,
} from 'assets/images';
import {
  actions as userActions,
  sliceKey as userSliceKey,
} from 'redux/User/slice';
import { StorageSaga } from 'redux/Storage/saga';
import {
  actions as storageActions,
  sliceKey as storageSliceKey,
} from 'redux/Storage/slice';
import { useInjectSaga } from 'utils/redux-injectors';
import { userSelector } from 'redux/User/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { UserSaga } from 'redux/User/saga';
import 'styles/scss/SectionScore.scss';
import { MCATModal } from 'app/components/Modal/MCATModal';
import { Step1Modal } from 'app/components/Modal/Step1Modal';
import { Step2Modal } from 'app/components/Modal/Step2Modal';
import { Step3Modal } from 'app/components/Modal/Step3Modal';
import ScoreModal from 'app/profile/components/ScoreModal';
import { Context } from 'app/globalContext/GlobalContext';

export const Score = () => {
  useInjectSaga({ key: userSliceKey, saga: UserSaga });
  useInjectSaga({ key: storageSliceKey, saga: StorageSaga });
  const dispatch = useDispatch();
  // const { userProfile } = useSelector(userSelector);
  const { state: { user:userProfile } } = useContext(Context);
  const [mcatModal, setMCATModal] = useState<boolean>(false);
  const [step1Modal, setStep1Modal] = useState<boolean>(false);
  const [step2Modal, setStep2Modal] = useState<boolean>(false);
  const [step3Modal, setStep3Modal] = useState<boolean>(false);

  const uploadFileMCAT = (file: File) => {
    dispatch(
      storageActions.uploadFileAction({
        name: `files/${userProfile.email}/MCAT/${file.name}`,
        file,
      }),
    );
  };

  const uploadFileStep1 = (file: File) => {
    dispatch(
      storageActions.uploadFileAction({
        name: `files/${userProfile.email}/Step1/${file.name}`,
        file,
      }),
    );
  };

  const uploadFileStep2 = (file: File) => {
    dispatch(
      storageActions.uploadFileAction({
        name: `files/${userProfile.email}/Step2/${file.name}`,
        file,
      }),
    );
  };

  const uploadFileStep3 = (file: File) => {
    dispatch(
      storageActions.uploadFileAction({
        name: `files/${userProfile.email}/Step3/${file.name}`,
        file,
      }),
    );
  };
  return (
    <Fragment>
      <ScoreModal
        userProfile={userProfile}
        isShow={mcatModal}
        onHide={() => setMCATModal(false)}
        uploadFile={uploadFileMCAT}
        type={"MCAT"}
      />
      <ScoreModal
        userProfile={userProfile}
        isShow={step1Modal}
        onHide={() => setStep1Modal(false)}
        uploadFile={uploadFileStep1}
        type={"Step One"}
      />
      <ScoreModal
        userProfile={userProfile}
        isShow={step2Modal}
        onHide={() => setStep2Modal(false)}
        uploadFile={uploadFileStep2}
        type={"Step Two"}
      />
      <ScoreModal
        userProfile={userProfile}
        isShow={step3Modal}
        onHide={() => setStep3Modal(false)}
        uploadFile={uploadFileStep3}
        type={"Step Three"}
      />
      <section className="section-step-scope">
        <div className="container">
          <div className="list-score">
            <div className="card">
              <div className="card-header">
                <div className="title">
                  <div className="image-score">
                    <img src={mcat} alt="img" />
                  </div>
                  <p>MCAT</p>
                </div>
              </div>
              <div className="card-body">
                {userProfile.mcat_review_requested === false &&
                userProfile.is_passed_mcat === false &&
                userProfile.mcat === 0 &&
                userProfile.mcat_document_name === '' ? (
                  <div className="no-score">
                    <p>No score available</p>
                  </div>
                ) : userProfile.mcat_review_requested === true ? (
                  <div className="score-waiting">
                    <p>Once we verify your scores, you will see them here.</p>
                  </div>
                ) : (
                  <div className="score-pass">
                    <p className="score">
                      {userProfile.mcat}{' '}
                      {userProfile.is_passed_mcat && (
                        <span className="score-gross">/ Pass</span>
                      )}
                    </p>
                  </div>
                )}
              </div>
              <div className="card-footer">
                <div className="score-btn-wrapper">
                  {userProfile.mcat_review_requested === false &&
                  userProfile.is_passed_mcat === false &&
                  userProfile.mcat === 0 &&
                  userProfile.mcat_document_name === '' ? (
                    <div className="add-score">
                      <a
                        onClick={e => {
                          e.preventDefault();
                          setMCATModal(true);
                        }}
                        href="#"
                      >
                        Submit score{' '}
                      </a>{' '}
                    </div>
                  ) : userProfile.mcat_review_requested === true ? (
                    <div className="waiting-score">
                      <p>Waiting for review</p>
                    </div>
                  ) : (
                    <div className="add-score">
                      <a
                        onClick={e => {
                          e.preventDefault();
                          setMCATModal(true);
                        }}
                        href="#"
                      >
                        Add score{' '}
                      </a>{' '}
                      <img src={right_arrow_black} alt="image" />
                    </div>
                  )}
                  {/* <div className="add-score">
                      <a href="#">Manage score </a>{' '}
                      <img src={right_arrow_black} alt="image" />
                    </div> */}
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <div className="title">
                  <div className="image-score">
                    <img src={step_one} alt="img" />
                  </div>
                  <p>Step One</p>
                </div>
              </div>
              <div className="card-body">
                {userProfile.step_1_review_requested === false &&
                userProfile.is_passed_step1 === false &&
                userProfile.step_1 === 0 &&
                userProfile.step_1_document_name === '' ? (
                  <div className="no-score">
                    <p>No score available</p>
                  </div>
                ) : userProfile.step_1_review_requested === true ? (
                  <div className="score-waiting">
                    <p>Once we verify your scores, you will see them here.</p>
                  </div>
                ) : (
                  <div className="score-pass">
                    <p className="score">
                      {userProfile.step_1}{' '}
                      {userProfile.is_passed_step1 && (
                        <span className="score-gross">/ Pass</span>
                      )}
                    </p>
                  </div>
                )}
              </div>
              <div className="card-footer">
                <div className="score-btn-wrapper">
                  {userProfile.step_1_review_requested === false &&
                  userProfile.is_passed_step1 === false &&
                  userProfile.step_1 === 0 &&
                  userProfile.step_1_document_name === '' ? (
                    <div className="add-score">
                      <a
                        onClick={e => {
                          e.preventDefault();
                          setStep1Modal(true);
                        }}
                        href="#"
                      >
                        Submit score{' '}
                      </a>{' '}
                    </div>
                  ) : userProfile.step_1_review_requested === true ? (
                    <div className="waiting-score">
                      <p>Waiting for review</p>
                    </div>
                  ) : (
                    <div className="add-score">
                      <a
                        onClick={e => {
                          e.preventDefault();
                          setStep1Modal(true);
                        }}
                        href="#"
                      >
                        Add score{' '}
                      </a>{' '}
                      <img src={right_arrow_black} alt="image" />
                    </div>
                  )}
                  {/* <div className="add-score">
                      <a href="#">Manage score </a>{' '}
                      <img src={right_arrow_black} alt="image" />
                    </div> */}
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <div className="title">
                  <div className="image-score">
                    <img src={step_two} alt="img" />
                  </div>
                  <p>Step Two CK / CS</p>
                </div>
              </div>
              <div className="card-body">
                {userProfile.step_2_review_requested === false &&
                userProfile.is_passed_step2 === false &&
                userProfile.step_2 === 0 &&
                userProfile.step_2_document_name === '' ? (
                  <div className="no-score">
                    <p>No score available</p>
                  </div>
                ) : userProfile.step_2_review_requested === true ? (
                  <div className="score-waiting">
                    <p>Once we verify your scores, you will see them here.</p>
                  </div>
                ) : (
                  <div className="score-pass">
                    <p className="score">
                      {userProfile.step_2}{' '}
                      {userProfile.is_passed_step2 && (
                        <span className="score-gross">/ Pass</span>
                      )}
                    </p>
                  </div>
                )}
              </div>
              <div className="card-footer">
                <div className="score-btn-wrapper">
                  {userProfile.step_2_review_requested === false &&
                  userProfile.is_passed_step2 === false &&
                  userProfile.step_2 === 0 &&
                  userProfile.step_2_document_name === '' ? (
                    <div className="add-score">
                      <a
                        onClick={e => {
                          e.preventDefault();
                          setStep2Modal(true);
                        }}
                        href="#"
                      >
                        Submit score{' '}
                      </a>{' '}
                    </div>
                  ) : userProfile.step_2_review_requested === true ? (
                    <div className="waiting-score">
                      <p>Waiting for review</p>
                    </div>
                  ) : (
                    <div className="add-score">
                      <a
                        onClick={e => {
                          e.preventDefault();
                          setStep2Modal(true);
                        }}
                        href="#"
                      >
                        Add score{' '}
                      </a>{' '}
                      <img src={right_arrow_black} alt="image" />
                    </div>
                  )}
                  {/* <div className="add-score">
                      <a href="#">Manage score </a>{' '}
                      <img src={right_arrow_black} alt="image" />
                    </div> */}
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <div className="title">
                  <div className="image-score">
                    <img src={step_three} alt="img" />
                  </div>
                  <p>Step Three</p>
                </div>
              </div>
              <div className="card-body">
                {userProfile.step_3_review_requested === false &&
                userProfile.is_passed_step3 === false &&
                userProfile.step_3 === 0 &&
                userProfile.step_3_document_name === '' ? (
                  <div className="no-score">
                    <p>No score available</p>
                  </div>
                ) : userProfile.step_3_review_requested === true ? (
                  <div className="score-waiting">
                    <p>Once we verify your scores, you will see them here.</p>
                  </div>
                ) : (
                  <div className="score-pass">
                    <p className="score">
                      {userProfile.step_3}{' '}
                      {userProfile.is_passed_step3 && (
                        <span className="score-gross">/ Pass</span>
                      )}
                    </p>
                  </div>
                )}
              </div>
              <div className="card-footer">
                <div className="score-btn-wrapper">
                  {userProfile.step_3_review_requested === false &&
                  userProfile.is_passed_step3 === false &&
                  userProfile.step_3 === 0 &&
                  userProfile.step_3_document_name === '' ? (
                    <div className="add-score">
                      <a
                        onClick={e => {
                          e.preventDefault();
                          setStep3Modal(true);
                        }}
                        href="#"
                      >
                        Submit score{' '}
                      </a>{' '}
                    </div>
                  ) : userProfile.step_3_review_requested === true ? (
                    <div className="waiting-score">
                      <p>Waiting for review</p>
                    </div>
                  ) : (
                    <div className="add-score">
                      <a
                        onClick={e => {
                          e.preventDefault();
                          setStep3Modal(true);
                        }}
                        href="#"
                      >
                        Add score{' '}
                      </a>{' '}
                      <img src={right_arrow_black} alt="image" />
                    </div>
                  )}
                  {/* <div className="add-score">
                      <a href="#">Manage score </a>{' '}
                      <img src={right_arrow_black} alt="image" />
                    </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};