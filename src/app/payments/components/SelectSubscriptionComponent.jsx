import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import {
  Container as GenericContainer,
  Column,
} from '../../genericComponents/Layout';
import { Grid } from 'semantic-ui-react';

import { Button } from 'app/genericComponents';

const ContentContainer = styled.div`
  display: flex;
  justify-content:space-between;
  width: 100%;
  padding-left:50px;
  padding-right:50px;
  color: white;
  .modal-video-body {
    margin-top: -300px;
  }
  margin-bottom: 30px;
`;

const Title = styled.div`
  margin: 30px;
  width: 500px;
`;

const CardsContainer = styled(Column)`
  align-items: center;
  margin-left: 30px;
  width: 60%;
`;
const LoadMoreButton = styled(Button)`
  align-self: center;
  margin-bottom: 30px;
`;
const CardContainer = styled.div`
  background: ${props => props.theme.color.white};
  color: #0065f2;
  display: flex;
  margin: 30px;
  padding: 10px;
  position: relative;
  width: 40%;
`;

const PaymentCardContainer = styled.div`
  background: ${props => props.theme.color.white};
  color: #0065f2;
  display: flex;
  margin: 30px;
  padding: 10px;
  position: relative;
  width: 60%;
`;


export default function SelectSubscriptionComponent({ selectMembershipHandler }) {

  const selectHandler = ({ target }) => {
    selectMembershipHandler(target.value)
  }
  return (
    <ContentContainer>
      <CardContainer>
        <button onClick={selectHandler} value="Free">
          Free Plan
          </button>
      </CardContainer>
      <CardContainer>
        <button onClick={selectHandler} value="GABABronze">
          Bronze Plan
        </button>
      </CardContainer>
      <CardContainer>
        <button onClick={selectHandler} value="GABASilver">
          Silver Plan
        </button>
      </CardContainer>      
      <CardContainer>
        <button onClick={selectHandler} value="PreMed">
          PreMed Plan
        </button>
      </CardContainer>
    </ContentContainer>
  );
};


