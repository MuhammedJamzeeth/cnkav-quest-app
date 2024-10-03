import React, { useState } from "react";

const PaymentMethod = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add payment processing logic here
    alert("Payment method added successfully!");
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 mt-40">Payment Method</h1>

      <section className="bg-black text-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add New Payment Method</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Card Number
            </label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full p-3 border-2 border-gray-800 rounded-lg bg-gray-900 text-white"
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full p-3 border-2 border-gray-800 rounded-lg bg-gray-900 text-white"
                placeholder="MM/YY"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">CVV</label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="w-full p-3 border-2 border-gray-800 rounded-lg bg-gray-900 text-white"
                placeholder="123"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Card Holder Name
            </label>
            <input
              type="text"
              value={cardHolderName}
              onChange={(e) => setCardHolderName(e.target.value)}
              className="w-full p-3 border-2 border-gray-800 rounded-lg bg-gray-900 text-white"
              placeholder="John Doe"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-white text-black py-2 px-4 rounded-lg hover:bg-gray-200 transition"
          >
            Add Payment Method
          </button>
        </form>
      </section>

      <section className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Saved Payment Methods</h2>
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between mb-4">
            <div className="text-lg font-medium">**** **** **** 3456</div>
            <div className="text-sm text-gray-500">Expires 12/25</div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="text-lg font-medium">**** **** **** 5678</div>
            <div className="text-sm text-gray-500">Expires 08/24</div>
          </div>
          {/* Add more saved payment methods here */}
        </div>
      </section>
    </div>
  );
};

export default PaymentMethod;
