import React, { useState } from 'react';

import Review from './Review'
import styled from 'styled-components';
const YellowStar = require('../../../../assets/images/front/YellowStar@2x.png');
const YellowActiveStar = require('../../../../assets/images/front/YellowActiveStar@2x.png');

const REVIEWS = [{
	numberOfStars: 3,
	title: 'awesome resource, but you’ll be paying a pretty penny',
	comment: `
		I love B&amp;B, but honestly it’s expensive. I agree
		with the other reviewers here. The price could be
		better. BUT when you’re prepping for STEP 1 you’ll
		pay any price to get that dream score! My goal was
		to get a 250 or above so I spared no expense.
	`,
	date: 'May 15, 2020',
  messageType: 'Step One',
  exam: '1',
	user: '@anotherdoc',
	id: '1234'
},
{
	numberOfStars: 3,
	title: 'awesome resource, but you’ll be paying a pretty penny',
	comment: `
		I love B&amp;B, but honestly it’s expensive. I agree
		with the other reviewers here. The price could be
		better. BUT when you’re prepping for STEP 1 you’ll
		pay any price to get that dream score! My goal was
		to get a 250 or above so I spared no expense.
	`,
	date: 'May 15, 2020',
  messageType: 'Step Two',
  exam: '2',
	user: '@anotherdoc',
	id: '1234'
},
{
	numberOfStars: 5,
	title: 'dude, I was almost',
	comment: `
		I love B&amp;B, but honestly it’s expensive. I agree
		with the other reviewers here. The price could be
		better. BUT when you’re prepping for STEP 1 you’ll
		pay any price to get that dream score! My goal was
		to get a 250 or above so I spared no expense.
	`,
	date: 'May 15, 2020',
  messageType: 'Step One',
  exam: '1',
	user: '@anotherdoc',
	id: '1234'
}]

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

const ReviewSection = () => {
  let [reviews, setReviews] = useState(REVIEWS);
  const handleFilterReviews =  (property, value) => setReviews(
    REVIEWS.filter(rev => rev[property] === value)
  )

  const [activeStar, setActiveStar]: any = useState(null);

  const handleClearFilters = () => {
    setActiveStar(null)
    setReviews(REVIEWS)
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
              <h3 className="mention-title">Review this resource</h3>
              <div className="mention-insight">
                <p>Help other students with your insight.</p>
              </div>
              <div className="write-button">
                <Button>
                  Write a Review
                </Button>
              </div>
            </div>
          </div>
          <div className="review-main">
            <div className="review-content">
              <div className="portlet-message">
                {
                  reviews.map(rev => (
                    <Review {...rev}/>
                  ))
                }
              </div>
              <div className="load-more">
                <Button>
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