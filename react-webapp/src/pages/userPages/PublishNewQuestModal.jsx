import React from "react";

import { Link, useNavigate } from "react-router-dom";
import QuestsCategory from "./questsManipulations/QuestsCategory";
import QuestsRank from "./questsManipulations/QuestsRank";
import QuestsStyles from "./questsManipulations/QuestsStyles";


const PublishNewQuestModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (


    <div className="fixed h-[100%] mt-11 inset-0 overflow-auto bg-black bg-opacity-50 flex items-center justify-center PublishNewQuestmodal">
      <div className="bg-black text-white p-8 rounded-lg shadow-lg mt-60 flex flex-col max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-12 right-2 text-white mt-40 text-2xl hover:text-gray-400"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 mt-40">Publish New Quest</h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="questTitle"
              className="block text-sm font-medium mb-2 text-white"
            >
              Give Your Project A Brief Title
            </label>
            <input
              type="text"
              id="questTitle"
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
              placeholder="Enter Task Title"
            />
          </div>

          <div>
            <label
              htmlFor="questDescription"
              className="block text-sm font-medium mb-2"
            >
              What Are You Looking To Get Done ?
            </label>
            <textarea
              id="questDescription"
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
              placeholder="Enter What the task details"
            />
          </div>

          <div>
            <label
              htmlFor="questTitle"
              className="block text-sm font-medium mb-2"
            >
              Task duration in Days
            </label>
            <input
              type="text"
              id="questTitle"
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
              placeholder="Select"
            />
          </div>

          <div>
            <label htmlFor="" className="block text-sm font-medium mb-2">
              Category
            </label>
            <QuestsCategory />
          </div>

          <div>
            <label htmlFor="" className="block text-sm font-medium mb-2">
              Rank
            </label>
            <QuestsRank />
          </div>

          <div>
            <label htmlFor="" className="block text-sm font-medium mb-2">
              Quest Style
            </label>
            <QuestsStyles />
          </div>

          <div>
            <label
              htmlFor="questTitle"
              className="block text-sm font-medium mb-2"
            >
              Price
            </label>
            <input
              type="text"
              id="questTitle"
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
              placeholder="Enter The amount the quest doer gets paid"
            />
          </div>

          <div>
            <label
              htmlFor="questTitle"
              className="block text-sm font-medium mb-2"
            >
              Book Availability{" "}
            </label>
            <input
              type="date"
              id="questDate"
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
              placeholder="Select Date"
            />
            <input
              type="time"
              id="questTime"
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg my-3"
              placeholder="Select Time Slots"
            />
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="rounded-3xl w-full  text-white py-3 px-4 font-bold"
              style={{
                border: "2px solid transparent",
                borderImage: "linear-gradient(120deg, red, yellow)",
                borderImageSlice: 1,
              }}
            >
              Confirm and Pay
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-white">
          By signing up, you agree to Cnkav <br />
          <Link
            to="termsofservices"
            href="#"
            className="text-white underline hover:text-gray-400"
          >
            Terms and Conditions
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PublishNewQuestModal;
