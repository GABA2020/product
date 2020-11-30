import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Button from '../genericComponents/Button';
import { Grid } from 'semantic-ui-react';

const BlueHero = require('../../assets/images/sprites/blueHero.jpg');
const HeaderContainer = styled.div`
  padding: 0;
  display: flex;
  flex-direction: column;
  background: url('${BlueHero}');
  background-size: 100% 250px;
  background-repeat: repeat-x;
  background-color: white;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: center;
  width: 100%;
  height: 150px;
  color: white;

  ${props => props.theme.rules.narrowWidth}
`;

const TutorialButton = styled(Button)`
  background-color: #eeaa35;
  color: ${props => props.theme.color.goodNightColor};
  padding: 15px 14px 14px;
  border-radius: 6px;
  margin: 30px;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: 0.1px;
  text-align: center;
  color: $goodNightColor;
  min-width: 120px;
`;

const Title = styled.div`
  margin: 30px;
  width: 500px;
`;

//codesandbox.io/s/react-iframe-demo-g3vst codePen =
function Iframe(props) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : '' }}
    />
  );
}

const Schools = () => {
  return (
    <div>
      <HeaderContainer>
        <ContentContainer>
          <Grid.Column>
            <Title>
              <h3>School Reviews</h3>
              <p>
                {' '}
                Want to know the studentperspective of programs you are
                interested in? No problem! Our database contains student and
                resident reviews for +1000 programs in the US
              </p>
            </Title>
          </Grid.Column>
          <Grid.Column>
            <TutorialButton>Tutorial Video</TutorialButton>
          </Grid.Column>
        </ContentContainer>
      </HeaderContainer>
      <Iframe
        iframe={
          '<iframe class="airtable-embed" src="https://airtable.com/embed/shruwb1Qwbpcjt03g?backgroundColor=blue&viewControls=on" frameborder="0" onmousewheel="" width="100%" height="1400px" style="background: transparent; border: 1px solid #ccc;"></iframe>'
        }
        allow="autoplay"
      />
      ,
    </div>
  );
};

export default Schools;
