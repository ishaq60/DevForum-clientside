import React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import UseUser from '../../Hooks/UseUser';
import { toast } from 'react-toastify';

const CheckOutForm = () => {
  const [user]=UseUser()
  console.log(user.email)
  console.log(user)
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    // 👉 Call your backend to create a PaymentIntent
 const res = await fetch('https://devforum-server.vercel.app/create-payment-intent', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ amount: 5000 }),
});


    const { clientSecret } = await res.json();

    // 👉 Confirm the payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
      },
    });

    if (result.error) {
      console.error(result.error.message);
      alert(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {

   // get this from context/session
    const patchRes = await fetch(`https://devforum-server.vercel.app/make-gold-member/${user.email}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ goldMembership: true }),
    });

    const patchResult = await patchRes.json();
    console.log('User upgraded:', patchResult);
     console.log('Payment succeeded:', result.paymentIntent);
        toast.success("")
    toast.success('Gold membership activated!');

      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': { color: '#aab7c4' },
            },
            invalid: { color: '#9e2146' },
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
  );
};

export default CheckOutForm;
