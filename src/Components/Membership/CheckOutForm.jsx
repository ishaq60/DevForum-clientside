import React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();  // Fixed typo: preventDefault

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet.
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Create payment method with card details
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: card,
    });

    if (error) {
      console.log('[error]', error);
      alert(error.message);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      alert('Payment method created successfully!');
      // Here you can send paymentMethod.id to your backend to create a payment intent and confirm payment
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
          className="p-3 border border-gray-300 rounded"
        />
        <button
          type="submit"
          disabled={!stripe}
          className="bg-indigo-600 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default CheckOutForm;
