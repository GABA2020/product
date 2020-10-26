import React from 'react';
import styled from 'styled-components';

import Stars from '../../../genericComponents/Stars';
import {Resource} from '../../../../types/Resource';
import { NavLink } from 'react-router-dom';

const ItemContainer = styled.div`
  background: rgb(242, 248, 255);
  border-radius: 6px;
  border: 1px solid rgb(0, 101, 242);
  width: 100%;
  margin-bottom: 30px;
  display: flex;
  padding: 30px;
`;

const Rectangle = styled.div`
  border: 1px solid rgb(0, 101, 242);;
  height: 180px;
  width: 300px;
  margin-right: 61px;
`

const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
`

const DetailsTitle = styled.h3`
  color: rgb(0, 101, 242);
  font-size: 24px;
  font-weight: bold;
  height: 32px;
  letter-spacing: -0.1px;
  line-height: 32px;
  margin-bottom: 15px;
`

const DetailsContent = styled.p`
  color: rgb(0, 101, 242);
  font-size: 16px;
  height: 72px;
  letter-spacing: 0.1px;
  line-height: 24px;
  width: 310px;
`

const ReviewsFooter = styled.div`
  display: flex;
  margin-left: -5px;
  margin-top: 20px;
  margin-right: 20px;
`

const Reviews = styled.div`
  margin-left: 20px;
  margin-top: 10px;
`

const TagsSection = styled.div`
  display: flex;
  margin-top: 50px;
  margin-left: 50px;
  flex-wrap: wrap;
  max-width: 200px;
`

const Tag = styled.div`
  background: rgb(255, 255, 255);
  border-radius: 6px;
  padding: 6px 10px;
  height: 30px;
  margin-right: 10px;
`

interface FeaturedItemProps {
  item: Resource
}

const FeaturedItem = (props: FeaturedItemProps) => {
  const { item } = props;
  return (
    <ItemContainer>
      <Rectangle />
      <DetailsSection>
        <DetailsTitle><NavLink to="/product-page">{item.name}</NavLink></DetailsTitle>
        <DetailsContent>{item.description || 'No description'}</DetailsContent>
        <ReviewsFooter>
          <Stars numberOfStars={item.rating || 0}/>
          <Reviews>2,423 Reviews</Reviews>
        </ReviewsFooter>
      </DetailsSection>
      <TagsSection>
        <Tag>Pulmonology</Tag>
        <Tag>Video</Tag>
      </TagsSection>
    </ItemContainer>
)}

export default FeaturedItem;