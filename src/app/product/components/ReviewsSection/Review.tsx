import React, { useState } from 'react';
import styled from 'styled-components';
import { IComment } from '../../../../types/Resource';
import moment from 'moment';

import Stars from '../../../genericComponents/Stars';
import { Column, Row } from '../../../genericComponents/Layout';

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

  div.message-bellow a {
    color: ${props => props.theme.color.darkBlue};
  }
`;

const MessageDescription = styled.div`
  h4.message-heading {
    color: ${props => props.theme.color.darkBlue} !important;
  }

  p.message-paragraph {
    color: ${props => props.theme.color.darkBlue} !important;
  }
`;

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
`;

const ReviewRepliesContainer: any = styled(Column)`
  width: 100%;
  max-height: ${({ reviewsVisibility }: any) =>
    reviewsVisibility ? '1000px' : 0};
  transition: max-height 0.5s ease-in;
  position: relative;

  p.reply {
    opacity: ${({ reviewsVisibility }: any) => (reviewsVisibility ? '1' : '0')};
    transition: opacity 0.2s ease;
  }
`;

const ArrowContainer = styled(Row)`
  width: 100%;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  p {
    margin: 0;
  }
`;

const ToggleReviewsArrow: any = styled.div`
  width: 7px;
  height: 7px;
  border: 2px solid black;
  transform: ${({ reviewsVisibility }: any) =>
    reviewsVisibility ? 'rotate(225deg)' : 'rotate(45deg)'};
  border-top: none;
  border-left: none;
  margin-left: 10px;
  margin-bottom: -5px;
  margin-top: 3px;
  transition: transform 0.4s linear;
`;

const HelpfulButton: any = styled(Button)`
  ${(props: any) =>
    props.isHelpful ? `background-color: ${props.theme.color.gabaYellow}` : ''}
`;

interface ReviewProps extends IComment {
  handleReply: any;
  markReviewAsHelpful: (commentId: string, isHelpful: boolean) => void;
}

const Review = (props: ReviewProps) => {
  const [reviewsVisibility, setReviewsVisibility] = useState(false);

  return (
    <div className="message-item">
      <MessageBox className="message-box">
        <div className="message-front">
          <div className="message-rating">
            <Stars color="yellow" numberOfStars={props.rating} />
          </div>
          <div className="message-date">
            <span>
              {moment(Number(props.createdAt)).format('MMMM d, YYYY')}
            </span>
          </div>
          <div className="message-type">
            <span>Step One</span>
          </div>
        </div>
        <MessageDescription className="message-description">
          <h4 className="message-heading">{props.title || 'No title'}</h4>
          <p className="message-paragraph">{props.comment}</p>
        </MessageDescription>
        <div className="message-bellow">
          <div className="message-action">
            <ul className="action-enter">
              <li>
                <HelpfulButton
                  onClick={() =>
                    props.markReviewAsHelpful(props.id, !!props.isHelpful)
                  }
                  isHelpful={props.isHelpful}
                >
                  {props.isHelpful ? 'Not Helpful' : 'Helpful'}
                </HelpfulButton>
              </li>
              <li>
                <Button
                  onClick={() =>
                    props.handleReply({
                      visibility: true,
                      commentId: props.id,
                    })
                  }
                >
                  Reply
                </Button>
              </li>
              <li>
              <Button
                  onClick={() =>{
                    (window as any).$crisp.push(["do", "chat:open"]);
                    (window as any).$crisp.push(["do", "message:send", ["text", "Hello I would like to report an abuse"]])
                  }}
                >
                  <span className="icons-report">&nbsp;</span> Report abuse
                </Button>
                
                
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
                    <li>|</li>
                  </React.Fragment>
                ))}
              </ul>
            </div>
            {/* <div className="author-image">
              <img
                alt="image"
                src="app/images/photos/img-author-1.jpg"
                width={50}
                height={50}
              />
            </div> */}
          </div>
          <ReviewRepliesContainer reviewsVisibility={reviewsVisibility}>
            {props.replies && !!props.replies.length && (
              <ArrowContainer
                onClick={() =>
                  setReviewsVisibility(currentValue => !currentValue)
                }
              >
                <p>Show Comment Replies</p>
                <ToggleReviewsArrow reviewsVisibility={reviewsVisibility} />
              </ArrowContainer>
            )}
            {props.replies &&
              props.replies.map(reply => (
                <p className="reply">
                  <strong>{reply.username}: </strong>
                  {reply.comment}
                </p>
              ))}
          </ReviewRepliesContainer>
        </div>
      </MessageBox>
    </div>
  );
};

export default Review;
