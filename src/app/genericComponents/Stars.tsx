import React from 'react';

interface StarsProps {
  numberOfStars: number
}

const Stars = ({ numberOfStars }: StarsProps) => {
	const stars: JSX.Element[] = Array.from({ length: 5 }, (_, index) => {
		return (
			<li key={index} className={`rating-item ${index + 1 <= numberOfStars ? 'active' : ''}`}>
				<a href="#" className="rating-star">
					&nbsp;
				</a>
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
}

export default Stars;