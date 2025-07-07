import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
const payment = () => {
    const stripePromise = loadStripe()
    return (
        <div>
            <Elements stripe={stripePromise}>

            </Elements>
        </div>
    );
};

export default payment;