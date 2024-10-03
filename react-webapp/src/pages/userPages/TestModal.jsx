import React from "react";

const TestModal = ({ setTestModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-sm w-full relative">
        <button
          className="absolute top-2 right-2 text-2xl text-gray-700 hover:text-gray-900"
          onClick={() => setTestModal(false)}
        >
          &times;
        </button>
        <h1 className="text-xl font-semibold mb-4">I am a testing Modal</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
          molestias temporibus rem aut quisquam, minima officiis fugit vitae
          amet, reprehenderit architecto vel quod natus. Porro ipsa accusamus
          deleniti
        </p>
      </div>
    </div>
  );
};

export default TestModal;
