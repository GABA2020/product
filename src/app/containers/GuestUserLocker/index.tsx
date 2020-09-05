import React, { Fragment, useEffect, useState } from 'react';
import { bag } from 'assets/images';
import { useInjectSaga } from 'utils/redux-injectors';
import { actions, sliceKey } from 'redux/Locker/slice';
import { LockerSaga } from 'redux/Locker/saga';
import { useDispatch, useSelector } from 'react-redux';
import { lockerSelector } from 'redux/Locker/selectors';
import { userSelector } from 'redux/User/selectors';
import { useStorage } from 'hook/useStorage';
import { GuestResource } from 'app/components/GuestResource';
import Review from 'app/components/Review';

export const GuestUserLocker = () => {
  useInjectSaga({ key: sliceKey, saga: LockerSaga });
  const dispatch = useDispatch();
  const {
    reviews,
    userResources,
    reviewLength,
    userResourceLength,
    lastQuery,
    loading,
  } = useSelector(lockerSelector);
  const { userSearchProfile } = useSelector(userSelector);
  const [tabState, setTabState] = useState(0); // 0 => resource, 1 => review

  useEffect(() => {
    if (userSearchProfile.email !== '') {
      dispatch(
        actions.getUserResourcesAction({
          email: userSearchProfile.email,
        }),
      );
    }
  }, [userSearchProfile.email]);

  const renderReviews = (reviews: ENTITIES.UserResource[]) => {
    return (
      <ul className="review-list">
        {reviews.map((item, index) => {
          return (
            <li key={index} className="review-item">
              <Review review={item} profile={userSearchProfile} />
            </li>
          );
        })}
      </ul>
    );
  };

  const renderResource = (resources: ENTITIES.UserResource[]) => {
    return (
      <ul className="locker-list">
        <li className="locker-item">
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
        </li>
        {resources.map((item, index) => {
          return (
            <li key={index} className="locker-item">
              <GuestResource userResource={item} />
            </li>
          );
        })}
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
                  <li className={tabState === 0 ? 'active' : undefined}>
                    <a
                      onClick={e => {
                        e.preventDefault();
                        setTabState(0);
                        dispatch(
                          actions.getUserResourcesAction({
                            email: userSearchProfile.email,
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
                  <li className={tabState === 1 ? 'active' : undefined}>
                    <a
                      onClick={e => {
                        e.preventDefault();
                        setTabState(1);
                        dispatch(
                          actions.getReviewsAction({
                            email: userSearchProfile.email,
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
              {tabState === 0 && (
                <div role="tabpanel" className="tab-pane active" id="frame-1">
                  {!loading &&
                    (userResources.length > 0 ? (
                      <div className="locker-category">
                        {renderResource(userResources)}
                        {userResources.length > 0 &&
                          userResources.length < userResourceLength && (
                            <div className="review-btn-wrap">
                              <button
                                onClick={() => {
                                  dispatch(
                                    actions.getMoreUserResourcesAction({
                                      email: userSearchProfile.email,
                                      lastQuery,
                                    }),
                                  );
                                }}
                                className="load-more"
                              >
                                Load More Resources
                              </button>
                            </div>
                          )}
                      </div>
                    ) : (
                      <div className="locker-category">
                        <div className="locker-empty text-center">
                          <p>There is no resource available</p>
                        </div>
                      </div>
                    ))}
                </div>
              )}
              {tabState === 1 && (
                <div role="tabpanel" className="tab-pane active" id="frame-2">
                  {!loading &&
                    (reviews.length > 0 ? (
                      <div className="locker-review">
                        {renderReviews(reviews)}
                        {reviews.length > 0 && reviews.length < reviewLength ? (
                          <div className="review-btn-wrap">
                            <button
                              onClick={() => {
                                dispatch(
                                  actions.getMoreReviewsAction({
                                    email: userSearchProfile.email,
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
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
