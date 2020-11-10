import React from 'react';
import styled from 'styled-components';
import ContentLoader from 'react-content-loader';

import {Column} from '../../../genericComponents/Layout';
import theme from '../../../../theme';

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

const ReviewsFooter = styled.div`
  display: flex;
  margin: 20px 20px 10px -5px;
`

const Footer = styled(Column)``

const TagsSection = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 50px;
  flex-wrap: wrap;
  max-width: 400px;
  min-width: 400px;
`

const AddToLocker: any = styled.div`
  position: absolute;
  right: 15px;
  top: 15px;
`

const FeaturedItemSkeleton = () => {
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

export default FeaturedItemSkeleton;

