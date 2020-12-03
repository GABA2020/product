import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../genericComponents';
import { Grid } from 'semantic-ui-react';
import ModalVideo from 'react-modal-video';

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
  .modal-video-body {
    margin-top: -300px;
  }

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
  width: 800px;
`;

//codesandbox.io/s/react-iframe-demo-g3vst codePen =
function Iframe(props) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : '' }}
    />
  );
}

const AplicantDatabase = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div>
      <HeaderContainer>
        <ContentContainer>
          <Grid.Column>
            <Title>
              <h3>Applicant Database</h3>
              <p>
                {' '}
                Whether its to keep a competitive edge or to stay on track, we
                know how important it is to see what others in your field have
                accomplished. Our growing database contains over 5 years of data
                and +5000 data points from former applicants to help you
                strategize for success!
              </p>
            </Title>
            <ModalVideo
              channel="youtube"
              autoplay
              isOpen={isOpen}
              videoId="IeeZiIwz8xc"
              onClose={() => setOpen(false)}
            />
          </Grid.Column>
          <Grid.Column>
            <TutorialButton onClick={() => setOpen(true)}>
              Tutorial Video
            </TutorialButton>
          </Grid.Column>
        </ContentContainer>
      </HeaderContainer>
      <Iframe
        iframe={
          '<iframe class="airtable-embed" src="https://airtable.com/embed/shrKweFzBEkoWqzTp?backgroundColor=blue&viewControls=on" frameborder="0" onmousewheel="" width="100%" height="1400px" style="background: transparent; border: 1px solid #ccc;"></iframe>'
        }
        allow="autoplay"
      />
      ,
    </div>
  );
};

export default AplicantDatabase;
