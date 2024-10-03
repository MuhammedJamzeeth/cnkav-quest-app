import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  googleLogo,
  facebookLogo,
  appleLogo,
  cnkavLogo,
  signupbg,
} from "../../images";
import { useNavigate } from "react-router-dom";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { FaApple } from "react-icons/fa";
import useInputHandler from "../../hooks/useInputHandler.jsx";
import useAuthHandler from "../../hooks/useAuthHandler.jsx";

// export default function JoinUsModal({ isModal, setModal }) {

//   const navigate = useNavigate();
//   return (
//     <>
//       {isModal && (
//         <div className="absolute h-[90vh] overflow-auto inset-0 flex items-center justify-center joinModal bg-transparent">
//           <div
//             className="  bg-black opacity-50"
//             onClick={() => setModal(false)}
//           ></div>
//           {/* <div className="relative bg-black rounded-lg shadow-lg p-8 z-10 max-w-md w-full mx-4 md:mx-0" style={{ backgroundImage: `url(${signupbg})`, backgroundSize: 'cover' }}>
//             */}
//              <div className="relative bg-black rounded-lg shadow-lg p-8 z-10 max-w-xl w-full mx-4 md:mx-0"

//           style={{
//             backgroundImage: `url(${signupbg})`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             backgroundRepeat: 'no-repeat',
//             height:'100%',
//             opacity: 0.5
//           }}
//           >

//             <div className="flex items-center justify-center ">
//               <img src={cnkavLogo} alt="" className="h-20" />
//             </div>
//             <h2 className="text-white text-4xl font-bold py-3 ">
//               Create A Personal Account
//             </h2>
//             <form>
//               <div className="mb-4">
//                 <label
//                   className="block text-white text-sm mb-2"
//                   htmlFor="username"
//                 >
//                   User Name
//                 </label>
//                 <input
//                   type="text"
//                   id="username"
//                   className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white"
//                   placeholder="Enter User Name"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label
//                   className="block text-white text-sm mb-2"
//                   htmlFor="password"
//                 >
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white"
//                   placeholder="At least 8 characters"
//                 />
//               </div>
//               <div className="mb-6">
//                 <label
//                   className="block text-white text-sm mb-2"
//                   htmlFor="confirmation-code"
//                 >
//                   Confirmation Code
//                 </label>
//                 <input
//                   type="text"
//                   id="confirmation-code"
//                   className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white"
//                   placeholder="Enter To Join Code"
//                 />
//               </div>
//               <button
//                 onClick={() =>
//                   navigate("/questModals")
//                 }
//                 type="submit"
//                 className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
//               >
//                 Sign Up
//               </button>
//             </form>

//             <div className="mt-4">
//               <button
//                 className="w-full text-white py-3 rounded-lg font-bold flex items-center justify-center mb-2 transition"
//                 style={{
//                   backgroundColor: "transparent",
//                   border: "2px solid transparent",
//                   borderImage: "linear-gradient(120deg, red, yellow) 1",
//                 }}
//               >
//                 <img src={googleLogo} alt="Google" className="w-6 h-6 mr-2" />
//                 Sign up with Google
//               </button>
//               <button
//                 className="w-full text-white py-3 rounded-lg font-bold flex items-center justify-center mb-2 transition"
//                 style={{
//                   backgroundColor: "transparent",
//                   border: "2px solid transparent",
//                   borderImage: "linear-gradient(120deg, red, yellow) 1",
//                 }}
//               >
//                 <img
//                   src={facebookLogo}
//                   alt="Facebook"
//                   className="w-6 h-6 mr-2"
//                 />
//                 Sign up with Facebook
//               </button>
//               <button
//                 className="w-full text-white py-3 rounded-lg font-bold flex items-center justify-center transition"
//                 style={{
//                   backgroundColor: "transparent",
//                   border: "2px solid transparent",
//                   borderImage: "linear-gradient(120deg, red, yellow) 1",
//                 }}
//               >
//                 <img src={appleLogo} alt="Apple" className="w-6 h-6 mr-2" />
//                 Sign up with Apple
//               </button>
//             </div>

//             <div className="text-center">
//               <button className="py-6 ">
//                 <p>
//                   Don't you have an account?{" "}
//                   <span className=" text-blue-700">Sign up</span>
//                 </p>
//               </button>
//               <button>
//                 <p>
//                   Already Have An Account?{" "}
//                   <a href="/login" className="underline text-blue-700">
//                     Log in
//                   </a>
//                 </p>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

const InitiateState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  customer_id: "",
};

