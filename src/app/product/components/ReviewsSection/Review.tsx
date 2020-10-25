import React from 'react';

import Stars from '../../../genericComponents/Stars';

interface ReviewProps {
	numberOfStars: number,
	title: string,
	comment: string,
	date: string,
	messageType: string,
	user: string
}

const Review = (props: ReviewProps) => (
	<div className="message-item">
		<div className="message-box">
			<div className="message-front">
				<div className="message-rating">
					<Stars numberOfStars={props.numberOfStars} />
				</div>
				<div className="message-date">
					<span>{props.date}</span>
				</div>
				<div className="message-type">
					<span>{props.messageType}</span>
				</div>
			</div>
			<div className="message-description">
				<h4 className="message-heading">
					{props.title}
				</h4>
				<p className="message-paragraph">
					{props.comment}
				</p>
			</div>
			<div className="message-bellow">
				<div className="message-action">
					<ul className="action-enter">
						<li>
							<a href="#" className="btn btn-helpful">
								Helpful
							</a>
						</li>
						<li>
							<a href="#" className="btn btn-reply">
								Reply
							</a>
						</li>
						<li>
							<a href="#" className="btn-report">
								<span className="icons-report">&nbsp;</span>{' '}
								Report abuse
						</a>
						</li>
					</ul>
				</div>
				<div className="message-author">
					<div className="author-descript">
						<h4 className="author-title">
							<a href="#">
								<span>@anotherdoc</span>
							</a>
						</h4>
						<ul className="author-link">
							<li>
								<a href="#">Step One 252</a>
							</li>
							<li> |</li>
							<li>
								<a href="#">Step Two 235</a>
							</li>
						</ul>
					</div>
					<div className="author-image">
						<img
							alt="image"
							src="app/images/photos/img-author-1.jpg"
							width={50}
							height={50}
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default Review;