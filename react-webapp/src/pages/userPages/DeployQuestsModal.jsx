import React from "react";
import { Link } from "react-router-dom";
import { cameraIcon, cnkavLogo } from "../../images";

const DeployQuestsModal = ({ setDeployQuestsModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-black p-8 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={() => setDeployQuestsModal(false)}
          className="absolute top-4 right-4 text-white hover:text-gray-400 text-2xl"
        >
          &times;
        </button>
        <div className="flex justify-center mb-6">
          <img src={cnkavLogo} alt="Cnkav Logo" className="h-16" />
        </div>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="plugin-title"
              className="block text-sm font-medium text-white mb-2"
            >
              Give Your Plugin Brief Title
            </label>
            <input
              type="text"
              id="plugin-title"
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-white text-black placeholder-gray-500"
              placeholder="Enter title"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-white text-black placeholder-gray-500"
              placeholder="Enter description"
              rows="4"
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-white text-blackplaceholder-gray-500"
              placeholder="Enter category"
            />
          </div>
          <div>
            <label
              htmlFor="release-date"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Release Date
            </label>
            <input
              type="date"
              id="release-date"
              className="w-full px-4 py-2 rounded-xl border border-gray-600 rounded-lgbg-white text-black placeholder-gray-500"
            />
          </div>
          <div>
            <label
              htmlFor="company-name"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Company Name (If applicable)
            </label>
            <input
              type="text"
              id="company-name"
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-white text-blackplaceholder-gray-500"
              placeholder="Enter company name or individual"
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Price
            </label>
            <input
              type="text"
              id="price"
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-white text-blackplaceholder-gray-500"
              placeholder="Enter price"
            />
          </div>
          <div className="relative">
            <label
              htmlFor="file-upload"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Upload App Files
            </label>
            <input
              type="text"
              id="file-upload"
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-white text-black placeholder-gray-500"
            />
            <label
              htmlFor="plugin-image"
              className="block text-sm font-medium text-gray-300 mt-4 mb-2"
            >
              Plugin Image
            </label>
            <input
              type="text"
              id="plugin-image"
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-white text-black placeholder-gray-500"
            />
            <img
              src={cameraIcon}
              alt="Upload Icon"
              className="absolute top-3/4 right-3 h-8 text-gray-300"
            />
          </div>
          <div className="pt-6">
            <button
              type="submit"
              className="w-full px-4 py-3 bg-black text-white font-bold rounded-full"
              style={{
                border: "2px solid transparent",
                borderImage: "linear-gradient(120deg, red, yellow)",
                borderImageSlice: 1,
              }}
            >
              Confirm
            </button>
          </div>
          <p className="text-center text-sm text-gray-400 mt-6">
            By signing up, you agree to Cnkav{" "}
            <Link
              to="/termsofservices"
              className="text-blue-500 underline hover:text-blue-700"
            >
              Terms and Conditions
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default DeployQuestsModal;
