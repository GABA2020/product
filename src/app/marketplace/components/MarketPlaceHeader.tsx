import React from 'react';
import { Grid } from 'semantic-ui-react'
import styled from 'styled-components';
const Background = require('../../../assets/images/sprites/MarketplaceShapes.png');
const Osmosis = require('../../../assets/images/sprites/Osmosis.png');

const HeaderTitle = styled.h3`
  color: ${props => props.theme.color.darkBlue};
  font-size: 52px;
  font-weight: bold;
  letter-spacing: -1px;
  line-height: 60px;
  width: 520px;
`

const HeaderParagraph = styled.p`
  color: ${props => props.theme.color.darkBlue};
  font-size: 18px;
  height: 85px;
  letter-spacing: 0px;
  line-height: 28px;
  width: 520px;
  margin-top: 30px;
`

const Rectangle = styled.div`
  height: 300px;
  width: 495px;
  background: url(${Background});
  background-size: cover;
  margin-top: -20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const HeaderContainer = styled.div`
  padding: 120px 0 120px 0;
  display: flex;
  flex-direction: column;
  padding-left: 175px;
`

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: center;
  ${props => props.theme.rules.narrowWidth}
`

const MarketPlaceHeader = () => (
  <HeaderContainer>
    <ContentContainer>
      <Grid.Column>
        <HeaderTitle>Welcome to GABA's Marketplace</HeaderTitle>
        <HeaderParagraph>Probably put something here about the vast library of educational resources by corps and students. Also something else about the learning portal and recommendations.</HeaderParagraph>
      </Grid.Column>
      <Grid.Column>
        <Rectangle>
          <img src={Osmosis}/>
        </Rectangle>
      </Grid.Column>
    </ContentContainer>
  </HeaderContainer>
)

export default MarketPlaceHeader;