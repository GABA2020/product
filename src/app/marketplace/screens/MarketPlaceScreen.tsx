import React from 'react';
import { Segment } from 'semantic-ui-react';
import styled from 'styled-components';

import MarketPlaceHeader from '../components/MarketPlaceHeader'
import MarketPlaceSearch from '../components/MarketPlaceSearch'
import MarketPlaceFeatured from '../components/MarketPlaceFeatured/'

const MarketPlaceContainer = styled(Segment.Group)`
  margin: 0 !important;
  border: none;
`

const MarketPlaceScreen = () => (
  <MarketPlaceContainer>
    <MarketPlaceHeader />
    <MarketPlaceSearch />
    <MarketPlaceFeatured />
  </MarketPlaceContainer>
)

export default MarketPlaceScreen