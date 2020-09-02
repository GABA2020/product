import React, { useState } from 'react';
import axios from 'axios';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

export const CheckoutForm = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerState, setCustomerState] = useState('');
  const [selectedMembership, setSelectedMembership] = useState(null);

  const [customerZipcode, setCustomerZipcode] = useState('');
  const stripe = useStripe() as any;
  const elements = useElements() as any;

  const updateValues = () => {
    setCustomerName((document.querySelector('#customerName') as any)!.value);
    setCustomerEmail((document.querySelector('#customerEmail') as any)!.value);
    setCustomerCity((document.querySelector('#customerCity') as any)!.value);
    setCustomerAddress(
      (document.querySelector('#customerAddress') as any)!.value,
    );
    setCustomerState((document.querySelector('#customerState') as any)!.value);
    setCustomerZipcode(
      (document.querySelector('#customerZipcode') as any)!.value,
    );
    setSelectedMembership(
      document.querySelector('#selectedMembership' as any)!.value,
    );
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
    console.log('[PaymentMethod]', paymentMethodReq);
    console.log(confirmedCardPayment);
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
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <section className="field">
          <label htmlFor="customerName" className="label">
            Cardholder Name
          </label>
          <section className="control">
            <input
              className="input is-rounded"
              type="text"
              id="customerName"
              value={customerName}
              onChange={e => updateValues()}
              required
            ></input>
          </section>
        </section>
        <section className="field">
          <label htmlFor="customerEmail" className="label">
            Email Address
          </label>
          <section className="control">
            <input
              className="input is-rounded"
              type="text"
              id="customerEmail"
              value={customerEmail}
              onChange={e => updateValues()}
              required
            ></input>
          </section>
        </section>
        <section className="field">
          <label htmlFor="customerCity" className="label">
            City
          </label>
          <section className="control">
            <input
              className="input is-rounded"
              type="text"
              id="customerCity"
              value={customerCity}
              onChange={e => updateValues()}
              required
            ></input>
          </section>
        </section>
        <section className="field">
          <label htmlFor="customerAddress" className="label">
            Billing Address
          </label>
          <section className="control">
            <input
              className="input is-rounded"
              type="text"
              id="customerAddress"
              value={customerAddress}
              onChange={e => updateValues()}
              required
            ></input>
          </section>
        </section>
        <section className="field">
          <label htmlFor="customerState" className="label">
            State
          </label>
          <section className="control">
            <input
              className="input is-rounded"
              type="text"
              id="customerState"
              value={customerState}
              onChange={e => updateValues()}
              required
            ></input>
          </section>
        </section>
        <section className="field">
          <label htmlFor="customerZipcode" className="label">
            Zipcode
          </label>
          <section className="control">
            <input
              className="input is-rounded"
              type="text"
              id="customerZipcode"
              value={customerZipcode}
              onChange={e => updateValues()}
              required
            ></input>
          </section>
        </section>
        <section className="field">
          <label htmlFor="selectedMembership" className="label">
            GABA Membership Plan
          </label>
          <section className="control">
            <select
              id="selectedMembership"
              name="selectedMembership"
              className="input is-rounded"
              onChange={e => updateValues()}
            >
              <option value="GABABronze">GABA Bronze</option>
              <option value="GABASilver">GABA Silver</option>
              <option value="PreMed">Pre-Med</option>
            </select>
          </section>
        </section>
        <CardElement options={cardElementOptions} />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    </>
  );
};
