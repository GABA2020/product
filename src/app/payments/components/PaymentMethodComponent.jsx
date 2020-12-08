import styled from 'styled-components';
import React, { useState, useEffect, useContext } from 'react';
import { RadioButton, Button } from '../../genericComponents'
import CheckoutForm from './CheckoutForm'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG');
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
  border:1px solid blue;
  border-radius: 15px;
`;

const PaymentMethodContainer = styled.div`
  border-bottom: 1px solid blue;
  color: blue;
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
  position: relative;
`;

export default function PaymentMethodComponent({
    cancelPaymentClickHandler,
    payButtonClickHandler }) {
    const [selectedOption, setSelectedOption] = useState('')
    const [showCheckout, setShowCheckout] = useState(false)
    const handlerRadioChange = (e) => {
        setSelectedOption(e.target.value)
        setShowCheckout(true)
    }

    const payClickHandler = ({ target }) => {
        payButtonClickHandler(target.value)
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
                                style={{ width: '50%' }} 
                                onClick={payClickHandler}>
                                    Pay with  <img src={paypalIcon} width="70" alt="" />
                            </Button>) : (<div></div>)}
                    </ButtonCard>
                </PaymentMethodContainer>
                <PaymentMethodContainer>
                    <div style={{ width: "50%" }}>
                        <RadioButton
                            label={'Stripe'}
                            value={'stripe'}
                            checked={selectedOption == 'stripe'}
                            onChange={handlerRadioChange} />
                    </div>
                    <ImageContainer>
                        <img src={stripeIcon} width="80" alt="" />
                    </ImageContainer>
                    <ButtonCard>
                        {(selectedOption == 'stripe') ?
                            (<Button value={'stripe'} 
                                style={{ width: '50%' }} 
                                onClick={payClickHandler}>
                                    Pay with  <img src={stripeIcon} width="50" alt="" />
                            </Button>) : (<div></div>)}
                    </ButtonCard>
                </PaymentMethodContainer>
                <PaymentMethodContainer>
                    <RadioButton
                        label={'Credit Card'}
                        value={'cc'}
                        checked={selectedOption == 'cc'}
                        onChange={handlerRadioChange} />
                </PaymentMethodContainer>
                <CardContainer>
                    GABA filters out the noise and gives our members
                    back the most precious resource in a medical
                    student's arsenal: Time
            </CardContainer>
                <CardContainer>
                    <Button onClick={cancelClickHandler}>Back</Button>
                </CardContainer>

                <Elements stripe={stripePromise} >
                    <CheckoutForm isVisible={showCheckout} stripePromise={stripePromise} />
                </Elements>
            </ContentContainer >
        </Container>
    );
}
