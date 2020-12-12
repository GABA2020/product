import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { Context } from 'app/globalContext/GlobalContext';
import { Button } from '../../genericComponents'


const LabelForInput = styled.div`
  width: 100%;
  padding:5px;
`;

const FormGroup = styled.div`
  display:flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content:space-between; 

`;
const HalfSizeContainer = styled.div`
  width: 50%;
  padding:10px 15px
`;

const InputContainer = styled.div`
  width: 100%;
  padding:5px;
`;

const ContentContainer = styled.div`
  width: 100%;
  padding: 10px 30px;  
  color: #0065f2;
  `;

const Title = styled.div`
  font-weight: bold;
  font-size: 150%;  
`;

export default function CheckoutForm({ membership,
  setShowCheckout,
  showCheckout,
  cancelHandler }) {

  const stripe = useStripe();
  const elements = useElements();
  const { state: { user } } = useContext(Context);
  const email = user?.email;
  const billingInitialState = {
    name: '',
    email,
    address: {
      city: '',
      postal_code: '',
      state: '',
      line1: '',
      line2: '',
    }
  }
  const [billingDetails, setBillingDetails] = useState(billingInitialState);

  const [isProcessing, setIsProcessing] = useState(false);

  const handleOnChange = ({ target }) => {
    const { id, value } = target
    let arrayParam = id.split('_')
    if (arrayParam.length > 1) {
      let param = arrayParam.slice(1).join('_')
      setBillingDetails({ ...billingDetails, address: { ...billingDetails.address, [param]: value } })
    }
    else {
      setBillingDetails({ ...billingDetails, [arrayParam[0]]: value })
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardNumberElement),
        billing_details: billingDetails
      });

      const { data: clientSecret } = await axios.post(
        `https://us-central1-gaba-devs.cloudfunctions.net/paymentProcessing`,
        {
          amount: membership.code,
          user_email: email
        },
      );

      const confirmedCardPayment = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });
      if (confirmedCardPayment.error) {
        console.log(confirmedCardPayment.error.message);
      } else {
        if (confirmedCardPayment.paymentIntent.status === 'succeeded') {
          setBillingDetails(billingInitialState);
          alert('Payment Received. Thank you for your patronage!');
        }
      }
      setIsProcessing(false);
      setShowCheckout(false);

    } catch (error) {
      console.log(error)
    }
  };

  const cardNumberElementOptions = {
    //a way to inject styles into that iframe
    style: {
      base: {
        color: 'rgb(85,85,85)',
        fontSmoothing: 'antialiased',
        fontSize: '14px',
        '::placeholder': {
          color: '#ccc',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
    hidePostalCode: true,
    placeholder: '4444 4444 4444 5555'
  };

  const expiryElementOptions = {
    //a way to inject styles into that iframe
    style: {
      base: {
        color: 'rgb(85,85,85)',
        fontSmoothing: 'antialiased',
        fontSize: '14px',
        '::placeholder': {
          color: '#ccc',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    }
  };
  const cancelClickHandler = (e) => {
    cancelHandler(e)
  }


  return (
    <ContentContainer>
      <form onSubmit={handleSubmit}>
        {showCheckout ? (<div>
          <FormGroup style={{ padding: '10px 15px' }}>
            <LabelForInput htmlFor="name">Name on Card</LabelForInput>
            <input
              className="form-control"
              type="text"
              id="name"
              value={billingDetails.name}
              onChange={handleOnChange}
              placeholder="Harley Quinn"
            ></input>
          </FormGroup>

          <FormGroup style={{ padding: '10px 15px' }}>
            <LabelForInput htmlFor="customerName">Card Number</LabelForInput>
            <InputContainer>
              <CardNumberElement className={'form-control'} options={cardNumberElementOptions} />
            </InputContainer>
          </FormGroup>
          <FormGroup>
            <HalfSizeContainer>
              <LabelForInput htmlFor="expiry">Expiry</LabelForInput>
              <InputContainer>
                <CardExpiryElement className={'form-control'} options={expiryElementOptions} />
              </InputContainer>
            </HalfSizeContainer>
            <HalfSizeContainer>
              <LabelForInput htmlFor="expiry">CVC</LabelForInput>
              <InputContainer>
                <CardCvcElement className={'form-control'} />
              </InputContainer>
            </HalfSizeContainer>
          </FormGroup>
          <Title>
            Billing Information
        </Title>
          <FormGroup style={{ padding: '10px 15px' }}>
            <LabelForInput htmlFor="customerAddress">Street</LabelForInput>
            <input
              className="form-control"
              type="text"
              id="address_line1"
              value={billingDetails.address.line1}
              onChange={handleOnChange}
              placeholder="Street" />
          </FormGroup>
          <FormGroup>
            <HalfSizeContainer>
              <LabelForInput htmlFor="customerCity">Apt, Unit</LabelForInput>
              <input
                className="form-control"
                type="text"
                id="address_line2"
                value={billingDetails.address.line2}
                onChange={handleOnChange}
                placeholder="City" />
            </HalfSizeContainer>
            <HalfSizeContainer>
              <LabelForInput htmlFor="customerCity">City</LabelForInput>
              <input
                className="form-control"
                type="text"
                id="address_city"
                value={billingDetails.address.city}
                onChange={handleOnChange}
                placeholder="City" />
            </HalfSizeContainer>
          </FormGroup>

          <FormGroup>
            <HalfSizeContainer>
              <LabelForInput htmlFor="customerState">State</LabelForInput>
              <input
                className="form-control"
                type="text"
                id="address_state"
                value={billingDetails.address.state}
                onChange={handleOnChange}
                placeholder="State" />
            </HalfSizeContainer>
            <HalfSizeContainer>
              <LabelForInput htmlFor="customerZipcode">Zipcode</LabelForInput>
              <input
                className="form-control"
                type="text"
                id="address_postal_code"
                value={billingDetails.address.postal_code}
                onChange={handleOnChange}
                placeholder="Zipcode"
              ></input>
            </HalfSizeContainer>

          </FormGroup></div>) : (<div></div>)}
        <FormGroup>
          GABA filters out the noise and gives our members
          back the most precious resource in a medical
          student's arsenal: Time
        </FormGroup>
        <FormGroup>
          <HalfSizeContainer>
            <Button onClick={cancelClickHandler}>Back</Button>
          </HalfSizeContainer>
          <HalfSizeContainer>
            {showCheckout ? (
              <button
                type="Submit"
                disabled={isProcessing}
                className="btn btn-success btn-block">
                {isProcessing ? 'Processing...' : 'Complete Payment'}
              </button>
            ) : (<br />)}
          </HalfSizeContainer>
        </FormGroup>
      </form>
    </ContentContainer >
  )
};
