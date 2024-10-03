import React from "react";
import { useNavigate } from "react-router-dom";
import { cnkavLogo } from "../../images";

const RequestAffilateProduct = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/contact-step2");
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
     <button className="text-2xl font-bold mb-6 mt-10">
            Request Affiliate Products
          </button>
      <p>Request for potential listing of an product. </p>

      <div className="bg-black text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="">
            Steps are for listing after requesting , listing payments and
            commissions and contracts. Also, after that process you paying the
            commissions for the clients on the platform that sell as an
            affiliate on sale.
          </p>
          <div>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
              placeholder="Full name"
            />
          </div>
          <div>
            <input
              type="text"
              id="fullName"
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              type="text"
              id="fullName"
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
              placeholder="Company name"
            />
          </div>
          <div>
            <input
              type="text"
              id="fullName"
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
              placeholder="Company website"
            />
          </div>
          <div>
            <input
              type="text"
              id="fullName"
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
              placeholder="Phone number"
            />
          </div>
          <div>
            <input
              type="text"
              id="fullName"
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
              placeholder="Typical Client size and revenue"
            />
          </div>
          <div>
            <input
              type="text"
              id="fullName"
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
              placeholder="Product Image"
            />
          </div>
          <div className="pt-6">
            <button
              to=""
              type="submit"
              className="rounded-3xl w-full bg-black text-white py-3 px-4 font-bold"
              style={{
                border: "2px solid transparent",
                borderImage: "linear-gradient(120deg, red, yellow)",
                borderImageSlice: 1,
              }}
            >
              Confirm
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-white">
          By signing up, you agree to Cnkav <br />
          <a href="#" className="text-white underline">
            Terms and Conditions
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default RequestAffilateProduct;
