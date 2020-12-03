import React, { Fragment, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';

import { bag } from 'assets/images';
import { useInjectSaga } from 'utils/redux-injectors';
import { sliceKey } from 'redux/Locker/slice';
import { LockerSaga } from 'redux/Locker/saga';
import { lockerSelector } from 'redux/Locker/selectors';
import AddReviewModal from 'app/components/Modal/ResourceModal/AddResource';
import { Resource } from 'app/components/Resource';
import Review from 'app/components/Review';
import { Context } from 'app/globalContext/GlobalContext';
import {
  GET_LOCKER_RESOURCES_BY_USER,
  GET_REVIEWS_BY_USER,
} from 'service/queries';

const CustomButton = styled.button`
  width: 168px;
  height: 36px;
  border-radius: 6px;
  border: solid 1px ${props => props.theme.color.gabaGreen};
  background-color: ${props => props.theme.color.gabaGreen};
  color: #ffffff;
`;


export const Locker = ({ email, owner }) => {
  const {
    state: { user },
  } = useContext(Context);

  const {
    loading: loadingReviews,
    data: reviewsResponse
  } = useQuery(GET_REVIEWS_BY_USER, { variables: { userId: email || '' } });

  const {
    loading: loadingResources,
    data: resourcesResponse,
    refetch: fetchResources,
  } = useQuery(GET_LOCKER_RESOURCES_BY_USER, {
    variables: { userId: email || '' },
  });

  useInjectSaga({ key: sliceKey, saga: LockerSaga });
  const {
    reviewLength,
    userResourceLength,
  } = useSelector(lockerSelector);

  const [modalVisibility, setModalVisibility] = useState(false);
  const [tabState, setTabState] = useState(0); // 0 => resource, 1 => review

  const renderReviews = (reviews: ENTITIES.UserReviewLocker[]) => {
    return (
      <ul className="review-list">
        {owner && (
          <li className="review-item">
            <CustomButton>
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  setModalVisibility(true);
                }}
              >
                Start a review
              </a>
            </CustomButton>
          </li>
        )}
        {reviews.map((item, index) => {
          return (
            <li key={index} className="review-item">
              <Review review={item} profile={user} />
            </li>
          );
        })}
      </ul>
    );
  };

  const renderResource = (resources: ENTITIES.UserResourceLocker[]) => {
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
            <NavLink to="/marketplace">Go to Marketplace</NavLink>
          </div>
        </li>
        {resources.map((item, index) => {
          return (
            <li key={index} className="locker-item">
              <Resource
                userResources={item}
                refetch={fetchResources}
                owner={owner}
              />
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <Fragment>
      {modalVisibility && (
        <AddReviewModal
          onClose={() => setModalVisibility(false)}
        />
      )}
      {/* <EditResource
        isShow={editResourceModal}
        onHide={() => setEditResourceModal(false)}
        userResource={resourceState}
        allUserResources={allUserResources}
        editUserResource={newUserResource => {
          dispatch(
            actions.editUserResourceAction({
              email: user.email,
              userResource: newUserResource,
            }),
          );
          setResourceState(newUserResource);
        }}
        deleteUserResource={userResource => {
          dispatch(
            actions.deleteUserResourceAction({
              email: user.email,
              userResource,
            }),
          );
        }}
      /> */}
      <section className="section-locker">
        <div className="container">
          <div className="locker-front">
            <div className="locker-col">
              <div className="main-title">
                <h2>Locker</h2>
                {/* <a
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    setAddResourceModal(true);
                  }}
                >
                  <FontAwesomeIcon icon={faPlusCircle} />
                </a> */}
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
            <div className="locker-col"></div>
          </div>
          <div className="locker-panel">
            <div className="tab-content">
              {tabState === 0 && (
                <div role="tabpanel" className={`tab-pane active`} id="frame-1">
                  {!loadingResources &&
                    (resourcesResponse.resources_locker.length > 0 ? (
                      <div className="locker-category">
                        {renderResource(resourcesResponse.resources_locker)}
                        {resourcesResponse.resources_locker.length > 0 &&
                          resourcesResponse.resources_locker.length <
                            userResourceLength && (
                            <div className="review-btn-wrap">
                              <button onClick={() => {}} className="load-more">
                                Load More Resources
                              </button>
                            </div>
                          )}
                      </div>
                    ) : (
                      <div className="locker-category">
                        <div className="locker-empty text-center">
                          <div className="media-marketplace">
                            <div className="image">
                              <img src={bag} alt="bag" />
                            </div>
                            <div className="caption">
                              <p>Browse all resources</p>
                            </div>
                          </div>
                          <div className="locker-button">
                            <NavLink to="/marketplace">
                              Go to Marketplace
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
              {tabState === 1 && (
                <div role="tabpanel" className={`tab-pane active`} id="frame-2">
                  {!loadingReviews &&
                    (reviewsResponse.users_reviews ? (
                      <div className="locker-review">
                        {renderReviews(reviewsResponse.users_reviews)}
                        {reviewsResponse.users_reviews.length > 0 &&
                        reviewsResponse.users_reviews.length < reviewLength ? (
                          <div className="review-btn-wrap">
                            <button onClick={() => {}} className="load-more">
                              Load More Reviews
                            </button>
                          </div>
                        ) : null}
                        {owner && (
                          <div className="locker-empty text-center">
                            <p>Review another resource</p>
                            <button className="btn-start-review">
                              <a
                                href="#"
                                onClick={e => {
                                  e.preventDefault();
                                  setModalVisibility(true);
                                }}
                              >
                                Start a review
                              </a>
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="locker-review">
                        <div className="locker-empty text-center">
                          <p>There is no review available</p>
                          {owner && (
                            <button className="btn-start-review">
                              <a
                                href="#"
                                onClick={e => {
                                  e.preventDefault();
                                  setModalVisibility(true);
                                }}
                              >
                                Start a review
                              </a>
                            </button>
                          )}
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
