import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "flowbite-react";
import { cnkavLogo } from "../../images";

const ErrorState = {
  email: "",
  fullname: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Component({ isModal, toggleModal }) {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [error, setError] = useState({
    email: "",
    fullname: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(ErrorState);

    // Reset errors
    let hasErrors = false;
    const newErrors = ErrorState;

    if (!email.trim()) {
      newErrors.email = "Email is required";
      hasErrors = true;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
      hasErrors = true;
    }

    if (!fullname.trim()) {
      newErrors.fullname = "Full name is required";
      hasErrors = true;
    }

    // If there are errors, update state and prevent navigation
    if (hasErrors) {
      setError(newErrors);
      return;
    }

    // Clear errors
    setError(ErrorState);

    // Prepare data and navigate
    const formData = {
      email,
      fullname,
    };

    // Debugging
    console.log("Navigating to /contact-step2 with state:", formData);

    navigate("#/contact-step2", { state: formData });
    toggleModal("contact-modal2");
    setEmail("");
    setFullname("");
  };

  const emaiHandler = (e) => {
    setEmail(e.target.value);
  };

  const nameHandler = (e) => {
    setFullname(e.target.value);
  };

  return (
    <div className="w-full h-full flex justify-center items-center text-center">
      <Modal show={isModal} onClose={() => toggleModal("closed")} className="">
        <div className="bg-black flex flex-col justify-end items-end px-4 md:px-12">
          <button
            onClick={() => toggleModal("closed")}
            className="text-white text-2xl font-bold mt-4"
          >
            &times;
          </button>
        </div>
        <div className="bg-black flex flex-col items-center justify-center py-4 pb-8">
          <div>
            <img src={cnkavLogo} alt="cnkav logo" className="h-36 img-fluid" />
          </div>
          <div className="bg-black text-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                  {error.email && (
                    <span className="text-red-600 font-normal">
                      {" "}
                      *{error.email}
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
                  placeholder="Enter Email"
                  onChange={emaiHandler}
                />
              </div>
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium mb-2"
                >
                  Fullname
                  {error.fullname && (
                    <span className="text-red-600 font-normal">
                      {" "}
                      *{error.fullname}
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullname}
                  className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
                  placeholder="Name and Surname"
                  onChange={nameHandler}
                />
              </div>
              <div className="pt-6">
                <button
                  onSubmit={handleSubmit}
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
