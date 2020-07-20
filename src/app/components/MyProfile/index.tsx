import React, { FC, Fragment, useState } from 'react';
import { img_locker, img_user } from 'assets/images';
import { ordinal_suffix_of } from 'helpers/Unity';
import { Work } from '../Work';
import { Volunteer } from '../Volunteer';
import { Education } from '../Education';
import { Research } from '../Research';
import { Link } from 'react-router-dom';
import RoutesTypes from 'types/Routes';
//redux state

interface IMyProfile {
  userProfile: ENTITIES.UserProfile;
  program: ENTITIES.Program;
  workExperiences: ENTITIES.WorkExperience[];
  educations: ENTITIES.Education[];
}

export const MyProfile: FC<IMyProfile> = props => {
  const { userProfile, program, workExperiences, educations } = props;
  const arrayWork = [
    'work',
    'volunteer',
    'research',
    'publication',
    'letter',
    'school',
  ];
  const [stateWork, setStateWork] = useState<string>(arrayWork[0]);
  const renderCVWithCondition = () => {
    switch (stateWork) {
      case arrayWork[0]:
        return (
          <Work
            userProfile={userProfile}
            workExperiences={workExperiences}
          ></Work>
        );
      case arrayWork[1]:
        return <Volunteer></Volunteer>;
      case arrayWork[2]:
        return <Research></Research>;
      case arrayWork[5]:
        return <Education educations={educations}></Education>;
      default:
        break;
    }
  };
  return (
    <Fragment>
      {/* <section className="section-profile-edit text-right">
        <a href="">edit</a>
      </section> */}
      <section className="section-profile">
        <div className="container">
          <div className="media media-profile">
            <div className="profile-images">
              <a href="#">
                <img alt="user image" src={img_user} width={140} height={140} />
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
                <p className="morehouse-des">{program.program_name}</p>
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
              <div className="profile-modifile">
                <a href="#" className="btn btn-edit-profile">
                  Edit Profile
                </a>
              </div>
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
      <section className="section-experiences">
        <div className="container">
          <div className="wrap-layout">
            <div className="wrap-content">
              <div className="experiences-slidebar">
                <nav className="experiences-nav">
                  <li
                    className={
                      stateWork === arrayWork[0] ? 'active' : undefined
                    }
                  >
                    <a
                      onClick={e => {
                        e.preventDefault();
                        setStateWork(arrayWork[0]);
                      }}
                      href="#"
                    >
                      Work
                    </a>
                  </li>
                  <li
                    className={
                      stateWork === arrayWork[1] ? 'active' : undefined
                    }
                  >
                    <a
                      onClick={e => {
                        e.preventDefault();
                        setStateWork(arrayWork[1]);
                      }}
                      href="#"
                    >
                      Volunteer
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={e => {
                        e.preventDefault();
                        setStateWork(arrayWork[2]);
                      }}
                      href="#"
                    >
                      Research
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={e => {
                        e.preventDefault();
                        setStateWork(arrayWork[3]);
                      }}
                      href="#"
                    >
                      Publications
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={e => {
                        e.preventDefault();
                        setStateWork(arrayWork[4]);
                      }}
                      href="#"
                    >
                      Letters
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={e => {
                        e.preventDefault();
                        setStateWork(arrayWork[5]);
                      }}
                      href="#"
                    >
                      Schools
                    </a>
                  </li>
                </nav>
              </div>
              <div className="experiences-main">{renderCVWithCondition()}</div>
            </div>
          </div>
        </div>
      </section>

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
