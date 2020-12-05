import React, { useState, useEffect, useContext } from 'react';
import { Button } from '../../genericComponents'
import styled from 'styled-components';

const ContentContainer = styled.div`
  width: 100%;
  margin-bottom: 30px;
  border:1px solid blue
`;
const Title = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  font-weight: bold;
  font-size: 150%;
`;

const CardContainer = styled.div`
  padding: 30px;
  position: relative;
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

export default function PaymentMethodComponent() {
    const [selectedOption, setSelectedOption] = useState('')
    const handlerButton = (e) => {
        console.log(e)
    }

    return (
        <div>
            <Title>Summary</Title>
            <ContentContainer>

                <CardContainer>
                    <h2>Bronze</h2>
                    <p><PriceContainer>$15</PriceContainer><label>&nbsp;/month *</label></p>
                    <p>* Billed Annually at $180 / year </p>
                </CardContainer>
                <div style={{ padding: '5px' }}>
                </div>
                <CardContainer>
                    <p>Bronze Membership</p>
                    <ul>
                        <CheckListContainer>Pre-Eras Profile</CheckListContainer>
                        <CheckListContainer>Student Messenger</CheckListContainer>
                        <CheckListContainer>Learning Assessments</CheckListContainer>
                        <CheckListContainer>Resource Marketplace</CheckListContainer>
                        <li>School Reviews</li>
                        <li>Applicant Database</li>
                    </ul>
                </CardContainer>
                <div>
                    <Button onClick={handlerButton} value={'checkout'} >Complete Order</Button>
                </div>
            </ContentContainer>
        </div>
    );
}
