import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  googleLogo,
  facebookLogo,
  appleLogo,
  cnkavLogo,
  signupbg,
} from "../../images";
import { helloHand } from "../../images";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "flowbite-react";

export default function Component({ isModal, toggleModal }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/contactus/step3");
  };

  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropd, setShowDropd] = useState(false);
  const [category, setCategory] = useState("");
  const [edit, setEdit] = useState("");

  const categories = [
    "Male",
    "Female",
    "Non-binary",
    "Prefer not to say",
    // "Software Development",
  ];

  const editdelete = ["Single", "Married", "Divorced", "Widowed"];

  const handleInputClick = () => {
    setShowDropdown(!showDropdown);
  };
  const handleeditInputClick = () => {
    setShowDropd(!showDropd);
  };

  const handleOptionClick = (option) => {
    setCategory(option);
    setShowDropdown(false);
  };
  const handleoptionClick = (option) => {
    setEdit(option);
    setShowDropd(false);
  };

  return (
    <div className="w-full h-full flex justify-center items-center text-center">
      <Modal show={isModal} onClose={() => toggleModal("closed")}>
        <div className=" bg-black flex flex-col justify-end items-end px-4 md:px-12">
          <button
            onClick={() => toggleModal("closed")}
            className="text-white text-2xl font-bold mt-4"
          >
            &times;
          </button>
        </div>
        <div className=" bg-black flex flex-col items-center justify-center py-4 pb-8">
          <div>
            <img src={cnkavLogo} alt="cnkav logo" className="h-36 img-fluid" />
          </div>
          <div className="bg-black text-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium mb-2"
                >
                  What is your gender?
                </label>

                <div className="relative mb-4">
                  <input
                    type="text"
                    id="questName"
                    value={category}
                    onClick={handleInputClick}
                    readOnly
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Select Gender"
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
                    <ul className="absolute z-10 bg-white border text-black border-gray-900  mt-1 rounded-lg w-full">
                      {categories.map((option, index) => (
                        <li
                          key={index}
                          onClick={() => handleOptionClick(option)}
                          className="cursor-pointer  px-2 pt-[4px] pb-[4px] hover:bg-gray-200 hover:text-black"
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* <select
                                    id="gender"
                                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
                                >
                                    <option value="" disabled selected>
                                        Select Gender
                                    </option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="non-binary">Non-binary</option>
                                    <option value="prefer-not-to-say">Prefer not to say</option>
                                </select> */}
              </div>
              <div>
                <label
                  htmlFor="maritalStatus"
                  className="block text-sm font-medium mb-2"
                >
                  Marital Status
                </label>

                <div className="relative mb-4 mt-4">
                  <input
                    type="text"
                    id="questName"
                    value={edit}
                    onClick={handleeditInputClick}
                    readOnly
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Select Marital Status"
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

                  {showDropd && (
                    <ul className="absolute z-10 bg-white border text-black border-gray-900  mt-1 rounded-lg w-full">
                      {editdelete.map((option, index) => (
                        <li
                          key={index}
                          onClick={() => handleoptionClick(option)}
                          className="cursor-pointer px-2 pt-[4px] pb-[4px] hover:bg-gray-200 hover:text-black"
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* <select
                                    id="maritalStatus"
                                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
                                >
                                    <option value="" disabled selected>
                                        Select Marital Status
                                    </option>
                                    <option value="single">Single</option>
                                    <option value="married">Married</option>
                                    <option value="divorced">Divorced</option>
                                    <option value="widowed">Widowed</option>
                                </select> */}
              </div>
              <div className="pt-6">
                <Link
                  to="#/contactus/step3"
                  // to="contact"
                  onClick={() => {
                    toggleModal("contactQ-modal3");
                    // closeSidebar();
                  }}
                >
                  <button
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
                </Link>
              </div>
            </form>
            <p className="mt-6 text-center text-sm text-white">
              By signing up, you agree to Cnkav <br />
              <a href="/terms-of-services" className="text-white underline">
                Terms and Conditions
              </a>
              .
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
