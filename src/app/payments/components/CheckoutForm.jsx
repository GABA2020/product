import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Context } from 'app/globalContext/GlobalContext';


const ContentContainer = styled.div`
  width: 100%;
  padding: 30px;
`;

export default function CheckoutForm({ isVisible, stripePromise }) {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerState, setCustomerState] = useState('');
  const [customerZipcode, setCustomerZipcode] = useState('');
  const [selectedMembership, setSelectedMembership] = useState('GABABronze');

  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');


  const elements = undefined
  const stripe = useStripe()
  const { state: { user } } = useContext(Context);
  const email = user?.email;
  // const { email } = useSelector(authSelector);

  const upgradeUser = async () => {

  };

  const updateValues = () => {
    // setCustomerName((document.querySelector('#customerName') as any)!.value);
    // setCustomerEmail((document.querySelector('#customerEmail') as any)!.value);
    // setCustomerCity((document.querySelector('#customerCity') as any)!.value);
    // setCustomerAddress(
    //   (document.querySelector('#customerAddress') as any)!.value,
    // );
    // setCustomerState((document.querySelector('#customerState') as any)!.value);
    // setCustomerZipcode(
    //   (document.querySelector('#customerZipcode') as any)!.value,
    // );
    // setSelectedMembership(
    //   document.querySelector('#selectedMembership' as any)!.value,
    // );
  };

  const handleFormSubmit = async e => {
    e.preventDefault();

    const billingDetails = {
      name: customerName,
      email: customerEmail,
      address: {
        city: customerCity,
        line1: customerAddress,
        state: customerState,
        postal_code: customerZipcode,
      },
    };

    setIsProcessing(true);

    if (!stripe || !elements) {
      return 'Loading Form';
    }

    const { data: clientSecret } = await axios.post(
      `https://us-central1-august-water-280101.cloudfunctions.net/paymentProcessing
    `,
      {
        amount: selectedMembership,
      },
    );
    const cardElement = elements.getElement(CardElement);

    const paymentMethodReq = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: billingDetails,
    });

    const confirmedCardPayment = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethodReq.paymentMethod.id,
    });

    if (confirmedCardPayment.error) {
      setCheckoutError(confirmedCardPayment.error.message);
    } else {
      if (confirmedCardPayment.paymentIntent.status === 'succeeded') {
        await upgradeUser();
        alert('Payment Received. Thank you for your patronage!');
        setIsProcessing(false);
      }
    }
  };

  const cardElementOptions = {
    //a way to inject styles into that iframe
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
    hidePostalCode: true,
  };


  return isVisible ? (
    <ContentContainer>
      <form onSubmit={handleFormSubmit}>
        <section className="form-group">
          <label htmlFor="customerName">Cardholder Name</label>

          <input
            className="form-control"
            type="text"
            id="customerName"
            value={customerName}
            onChange={e => updateValues()}
            required
          ></input>
        </section>
        <section className="form-group">
          <label htmlFor="customerEmail">Email Address</label>

          <input
            className="form-control"
            type="text"
            id="customerEmail"
            value={customerEmail}
            onChange={e => updateValues()}
            required
          ></input>
        </section>
        <section className="form-group">
          <label htmlFor="customerCity">City</label>

          <input
            className="form-control"
            type="text"
            id="customerCity"
            value={customerCity}
            onChange={e => updateValues()}
            required
          ></input>
        </section>
        <section className="form-group">
          <label htmlFor="customerAddress">Billing Address</label>

          <input
            className="form-control"
            type="text"
            id="customerAddress"
            value={customerAddress}
            onChange={e => updateValues()}
            required
          ></input>
        </section>
        <section className="form-group">
          <label htmlFor="customerState">State</label>

          <input
            className="form-control"
            type="text"
            id="customerState"
            value={customerState}
            onChange={e => updateValues()}
            required
          ></input>
        </section>
        <section className="form-group">
          <label htmlFor="customerZipcode">Zipcode</label>

          <input
            className="form-control"
            type="text"
            id="customerZipcode"
            value={customerZipcode}
            onChange={e => updateValues()}
            required
          ></input>
        </section>
        <section className="form-group">
          <label htmlFor="selectedMembership">GABA Membership Plan</label>

          <select
            id="selectedMembership"
            name="selectedMembership"
            className="form-control"
            onChange={e => updateValues()}
          >
            <option value="GABABronze">GABA Bronze</option>
            <option value="GABASilver">GABA Silver</option>
            <option value="PreMed">Pre-Med</option>
          </select>
        </section>
        <Elements stripe={stripePromise} options={cardElementOptions} />
        {checkoutError && <span>{checkoutError}</span>}
        <p>
          Your total for the {selectedMembership} membership comes out to
          </p>
        <button
          type="submit"
          disabled={isProcessing}
          className="btn btn-success btn-block"
        >
          {isProcessing ? 'Processing...' : `Pay $.00`}
        </button>
      </form>
    </ContentContainer>
  ) : (<div></div>)
};
