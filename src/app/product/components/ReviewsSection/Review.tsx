import React from 'react';
import styled from 'styled-components';
import { IComment } from '../../../../types/Resource';
import moment from 'moment';

import Stars from '../../../genericComponents/Stars';

const MessageBox = styled.div`
  background-color: ${props => props.theme.color.softYellow};

  .message-date span {
    &::before {
      background-color: ${props => props.theme.color.gabaYellow};
    }
  }

  .message-type span {
    &::before {
      background-color: ${props => props.theme.color.gabaYellow};
    }
  }

  div.message-bellow  a {
    color: ${props => props.theme.color.darkBlue};
  }
`

const MessageDescription = styled.div`
  h4.message-heading {
    color: ${props => props.theme.color.darkBlue} !important;
  }

  p.message-paragraph {
    color: ${props => props.theme.color.darkBlue} !important;
  }
`

const Button = styled.button`
  font-size: 1.6rem;
  font-weight: 500;
  padding: 9px 14px;
  line-height: 1.1;
  color: ${props => props.theme.color.darkBlue};
  background-color: ${props => props.theme.color.softPurple};
  border-radius: 2px;
  margin-top: -20px;
  outline: none;
  border: none;
`
 

const Review = (props: IComment) => (
	<div className="message-item">
		<MessageBox className="message-box">
			<div className="message-front">
				<div className="message-rating">
					<Stars color="yellow" numberOfStars={props.rating} />
				</div>
				<div className="message-date">
					<span>{moment(Number(props.createdAt)).format('MMMM d, YYYY')}</span>
				</div>
				<div className="message-type">
					<span>Step One</span>
				</div>
			</div>
			<MessageDescription className="message-description">
				<h4 className="message-heading">
					{props.title || 'No title'}
				</h4>
				<p className="message-paragraph">
					{props.comment}
				</p>
			</MessageDescription>
			<div className="message-bellow">
				<div className="message-action">
					<ul className="action-enter">
						<li>
							<Button>
								Helpful
							</Button>
						</li>
						<li>
							<Button>
								Reply
							</Button>
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
								<span>{props.username || 'No user'}</span>
							</a>
						</h4>
						<ul className="author-link">
							{props.usedInTests.map(test => (
								<React.Fragment key={test}>
									<li>
										<a href="#">{test}</a>
									</li>
									<li>
										|
									</li>
								</React.Fragment>
							))}
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
		</MessageBox>
	</div>
);

export default Review;