import React from 'react';

import Stars from '../../../genericComponents/Stars';

interface ResourceProps {
  title: string,
  matchPercentage: number,
  reviews: number,
  numberOfStars: number,
  id: string
}

const Resource = (props: ResourceProps) => (
  <li className="locker-item">
    <div className="media media-locker">
      <div className="locker-images">
        <img
          alt="image"
          src="app/images/photos/img-locker.jpg"
          width={125}
          height={100}
        />
        <div className="locker-caption">
          <a href="#">Path</a>
        </div>
      </div>
      <div className="media-body">
        <h3 className="locker-title">{props.title}</h3>
        <div className="review-appear">
          <Stars numberOfStars={2}/>
          <p className="review">{props.reviews} Reviews</p>
        </div>
      </div>
    </div>
    <div className="locker-button-match">
      <p className="locker-match">
        <span className="match-num">{props.matchPercentage} %</span> match
      </p>
      <a href="#" className="btn btn-resource">
        View Resource
      </a>
    </div>
  </li>
);

export default Resource;