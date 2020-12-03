import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';

import { IComment } from '../../../../types/Resource';
import { Stars } from '../../../genericComponents';
import { Column, Row } from '../../../genericComponents/Layout';
import { GET_HELPFUL_COUNT } from '../../../../service/queries';

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

  ul.author-link p {
    color: ${props => props.theme.color.darkBlue};
  }

  ul.author-link li {
    color: ${props => props.theme.color.darkBlue};
  }
`;

const MessageDescriptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
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

const TagsContainer = styled.div`
  display: flex;
  max-width: 300px;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  color: ${props => props.theme.color.darkBlue};
  font-size: 12px;
  font-weight: bold;
  height: 32px;
  letter-spacing: -0.1px;
  margin-bottom: 15px;
  background-color: ${props => props.theme.color.softPurple};
  padding: 5px 10px;
  text-align: center;
  border-radius: 5px;
  margin-right: 10px;
`;

const testsTranslate = {
  step_1: 'Step 1',
  step_2: 'Step 2',
  step_3: 'Step 3',
  mcat: 'MCAT',
};

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
  const [helpfulCount, setHelpfulCount] = useState(0);

  const { loading, refetch } = useQuery(GET_HELPFUL_COUNT, {
    variables: {
      resource_review_id: props.id,
    },
    onCompleted: data => {
      setHelpfulCount(data.helpful_review.length);
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (!loading) refetch();
  }, [props.isHelpful]);

  return (
    <div className="message-item">
      <MessageBox className="message-box">
        <div className="message-front">
          <div className="message-rating">
            <Stars color="yellow" numberOfStars={props.rating} />
          </div>
          <div className="message-date">
            <span>{String(props.createdAt).split(' ')[0]}</span>
          </div>
        </div>
        <MessageDescriptionContainer>
          <MessageDescription className="message-description">
            <h4 className="message-heading">{props.title || 'No title'}</h4>
            <p className="message-paragraph">{props.comment}</p>
          </MessageDescription>
          <TagsContainer>
            {props.specialties.map((tagitem, index) => (
              <Tag>{tagitem}</Tag>
            ))}
          </TagsContainer>
        </MessageDescriptionContainer>
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
                  {props.isHelpful ? 'Not Helpful' : 'Helpful'}{' '}
                  {`(${helpfulCount})`}
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
                  onClick={() => {
                    (window as any).$crisp.push(['do', 'chat:open']);
                    (window as any).$crisp.push([
                      'do',
                      'message:send',
                      ['text', 'Hello I would like to report an abuse'],
                    ]);
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
                <p>
                  <span>{props.username || 'No user'}</span>
                </p>
              </h4>
              <ul className="author-link">
                {props.usedInTests.map(test => (
                  <React.Fragment key={test}>
                    <li>
                      <p>{testsTranslate[test]}</p>
                    </li>
                    <li>|</li>
                  </React.Fragment>
                ))}
              </ul>
            </div>
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
