import React from 'react';
import styled from 'styled-components';

import FeaturedItem from './FeaturedItem';
import { Resource } from '../../../../types/Resource';
import FeaturedItemSkeleton from './FeaturedItemSkeleton';
import { Button } from 'app/genericComponents';
import { NavLink } from 'react-router-dom';

const FilterByNameIcon = require('../../../../assets/images/sprites/FilterByName@2x.png');
const FilterByPriceIcon = require('../../../../assets/images/sprites/FilterByPrice@2x.png');

const FeaturedContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  padding: 85px 130px 20px 130px;
  display: flex;
  flex-direction: column;
  align-self: center;
  margin-left: -35px;
  min-width: 950px;
  ${props => props.theme.rules.narrowWidth}
`;

const FeaturedHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 62px;
  min-width: 950px;
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

const Tab = styled('div') <{ active?: Boolean }>`
  height: 30px;
  width: 80px;
  text-align: center;
  border-bottom: ${props =>
    props.active ? `2px solid ${props.theme.color.gabaYellow}` : '0'};
`;

const FiltersContainer = styled.div`
  display: flex;
`;

const FilterImage: any = styled.img`
  margin-left: 10px;
  height: 40px;
`;

const LoadMoreButton = styled(Button)`
  align-self: center;
  margin-bottom: 30px;
`;

interface MarketPlaceFeaturedProps {
  resources?: Array<Resource>;
  onLockerButtonPress: Function;
  loading: boolean;
  handleLoadMore: Function;
  handleFilterResourcesByPrice: Function;
  handleFilterResourcesByName: Function;
}

const MarketPlaceFeatured = ({
  resources = [],
  onLockerButtonPress,
  loading,
  handleLoadMore,
  handleFilterResourcesByPrice,
  handleFilterResourcesByName,
}: MarketPlaceFeaturedProps) => {
  return (
    <FeaturedContainer>
      <ContentContainer>
        <FeaturedHeader>
          <Title>Featured</Title>
          <Tabs>
            <Tab active={true}>Resouces</Tab>
            <Tab>
              <NavLink
                to={'/schools'}
              >
                {' '}
                Schools{' '}
              </NavLink>
            </Tab>
          </Tabs>
          <FiltersContainer>
            <FilterImage
              src={FilterByNameIcon}
              onClick={() => {
                handleFilterResourcesByName();
              }}
            />
            <FilterImage
              src={FilterByPriceIcon}
              onClick={() => {
                handleFilterResourcesByPrice();
              }}
            />
          </FiltersContainer>
        </FeaturedHeader>
        <>
          {loading
            ? Array.from({ length: 4 }).map((element,index) => <FeaturedItemSkeleton key={index}/>)
            : resources.map((item, index) => (
              <FeaturedItem
                item={item}
                key={index}
                onLockerButtonPress={onLockerButtonPress}
              />
            ))}
        </>
      </ContentContainer>
      {!loading && (
        <LoadMoreButton onClick={() => handleLoadMore()}>
          Load More Resources
        </LoadMoreButton>
      )}
    </FeaturedContainer>
  );
};

export default MarketPlaceFeatured;
