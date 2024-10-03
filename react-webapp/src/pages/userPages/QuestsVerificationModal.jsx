import QuestsCategory from "./questsManipulations/QuestsCategory";
import { Link } from "react-router-dom";
import { questsBox1, questsBox2, editq, questButton } from "../../images";

const QuestsVerificationModal = ({ isOpen, onClose, questDetails }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black overflow-auto bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white mt-40 text-black p-8 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-black text-3xl hover:text-gray-900"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Quest Details</h2>
        <form action="">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Quest Title:
              </label>
              <QuestsCategory />
            </div>
            <div>
              <div className="w-full bg-gray-100 h-[300px] rounded-xl p-4">
                Duration: 1 <br />
                days Budget: 0€ <br /> Category : Philanthropy. <br /> Level :
                Single Star, <br /> RookiePrice: €0.00 <br /> Goal: Monthly
                Recurring Task(same tasks recurring each month including the
                payment for the task). <br /> Style : Remote
              </div>
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
                placeholder="Select Time"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="confirmQuestDetails"
                className="mr-2"
              />
              <label htmlFor="confirmQuestDetails" className="text-sm">
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
  );
};

export default QuestsVerificationModal;
