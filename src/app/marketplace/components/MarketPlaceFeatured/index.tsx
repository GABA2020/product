import React from 'react';
import { Grid, Input, Button } from 'semantic-ui-react'
import styled from 'styled-components';

import FeaturedItem from './FeaturedItem';

const FeaturedContainer = styled.div`
  padding: 85px 165px;
  display: flex;
  flex-direction: column;
`;

const FeaturedHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 62px;
`;

const Title = styled.h1`
  color: rgb(0, 101, 242);
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
`;

const Tab = styled.div`
  border-bottom: 2px solid rgb(0, 101, 242);
  margin-right: 20px;
  height: 30px;
  width: 80px;
  text-align: center;
`;

const FiltersContainer = styled.div`
  display: flex;
`

const Square = styled.div`
  background: rgba(0, 101, 242, 0.11);
  border-radius: 6px;
  height: 40px;
  width: 40px;
  margin-left: 10px;
`
const ITEMS = [{
  title: 'Item title',
  comment: 'Content in over a dozen subjects including cardiology, renal, pulmonary, biostatistics, biochemistry, and more.',
  tags: ['Cardiology', 'Biochemistry', 'Pulmonary', 'Renail', 'Videos'],
  reviews: 1234,
  numberOfStars: 4
},
{
  title: 'Item title',
  comment: 'Content in over a dozen subjects including cardiology, renal, pulmonary, biostatistics, biochemistry, and more.',
  tags: ['Cardiology', 'Biochemistry', 'Pulmonary', 'Renail', 'Videos'],
  reviews: 1234,
  numberOfStars: 4
},
{
  title: 'Item title',
  comment: 'Content in over a dozen subjects including cardiology, renal, pulmonary, biostatistics, biochemistry, and more.',
  tags: ['Cardiology', 'Biochemistry', 'Pulmonary', 'Renail', 'Videos'],
  reviews: 1234,
  numberOfStars: 4
},
{
  title: 'Item title',
  comment: 'Content in over a dozen subjects including cardiology, renal, pulmonary, biostatistics, biochemistry, and more.',
  tags: ['Cardiology', 'Biochemistry', 'Pulmonary', 'Renail', 'Videos'],
  reviews: 1234,
  numberOfStars: 4
},
{
  title: 'Item title',
  comment: 'Content in over a dozen subjects including cardiology, renal, pulmonary, biostatistics, biochemistry, and more.',
  tags: ['Cardiology', 'Biochemistry', 'Pulmonary', 'Renail', 'Videos'],
  reviews: 1234,
  numberOfStars: 4
}]

const MarketPlaceSearch = () => (
  <FeaturedContainer>
    <FeaturedHeader>
      <Title>Featured</Title>
      <Tabs>
        <Tab>Resouces</Tab>
        <Tab>Resouces</Tab>
        <Tab>Resouces</Tab>
      </Tabs>
      <FiltersContainer>
        <Square />
        <Square />
      </FiltersContainer>
    </FeaturedHeader>
    <>
      {ITEMS.map((item, index) => <FeaturedItem key={index}/>)}
    </>
  </FeaturedContainer>
)

export default MarketPlaceSearch;