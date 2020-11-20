import React from 'react';
import styled from 'styled-components';

import Stars from '../../../genericComponents/Stars';

interface ResourceProps {
  title: string;
  matchPercentage: number;
  reviews: number;
  numberOfStars: number;
  id: string;
}

const MediaBody = styled.div`
  div.review-appear p {
    color: ${props => props.theme.color.darkBlue} !important;
  }
`;

const LockerCaption = styled.div`
  background: ${props => props.theme.color.softYellow} !important;

  a {
    color: ${props => props.theme.color.darkBlue} !important;
  }
`;

const Button = styled.button`
  font-size: 1.6rem;
  font-weight: 500;
  padding: 9px 14px;
  line-height: 1.1;
  color: ${props => props.theme.color.darkBlue};
  background-color: ${props => props.theme.color.gabaYellow};
  border-radius: 2px;
  margin-top: -20px;
  outline: none;
  border: none;
  margin-top: 5px;
`;

const Resource = (props: ResourceProps) => {
  return (
    <li className="locker-item">
      <div className="media media-locker">
        <div className="locker-images">
          <img
            alt="image"
            src="app/assets/images/photos/img-locker.jpg"
            width={125}
            height={100}
          />
          <LockerCaption className="locker-caption">
            <a href="#">Path</a>
          </LockerCaption>
        </div>
        <MediaBody className="media-body">
          <h3 className="locker-title">{props.title}</h3>
          <div className="review-appear">
            <Stars color="yellow" numberOfStars={2} />
            <p className="review">{props.reviews} Reviews</p>
          </div>
        </MediaBody>
      </div>
      <div className="locker-button-match">
        <p className="locker-match">
          <span className="match-num">{props.matchPercentage} %</span> match
        </p>
        <Button className="btn-resource">View Resource</Button>
      </div>
    </li>
  );
};

export default Resource;
