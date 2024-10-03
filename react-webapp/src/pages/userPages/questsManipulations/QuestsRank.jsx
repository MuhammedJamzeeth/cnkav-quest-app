import React, { useState } from "react";

const QuestsRank = ({ name, value, onChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [category, setCategory] = useState("");
  const categories = [
    " Rank",
    "Rookie",
    "Single Star",
    "Double Star",
    "Triple Star",
    "S Rank",
  ];

  const handleInputClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionClick = (option) => {
    onChange({ target: { name, value: option } }); // Trigger onChange with the updated value
    setShowDropdown(false);
  };
  return (
    <div className="relative">
      <input
        type="text"
        id="questName"
        name={name}
        value={value}
        onClick={handleInputClick}
        readOnly
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Select"
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <svg
          class=" h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </div>

      {showDropdown && (
        <ul className="absolute z-10 bg-white border text-black border-gray-300  mt-1 rounded-lg w-full">
          {categories.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className="cursor-pointer p-2 hover:bg-gray-200 hover:text-black"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuestsRank;
