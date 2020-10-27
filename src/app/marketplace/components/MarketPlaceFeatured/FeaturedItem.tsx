import React from 'react';
import styled from 'styled-components';

import Stars from '../../../genericComponents/Stars';
import {Resource} from '../../../../types/Resource';
const Bitmap = require('../../../../assets/images/sprites/Bitmap.png')

const ItemContainer = styled.div`
  background: ${props => props.theme.color.softYellow};
  border-radius: 6px;
  max-width: 70%;
  margin-bottom: 30px;
  display: flex;
  padding: 30px;
  position: relative;
  max-height: 220px;
`;

const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
`

const DetailsTitle = styled.h3`
  color: ${props => props.theme.color.darkBlue};
  font-size: 24px;
  font-weight: bold;
  height: 32px;
  letter-spacing: -0.1px;
  line-height: 32px;
  margin-bottom: 15px;
`

const DetailsContent = styled.p`
  color: ${props => props.theme.color.darkBlue};
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
  max-width: 400px;
`

const Tag = styled.div`
  background: ${props => props.theme.color.softPurple};
  border-radius: 6px;
  padding: 6px 10px;
  height: 30px;
  margin-right: 10px;
`

const Image = styled.img`
  position: absolute;
  right: -350px;
  top: 10px;
`

interface FeaturedItemProps {
  item: Resource
}

const FeaturedItem = (props: FeaturedItemProps) => {
  const { item } = props;
  return (
    <ItemContainer>
      <DetailsSection>
        <DetailsTitle>{item.name}</DetailsTitle>
        <DetailsContent>{item.description || ' Testing updating list on create Testing updating list on create Testing updating list on create Testing updating list on create'}</DetailsContent>
        <ReviewsFooter>
          <Stars color="yellow" numberOfStars={item.rating || 0}/>
          <Reviews>2,423 Reviews</Reviews>
        </ReviewsFooter>
      </DetailsSection>
      <TagsSection>
        <Tag>Pulmonology</Tag>
        <Tag>Video</Tag>
        <Tag>Video</Tag>
        <Tag>Video</Tag>
        <Tag>Video</Tag>
        <Tag>Video</Tag>

      </TagsSection>
      <Image src={Bitmap}/>
    </ItemContainer>
)}

export default FeaturedItem;