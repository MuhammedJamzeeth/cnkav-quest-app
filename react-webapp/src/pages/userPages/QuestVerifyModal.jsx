import React from "react";
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

export default function Component({ isModal, toggleModal }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/contact-step2");
  };

  return (
    <div className=" w-full h-full flex justify-center items-center text-center">
      <Modal show={isModal} onClose={() => toggleModal("closed")}>
        <div className=" bg-white text-black flex flex-col justify-end items-end px-4 md:px-12">
          <button
            onClick={() => toggleModal("closed")}
            className=" text-2xl font-bold mt-4 text-black"
          >
            &times;
          </button>
        </div>
        <div className=" bg-white flex flex-col items-center justify-center py-4 pb-8">
          <div className="bg-white text-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-black">Quest Details</h2>
            <form action="">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-black">
                    Quest Title:
                  </label>

                  <input
                    type="text"
                    id="questName"
                    // value={category}
                    // onClick={handleInputClick}
                    readOnly
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Select"
                  />

                  {/* <QuestsCategory /> */}
                </div>
                <div>
                  <div className="w-full bg-gray-300 h-[300px] rounded-xl p-4 text-black">
                    Duration: 1 <br />
                    days Budget: 0€ <br /> Category : Philanthropy. <br /> Level
                    : Single Star, <br /> RookiePrice: €0.00 <br /> Type:
                    Monthly Recurring Task(same tasks recurring each month
                    including the payment for the task). <br /> Style : Remote
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="questTitle"
                    className="block text-sm font-medium mb-2 text-black"
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
                    placeholder="Select Time"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="confirmQuestDetails"
                    className="mr-2"
                  />
                  <label
                    htmlFor="confirmQuestDetails"
                    className="text-sm text-black"
                  >
                    Confirm and Verify Quest Details
                  </label>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    className="rounded-3xl w-full  text-gray-600 py-3 px-4 font-bold"
                    style={{
                      border: "2px solid transparent",
                      borderImage: "linear-gradient(120deg, red, yellow)",
                      borderImageSlice: 1,
                    }}
                  >
                    Confirm Meeting
                  </button>
                </div>
              </div>
            </form>
            <p className="mt-6 text-center text-sm text-black">
              By signing up, you agree to Cnkav <br />
              <Link
                to="termsofservices"
                href="#"
                className="text-black underline hover:text-gray-400"
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
