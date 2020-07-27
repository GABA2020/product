import React, { FC, Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectSaga } from 'utils/redux-injectors';
import {
  sliceKey as userSliceKey,
  actions as userActions,
} from 'redux/User/slice';
import {
  sliceKey as programSliceKey,
  actions as programActions,
} from 'redux/Program/slice';
import {
  sliceKey as storageSliceKey,
  actions as storageActions,
} from 'redux/Storage/slice';
import { UserSaga } from 'redux/User/saga';
import { ProgramSaga } from 'redux/Program/saga';
import { StorageSaga } from 'redux/Storage/saga';
import { userSelector } from 'redux/User/selectors';
import { programSelector } from 'redux/Program/selectors';
import { storageSelector } from 'redux/Storage/selectors';
import { img_locker, img_user } from 'assets/images';
import { ordinal_suffix_of } from 'helpers/Unity';
import { Link } from 'react-router-dom';
import RoutesTypes from 'types/Routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { EditProfileModal } from 'app/components/Modal/EditProfileModal';
import { CVWork } from 'app/components/CVWork';

export const MyProfile = props => {
  useInjectSaga({ key: userSliceKey, saga: UserSaga });
  useInjectSaga({ key: programSliceKey, saga: ProgramSaga });
  useInjectSaga({ key: storageSliceKey, saga: StorageSaga });
  const dispatch = useDispatch();
  const { userProfile, workExperiences, educations } = useSelector(
    userSelector,
  );
  const { program } = useSelector(programSelector);
  const { avatar_url } = useSelector(storageSelector);

  const [editModeState, setEditModeState] = useState<boolean>(true);
  const [
    isShowModalEditProfileState,
    setIsShowModalEditProfileState,
  ] = useState<boolean>(false);

  useEffect(() => {
    dispatch(
      programActions.getProgramReviewAction({ email: userProfile.email }),
    );
    dispatch(
      userActions.getWorkExperiencesAction({ email: userProfile.email }),
    );
    dispatch(userActions.getEducationsAction({ email: userProfile.email }));
  }, [userProfile.email]);

  useEffect(() => {
    if (userProfile.avatar !== '') {
      dispatch(storageActions.getAvatarURLAction({ name: userProfile.avatar }));
    }
  }, [userProfile.avatar]);

  const saveProfile = (
    userProfile: ENTITIES.UserProfile,
    program: ENTITIES.Program,
  ) => {
    dispatch(userActions.updateUserProfileAction({ userProfile }));
    // console.log(program);
    setIsShowModalEditProfileState(false);
  };

  return (
    <Fragment>
      <EditProfileModal
        avatar_url={avatar_url}
        saveProfile={saveProfile}
        program={program}
        userProfile={userProfile}
        isShow={isShowModalEditProfileState}
        onHide={() => {
          setIsShowModalEditProfileState(false);
        }}
      ></EditProfileModal>

      {editModeState === true ? (
        <section className="section-profile-edit text-right">
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              setIsShowModalEditProfileState(true);
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </a>
        </section>
      ) : null}
      <section className="section-profile">
        <div className="container">
          <div className="media media-profile">
            <div className="profile-images">
              <a href="#">
                <img
                  alt="user image"
                  src={avatar_url}
                  width={140}
                  height={140}
                />
              </a>
            </div>
            <div className="media-body">
              <div className="profile-body">
                <h2 className="profile-user">
                  {userProfile.verified ? (
                    <span className="tick_mark">
                      {userProfile.name} <sup>{userProfile.degrees}</sup>
                    </span>
                  ) : (
                    <span>
                      {userProfile.name} <sup>{userProfile.degrees}</sup>
                    </span>
                  )}
                </h2>

                {/* owner profile will use userProfile */}
                {educations.length > 0 && (
                  <p className="morehouse-des">
                    {educations[0].school} • {educations[0].school_address}
                  </p>
                )}
                <ul className="profile-tag">
                  <li>
                    <a href="#" className="btn-profile-tag">
                      {program.specialty}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="btn-profile-tag">
                      {ordinal_suffix_of(userProfile.year_in_program)} Year
                      Student
                    </a>
                  </li>
                  <li>
                    <a href="#" className="btn-profile-tag">
                      Visual Learner
                    </a>
                  </li>
                  <li>
                    <a href="#" className="btn-profile-tag">
                      AOA
                    </a>
                  </li>
                </ul>
              </div>
              {/* owner profile will use userProfile */}
              {/* <div className="profile-modifile">
                {editModeState === false ? (
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      setEditModeState(true);
                    }}
                    className="btn btn-edit-profile"
                  >
                    Edit Profile
                  </a>
                ) : (
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      setEditModeState(false);
                    }}
                    className="btn btn-edit-profile"
                  >
                    Save Profile
                  </a>
                )}
              </div> */}
            </div>
          </div>
        </div>
      </section>
      {/* owner profile will use userProfile */}
      <section className="section-step-scope">
        <div className="container">
          <ul className="section-step-category">
            <li className="step-item">
              <figure className="box-step">
                <div className="service-icons">
                  <a href="#">
                    <span className="icons-grid">&nbsp;</span>
                  </a>
                </div>
                <figcaption className="step-caption">
                  <h3 className="step-name">
                    <a href="#">MCAT</a>
                  </h3>
                  <p className="step-paragraph">
                    <span className="step-num">{userProfile.mcat}</span>
                    {userProfile.mcat >= 246 && (
                      <span className="step-gloss"> / Pass</span>
                    )}
                  </p>
                  <div className="scope-link">
                    <a href="#">Manage Scores</a>
                  </div>
                </figcaption>
              </figure>
            </li>
            <li className="step-item">
              <figure className="box-step">
                <div className="service-icons">
                  <a href="#">
                    <span className="icons-point">&nbsp;</span>
                  </a>
                </div>
                <figcaption className="step-caption">
                  <h3 className="step-name">
                    <a href="#">Step One</a>
                  </h3>
                  <p className="step-paragraph">
                    <span className="step-num">{userProfile.step_1}</span>
                    {userProfile.step_1 >= 246 && (
                      <span className="step-gloss"> / Pass</span>
                    )}
                  </p>
                  <div className="scope-link">
                    <a href="#">Manage Scores</a>
                  </div>
                </figcaption>
              </figure>
            </li>
            <li className="step-item">
              <figure className="box-step">
                <div className="service-icons">
                  <a href="#">
                    <span className="icons-image">&nbsp;</span>
                  </a>
                </div>
                <figcaption className="step-caption">
                  <h3 className="step-name">
                    <a href="#">Step Two CK / CS</a>
                  </h3>
                  <p className="step-paragraph">
                    <span className="step-num">{userProfile.step_2}</span>
                    {userProfile.step_2 >= 246 && (
                      <span className="step-gloss"> / Pass</span>
                    )}
                  </p>
                  <div className="scope-link">
                    <a href="#">Manage Scores</a>
                  </div>
                </figcaption>
              </figure>
            </li>
            <li className="step-item">
              <figure className="box-step">
                <div className="service-icons">
                  <a href="#">
                    <span className="icons-pi">&nbsp;</span>
                  </a>
                </div>
                <figcaption className="step-caption">
                  <h3 className="step-name">
                    <a href="#">Step Three</a>
                  </h3>
                  <p className="step-paragraph step-paragraph-verify">
                    Once we verify your scores, you will see them here.
                  </p>
                  <div className="scope-link">
                    <a href="#">Manage Scores</a>
                  </div>
                </figcaption>
              </figure>
            </li>
          </ul>
        </div>
      </section>
      {/* owner profile will use userProfile */}
      <CVWork
        userProfile={userProfile}
        workExperiences={workExperiences}
        educations={educations}
        editMode={editModeState}
        addNewWorkExperience={workExperience => {
          dispatch(
            userActions.addNewWorkExperienceAction({
              email: userProfile.email,
              workExperience,
            }),
          );
        }}
        editWorkExperience={workExperience => {
          dispatch(
            userActions.editWorkExperienceAction({
              email: userProfile.email,
              workExperience,
            }),
          );
        }}
        deleteWorkExperience={workExperience => {
          dispatch(
            userActions.deleteWorkExperienceActionAction({
              email: userProfile.email,
              id: workExperience.id,
            }),
          );
        }}
      ></CVWork>

      <section className="section-locker">
        <div className="container">
          <div className="locker-front">
            <div className="locker-col">
              <div className="main-title">
                <h2>Locker</h2>
              </div>
            </div>
            <div className="locker-col">
              <div className="locker-tabs">
                <ul className="nav nav-tabs">
                  <li className="active">
                    <a href="#frame-1" role="tab" data-toggle="tab">
                      Resources
                    </a>
                  </li>
                  <li>
                    <a href="#frame-2" role="tab" data-toggle="tab">
                      Reviews
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="locker-col">
              <div className="visual-learner">
                <a href="#" className="btn btn-learner">
                  Visual Learner
                </a>
              </div>
            </div>
          </div>
          <div className="locker-panel">
            <div className="tab-content">
              <div role="tabpanel" className="tab-pane active" id="frame-1">
                <div className="locker-category">
                  <ul className="locker-list">
                    <li className="locker-item">
                      <div className="media media-locker">
                        <div className="locker-images">
                          <img
                            alt="user image"
                            src={img_locker}
                            width={125}
                            height={100}
                          />
                          <div className="locker-caption">
                            <Link to={RoutesTypes.PRODUCT}>Path</Link>
                          </div>
                        </div>
                        <div className="media-body">
                          <h3 className="locker-title">Boards &amp; Beyond</h3>
                          <p className="locker-match">95 % match</p>
                          <div className="review-appear">
                            <p className="no-review">No review</p>
                          </div>
                        </div>
                      </div>
                      <div className="locker-button">
                        <a href="#" className="btn btn-resource">
                          Manage Resource
                        </a>
                      </div>
                    </li>
                    <li className="locker-item">
                      <div className="media media-locker">
                        <div className="locker-images">
                          <img
                            alt="user image"
                            src={img_locker}
                            width={125}
                            height={100}
                          />
                          <div className="locker-caption">
                            <Link to={RoutesTypes.PRODUCT}>Path</Link>
                          </div>
                        </div>
                        <div className="media-body">
                          <h3 className="locker-title">Anki: Pepper Deck</h3>
                          <p className="locker-match">98 % match</p>
                          <div className="review-appear">
                            <div className="vote-rating">
                              <ul className="vote-rating-list">
                                <li className="rating-item active">
                                  <a href="#" className="rating-star">
                                    &nbsp;
                                  </a>
                                </li>
                                <li className="rating-item active">
                                  <a href="#" className="rating-star">
                                    &nbsp;
                                  </a>
                                </li>
                                <li className="rating-item active">
                                  <a href="#" className="rating-star">
                                    &nbsp;
                                  </a>
                                </li>
                                <li className="rating-item active">
                                  <a href="#" className="rating-star">
                                    &nbsp;
                                  </a>
                                </li>
                                <li className="rating-item">
                                  <a href="#" className="rating-star">
                                    &nbsp;
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="locker-button">
                        <a href="#" className="btn btn-resource">
                          Manage Resource
                        </a>
                      </div>
                    </li>
                    <li className="locker-item">
                      <div className="media media-locker">
                        <div className="locker-images">
                          <img
                            alt="user image"
                            src={img_locker}
                            width={125}
                            height={100}
                          />
                          <div className="locker-caption">
                            <Link to={RoutesTypes.PRODUCT}>Path</Link>
                          </div>
                        </div>
                        <div className="media-body">
                          <h3 className="locker-title">SketchyPharm</h3>
                          <p className="locker-match">82 % match</p>
                          <div className="review-appear">
                            <p className="no-review">No review</p>
                          </div>
                        </div>
                      </div>
                      <div className="locker-button">
                        <a href="#" className="btn btn-resource">
                          Manage Resource
                        </a>
                      </div>
                    </li>
                    <li className="locker-item">
                      <div className="media media-locker">
                        <div className="locker-images">
                          <img
                            alt="user image"
                            src={img_locker}
                            width={125}
                            height={100}
                          />
                          <div className="locker-caption">
                            <Link to={RoutesTypes.PRODUCT}>Path</Link>
                          </div>
                        </div>
                        <div className="media-body">
                          <h3 className="locker-title">SketchyClinical</h3>
                          <p className="locker-match">82 % match</p>
                          <div className="review-appear">
                            <p className="no-review">No review</p>
                          </div>
                        </div>
                      </div>
                      <div className="locker-button">
                        <a href="#" className="btn btn-resource">
                          Manage Resource
                        </a>
                      </div>
                    </li>
                    <li className="locker-item">
                      <div className="media media-locker">
                        <div className="locker-images">
                          <img
                            alt="user image"
                            src={img_locker}
                            width={125}
                            height={100}
                          />
                          <div className="locker-caption">
                            <Link to={RoutesTypes.PRODUCT}>Path</Link>
                          </div>
                        </div>
                        <div className="media-body">
                          <h3 className="locker-title">AMBOSS</h3>
                          <p className="locker-match">76 % match</p>
                          <div className="review-appear">
                            <div className="vote-rating">
                              <ul className="vote-rating-list">
                                <li className="rating-item active">
                                  <a href="#" className="rating-star">
                                    &nbsp;
                                  </a>
                                </li>
                                <li className="rating-item active">
                                  <a href="#" className="rating-star">
                                    &nbsp;
                                  </a>
                                </li>
                                <li className="rating-item active">
                                  <a href="#" className="rating-star">
                                    &nbsp;
                                  </a>
                                </li>
                                <li className="rating-item active">
                                  <a href="#" className="rating-star">
                                    &nbsp;
                                  </a>
                                </li>
                                <li className="rating-item">
                                  <a href="#" className="rating-star">
                                    &nbsp;
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="locker-button">
                        <a href="#" className="btn btn-resource">
                          Manage Resource
                        </a>
                      </div>
                    </li>
                    <li className="locker-item">
                      <div className="media-marketplace">
                        <div className="marketplace-symbol">
                          <span className="icons-bag">&nbsp;</span>
                        </div>
                        <div className="marketplace-caption">
                          <p>Browse all resources in the Marketplace</p>
                        </div>
                      </div>
                      <div className="locker-button">
                        <a href="#" className="btn btn-market">
                          Go to Marketplace
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div role="tabpanel" className="tab-pane" id="frame-2">
                content
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-milestones"></section>
    </Fragment>
  );
};
