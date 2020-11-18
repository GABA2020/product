import React from 'react';
import styled from 'styled-components';

const YellowActiveStar = require('../../assets/images/front/YellowActiveStar@2x.png');
const YellowStar = require('../../assets/images/front/YellowStar@2x.png');

interface StarsProps {
  numberOfStars: number | string;
  color?: 'blue' | 'yellow';
  onChange?: (stars: number) => void;
}

const Stars = ({ numberOfStars, color = 'blue', onChange }: StarsProps) => {
	const stars: JSX.Element[] = Array.from({ length: 5 }, (_, index) => {
    const isActive = index + 1 <= numberOfStars;
		return (
			<li key={index} className={`rating-item ${isActive ? 'active' : ''}`}>
        {
          color === 'yellow' && (
            <img 
              onClick={() => onChange && onChange(index + 1)}
              src={isActive ? YellowActiveStar : YellowStar}
              alt=""
              width="22"
              height="22"
            />
          )
        }
        {
          color === 'blue' && (
            <a href="#" className="rating-star">
              &nbsp;
            </a>
          )
        }
			</li>
		)
	});

	return (
		<div className="vote-rating">
			<ul className="vote-rating-list">
				{stars}
			</ul>
		</div>
	);
};

export default Stars;