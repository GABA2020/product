import React, { Fragment, useState } from 'react';
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

export const Score = () => {
  useInjectSaga({ key: userSliceKey, saga: UserSaga });
  useInjectSaga({ key: storageSliceKey, saga: StorageSaga });
  const dispatch = useDispatch();
  const { userProfile } = useSelector(userSelector);
  const [mcatModal, setMCATModal] = useState<boolean>(false);
  const [step1Modal, setStep1Modal] = useState<boolean>(false);
  const [step2Modal, setStep2Modal] = useState<boolean>(false);

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

  return (
    <Fragment>
      <MCATModal
        userProfile={userProfile}
        isShow={mcatModal}
        onHide={() => {
          setMCATModal(false);
        }}
        uploadFileMCAT={uploadFileMCAT}
        updateUserProfile={newUserProfile => {
          if (JSON.stringify(newUserProfile) !== JSON.stringify(userProfile)) {
            dispatch(
              userActions.updateUserProfileAction({
                userProfile: { ...newUserProfile, mcat_review_requested: true },
              }),
            );
          }
        }}
      />
      <Step1Modal
        userProfile={userProfile}
        isShow={step1Modal}
        onHide={() => {
          setStep1Modal(false);
        }}
        uploadFileStep1={uploadFileStep1}
        updateUserProfile={newUserProfile => {
          if (JSON.stringify(newUserProfile) !== JSON.stringify(userProfile)) {
            dispatch(
              userActions.updateUserProfileAction({
                userProfile: {
                  ...newUserProfile,
                  step_1_review_requested: true,
                },
              }),
            );
          }
        }}
      />
      <Step2Modal
        userProfile={userProfile}
        isShow={step2Modal}
        onHide={() => {
          setStep2Modal(false);
        }}
        uploadFileStep2={uploadFileStep2}
        updateUserProfile={newUserProfile => {
          if (JSON.stringify(newUserProfile) !== JSON.stringify(userProfile)) {
            dispatch(
              userActions.updateUserProfileAction({
                userProfile: {
                  ...newUserProfile,
                  step_2_review_requested: true,
                },
              }),
            );
          }
        }}
      />
      <section className="section-step-scope">
        <div className="container">
          <ul className="section-step-category">
            <li className="step-item">
              <figure className="box-step">
                <div className="service-icons">
                  <img src={mcat} alt="img" />
                </div>
                <figcaption className="step-caption">
                  <h3 className="step-name">
                    <a href="#">MCAT</a>
                  </h3>
                  <p className="step-paragraph">
                    <span className="step-num">{userProfile.mcat}</span>
                    {userProfile.is_passed_mcat === true && (
                      <span className="step-gloss">/ Pass</span>
                    )}
                  </p>
                  <div className="manage-scope-link">
                    <a
                      href="#"
                      onClick={e => {
                        e.preventDefault();
                        setMCATModal(true);
                      }}
                    >
                      Manage Scores
                    </a>
                    <img src={right_arrow_black} alt="image" />
                  </div>
                </figcaption>
              </figure>
            </li>
            <li className="step-item">
              <figure className="box-step">
                <div className="service-icons">
                  <img src={step_one} alt="img" />
                </div>
                <figcaption className="step-caption">
                  <h3 className="step-name">
                    <a href="#">Step One</a>
                  </h3>
                  <p className="step-paragraph">
                    <span className="step-num">{userProfile.step_1}</span>
                    {userProfile.is_passed_step1 === true && (
                      <span className="step-gloss">/ Pass</span>
                    )}
                  </p>
                  <div className="manage-scope-link">
                    <a
                      href="#"
                      onClick={e => {
                        e.preventDefault();
                        setStep1Modal(true);
                      }}
                    >
                      Manage Scores
                    </a>
                    <img src={right_arrow_black} alt="image" />
                  </div>
                </figcaption>
              </figure>
            </li>
            <li className="step-item">
              <figure className="box-step">
                <div className="service-icons">
                  <img src={step_two} alt="img" />
                </div>
                <figcaption className="step-caption">
                  <h3 className="step-name">
                    <a href="#">Step Two CK / CS</a>
                  </h3>
                  <p className="step-paragraph">
                    <span className="step-num">{userProfile.step_2}</span>
                    {userProfile.is_passed_step2 === true && (
                      <span className="step-gloss">/ Pass</span>
                    )}
                  </p>
                  <div className="manage-scope-link">
                    <a
                      href="#"
                      onClick={e => {
                        e.preventDefault();
                        setStep2Modal(true);
                      }}
                    >
                      Manage Scores
                    </a>
                    <img src={right_arrow_black} alt="image" />
                  </div>
                </figcaption>
              </figure>
            </li>
            <li className="step-item">
              <figure className="box-step">
                <div className="service-icons">
                  <img src={step_three} alt="img" />
                </div>
                <figcaption className="step-caption">
                  <h3 className="step-name">
                    <a href="#">Step Three</a>
                  </h3>
                  {/* {userProfile.is_passed_step2 === true && (
                      <span className="step-gloss">/ Pass</span>
                    )} */}
                  <p className="step-paragraph step-paragraph-verify">
                    Once we verify your scores, you will see them here.
                  </p>
                  <div className="manage-scope-link">
                    <a href="#">Manage Scores</a>
                    <img src={right_arrow_black} alt="image" />
                  </div>
                </figcaption>
              </figure>
            </li>
          </ul>
        </div>
      </section>
    </Fragment>
  );
};
