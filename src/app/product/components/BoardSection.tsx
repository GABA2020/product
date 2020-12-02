import React from 'react';
import styled from 'styled-components';

import { Stars } from '../../genericComponents';

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
  margin-top: 5px;
`;

const BoardsReview = styled.div`
  margin-top: 5px;
  a {
    color: ${props => props.theme.color.darkBlue} !important;
  }
`;

const Image = styled.img`
  object-fit: contain;
  height: 250px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface BoardSectionProps {
  title: string;
  description: string;
  rating: number | string;
  onLocker: boolean;
  onLockerButtonPress: Function;
  handleCreateReview: () => void;
  reviewsCount: number | string;
  imageUrl: string;
  link: string;
}

const BoardSection = (props: BoardSectionProps) => (
  <section className="section-boards">
    <div className="container">
      <div className="media-boards">
        <div className="boards-images">
          <Image alt="image" src={props.imageUrl} width={520} />
        </div>
        <div className="media-body">
          <h3 className="boards-title">{props.title}</h3>
          <div className="boards-prize">
            <div className="boards-rating">
              <div className="vote-rating">
                <ul className="vote-rating-list">
                  <Stars color="yellow" numberOfStars={props.rating} />
                </ul>
              </div>
            </div>
            <BoardsReview className="boards-review">
              <span className="review-num">{props.reviewsCount || 0}</span>{' '}
              Reviews
            </BoardsReview>
          </div>
          <div className="boards-caption">
            <p className="board-paragraph">{props.description}</p>
            <ul className="member-check">
              <li>
                <div className="checkbox__styled">
                  <input
                    type="checkbox"
                    className="checkbox__styled__input"
                    id="members-1"
                    name="checkbox"
                    checked={true}
                  />
                  {/* <label
                    className="checkbox__styled__label"
                    htmlFor="members-1"
                  >
                    <span className="size-label">
                      95% of GABA members use this resource
                    </span>
                  </label> */}
                </div>
              </li>
            </ul>
          </div>
          <div className="boards-action">
            <ButtonsContainer>
              <Button onClick={() => props.onLockerButtonPress(props.onLocker)}>
                {props.onLocker ? 'Remove from locker' : 'Add to locker'}
              </Button>

              <a rel="noopener noreferrer" target="_blank" href={props.link}>
                <Button>
                  <span className="icons-target" style={{ color: 'yellow' }}>
                    &nbsp;
                  </span>{' '}
                  Buy from
                </Button>
              </a>

              <Button onClick={props.handleCreateReview}>Write a Review</Button>
            </ButtonsContainer>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default BoardSection;
