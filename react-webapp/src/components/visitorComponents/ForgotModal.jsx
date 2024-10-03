import React from "react";
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

  return (
    <div className="">
      <Modal show={isModal} onClose={() => toggleModal("closed")} className="">
        <div className="  bg-black px-2  md:py-8 md:px-8 rounded-md w-full h-[100vh] justify-center items-center text-center">
          <div className="flex justify-end">
            <button
              onClick={() => toggleModal("closed")}
              className="text-white text-2xl font-bold"
            >
              &times;
            </button>
          </div>
          <div className="flex flex-col w-full h-[100%] justify-center items-center text-center">
            <div className="flex justify-center pb-4">
              <img src={cnkavLogo} alt="Logo" className="h-24 w-24" />
            </div>
            <form className=" w-full">
              <div className="mb-4">
                <label
                  className="block text-white text-sm mb-2 w-full"
                  htmlFor="username"
                >
                  Password Reset Request
                </label>
                <input
                  type="text"
                  id="email"
                  className="w-full p-3 border  rounded-lg bg-white text-[#575757]"
                  placeholder="Enter Email"
                />
              </div>

              <div className="flex justify-center">
                <button
                  className="w-full text-white py-3 rounded-lg font-bold flex items-center justify-center mb-2 transition"
                  style={{
                    backgroundColor: "transparent",
                    border: "2px solid transparent",
                    borderImage: "linear-gradient(120deg, red, yellow) 1",
                  }}
                >
                  Request New Password
                </button>
              </div>
            </form>

            <div className="py-6 w-full">
              <p className="text-center text-white text-sm ">
                By signing up, you agree to Cnkav's ,
              </p>
              <p className="text-center text-white text-sm">
                <a href="/terms-of-services" className="underline ">
                  Terms and Conditions
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
