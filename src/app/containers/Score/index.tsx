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

export const Score = () => {
  useInjectSaga({ key: userSliceKey, saga: UserSaga });
  useInjectSaga({ key: storageSliceKey, saga: StorageSaga });
  const dispatch = useDispatch();
  const { userProfile } = useSelector(userSelector);
  const [mcatModal, setMCATModal] = useState<boolean>(false);

  const uploadFileMCAT = (file: File) => {
    dispatch(
      storageActions.uploadFileAction({
        name: `${userProfile.email}/MCAT/${file.name}`,
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
            dispatch(userActions.updateUserProfileAction({ userProfile }));
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
                    <span className="step-gloss">/ Pass</span>
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
                    <span className="step-gloss"> / Pass</span>
                  </p>
                  <div className="manage-scope-link">
                    <a href="#">Manage Scores</a>
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
                    <span className="step-gloss"> / Pass</span>
                  </p>
                  <div className="manage-scope-link">
                    <a href="#">Manage Scores</a>
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
