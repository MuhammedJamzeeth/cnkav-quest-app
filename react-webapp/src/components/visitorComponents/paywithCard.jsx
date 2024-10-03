import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import api from "../../lib/api";
import axios from "axios";

const StripeWithDrawForm = ({ onWithdrawSuccess, state }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("access_token");

    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Get card details from Stripe Elements
    const cardElement = elements.getElement(CardElement);

    const { error: paymentMethodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

    if (paymentMethodError) {
      console.error("[error]", paymentMethodError);
      return;
    }

    console.log("[PaymentMethod]", paymentMethod);

    try {
      setLoading(true);
      setError(null);

      let response;
      const requestBody = {
        payment_method_id: paymentMethod.id,
        amount: state === "withdraw" ? 5000 : undefined,
      };

      if (state === "transfer") {
        response = await api.post("/user/transfer", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            payment_method_id: paymentMethod.id,
            amount: 5000,
          }),
        });
      } else if (state === "addPaymentMethod") {
        response = await api.post(
          "/user/add_payment/method",
          { payment_method_id: paymentMethod.id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (state === "withdraw") {
        response = await api.post("/user/withdraw", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        });
      }

      if (response.status === "success") {
        alert("payment added successfully");
      } else {
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        color: "#ffffff",
        fontSize: "16px",
        "::placeholder": {
          color: "#9ca3af",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <CardElement options={cardElementOptions} className="text-white" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full flex items-center justify-between border p-4 rounded-lg"
      >
        <div className="flex space-x-2">
          {loading
            ? "Loading..."
            : state === "withdraw"
            ? "Withdraw"
            : state === "addPaymentMethod"
            ? "Add Payment Method"
            : "Pay"}
        </div>
      </button>
      {error && <div className="text-red-500">{error}</div>}{" "}
    </form>
  );
};

export default StripeWithDrawForm;
