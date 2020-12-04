import React from 'react';
import { Grid } from 'semantic-ui-react';
import styled from 'styled-components';
const Background = require('../../../assets/images/sprites/MarketplaceShapes.png');
const Osmosis = require('../../../assets/images/sprites/Osmosis.png');
const StarLeft = require('../../../assets/images/sprites/starLeft.svg');
const StarRight = require('../../../assets/images/sprites/starRight.svg');

const HeaderTitle = styled.h3`
  color: ${props => props.theme.color.darkBlue};
  font-size: 52px;
  font-weight: bold;
  letter-spacing: -1px;
  line-height: 60px;
  width: 520px;
  margin-top: -10px;
`;

const HeaderParagraph = styled.p`
  color: ${props => props.theme.color.darkBlue};
  font-size: 18px;
  height: 85px;
  letter-spacing: 0px;
  line-height: 28px;
  width: 520px;
  margin-top: 30px;
`;

const Rectangle = styled.div`
  height: 300px;
  width: 495px;
  background: url(${Background});
  background-size: cover;
  margin-top: -80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const StarL = styled.div`
  height: 50;
  width: 50;

  background-size: cover;
  margin-top: -100px;
  margin-bottom: -80px;
  margin-left: -100px;
  
  align-items: left;
  justify-content: center;
`;
const StarR = styled.div`
  height: 50;
  width: 50;
  background-size: cover;
  margin-top: -100px;
  margin-bottom: -60px;
  margin-left: 515px;
  
  justify-content: center;
`;

const HeaderContainer = styled.div`
  padding: 110px 0 70px 0;
  display: flex;
  flex-direction: column;
  padding-left: 175px;
  min-height: 600;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: center;
  min-height: 600;
  ${props => props.theme.rules.narrowWidth}
`;

const MarketPlaceHeader = () => (
  <HeaderContainer>
    <ContentContainer>
      <Grid.Column>
        <StarL>
          {' '}
          <img src={StarLeft} alt={""}/> 
        </StarL>
        <StarR>
          {' '}
           <img src={StarRight} alt={""} />
        </StarR>
       
        <HeaderTitle>Refer your friends for 50% off Osmosis</HeaderTitle>
       
        <HeaderParagraph>
          <p>Osmosis provides you with the right study techniques to help you
          retain, understand, and study more efficiently throughout med school.
          Excel in your classes, ace the USMLE®, and be better prepared for
          clinicals when you learn by Osmosis.</p>

          <p>In the chat on the bottom right corner, share the email of the person that referred you</p>
        </HeaderParagraph>
      </Grid.Column>
      <Grid.Column>
        <Rectangle>
          <img src={Osmosis} alt={""} />
        </Rectangle>
      </Grid.Column>
    </ContentContainer>
  </HeaderContainer>
);

export default MarketPlaceHeader;
