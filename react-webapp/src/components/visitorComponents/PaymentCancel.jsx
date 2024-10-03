import React from "react";
import { useNavigate } from "react-router-dom";
import  canelpayment  from "../../assets/images/alert-svgrepo-com.svg";

const PaymentCancel = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault();
      navigate("/");
    };
  
  return (
    <div className="min-h-screen bg-[#0A0E17] flex flex-col items-center justify-center p-6 ">
    <div>
      <img src={canelpayment} alt="cnkav logo" className="h-40 mt-32 mb-10 rounded-[50px]" />
    </div>
    <div className="bg-black text-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4 leading-8">
        <h2 className="text-center">
        Hi, Your payment is not confirmed!
        </h2>

      
      <p className="mt-6 text-center text-sm text-white">
        Kindly retake again
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
  )
}

export default PaymentCancel