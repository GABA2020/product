import React from 'react';
import styled from 'styled-components';
import ContentLoader from 'react-content-loader';

import Stars from '../../../genericComponents/Stars';
import {Resource} from '../../../../types/Resource';
import { NavLink } from 'react-router-dom';
import {Column} from '../../../genericComponents/Layout';
import Button from '../../../genericComponents/Button';
import theme from '../../../../theme';

const Bitmap = require('../../../../assets/images/sprites/Bitmap.png');

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
  position: relative;
`;

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
  margin: 20px 20px 10px -5px;
`

const Footer = styled(Column)``

const Reviews = styled.div`
  margin-left: 20px;
  margin-top: 10px;
`

const TagsSection = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 50px;
  flex-wrap: wrap;
  max-width: 400px;
  min-width: 400px;
`

const Tag = styled.div`
  background: ${props => props.theme.color.softPurple};
  border-radius: 6px;
  padding: 6px 10px;
  height: 30px;
  margin-right: 10px;
  margin-bottom: 5px;
`

const Image = styled.img`
  position: absolute;
  right: -350px;
  top: 10px;
`

const CustomLink = styled(NavLink)`
  color: ${props => props.theme.color.darkBlue};
`

const Range = styled.p`
  color: ${props => props.theme.color.darkBlue};
  font-size: 16px;
  height: 72px;
  letter-spacing: 0.1px;
`

const AddToLocker: any = styled.div`
  position: absolute;
  right: 15px;
  top: 15px;
`

interface FeaturedItemProps {
  item: Resource,
  onLockerButtonPress: Function
}

const FeaturedItem = (props: FeaturedItemProps) => {
  const { item, onLockerButtonPress } = props;
  return (
    <ItemContainer>
      <AddToLocker 
        onClick={() => {}} 
        backgroundColor={theme.color.darkBlue} 
        color={theme.color.white}
      >
        <ContentLoader style={{position: 'absolute', left: -150}}>
          <rect rx="3" ry="3" width="150" height="25" /> 
        </ContentLoader>
      </AddToLocker>
      <DetailsSection>
        <ContentLoader style={{position: 'absolute', left: 20}}>
          <rect rx="3" ry="3" width="150" height="25" /> 
        </ContentLoader>
        <ContentLoader>
          <rect rx="3" ry="3" width="150" height="25" /> 
        </ContentLoader>
        <Footer>
          <ReviewsFooter>
            <ContentLoader style={{position: 'absolute', left: 0, top: 50}}>
              <rect rx="3" ry="3" width="150" height="25" /> 
            </ContentLoader>
          </ReviewsFooter>
          <ContentLoader style={{position: 'absolute', left: 0}}>
            <rect rx="3" ry="3" width="150" height="25" /> 
          </ContentLoader>
        </Footer>
      </DetailsSection>
      <TagsSection>
        <ContentLoader style={{position: 'absolute', right: -200}}>
          <rect rx="3" ry="3" width="60" height="25" /> 
        </ContentLoader>
      </TagsSection>
      <ContentLoader style={{position: 'absolute', right: -350}}>
        <rect rx="3" ry="3" width="200" height="300" /> 
      </ContentLoader>
    </ItemContainer>
)}

export default FeaturedItem;