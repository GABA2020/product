import React from 'react';
import styled from 'styled-components';

import Resource from './Resource'

const resources = [{
  title: 'Some kickass title',
  matchPercentage: 93,
  reviews: 1234,
  numberOfStars: 2,
  id: '1234'
},{
  title: 'Some kickass title',
  matchPercentage: 93,
  reviews: 1234,
  numberOfStars: 2,
  id: '1234'
},{
  title: 'Some kickass title',
  matchPercentage: 93,
  reviews: 1234,
  numberOfStars: 2,
  id: '1234'
},]

const MoreRecommendationsLink = styled.a`
  color: ${props => props.theme.color.darkBlue};
`

const ResourcesSection = () => (
  <section className="section-locker">
    <div className="container">
      <div className="locker-front">
        <div className="locker-left">
          <div className="main-title">
            <h2>Recommended Resources</h2>
          </div>
        </div>
        <div className="locker-right">
          <div className="visual-learner">
            <MoreRecommendationsLink href="#" className="btn-recommendations">
              More Recommendations
            </MoreRecommendationsLink>
          </div>
        </div>
      </div>
      <div className="locker-panel">
        <div className="locker-category">
          <ul className="locker-list">
            {resources.map(rsrc => (
              <Resource key={rsrc.id} {...rsrc}/>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default ResourcesSection;