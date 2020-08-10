import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { img_locker, verified_check, oval, bag } from 'assets/images';
import RoutesTypes from 'types/Routes';
import { Rate } from 'antd';
import { useInjectSaga } from 'utils/redux-injectors';
import { actions, sliceKey } from 'redux/Locker/slice';
import { LockerSaga } from 'redux/Locker/saga';
import { useDispatch, useSelector } from 'react-redux';
import { lockerSelector } from 'redux/Locker/selectors';
import { userSelector } from 'redux/User/selectors';
import { storageSelector } from 'redux/Storage/selectors';

const tabContent = ['tabReview', 'tabResource'];

export const Locker = () => {
  useInjectSaga({ key: sliceKey, saga: LockerSaga });
  const dispatch = useDispatch();
  const { reviews, resources, arrayLength, lastQuery, loading } = useSelector(
    lockerSelector,
  );
  const { userProfile } = useSelector(userSelector);
  const { avatar_url } = useSelector(storageSelector);
  const [tab, setTab] = useState<string>(tabContent[0]);
  useEffect(() => {
    if (userProfile.email !== '') {
      dispatch(
        actions.getResourcesAction({
          email: userProfile.email,
        }),
      );
    }
  }, [userProfile.email]);
  const renderReviews = (reviews: ENTITIES.Review[]) => {
    return (
      <ul className="review-list">
        {reviews.map((item, index) => {
          return (
            <li key={index} className="review-item">
              <h4 className="review-title">
                <a href="#">{item.name}</a>
              </h4>
              <div className="review-match">
                <Rate disabled defaultValue={item.rating}></Rate>
                {/* <p className="oval">
                  <img src={oval} alt="" />
                </p> */}
                {/* <p>Anatomy</p> */}
              </div>
              <p className="title-comment">{item.subject}</p>
              <div className="comment">{item.review_body}</div>
              <div className="user-information">
                <div className="profile-image">
                  <img src={avatar_url} alt="img" />
                </div>
                <div className="profile-infor">
                  {userProfile.name}
                  <sup className="verify-check">
                    <img src={verified_check} alt="image" />
                  </sup>
                  <ul className="score">
                    <li>Step One {userProfile.step_1}</li>
                    <li className="separate">|</li>
                    <li>Step Two {userProfile.step_2}</li>
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  const renderResource = (resources: ENTITIES.Resource[]) => {
    return (
      <ul className="locker-list">
        {resources.map((item, index) => {
          return (
            <li key={index} className="locker-item">
              <div className="media media-locker-item">
                <div className="locker-image">
                  <img
                    alt="user image"
                    src={img_locker}
                    width={125}
                    height={100}
                  />
                  <div className="image-caption">
                    <Link to={RoutesTypes.PRODUCT}>Path</Link>
                  </div>
                </div>
                <div className="locker-information">
                  <div className="title">{item.name}</div>
                  <div className="match">
                    <p>{item.match_score} % match</p>
                  </div>
                  <div className="review">
                    <p>No review</p>
                    {/* <div className="vote-star">
                          <Rate disabled defaultValue={5}></Rate>
                        </div> */}
                  </div>
                </div>
              </div>
              <div className="locker-button">
                <a href="#" className="btn btn-resource">
                  Manage Resource
                </a>
              </div>
            </li>
          );
        })}

        {/* <li className="locker-item">
        <div className="media-marketplace">
          <div className="image">
            <img src={bag} alt="bag" />
          </div>
          <div className="caption">
            <p>Browse all resources</p>
          </div>
        </div>
        <div className="locker-button">
          <a href="#" className="btn btn-marketplace">
            Go to Marketplace
          </a>
        </div>
      </li> */}
      </ul>
    );
  };
  return (
    <Fragment>
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
                  <li className={tab === tabContent[0] ? 'active' : undefined}>
                    <a
                      onClick={() => {
                        dispatch(
                          actions.getResourcesAction({
                            email: userProfile.email,
                          }),
                        );
                      }}
                      href="#frame-1"
                      role="tab"
                      data-toggle="tab"
                    >
                      Resources
                    </a>
                  </li>
                  <li className={tab === tabContent[1] ? 'active' : undefined}>
                    <a
                      onClick={() => {
                        dispatch(
                          actions.getReviewsAction({
                            email: userProfile.email,
                          }),
                        );
                      }}
                      href="#frame-2"
                      role="tab"
                      data-toggle="tab"
                    >
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
                {!loading &&
                  (resources.length > 0 ? (
                    <div className="locker-category">
                      {renderResource(resources)}
                      <div className="review-btn-wrap">
                        <button onClick={() => {}} className="load-more">
                          Load More Resources
                        </button>
                      </div>
                    </div>
                  ) : null)}
              </div>
              <div role="tabpanel" className="tab-pane" id="frame-2">
                {!loading &&
                  (reviews.length > 0 ? (
                    <div className="locker-review">
                      {renderReviews(reviews)}
                      {reviews.length > 0 && reviews.length < arrayLength ? (
                        <div className="review-btn-wrap">
                          <button
                            onClick={() => {
                              dispatch(
                                actions.getMoreReviewsAction({
                                  email: userProfile.email,
                                  lastQuery,
                                }),
                              );
                            }}
                            className="load-more"
                          >
                            Load More Reviews
                          </button>
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <div className="locker-review">
                      <div className="locker-empty text-center">
                        <p>There is no review available</p>
                        <button className="btn-start-review">
                          Start a review
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
