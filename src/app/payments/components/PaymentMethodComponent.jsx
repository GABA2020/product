import styled from 'styled-components';
import React, { useState, useEffect, useContext } from 'react';
import { RadioButton, Button } from '../../genericComponents'
import CheckoutForm from './CheckoutForm'
const paypalIcon = require('../../../assets/images/sprites/PayPal-logo.png')
const stripeIcon = require('../../../assets/images/sprites/Stripe_Logo.svg')

const Container = styled.div`
  width: 100%;
  padding-left:50px;
  padding-right:50px;
`;

const ContentContainer = styled.div`
  width: 100%;
  margin-bottom: 30px;
  border:1px solid #0065f2;
  border-radius: 15px;
`;

const PaymentMethodContainer = styled.div`
  border-bottom: 1px solid #0065f2;
  color: #0065f2;
  padding: 10px;
  display:flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content:space-between
  
`;

const ImageContainer = styled.div`
  display:flex;
  justify-content:flex-end;
  width: 50%;
  
`;
const Title = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  font-weight: bold;
  font-size: 150%;
  
`;

const ButtonCard = styled.div`
    flex-basis: 100%;
    text-align:center;
    margin-top:5px;
`;

const CardContainer = styled.div`
  padding: 30px;
`;

const ButtonContainer = styled.div`
    width:40%;
  padding: 30px;
`;

export default function PaymentMethodComponent({
    cancelPaymentClickHandler,
    selectedMembership }) {
    const [showCheckout, setShowCheckout] = useState(false)
    const [selectedOption, setSelectedOption] = useState('')
    const handlerRadioChange = (e) => {
        setSelectedOption(e.target.value)
        setShowCheckout(true)
    }
    const cancelClickHandler = (e) => {
        cancelPaymentClickHandler(e)
    }
    return (
        <Container>
            <Title>Payment Method</Title>
            <ContentContainer>
                <PaymentMethodContainer>
                    <div style={{ width: "50%" }}>
                        <RadioButton
                            label={'PayPal'}
                            value={'paypal'}
                            checked={selectedOption == 'paypal'}
                            onChange={handlerRadioChange} />
                    </div>
                    <ImageContainer >
                        <img src={paypalIcon} width="140" alt="" />
                    </ImageContainer>
                    <ButtonCard>
                        {(selectedOption == 'paypal') ?
                            (<Button value={'paypal'}
                                style={{ width: '50%' }} >
                                Pay with  <img src={paypalIcon} width="70" alt="" />
                            </Button>) : (<div></div>)}
                    </ButtonCard>
                </PaymentMethodContainer>
                <PaymentMethodContainer>
                    <div style={{ width: "50%" }}>
                        <RadioButton
                            label={'Credit or Debit Card'}
                            value={'cc'}
                            checked={selectedOption == 'cc'}
                            onChange={handlerRadioChange} />
                    </div>
                    <ImageContainer>
                        <img src={stripeIcon} width="80" alt="" />
                    </ImageContainer>
                </PaymentMethodContainer>
                <CheckoutForm 
                membership={selectedMembership} 
                setShowCheckout={setShowCheckout} 
                showCheckout={showCheckout} 
                cancelHandler={cancelClickHandler}/>
            </ContentContainer >
        </Container>
    );
}
