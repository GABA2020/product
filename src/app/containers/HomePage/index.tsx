import React from 'react';
import { img_locker, img_user } from '../../../assets/images';
import { Helmet } from 'react-helmet';

export function HomePage() {
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>
      <section id="page_content">
        <section className="section-breadcrumb">
          <div className="container">
            <ul className="breadcrumb">
              <li>
                <a href="#">Home</a>
              </li>
              {/*<li className="active">Harley Quinn</li>*/}
            </ul>
          </div>
        </section>
        {/*end section-breadcrumb*/}
        {/*<section className="section-profile">*/}
        {/*  <div className="container">*/}
        {/*    <div className="media media-profile">*/}
        {/*      <div className="profile-images">*/}
        {/*        <a href="#">*/}
        {/*          <img*/}
        {/*            alt="user image"*/}
        {/*            src={img_user}*/}
        {/*            width={140}*/}
        {/*            height={140}*/}
        {/*          />*/}
        {/*        </a>*/}
        {/*      </div>*/}
        {/*      <div className="media-body">*/}
        {/*        <div className="profile-body">*/}
        {/*          <h2 className="profile-user">*/}
        {/*            <span className="tick_mark">*/}
        {/*              Harley Quinn <sup>MD</sup>*/}
        {/*            </span>*/}
        {/*          </h2>*/}
        {/*          <p className="morehouse-des">*/}
        {/*            Morehouse School of Medicine | Atlanta, Georgia*/}
        {/*          </p>*/}
        {/*          <ul className="profile-tag">*/}
        {/*            <li>*/}
        {/*              <a href="#" className="btn-profile-tag">*/}
        {/*                Urology*/}
        {/*              </a>*/}
        {/*            </li>*/}
        {/*            <li>*/}
        {/*              <a href="#" className="btn-profile-tag">*/}
        {/*                4th Year Student*/}
        {/*              </a>*/}
        {/*            </li>*/}
        {/*            <li>*/}
        {/*              <a href="#" className="btn-profile-tag">*/}
        {/*                Visual Learner*/}
        {/*              </a>*/}
        {/*            </li>*/}
        {/*            <li>*/}
        {/*              <a href="#" className="btn-profile-tag">*/}
        {/*                AOA*/}
        {/*              </a>*/}
        {/*            </li>*/}
        {/*          </ul>*/}
        {/*        </div>*/}
        {/*        /!*end profile-body*!/*/}
        {/*        <div className="profile-modifile">*/}
        {/*          <a href="#" className="btn btn-edit-profile">*/}
        {/*            Connect*/}
        {/*          </a>*/}
        {/*        </div>*/}
        {/*        /!*end profile-modifileb*!/*/}
        {/*      </div>*/}
        {/*      /!*end media-body*!/*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</section>*/}
        <section className="section-locker">
          <div className="container">
            <div className="locker-front">
              <div className="locker-col">
                <div className="main-title">
                  <h2>Locker</h2>
                </div>
              </div>
              {/*end locker-col*/}
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
              {/*end locker-col*/}
              <div className="locker-col">
                <div className="visual-learner">
                  <a href="#" className="btn btn-learner">
                    Visual Learner
                  </a>
                </div>
              </div>
              {/*end locker-col*/}
            </div>
            {/*end locker-front*/}
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
                              <a href="#">Path</a>
                            </div>
                          </div>
                          <div className="media-body">
                            <h3 className="locker-title">
                              Boards &amp; Beyond
                            </h3>
                            <p className="locker-match">95 % match</p>
                            <div className="review-appear">
                              <p className="no-review">No review</p>
                            </div>
                          </div>
                        </div>
                        {/*end media-locker*/}
                        <div className="locker-button">
                          <a href="#" className="btn btn-resource">
                            Manage Resource
                          </a>
                        </div>
                        {/*end locker-button*/}
                      </li>
                      {/*end locker-item*/}
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
                              <a href="#">Path</a>
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
                        {/*end media-locker*/}
                        <div className="locker-button">
                          <a href="#" className="btn btn-resource">
                            Manage Resource
                          </a>
                        </div>
                        {/*end locker-button*/}
                      </li>
                      {/*end locker-item*/}
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
                              <a href="#">Path</a>
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
                        {/*end media-locker*/}
                        <div className="locker-button">
                          <a href="#" className="btn btn-resource">
                            Manage Resource
                          </a>
                        </div>
                        {/*end locker-button*/}
                      </li>
                      {/*end locker-item*/}
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
                              <a href="#">Path</a>
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
                        {/*end media-locker*/}
                        <div className="locker-button">
                          <a href="#" className="btn btn-resource">
                            Manage Resource
                          </a>
                        </div>
                        {/*end locker-button*/}
                      </li>
                      {/*end locker-item*/}
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
                              <a href="#">Path</a>
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
                        {/*end media-locker*/}
                        <div className="locker-button">
                          <a href="#" className="btn btn-resource">
                            Manage Resource
                          </a>
                        </div>
                        {/*end locker-button*/}
                      </li>
                      {/*end locker-item*/}
                      <li className="locker-item">
                        <div className="media-marketplace">
                          <div className="marketplace-symbol">
                            <span className="icons-bag">&nbsp;</span>
                          </div>
                          <div className="marketplace-caption">
                            <p>Browse all resources in the Marketplace</p>
                          </div>
                        </div>
                        {/*end media-locker*/}
                        <div className="locker-button">
                          <a href="#" className="btn btn-market">
                            Go to Marketplace
                          </a>
                        </div>
                        {/*end locker-button*/}
                      </li>
                      {/*end locker-item*/}
                    </ul>
                    {/*end locker-list*/}
                  </div>
                  {/*end locker-category*/}
                </div>
                <div role="tabpanel" className="tab-pane" id="frame-2">
                  content
                </div>
              </div>
            </div>
            {/*end locker-panel*/}
          </div>
        </section>
        {/*end section-locker*/}
        <section className="section-milestones">
          <div className="container">
            <div className="milestones-heading">
              <div className="main-title">
                <h2>Milestones</h2>
              </div>
            </div>
            {/*end main-title*/}
            <div className="milestones-button">
              <a href="#" className="milestones-student">
                4th Year Student
              </a>
            </div>
            {/*end milestones-heading*/}
          </div>
        </section>
        {/*end section-milestones*/}
      </section>
    </React.Fragment>
  );
}
