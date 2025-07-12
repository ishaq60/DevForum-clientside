import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  FaCrown,
  FaCheckCircle,
  FaPlusCircle,
  FaGift,
  FaCreditCard,
  FaCcStripe,
} from "react-icons/fa";
import CheckOutForm from "./CheckOutForm";
import UseUser from "../../Hooks/UseUser";

// 👉 Load your Stripe public key
const stripePromise = loadStripe(import.meta.env.VITE_payment_GATEWAY_PK);

const Membership = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const membershipPlans = [
    {
      id: "basic",
      name: "Standard Membership",
      price: 9.99,
      features: [
        "Up to 5 posts per month",
        "Basic community access",
        "Standard profile features",
      ],
      buttonText: "Current Tier",
    },
    {
      id: "gold",
      name: "Gold Membership",
      price: 19.99,
      features: [
        "Unlimited posts",
        "Gold badge on profile",
        "Priority support",
        "Advanced community features",
        "No posting limitations",
      ],
      buttonText: "Upgrade to Gold",
    },
  ];

  const [user]=UseUser()
  console.log(user.SubscriptionStatus)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-indigo-900 mb-4">
            Unlock Premium Membership
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upgrade your forum experience and gain exclusive benefits with our
            Gold Membership.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {membershipPlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all 
                ${
                  plan.id === "gold"
                    ? "border-4 border-yellow-400 scale-105"
                    : "border border-gray-200"
                }
                hover:shadow-xl`}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2
                    className={`text-2xl font-bold 
                    ${
                      plan.id === "gold" ? "text-yellow-600" : "text-indigo-800"
                    }`}
                  >
                    {plan.name}
                  </h2>
                  {plan.id === "gold" && (
                    <FaCrown className="text-yellow-500 text-3xl" />
                  )}
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-indigo-900">
                    ${plan.price}
                  </span>
                  <span className="text-gray-500 ml-2">/ month</span>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <FaCheckCircle
                        className={`mr-3 
                          ${
                            plan.id === "gold"
                              ? "text-yellow-500"
                              : "text-indigo-500"
                          }`}
                      />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
<button
  className={`w-full py-3 rounded-lg font-bold transition-all 
    ${
      plan.id === "gold"
        ? user?.SubscriptionStatus === "Gold Badge"
          ? "bg-green-500 text-white cursor-default"
          : "bg-yellow-500 hover:bg-yellow-600 text-white"
        : "bg-gray-200 text-gray-500 cursor-default"
    }`}
  disabled={plan.id === "gold" && user?.SubscriptionStatus === "Gold Badge"}
  onClick={() =>
    plan.id === "gold" &&
    user?.SubscriptionStatus !== "Gold Badge" &&
    setSelectedPlan(plan)
  }
>
  {plan.id === "gold" && user?.SubscriptionStatus === "Gold Badge"
    ? "Activated"
    : plan.buttonText}
</button>


              </div>
            </div>
          ))}
        </div>

        {selectedPlan && (
          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-900 mb-6">
              Complete Your Payment
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Payment Methods
                </h3>
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition">
                    <div className="flex items-center">
                      <FaCreditCard className="mr-3 text-2xl text-indigo-600" />
                      <span>Credit Card</span>
                    </div>
                    <FaPlusCircle className="text-green-500" />
                  </button>

                  <button
                    className="w-full flex items-center justify-between bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition"
                    onClick={() => setShowForm(!showForm)}
                  >
                    <div className="flex items-center">
                      <FaCcStripe className="mr-3 text-2xl text-blue-600" />
                      <span>Stripe</span>
                    </div>

                    {showForm ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaPlusCircle className="text-green-500" />
                    )}
                  </button>

                  {showForm && (
                    <div className="mt-4 border p-6 rounded-lg bg-white shadow space-y-4">
                      {/* ✅ ✅ ✅ FIXED: wrap form in <Elements> */}
                      <Elements stripe={stripePromise}>
                        <CheckOutForm />
                      </Elements>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Benefits Overview
                </h3>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <FaGift className="mr-3 text-2xl text-purple-600" />
                    <span className="font-medium text-indigo-900">
                      Exclusive Gold Badge
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FaPlusCircle className="mr-3 text-2xl text-green-600" />
                    <span className="font-medium text-indigo-900">
                      Unlimited Post Creation
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Membership;
