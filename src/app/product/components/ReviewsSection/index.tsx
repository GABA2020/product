import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { Dropdown } from 'semantic-ui-react';

import Review from './Review';
import { IComment } from '../../../../types/Resource';
import { GET_DISCIPLINES } from '../../../../service/queries';
import { Column } from 'app/genericComponents/Layout';

const YellowStar = require('../../../../assets/images/front/YellowStar@2x.png');
const YellowActiveStar = require('../../../../assets/images/front/YellowActiveStar@2x.png');

const exams = [
  {
    value: 'mcat',
    name: 'MCAT',
  },
  {
    value: 'step_1',
    name: 'Step 1',
  },
  {
    value: 'step_2',
    name: 'Step 2',
  },
  {
    value: 'step_3',
    name: 'Step 3',
  },
];

const Button = styled.button`
  color: ${props => props.theme.color.darkBlue};
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
  margin-bottom: 30px;
`;

const ProgressBarContainer = styled.div`
  .progress {
    background-color ${props => props.theme.color.softPurple} !important;
    .progress-bar {
      background-color ${props => props.theme.color.darkBlue} !important;
    }
  }
`;

const StarContainer = styled.div`
  margin-top: -2px;
  margin-right: -2px;
`;

const NoItemsContainer = styled(Column)`
  width: 100%;
  align-items: center;
  margin-bottom: 30px;
`;

interface ReviewSectionProps {
  comments: Array<IComment>;
  loadMore: () => void;
  handleReply: any;
  markReviewAsHelpful: (commentId: string, isHelpful: boolean) => void;
  stars: {
    stars_1: number;
    stars_2: number;
    stars_3: number;
    stars_4: number;
    stars_5: number;
  };
  reviewsCount: number;
  rating: number;
  handleCreateReview: () => void;
}

const ReviewSection = (props: ReviewSectionProps) => {
  const [activeStar, setActiveStar]: any = useState(null);
  const [disciplines, setDisciplines]: any = useState([]);
  const [filteredComments, setFilteredComments]: any = useState([]);
  const [activeFilters, setActiveFilters]: any = useState({});
  const [displayFilteredComments, setDisplayFilteredComments] = useState(false);

  const handleSetActiveFilter = (property, value) => {
    setActiveFilters(prevFilters => ({
      ...prevFilters,
      [property]: value,
    }));
  };

  const handleFilter = () => {
    setFilteredComments(() => {
      let commentsCopy = props.comments.slice();
      Object.keys(activeFilters).forEach(key => {
        if (key === 'rating')
          commentsCopy = commentsCopy.filter(
            comment => comment[key] === activeFilters[key],
          );
        else
          commentsCopy = commentsCopy.filter(comment =>
            comment[key].includes(activeFilters[key]),
          );
      });
      return commentsCopy;
    });
    setDisplayFilteredComments(true);
  };

  const handleClearFilters = () => {
    setActiveStar(null);
    setActiveFilters({});
    setFilteredComments([]);
    setDisplayFilteredComments(false);
  };

  useQuery(GET_DISCIPLINES, {
    onCompleted: data => {
      setDisciplines(data.medical_diciplines);
    },
  });

  const commentsToDisplay = displayFilteredComments
    ? filteredComments
    : props.comments;

  return (
    <section className="section-review">
      <div className="container">
        <div className="review-layout">
          <div className="review-slidebar">
            <div className="portlet-review">
              <div className="review-heading">
                <h2 className="review-judge-title">Reviews</h2>
                <div className="judge-sum">
                  <p>{props.rating} out of 5 stars</p>
                </div>
              </div>
              <div className="judge-category">
                {Object.values(props.stars).map((value, index) => (
                  <div className="judge-item">
                    <StarContainer className="judge-num-star">
                      <span className="judge-num">{index + 1}</span>
                      <img
                        alt=""
                        onClick={() => {
                          setActiveStar(index + 1);
                          handleSetActiveFilter('rating', index + 1);
                        }}
                        width={20}
                        src={
                          activeStar === index + 1
                            ? YellowActiveStar
                            : YellowStar
                        }
                      />
                      &nbsp;
                    </StarContainer>
                    <ProgressBarContainer className="judge-progress">
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          aria-valuenow={index + 1}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{
                            width: `${Number(
                              (value / props.reviewsCount
                                ? value / props.reviewsCount
                                : 0) * 100,
                            ).toFixed(1)}%`,
                          }}
                        />
                      </div>
                    </ProgressBarContainer>
                    <div className="judge-percent">
                      <span>
                        {Number(
                          (value / props.reviewsCount
                            ? value / props.reviewsCount
                            : 0) * 100,
                        ).toFixed()}
                        %
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="portlet-filter">
              <h3 className="mention-title">Filter by exam</h3>
              <div className="select-box">
                <select
                  className="form-control"
                  onChange={({ target: { value } }) =>
                    handleSetActiveFilter('usedInTests', value)
                  }
                >
                  <option value={''}>Select</option>
                  {exams.map(exam => (
                    <option key={exam.value} value={exam.value}>
                      {exam.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="portlet-filter">
              <h3 className="mention-title">Filter by discipline</h3>
              <div className="select-box">
                <Dropdown
                  placeholder="Select Location"
                  fluid
                  search
                  selection
                  onChange={(_, { value }) => {
                    console.log({ value });
                    handleSetActiveFilter('specialties', value);
                  }}
                  options={disciplines.map(discipline => ({
                    value: discipline.dicipline_name,
                    key: discipline.dicipline_name,
                    text: discipline.dicipline_name,
                  }))}
                />
                {/* <select className="form-control">
                  <option value={0}>Select</option>
                  {disciplines.map(discipline => (
                    <option value={1}>{discipline.dicipline_name}</option>
                  ))}
                </select> */}
              </div>
            </div>
            <div className="portlet-filter">
              <Button onClick={handleClearFilters} style={{ marginRight: 20 }}>
                Clear Filters
              </Button>
              <Button onClick={handleFilter} style={{ marginBottom: 20 }}>
                Filter
              </Button>
            </div>
          </div>
          <div className="review-main">
            <div className="review-content">
              <div className="portlet-message">
                {commentsToDisplay.length ? (
                  commentsToDisplay.map(rev => (
                    <Review
                      markReviewAsHelpful={props.markReviewAsHelpful}
                      handleReply={props.handleReply}
                      {...rev}
                    />
                  ))
                ) : (
                  <NoItemsContainer>
                    {displayFilteredComments
                      ? 'No Results'
                      : 'Be the first to review this resource'}
                    {!displayFilteredComments && (
                      <Button
                        style={{ marginTop: 30 }}
                        onClick={() => props.handleCreateReview()}
                      >
                        Write a Review
                      </Button>
                    )}
                  </NoItemsContainer>
                )}
              </div>
              <div className="load-more">
                {!!commentsToDisplay.length && !displayFilteredComments && (
                  <Button onClick={() => props.loadMore()}>
                    Load More Reviews
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
