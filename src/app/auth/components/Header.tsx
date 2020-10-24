import React from 'react'
import { Grid, Image } from 'semantic-ui-react'
import styled from 'styled-components';
import headerBackground from '../../assets/images/headerBackground.png'

export function Header () {
  return (
    <HeaderContainer>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <Image src={require('../../assets/images/logo.png')} style={{width:50}} centered/>
          </Grid.Column>
          <Grid.Column width={10}  textAlign={'center'}>
          </Grid.Column>
          <Grid.Column width={3}/>
        </Grid.Row>
        <Grid.Row centered>
          <HeaderTitle>Join or Sign In</HeaderTitle>
        </Grid.Row>

      </Grid>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  width: 100%;
  padding-top: 16px;
  padding-bottom: 64px;
  background-image: url(${headerBackground}) ;
  background-position-x: -50px;
  background-color: #337859;
`;
const HeaderTitle = styled.h2`
  color: #fff
`;