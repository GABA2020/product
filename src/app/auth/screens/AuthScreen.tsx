import React, { useState } from 'react';
import { SignUp } from '../components/SignUp';
import { SignIn } from '../components/SignIn';
import { Container, Grid, Button, Tab } from 'semantic-ui-react';
import styled, { createGlobalStyle } from 'styled-components';
import { Footer } from '../../genericComponents';
import { Header } from '../components/Header';
import Helmet from 'react-helmet';


export function AuthScreen() {
  const [authFlow, setAuthFlow] = useState(0);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Auth</title>
      </Helmet>
      <GlobalStyle />
      <Header />
      <Grid centered>
        <Tab
          menu={{ secondary: true, pointing: true}}
          panes={[{ menuItem: 'Join GABA' }, { menuItem: 'Sign In' }]}
          onTabChange={(e,d) => setAuthFlow(Number(d.activeIndex))}
        />
      </Grid>
      <ContainerWrapper>
        {authFlow === 0 ? <SignUp /> : <SignIn />}
      </ContainerWrapper>
      <Footer />
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color:#f9f9f9;
  }
  input{
    background-color: #f9f9f9 !important;
    padding: 1em !important;
    font-size: 1.2em !important;
  }
  .row,.ui.grid{
    margin: 0 !important;
  }
  .ui.secondary.pointing.menu .item{
    border-color: #eeaa35 !important;
    font-size: 1.5em;
  }
  .ui.secondary.pointing.menu .active.item{
    border-bottom-width: 4px !important;
  }
`;
const ContainerWrapper = styled(Container)`
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.1),
    0px 1px 4px 0px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin-top: 16px;
  margin-bottom: 16px;
  padding: 20px 0px;
`;
