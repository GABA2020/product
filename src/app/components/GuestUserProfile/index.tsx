import React, { Fragment, FC } from 'react';
import { img_locker, img_user } from '../../../assets/images';
import { ordinal_suffix_of } from 'helpers/Unity';
import { Link } from 'react-router-dom';
import RoutesTypes from 'types/Routes';
interface IGuestProfile {
  userGuestProfile: ENTITIES.UserProfile;
  program: ENTITIES.Program;
}
export const GuestUserProfile: FC<IGuestProfile> = props => {
  const { userGuestProfile, program } = props;
  return (
    <Fragment>
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
                  {userGuestProfile.verified ? (
                    <span className="tick_mark">
                      {userGuestProfile.name}{' '}
                      <sup>{userGuestProfile.degrees}</sup>
                    </span>
                  ) : (
                    <span>
                      {userGuestProfile.name}{' '}
                      <sup>{userGuestProfile.degrees}</sup>
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
                      {ordinal_suffix_of(userGuestProfile.year_in_program)} Year
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
                  Connect
                </a>
              </div>
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
