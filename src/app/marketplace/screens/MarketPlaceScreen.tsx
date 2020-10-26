import React from 'react';
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
  const {data, loading} = useQuery(RESOURCES, {
    variables: { limit: 5 }
  });

  if (loading) return null;
  
  return (
  <MarketPlaceContainer>
    <MarketPlaceHeader />
    <MarketPlaceSearch />
    <MarketPlaceFeatured resources={data.resources}/>
  </MarketPlaceContainer>
)};

export default MarketPlaceScreen;