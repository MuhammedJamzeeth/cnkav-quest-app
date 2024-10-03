import React, { useState } from "react";
import axios from "axios";
import { arrowIcon } from "../../images";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa6";

export default function ExclusiveRoomSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({ planName: "", price: 0 });
  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    user_id: "test",
    password: "",
  });
  const [error, setError] = useState({ name: "", email: "", password: "" });
  const [paymentMethod, setPaymentMethod] = useState("standard");
  const [isLoading,setIsloading]=useState(false)
  const navigate = useNavigate();
  const handlePlanSelection = (planName, price) => {
    setSelectedPlan({ planName, price });
    setIsModalOpen(true);
  };

  const toggleModal = (action) => {
    setIsModalOpen(action === 'open');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, user_id, password } = formInput;
    const { price } = selectedPlan;

    if (!name || !email || !price || !user_id || !password) {
      setError({
        name: !name ? "Name is required" : "",
        email: !email ? "Email is required" : "",
        password: !password ? "Password is required" : "",
      });
      return;
    }

    setError({ name: "", email: "", password: "" });

    try {
      setIsloading(true)
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("price", price);
      formData.append("user_id", user_id);

      let response;
      if (paymentMethod === "standard") {
        response = await axios.post(
          "https://backend.cnkav.com/auth/create-checkout-session",
          formData
        );
      } else if (paymentMethod === "crypto") {
        response = await axios.post(
          "https://backend.cnkav.com/pay/create-onramp-session",
          formData
        );
        console.log("response", response);
      }

      if (response.status === 200) {
        console.log("res",response.data)
        window.location.href = response.data.hosted_url;
        setFormInput({ name: "", email: "", user_id: "", password: "" });
        setSelectedPlan({ planName: "", price: 0 });
        setIsModalOpen(false);
      } else {
        console.error("Error:", response.data.error);
      }

    } catch (error) {
      // Handle error
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error("Error response:", error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        console.error("Error request:", error.request);
      } else {
        // Something else caused an error
        console.error("Error message:", error.message);
      }
    }finally{
      setIsloading(false)
    }
  };

  return (
    <section className="md:p-[1.5rem]" id="exclusive-room">
      <div className=" md:py-30 py-40 md:p-5 mx-auto text-center space-y-4">
        <h1 className=" md:text-[64px] text-[38px] font-extrabold">Exclusive Rooms</h1>
        <h2 className="md:text-[22px] text-[18px] font-semibold">
          Experience Superior Communication
        </h2>
        <p className="text-[16px] regular text-gray-200 md:px-16">

          Welcome to Exclusive Room - your gateway to an elite virtual
          experience. We have curated a perfect environment for intellectual
          exchanges in our exceptional chat rooms, guaranteeing tasteful
          discussions among a community of distinguished <br /> members.
        </p>

        <div className="mt-3 flex justify-center">
          <Link
            className="hidden md:flex items-center border-2 border-red-500 px-8 py-3 rounded-md text-white transition-transform duration-300 ease-in-out transform hover:scale-105"
            onClick={() => handlePlanSelection("Exclusive Room", 499.99)}
          >
            <span>Secure my Place</span>
           <FaArrowUp className="h-6 ml-2 transition-transform duration-300 ease-in-out transform hover:translate-x-1 rotate-45 group-hover:rotate-90" />

          </Link>
        </div>
      </div>
      {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            onClick={() => toggleModal("close")}
          >
            <div
              className="bg-white p-6 rounded shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-[24px] text-black items-start font-semibold mb-4 py-4 px-4">
                Selected Plan{" "}
                <strong className="text-[#0D9F6E]">
                  {selectedPlan.planName}
                </strong>{" "}
                <strong className="text-[#000000]">
                  {selectedPlan.price} {""} /Month
                </strong>
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm text-gray-700">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formInput.name}
                    onChange={handleChange}
                    className="w-full p-2 border text-sm text-black border-gray-300 rounded mt-1 outline-none"
                  />
                  {error.name && <p className="text-red-500">{error.name}</p>}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm text-gray-700"
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formInput.email}
                    onChange={handleChange}
                    className="w-full p-2 border text-sm text-black border-gray-300 rounded mt-1 outline-none"
                  />
                  {error.email && <p className="text-red-500">{error.email}</p>}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formInput.password}
                    onChange={handleChange}
                    className="w-full p-2 border text-sm text-black border-gray-300 rounded mt-1 outline-none"
                  />
                  {error.password && (
                    <p className="text-red-500">{error.password}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-gray-700">
                    Payment Method:
                  </label>
                  <div className="flex space-x-4 mt-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("standard")}
                      className={`py-2 px-4 rounded-lg border ${
                        paymentMethod === "standard"
                          ? "bg-blue-500 text-white"
                          : "bg-white text-black border-gray-300"
                      }`}
                    >
                      Pay & Confirm
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("crypto")}
                      className={`py-2 px-4 rounded-lg border ${
                        paymentMethod === "crypto"
                          ? "bg-blue-500 text-white"
                          : "bg-white text-black border-gray-300"
                      }`}
                    >
                      Pay with Crypto
                    </button>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    disabled={isLoading}
                    type="submit"
                    className={`bg-white text-black py-2 border border-black rounded-[8px] px-4 hover:scale-105 hover:text-white hover:bg-black ${
                      isLoading ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                  >
                    {paymentMethod === "crypto"
                      ? "Proceed with Crypto"
                      : "Pay & Confirm"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
    </section>
  );
}
