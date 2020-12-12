import React, { useState, useEffect, useContext } from 'react';
import { Button } from '../../genericComponents'
import styled from 'styled-components';


const Container = styled.div`
  width: 100%;
  padding-right:50px;
`;
const ContentContainer = styled.div`
  width: 100%;
  margin-bottom: 30px;
  border:1px solid #0065f2;
  border-radius: 15px;
`;
const Title = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  font-weight: bold;
  font-size: 150%;
`;

const CardContainer = styled.div`
  padding: 15px;
`;

const ButtonContainer = styled.div`
  text-align: center;
  padding:20px;
`;
const PriceContainer = styled.label`
  padding: 5px;
  font-size:xx-large
`;

const CheckListContainer = styled.li`
  content:'\2713';
  display:inline-block;
  padding:0 6px 0 0;
  listStyleType: none; 
`;

export default function SubscriptionComponent({ membership }) {
  const [selectedOption, setSelectedOption] = useState('')
  const handlerButton = (e) => {
    console.log(e)
  }

  return (
    <Container>
      <Title>Summary</Title>
      <ContentContainer>
        <CardContainer>
          <h2>{membership.name}&nbsp;Membership</h2>
          <p><PriceContainer>${Math.floor(membership.annualPrice / 12)}</PriceContainer><label>&nbsp;/month *</label></p>
          <p>* Billed Annually at ${membership.annualPrice} / year </p>
        </CardContainer>
        <CardContainer>
          <p style={{ fontWeight: "bold" }}>{membership.name} Membership</p>
          <ul>
            <CheckListContainer>Pre-Eras Profile</CheckListContainer>
            <CheckListContainer>Student Messenger</CheckListContainer>
            <CheckListContainer>Learning Assessments</CheckListContainer>
            <CheckListContainer>Resource Marketplace</CheckListContainer>
            <CheckListContainer>School Reviews</CheckListContainer>
            <CheckListContainer>Applicant Database</CheckListContainer  >
          </ul>
        </CardContainer>
        <ButtonContainer>
          <Button onClick={handlerButton} value={'checkout'} >Complete Order</Button>
        </ButtonContainer>

      </ContentContainer>
    </Container >
  );
}
