import React, { Fragment, useState, useEffect, useContext } from 'react';
import { bag } from 'assets/images';
import { useInjectSaga } from 'utils/redux-injectors';
import { actions, sliceKey } from 'redux/Locker/slice';
import { LockerSaga } from 'redux/Locker/saga';
import { useDispatch, useSelector } from 'react-redux';
import { lockerSelector } from 'redux/Locker/selectors';
import { userSelector } from 'redux/User/selectors';
import AddReviewModal from 'app/components/Modal/ResourceModal/AddResource';
import { Resource } from 'app/components/Resource';
import Review from 'app/components/Review';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { EditResource } from 'app/components/Modal/ResourceModal/EditResource';
import { Context } from 'app/globalContext/GlobalContext';
import { NavLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { CONNECTED_USERS } from 'service/queries';



const iniUserResource: ENTITIES.UserResource = {
  id: '',
  resource_id: '',
  match_score: 0,
  date: {
    seconds: 0,
  },
  actual_exam: '',
  actual_exam_score: 0,
  subject: '',
  review_body: '',
  created_at: {
    seconds: 0,
  },
  updated_at: {
    seconds: 0,
  },
  rating: 0,
};

export const Locker = () => {

  // const {
  //   loading: loadingConnect,
  //   data: connectResponse,
  //   error: connectError,
  //   refetch: fetchConnect,
  // } = useQuery(CONNECTED_USERS, { variables: { email: emailSender } });

  useInjectSaga({ key: sliceKey, saga: LockerSaga });
  const dispatch = useDispatch();
  const {
    reviews,
    userResources,
    reviewLength,
    userResourceLength,
    lastQuery,
    loading,
    allUserResources,
  } = useSelector(lockerSelector);

  // const { userProfile } = useSelector(userSelector);
  const {
    state: { user: userProfile },
  } = useContext(Context);
  const [addResourceModal, setAddResourceModal] = useState<boolean>(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [editResourceModal, setEditResourceModal] = useState<boolean>(false);
  const [resourceState, setResourceState] = useState<ENTITIES.UserResource>(
    iniUserResource,
  );
  const [tabState, setTabState] = useState(0); // 0 => resource, 1 => review

  useEffect(() => {
    // if (userProfile.email !== '') {
    //   dispatch(
    //     actions.getAllUserResourceAction({
    //       email: userProfile.email,
    //     }),
    //   );
    //   dispatch(
    //     actions.getUserResourcesAction({
    //       email: userProfile.email,
    //     }),
    //   );
    // }


  }, [userProfile.email]);

  const renderReviews = (reviews: ENTITIES.UserResource[]) => {
    return (
      <ul className="review-list">
        {reviews.map((item, index) => {
          return (
            <li key={index} className="review-item">
              <Review review={item} profile={userProfile} />
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
              <Resource
                openManageResource={userResources => {
                  setResourceState(userResources);
                  setEditResourceModal(true);
                }}
                userResources={item}
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
          //isShow={addResourceModal}
          onClose={() => setModalVisibility(false)}
          // addNewUserResource={userResource => {
          //   dispatch(
          //     actions.addUserResourceAction({
          //       email: userProfile.email,
          //       userResource,
          //     }),
          //   );
          // }}
          // allUserResources={allUserResources}
        />
      )}
      <EditResource
        isShow={editResourceModal}
        onHide={() => setEditResourceModal(false)}
        userResource={resourceState}
        allUserResources={allUserResources}
        editUserResource={newUserResource => {
          dispatch(
            actions.editUserResourceAction({
              email: userProfile.email,
              userResource: newUserResource,
            }),
          );
          setResourceState(newUserResource);
        }}
        deleteUserResource={userResource => {
          dispatch(
            actions.deleteUserResourceAction({
              email: userProfile.email,
              userResource,
            }),
          );
        }}
      />
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
                        dispatch(
                          actions.getUserResourcesAction({
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
                  <li className={tabState === 1 ? 'active' : undefined}>
                    <a
                      onClick={e => {
                        e.preventDefault();
                        setTabState(1);
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
              {/* <div className="visual-learner">
                <a href="#" className="btn btn-learner">
                  Visual Learner
                </a>
              </div> */}
            </div>
          </div>
          <div className="locker-panel">
            <div className="tab-content">
              {tabState === 0 && (
                <div role="tabpanel" className={`tab-pane active`} id="frame-1">
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
                                      email: userProfile.email,
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
