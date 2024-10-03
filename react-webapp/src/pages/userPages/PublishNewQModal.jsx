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
import QuestsCategory from "./questsManipulations/QuestsCategory";
import QuestsRank from "./questsManipulations/QuestsRank";
import QuestsStyles from "./questsManipulations/QuestsStyles";
import useInputHandler from "../../hooks/useInputHandler.jsx";
import useQuestsHandler from "../../hooks/useQuestsHandler.jsx";

// import "react-date-range/dist/styles.css"; // main style file
// import "react-date-range/dist/theme/default.css"; // theme css file
// import { DateRangePicker } from "react-date-range";
// import { format } from "date-fns";
// import { DatePicker } from "antd";

const InitialState = {
  title: "",
  taskDetails: "",
  durationDays: "",
  category: "",
  rank: "",
  style: "",
  price: "",
  bookAvailabilityDate: "",
  bookAvailabilityTime: "",
};

export default function Component({ isModal, toggleModal }) {
  const navigate = useNavigate();
  //   const { formInput, handleChange } = useInputHandler(InitialState);

  //   const [data, setData] = useState([]);

  const [formData, setFormData] = useState(InitialState);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className=" w-full h-full flex justify-center items-center text-center">
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
            <img
              src={cnkavLogo}
              alt="cnkav logo"
              className="h-16 w-16 img-fluid"
            />
          </div>

          <div className="bg-black text-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
            {/* <h2 className="text-xl font-bold mb-4 mt-4">Publish New Quest</h2> */}
            <form className="space-y-2">
              {/* 1 div section */}
              <div className=" pb-1">
                <label
                  htmlFor="questTitle"
                  className="block text-xs pb-2 font-medium text-white"
                >
                  Give Your Project A Brief Title
                  {/* {error.title && ( */}
                  <span className={"text-red-600 font-normal"}>
                    {/* *{error.title} */}
                  </span>
                  {/* )} */}
                </label>
                <input
                  type="text"
                  name="title"
                  id="questTitle"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border text-black text-sm border-gray-300 rounded-lg"
                  placeholder="Enter Task Title"
                />
              </div>

              {/* 2nd div section */}
              <div className=" pb-1">
                <label
                  htmlFor="TaskDetails"
                  className="block text-xs pb-2 font-medium text-white"
                >
                  What Are Your Looking To Get Done? {/* {error.title && ( */}
                  <span className={"text-red-600 font-normal"}>
                    {/* *{error.title} */}
                  </span>
                  {/* )} */}
                </label>

                <input
                  type="text"
                  //   id="questTitle"
                  name="taskDetails"
                  id="TaskDetails"
                  value={formData.taskDetails}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border text-black text-sm border-gray-300 rounded-lg"
                  placeholder="Enter What the task details"
                />
              </div>

              {/* 3rd div section */}
              <div className=" pb-1">
                <label
                  htmlFor="DurationDays"
                  className="block text-xs pb-2 font-medium text-white"
                >
                  Task Duration in Days {/* {error.title && ( */}
                  <span className={"text-red-600 font-normal"}>
                    {/* *{error.title} */}
                  </span>
                  {/* )} */}
                </label>

                <input
                  type="text"
                  //   id="questTitle"
                  name="durationDays"
                  id="DurationDays"
                  value={formData.durationDays}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border text-black text-sm border-gray-300 rounded-lg"
                  placeholder="Select"
                />
              </div>

              {/* 4th div section */}
              <div className=" pb-1">
                <label
                  htmlFor="Category"
                  className="block text-xs font-medium mb-2"
                >
                  Category
                  {/* {error.category && ( */}
                  <span className="text-red-600 font-normal">
                    {/* *{error.category} */}
                  </span>
                  {/* )} */}
                </label>
                <QuestsCategory
                  name="category"
                  id="Category"
                  value={formData.category}
                  onChange={handleInputChange}
                />
              </div>

              {/* 5th div section */}
              <div className="pb-1">
                <label
                  htmlFor="Rank"
                  className="block text-xs font-medium mb-2"
                >
                  Rank
                  {/* {error.rank && ( */}
                  <span className="text-red-600 font-normal">
                    {" "}
                    {/* *{error.rank} */}
                  </span>
                  {/* )} */}
                </label>
                <QuestsRank
                  name="rank"
                  id="Rank"
                  value={formData.rank}
                  onChange={handleInputChange}
                />
              </div>
              {/* 6th div section */}
              <div className="pb-1">
                <label
                  htmlFor="Styles"
                  className="block text-xs font-medium mb-2"
                >
                  Quest Style
                  {/* {error.style && ( */}
                  <span className="text-red-600 font-normal">
                    {" "}
                    {/* *{error.style} */}
                  </span>
                  {/* )} */}
                </label>
                <QuestsStyles
                  name="style"
                  id="Styles"
                  value={formData.style}
                  onChange={handleInputChange}
                />
              </div>
              {/* 7th div section */}
              <div className="pb-1">
                <label
                  htmlFor="questTitle"
                  className="block text-xs font-medium mb-2"
                >
                  Price {/* {error.price && ( */}
                  <span className="text-red-600 font-normal">
                    {" "}
                    {/* *{error.price} */}
                  </span>
                  {/* )} */}
                </label>
                <input
                  type="text"
                  //   id="questTitle"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
                  placeholder="Enter The amount the quest doer gets paid"
                />
              </div>
              {/* 8th deiv section */}
              <div className="pb-1">
                <label
                  htmlFor="questTitle"
                  className="block text-xs font-medium mb-2"
                >
                  Book Availability {/* {error.bookAvailabilityDate && ( */}
                  <span className="text-red-600 font-normal">
                    {" "}
                    {/* *{error.bookAvailabilityDate} */}
                  </span>
                  {/* )} */}
                </label>

                <input
                  type="date"
                  //   id="questDate"
                  name="bookAvailabilityDate"
                  value={formData.bookAvailabilityDate}
                  onChange={handleInputChange}
                  className="w-full py-2 border text-black border-gray-300 rounded-lg"
                  placeholder="Select Date"
                />
                {/* {error.bookAvailabilityTime && ( */}
                <span className="text-red-600 text-sm font-medium">
                  {" "}
                  {/* *{error.bookAvailabilityTime} */}
                </span>
                {/* )} */}
                <input
                  required
                  type="time"
                  //   id="questTime"
                  name="bookAvailabilityTime"
                  value={formData.bookAvailabilityTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg my-3"
                  placeholder="Select Time Slots"
                />
              </div>
            </form>
            <div className="flex justify-center ">
              <button
                className="rounded-3xl w-full  text-white py-3 px-4 font-bold mt-8"
                style={{
                  border: "2px solid transparent",
                  borderImage: "linear-gradient(120deg, red, yellow)",
                  borderImageSlice: 1,
                }}
              >
                Confirm
              </button>
            </div>
            <p className="mt-6 text-center text-sm text-white">
              By signing up, you agree to Cnkav <br />
              <Link
                to="termsofservices"
                href="/terms-of-services"
                className="text-white underline hover:text-gray-400"
              >
                Terms and Conditions
              </Link>
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
