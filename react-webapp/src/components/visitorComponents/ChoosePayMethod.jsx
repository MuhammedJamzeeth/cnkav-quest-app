import React, { useState } from "react";
import {
  FaLock,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaPaypal,
} from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { cnkavLogo } from "../../images";
import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";
import StripePaymentForm from "./paywithCard";
import { useLocation } from "react-router-dom";
// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      {/* Modal content */}
      <div className="relative bg-gray-900 text-white rounded-lg shadow-lg w-full max-w-lg p-8 z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Make a Payment</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            &times;
          </button>
        </div>
        {/* Insert Stripe Payment Form */}
        {children}
      </div>
    </div>
  );
};

const ChoosePayMethod = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const state = location.state?.data;
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <div className="bg-black text-white border rounded-lg p-8 shadow-lg mt-24">
        <Link to="/dashboard/profile">
          <button
            className={`flex gap-4 items-center px-2 py-2 rounded-lg font-semibold text-sm text-white text-[24px]`}
          >
            <FaChevronLeft />
          </button>
        </Link>

        <div className="flex flex-col items-center">
          <IoMdLock className="text-red-500 text-4xl mb-8 border-2 border-red-500 rounded-full p-1" />

          <p className="text-sm text-center">STEP 3 OF 3</p>
          <h2 className="text-2xl my-2 font-bold">Choose how to pay</h2>
          <p className="text-center mb-4">
            Your payment is encrypted, and you can change how you pay at any
            time.
          </p>
          <p className="text-center font-bold mb-6">
            Secure for peace of mind. <br />
            Cancel easily online.
          </p>
          <div className="w-full flex justify-end">
            <p className="text-sm mb-4">
              End-to-end encrypted <FaLock className="inline text-yellow-500" />
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Button to open Stripe payment modal */}
          <button
            onClick={handleOpenModal}
            className="w-full flex items-center justify-between border p-4 rounded-lg"
          >
            <span>Credit or Debit Card</span>
            <div className="flex space-x-2">
              <FaCcVisa className="text-blue-600" />
              <FaCcMastercard className="text-red-600" />
              <FaCcAmex className="text-blue-600" />
            </div>
          </button>

          <button className="w-full flex items-center justify-start border p-4 rounded-lg">
            <span>iDEAL (Direct Debit)</span>
            <FaCcMastercard className="text-red-400 text-xl ml-4 border" />
          </button>

          <button className="w-full flex items-center justify-start border p-4 rounded-lg">
            <span>PayPal</span>
            <FaPaypal className="text-blue-600 text-xl ml-4 border" />
          </button>

          <button className="w-full flex items-center justify-start border p-4 rounded-lg">
            <span>Gift Code</span>
            <span className="">
              <img src={cnkavLogo} alt="" className="h-6 ml-6" />
            </span>
          </button>
        </div>
      </div>

      {/* Modal to handle Stripe payment */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <StripePaymentForm state={state} />
      </Modal>
    </div>
  );
};

export default ChoosePayMethod;
