import React, { useState, useEffect } from 'react';
import { Segment } from 'semantic-ui-react';
import styled from 'styled-components';

import MarketPlaceHeader from '../components/MarketPlaceHeader';
import MarketPlaceSearch from '../components/MarketPlaceSearch';
import MarketPlaceFeatured from '../components/MarketPlaceFeatured/';
import { RESOURCES } from '../../../service/queries';
import { useQuery } from '@apollo/client';

const MarketPlaceContainer = styled(Segment.Group)`
  margin: 0 !important;
  border: none;
`;

const MarketPlaceScreen = () => {
  const [searchField, setSearchField] = useState('');
  const {data, loading} = useQuery(RESOURCES, {
    variables: { limit: 5 }
  })
  const [filteredData, setFilteredData] = useState([]);

  if (loading) return null;

  const handleSearch = () => {    
    setFilteredData(
      data.resources.filter(
        resource =>  (
          resource.name.toLowerCase().search(searchField.toLowerCase()) !== -1 ||
          resource.description && resource.description.toLowerCase().search(searchField.toLowerCase()) !== -1
        )
      )
    )
  };

  const handleFilterByCategory = categoryId => {
    setFilteredData(
      data.resources.filter(
        resource => resource.categories && resource.categories.includes(categoryId)
      )
    )
  }
  
  return (
  <MarketPlaceContainer>
    <MarketPlaceHeader />
    <MarketPlaceSearch
      searchField={searchField}
      setSearchField={setSearchField}
      handleSearch={handleSearch}
      handleFilterByCategory={handleFilterByCategory}
    />
    <MarketPlaceFeatured resources={filteredData.length ? filteredData : data.resources}/>
  </MarketPlaceContainer>
)};

export default MarketPlaceScreen;