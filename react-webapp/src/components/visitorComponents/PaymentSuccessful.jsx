import React from "react";
import { useNavigate } from "react-router-dom";
import  paymentok  from "../../assets/images/paymentok.gif";

const PaymentSuccessfull = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#0A0E17] flex flex-col items-center justify-center p-6 ">
      <div>
        <img src={paymentok} alt="cnkav logo" className="h-40 mt-32 mb-10 rounded-[50px]" />
      </div>
      <div className="bg-black text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4 leading-8">
          <h2>
          Hi, welcome to Cnkav. We are pleased to inform you that your payment has been successfully completed.          </h2>

        
        <p className="mt-6 text-center text-sm text-white">
          We will get back to you soon.
        </p>
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
              Back to Home
            </button>
          </div>
          </form>
      </div>
    </div>
  );
};

export default PaymentSuccessfull;
