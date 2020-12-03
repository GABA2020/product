import React, { Fragment, FC, memo } from 'react';
import Rate from 'antd/lib/rate';
import { useResource } from 'hook/useResource';
import { NavLink } from 'react-router-dom';

interface IReview {
  review: ENTITIES.UserReviewLocker;
  profile: ENTITIES.UserProfile;
}

const Review: FC<IReview> = props => {
  const { review } = props;

    const resource = useResource(review.resource_id);
  return (
    <Fragment>
      <div className="review-item-media">
        <h4 className="review-title">
          <NavLink to={`/product-page/${review.resource_id}`}>
            {resource && resource.name}
          </NavLink>
        </h4>
        <div className="review-match">
          {review && review.ReviewComment.rating > 0 ? (
            <Fragment>
              <Rate disabled value={review.ReviewComment.rating}></Rate>
              {/* <p className="oval">
                <img src={oval} alt="" />
              </p>
              <p>Anatomy</p> */}
            </Fragment>
          ) : (
            <Rate disabled value={0}></Rate>
          )}
        </div>
        <p className="title-comment">{review.ReviewComment.title} </p>
        <div className="comment">{review.ReviewComment.comment}</div>
        {/* <div className="user-information">
          <div className="profile-image">
            <img src={avatarUser ? avatarUser : img_user} alt="img" />
          </div>
          <div className="profile-infor">
            {profile.username}
            {profile.verified === true && (
              <sup className="verify-check">
                <img src={verified_check} alt="image" />
              </sup>
            )}
            <ul className="score">
              <li>Step One {profile.step_1}</li>
              <li className="separate">|</li>
              <li>Step Two {profile.step_2}</li>
            </ul>
          </div>
        </div> */}
      </div>
    </Fragment>
  );
};
export default memo(Review);
