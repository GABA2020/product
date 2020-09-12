import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutForm } from '../../components/CheckoutForm';

const stripePromise = loadStripe(
  'pk_test_51HJAVwAR6Zl0WfNDjMxkYeZcYFSyhiLzdRHv80GaUi00FE3ToUmpgA65xFhi7gFbtsgYE30ctGx7AmH4YY7tUugU00CdTfsMQD',
);

export const PaymentPage = () => {
  return (
    <>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </>
  );
};
