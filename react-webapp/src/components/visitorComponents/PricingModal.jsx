import React from "react";
import FlexibleSection from "./FlexibleSection";
import PricingSection from "./PricingSection";

const PricingModal = ({ setCardVisible }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 grid grid-cols-1 gap-2 w-screen pricemodal">
      <div className="bg-black text-white p-8 rounded-lg shadow-lg relative w-screen overflow-auto">
        <button
          onClick={() => setCardVisible(false)}
          className="absolute top-4 right-4 text-white text-3xl"
        >
          &times;
        </button>

        <FlexibleSection />

        <PricingSection />
      </div>
    </div>
  );
};

export default PricingModal;
