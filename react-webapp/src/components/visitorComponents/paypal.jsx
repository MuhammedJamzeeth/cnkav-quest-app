import React, { useEffect } from "react";

const PayPalPaymentButton = ({ amount }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID";
    script.async = true;
    script.onload = () => {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            console.log("Order captured:", order);
          },
          onError: (err) => {
            console.error("PayPal Error:", err);
          },
        })
        .render("#paypal-button-container");
    };
    document.body.appendChild(script);
  }, [amount]);

  return (
    <div>
      <div
        id="paypal-button-container"
        className="w-full flex justify-center my-4"
      />
    </div>
  );
};

export default PayPalPaymentButton;
