import React, { SetStateAction, useState } from 'react';
import styled from 'styled-components';

import Review from './Review';
import { IComment } from '../../../../types/Resource'

const YellowStar = require('../../../../assets/images/front/YellowStar@2x.png');
const YellowActiveStar = require('../../../../assets/images/front/YellowActiveStar@2x.png');

const judgeReviews = [{
  value: 85,
  stars: 5
},{
  value: 9,
  stars: 4
},{
  value: 4,
  stars: 3
},{
  value: 1,
  stars: 2
},{
  value: 1,
  stars: 1
}]

const Button = styled.button`
    color:  ${props => props.theme.color.darkBlue};
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
    margin-bottom: 5px;
`

const ProgressBarContainer = styled.div`
  .progress {
    background-color ${props => props.theme.color.softPurple} !important;
    .progress-bar {
      background-color ${props => props.theme.color.darkBlue} !important;
    }
  }
`

const StarContainer = styled.div`
  margin-top: -2px;
  margin-right: -2px;
`

interface ReviewSectionProps {
  comments: Array<IComment>;
  loadMore: () => void;
  handleReply: any;
}

const ReviewSection = (props: ReviewSectionProps) => {
  const [activeStar, setActiveStar]: any = useState(null);

  const handleFilterReviews =  (property, value) => {}

  const handleClearFilters = () => {
    setActiveStar(null)
  }

  return (
    <section className="section-review">
      <div className="container">
        <div className="review-layout">
          <div className="review-slidebar">
            <div className="portlet-review">
              <div className="review-heading">
                Reviews 2
                <h2 className="review-judge-title">Reviews</h2>
                <div className="judge-sum">
                  <p>4.5 out of 5 stars</p>
                </div>
              </div>
              <div className="judge-category">
                {
                  judgeReviews.map(rev => (
                    <div className="judge-item">
                      <StarContainer className="judge-num-star">
                        <span className="judge-num">{rev.stars}</span>
                        <img
                          onClick={() => {
                            setActiveStar(rev.stars)
                            handleFilterReviews('numberOfStars', rev.stars)
                          }}
                          width={20}
                          src={activeStar === rev.stars ? YellowActiveStar: YellowStar}
                        />
                          &nbsp;
                      </StarContainer>
                      <ProgressBarContainer className="judge-progress">
                        <div className="progress">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            aria-valuenow={rev.value}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            style={{ width: `${rev.value}%` }}
                          />
                        </div>
                      </ProgressBarContainer>
                      <div className="judge-percent">
                        <span>{rev.value}%</span>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="portlet-filter">
              <h3 className="mention-title">Filter by exam</h3>
              <div className="select-box">
                <select className="form-control" onChange={({ target: { value }}) => handleFilterReviews('exam', value)}>
                  <option value={0}>Select</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                </select>
              </div>
            </div>
            <div className="portlet-filter">
              <h3 className="mention-title">Filter by discipline</h3>
              <div className="select-box">
                <select className="form-control">
                  <option value={0}>Select</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                </select>
              </div>
            </div>
            <div className="portlet-filter">
              <Button onClick={handleClearFilters} style={{marginBottom: 20}}>
                Clear Filters
              </Button>
            </div>
          </div>
          <div className="review-main">
            <div className="review-content">
              <div className="portlet-message">
                {
                  props.comments.map(rev => (
                    <Review handleReply={props.handleReply} {...rev}/>
                  ))
                }
              </div>
              <div className="load-more">
                <Button onClick={() => props.loadMore()}>
                  Load More Reviews
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
)};

export default ReviewSection;