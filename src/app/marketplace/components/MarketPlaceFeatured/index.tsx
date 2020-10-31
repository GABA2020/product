import React from 'react';
import styled from 'styled-components';

import FeaturedItem from './FeaturedItem';
import {Resource} from '../../../../types/Resource';
const FilterByNameIcon = require('../../../../assets/images/sprites/FilterByName@2x.png');
const FilterByPriceIcon = require('../../../../assets/images/sprites/FilterByPrice@2x.png');

const FeaturedContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const ContentContainer = styled.div`
  padding: 85px 130px;
  display: flex;
  flex-direction: column;
  align-self: center;
  margin-left: -35px;
  ${props => props.theme.rules.narrowWidth}
`;

const FeaturedHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 62px;
`;

const Title = styled.h1`
  color: ${props => props.theme.color.darkBlue};
  font-size: 40px;
  font-weight: bold;
  height: 50px;
  letter-spacing: -0.5px;
  line-height: 48px;
`;

const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  border-bottom: 1px solid ${props => props.theme.color.gabaYellow};
  padding-right: 5px;
  align-items: flex-end;
  height: 30px;
  justify-content: space-between;
`;

const Tab = styled("div")<{ active?: Boolean }>`
  height: 30px;
  width: 80px;
  text-align: center;
  border-bottom: ${props => props.active ? `2px solid ${props.theme.color.gabaYellow}` : '0'};
`;

const FiltersContainer = styled.div`
  display: flex;
`

const FilterImage = styled.img`
  margin-left: 10px;
  height: 40px;
`

interface MarketPlaceSearchProps {
  resources: Array<Resource>
}

const MarketPlaceSearch = (props: MarketPlaceSearchProps) => {
  const { resources } = props;
  return (
  <FeaturedContainer>
    <ContentContainer>
      <FeaturedHeader>
        <Title>Featured</Title>
        <Tabs>
          <Tab active={true}>Resouces</Tab>
          <Tab>Schools</Tab>
          <Tab>Equipment</Tab>
        </Tabs>
        <FiltersContainer>
          <FilterImage src={FilterByNameIcon}/>
          <FilterImage src={FilterByPriceIcon}/>
        </FiltersContainer>
      </FeaturedHeader>
      <>
        {resources.slice(0, 5).map((item, index) => <FeaturedItem item={item} key={index}/>)}
      </>
    </ContentContainer>
  </FeaturedContainer>
)}

export default MarketPlaceSearch;