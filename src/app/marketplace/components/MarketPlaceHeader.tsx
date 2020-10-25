import React from 'react';
import { Segment, Grid } from 'semantic-ui-react'
import styled from 'styled-components';

const HeaderTitle = styled.h3`
  color: rgb(0, 101, 242);
  font-size: 52px;
  font-weight: bold;
  letter-spacing: -1px;
  line-height: 60px;
  width: 520px;
`

const HeaderParagraph = styled.p`
  color: rgb(0, 101, 242);
  font-size: 18px;
  height: 85px;
  letter-spacing: 0px;
  line-height: 28px;
  width: 520px;
  margin-top: 30px;
`

const Rectangle = styled.div`
  height: 326px;
  width: 495px;
  background: rgb(242, 248, 255);
  margin-right: 50px;
  margin-top: -20px;
`

const HeaderContainer = styled(Grid.Row)`
  padding: 120px 0 120px 165px !important;
`

const MarketPlaceHeader = () => (
  <Grid>
    <HeaderContainer columns={2}>
      <Grid.Column>
        <HeaderTitle>Welcome to GABA's Marketplace</HeaderTitle>
        <HeaderParagraph>Probably put something here about the vast library of educational resources by corps and students. Also something else about the learning portal and recommendations.</HeaderParagraph>
      </Grid.Column>
      <Grid.Column>
        <Rectangle />
      </Grid.Column>
    </HeaderContainer>
  </Grid>
)

export default MarketPlaceHeader;