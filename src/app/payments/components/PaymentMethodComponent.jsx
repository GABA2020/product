import styled from 'styled-components';
import React, { useState, useEffect, useContext } from 'react';
import { RadioButton } from '../../genericComponents'
import CheckoutForm from './CheckoutForm'

const ContentContainer = styled.div`
  width: 100%;
  margin-bottom: 30px;
  border:1px solid blue
`;

const PaymentMethodContainer = styled.div`
  border-bottom: 1px solid blue;
  color: blue;
  padding: 10px;
  
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

export default function PaymentMethodComponent() {
    const [selectedOption, setSelectedOption] = useState('')
    const [showCheckout, setShowCheckout] = useState(false)
    const handlerRadioChange = (e) => {
        setSelectedOption(e.target.value)
        setShowCheckout(true)
    }
    return (
        <div>
            <Title>Payment Method</Title>
            <ContentContainer>
                <PaymentMethodContainer>
                    <RadioButton
                        label={'PayPal'}
                        value={'paypal'}
                        checked={selectedOption == 'paypal'}
                        onChange={handlerRadioChange} />
                </PaymentMethodContainer>
                <PaymentMethodContainer>
                    <RadioButton
                        label={'Stripe'}
                        value={'stripe'}
                        checked={selectedOption == 'stripe'}
                        onChange={handlerRadioChange} />
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
                <div>
                    <CheckoutForm isVisible={showCheckout} />
                </div>

            </ContentContainer >
        </div>
    );
}