export default function Component({ isModal, toggleModal }) {
  const { handleChange, formInput } = useInputHandler(InitiateState);
  const { handleSignup, error, registerSuccess, setRegisterSuccess } =
    useAuthHandler(formInput);
  const navigate = useNavigate();

  if (registerSuccess) {
    setRegisterSuccess(false);
    navigate("#/login");
    toggleModal("open-login");
  }

  return (
    <div>
      <Modal show={isModal} onClose={() => toggleModal("closed")}>
        <div
          // className="space-y-6 h-[90vh]  p-8 rounded-md "
          className="space-y-6 h-[100%] w-full py-2 px-4 md:px-8 pt-2 pb-6 rounded-md "
          style={{
            backgroundImage: `url(${signupbg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundColor: "rgba(0, 0, 0, 0.8)", // Black overlay with 50% opacity
            backgroundBlendMode: "overlay",
            // overflowY: "scroll",
          }}
        >
          <div className="flex items-start w-full justify-between">
            <div className="">
              <h2 className="md:px-10 text-white text-2xl md:text-[46px] leading-none font-bold">
                Create A Personal <br /> Account
              </h2>

              {/* <button
              onClick={() => toggleModal("closed")}
              className="text-white text-2xl font-bold"
            >
              &times;
            </button> */}
            </div>
            <button
              onClick={() => toggleModal("closed")}
              className="text-white text-2xl font-bold"
            >
              &times;
            </button>
          </div>
          {/* <h2 className="px-10 text-white text-2xl md:text-5xl font-bold py-3 ">
            Create A Personal Account
          </h2> */}

          <form className="md:px-10" onSubmit={handleSignup}>
            <div className="mb-4">
              <label className="block text-white text-sm mb-2" htmlFor="name">
                Name{" "}
                {error.name && (
                  <span className="text-red-500 text-sm">*{error.name}</span>
                )}
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 border border-gray-700 rounded bg-transparent text-white"
                placeholder="Enter your name"
                name="name"
                value={formInput.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-white text-sm mb-2"
                htmlFor="username"
              >
                Email{" "}
                {error.email && (
                  <span className="text-red-500 text-sm">*{error.email}</span>
                )}
              </label>
              <input
                type="text"
                id="username"
                className="w-full p-3 border border-gray-700 rounded bg-transparent text-white"
                placeholder="Example@email.com"
                name="email"
                value={formInput.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm mb-2"
                htmlFor="password"
              >
                Password{" "}
                {error.password && (
                  <span className="text-red-500 text-sm">
                    *{error.password}
                  </span>
                )}
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-3 border border-gray-700 rounded bg-transparent text-white"
                placeholder="At least 8 characters"
                name="password"
                value={formInput.password}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-white text-sm mb-2"
                htmlFor="confirmation-code"
              >
                Confirmation Password{" "}
                {error.confirmPassword && (
                  <span className="text-red-500 text-sm">
                    *{error.confirmPassword}
                  </span>
                )}
              </label>
              <input
                type="password"
                id="confirmation-code"
                className="w-full p-3 border border-gray-700 rounded bg-transparent text-white"
                placeholder="Enter to confirm Password"
                name="confirmPassword"
                value={formInput.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full text-white py-3 rounded-lg font-bold flex items-center justify-center mb-2 transition"
                style={{
                  backgroundColor: "transparent",
                  border: "2px solid transparent",
                  borderImage: "linear-gradient(120deg, red, yellow) 1",
                }}
              >
                Sign up
              </button>
            </div>
          </form>
          <div className=" flex items-center md:w-[70%] w-[85%] mx-auto">
            <div
              className="px-8 text-[#CFDFE2]"
              style={{ flex: 1, height: ".5px", backgroundColor: "white" }}
            ></div>
            <p className="text-[#CFDFE2] px-4">or</p>
            <div
              className="px-8 text-[#CFDFE2]"
              style={{ flex: 1, height: ".5px", backgroundColor: "white" }}
            ></div>
          </div>

          <div className="mt-4 flex flex-col items-center">
            {/* <button
              className="w-[60%] text-white py-3 rounded-lg font-bold flex items-center justify-center mb-2 transition"
              style={{
                backgroundColor: 'transparent',
                border: '2px solid transparent',
                borderImage: 'linear-gradient(120deg, red, yellow) 1',
              }}
            >
              <img src={facebookLogo} alt="Facebook" className="w-6 h-6 mr-2" />
              Sign up with Facebook
            </button> */}
            <Link to="#/login" onClick={() => toggleModal("open-login")}>
              <button>
                <p>
                  Already Have An Account?{" "}
                  <span className="underline text-blue-700 cursor-pointer">
                    Log in
                  </span>
                </p>
              </button>
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
}
