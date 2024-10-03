import React, { useEffect, useState } from "react";
import axios from "axios";
import { greenCheck, price1Image, price2Image } from "../../images";
import { Link, useNavigate } from "react-router-dom";
import api from "../../lib/api";

export default function PricingSection() {
  const token = localStorage.getItem("access_token");

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
  const [isLoading, setIsloading] = useState(false);
  const [isSubscribeLoading, setIsSubscribeloading] = useState(false);

  const [subscriptionList, setSubscriptionList] = useState([]);

  const navigate = useNavigate();

  const handlePlanSelection = (planName, price) => {
    setSelectedPlan({ planName, price });
    setIsModalOpen(true);
  };

  const toggleModal = (action) => {
    setIsModalOpen(action === "open");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubscribeloading(true);

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
      setIsloading(true);
      const requestData = {
        name,
        email,
        price_id:
          selectedPlan.planName === "Influewave"
            ? "price_1Q20s1CEMBb05tfo9t6wpIaF"
            : selectedPlan.planName === "CNKAV"
            ? "price_1Q20uGCEMBb05tfoVkZciNJ5"
            : "price_1Q20v6CEMBb05tfoNiJpYAye",
        payment_method_id: "pm_1Q2FTSCEMBb05tfoPTfwVMag",

        affiliate_link:
          "https://backend.cnkav.com/dashboard/affiliatetools/slug?affiliate_id=6d485113-f037-41a5-82e3-80580d40584a",
        amount: 40,
      };

      let response;

      if (paymentMethod === "standard") {
        response = await api.post(
          // "/user/action/affiliate/subscribe",
          "/user/action/subscribe",

          requestData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (paymentMethod === "crypto") {
        response = await api.post("/pay/create-onramp-session", requestData);
      }

      if (response.status === 200) {
        alert("Subscripted successfully");
        console.log("Subscription success:", response.data);
        setIsSubscribeloading(false);
        if (response.data.payment_url) {
          window.location.href = response.data.payment_url; // Redirect to payment gateway
        }
        setFormInput({ name: "", email: "", user_id: "", password: "" });
        setSelectedPlan({ planName: "", price: 0 });
        setIsModalOpen(false);
      } else {
        console.error("Error:", response.data.error);
        setIsSubscribeloading(false);
      }
    } catch (error) {
      setIsSubscribeloading(false);
      if (error.response) {
        console.error("Error response:", error.response.data);
        setIsSubscribeloading(false);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
        setIsSubscribeloading(false);
      }
    } finally {
      setIsloading(false);
      setIsSubscribeloading(false);
    }
  };

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const resp = await api.get("/user/list/subscriptions", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log(resp);
        setSubscriptionList(resp.data.subscriptions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSubscriptions();
  }, []);

  return (
    <div className="test mt-5">
      {/* <a
        className="donate-with-crypto"
        href="https://commerce.coinbase.com/checkout/e35069ce-2c48-477e-81e1-cce71fb58a4b"
        target="_blank"
      >
        Donate with Crypto
      </a> */}

      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#141414] p-4 rounded-xl shadow-lg">
            <div className="flex items-baseline justify-between">
              <h2 className="text-2xl font-semibold mb-4 p-2">Influewave</h2>
              <button className="border border-green-500 text-green-500 rounded-lg p-2 outline-none m-2 transition-transform duration-300 ease-in-out transform hover:scale-110">
                most popular
              </button>
            </div>
            <div className="flex pt-10 justify-center items-center m-4 flex-col">
              <img
                src={price1Image}
                alt="Shoes"
                className="h-20 object-cover mb-4"
              />
              <h2 className="text-xl font-bold m-4 text-gray-400">
                <span className="text-white text-4xl">€49.99</span>{" "}
                <span className="text-[#858585]">/month</span>
              </h2>
              <p className="text-[#858585]">
                Suitable for Individual looking to foster growth and income.
              </p>
              <button
                className="w-full m-4 text-center text-white py-3 px-2 rounded-lg hover:bg-white hover:text-black border border-white text-xl font-bold transition-transform duration-300 ease-in-out transform hover:scale-105"
                onClick={() => handlePlanSelection("Influewave", 49.99)}
              >
                Subscribe
              </button>
            </div>
            <div className="my-4 border-t border-gray-300"></div>
            <h2 className="text-lg font-semibold mb-2">Plan Features</h2>
            <ul className="list-none space-y-4 opacity-50">
              <li className="flex items-center space-x-2">
                <img
                  src={greenCheck}
                  className="rounded-full h-4"
                  alt="Checkmark"
                />
                <span className="text-[#858585]">
                  Full access to our vibrant community
                </span>
              </li>
              <li className="flex items-baseline space-x-2">
                <img
                  src={greenCheck}
                  className="rounded-full h-4"
                  alt="Checkmark"
                />
                <span className="text-[#858585]">
                  {" "}
                  Get invitations to exciting community events.{" "}
                </span>
              </li>
              <li className="flex items-baseline space-x-2">
                <img
                  src={greenCheck}
                  className="rounded-full h-4"
                  alt="Checkmark"
                />
                <span className="text-[#858585]">
                  Ability to request any type of task using our quest feature.
                </span>
              </li>
              <li className="flex items-baseline space-x-2">
                <img
                  src={greenCheck}
                  className="rounded-full h-4"
                  alt="Checkmark"
                />
                <span className="text-[#858585]">
                  Quests Board: View all available quests for free and make
                  informed decisions before requesting a task.
                </span>
              </li>
              <li className="flex items-baseline space-x-2">
                <img
                  src={greenCheck}
                  className="rounded-full h-4"
                  alt="Checkmark"
                />
                <span className="text-[#858585]">
                  Money-back guarantee: Enjoy the peace of mind with our 7-day,
                  no-questions-asked refund policy on your first purchase.
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-[#141414] p-4 rounded-xl shadow-lg">
            <div className="flex items-baseline justify-between">
              <h2 className="text-2xl font-semibold mb-4 p-8">CNKAV</h2>
            </div>
            <div className="flex justify-center items-center m-4 flex-col">
              <img
                src={price2Image}
                alt="Shoes"
                className="h-20 object-cover mb-4"
              />
              <h2 className="text-xl font-bold m-4 text-gray-400">
                <span className="text-white text-4xl">€199.99</span>{" "}
                <span className="text-[#858585]">/month</span>
              </h2>
              <p className="text-[#858585]">
                Suitable for Individual / Business looking to scale up.
              </p>
              <button
                className="w-full m-4 text-center text-white py-3 px-2 rounded-lg hover:bg-white hover:text-black border border-white text-xl font-bold transition-transform duration-300 ease-in-out transform hover:scale-105"
                onClick={() => handlePlanSelection("CNKAV", 199.99)}
              >
                Subscribe
              </button>
            </div>
            <div className="my-4 border-t border-gray-300"></div>
            <h2 className="text-lg font-semibold mb-2">Plan Features</h2>
            <ul className="list-none space-y-4 opacity-50">
              <li className="flex items-baseline space-x-2">
                <img
                  src={greenCheck}
                  className="rounded-full h-4"
                  alt="Checkmark"
                />
                <span className="text-[#858585]">
                  All the benefits of Influewave Subscription: Access to
                  community, events, quests, affiliate marketing and more.
                </span>
              </li>
              <li className="flex items-baseline space-x-2">
                <img
                  src={greenCheck}
                  className="rounded-full h-4"
                  alt="Checkmark"
                />
                <span className="text-[#858585]">
                  {" "}
                  Access to limited seasonal quests for large scale jobs{" "}
                </span>
              </li>
              <li className="flex items-baseline space-x-2">
                <img
                  src={greenCheck}
                  className="rounded-full h-4"
                  alt="Checkmark"
                />
                <span className="text-[#858585]">
                  {" "}
                  Stand out from other questers with a premium badge on your
                  profile{" "}
                </span>
              </li>
              <li className="flex items-baseline space-x-2">
                <img
                  src={greenCheck}
                  className="rounded-full h-4"
                  alt="Checkmark"
                />
                <span className="text-[#858585]">
                  {" "}
                  Possibility to become an ambassador{" "}
                </span>
              </li>
              <li className="flex items-baseline space-x-2">
                <img
                  src={greenCheck}
                  className="rounded-full h-4"
                  alt="Checkmark"
                />
                <span className="text-[#858585]">
                  {" "}
                  Dedicated support for marketing and affiliate opportunities{" "}
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-[#141414] p-4 rounded-xl shadow-lg">
            <div className="flex items-baseline justify-between">
              <h2 className="text-2xl font-semibold mb-4 p-8">
                Exclusive Room
              </h2>
            </div>
            <div className="flex justify-center items-center m-4 flex-col">
              <img
                src={price1Image}
                alt="Shoes"
                className="h-20 object-cover mb-4"
              />
              <h2 className="text-xl font-bold m-4 text-gray-400">
                <span className="text-white text-4xl">€499.99</span>{" "}
                <span className="text-[#858585]">/month</span>
              </h2>
              <p className="text-[#858585]">
                Suitable for premium members looking to build a valuable
                network.
              </p>
              <Link
                className="w-full m-4 text-center text-white py-3 px-2 rounded-lg hover:bg-white hover:text-black border border-white text-xl font-bold transition-transform duration-300 ease-in-out transform hover:scale-105"
                onClick={() => handlePlanSelection("Exclusive Room", 499.99)}
              >
                Subscribe
              </Link>
            </div>
            <div className="my-4 border-t border-gray-300"></div>
            <h2 className="text-lg font-semibold mb-2">Plan Features</h2>
            <ul className="list-none space-y-4 opacity-50">
              <li className="flex items-baseline space-x-2">
                <img
                  src={greenCheck}
                  className="rounded-full h-4"
                  alt="Checkmark"
                />
                <span className="text-[#858585]">
                  All the benefits of CNKAV Subscription: Access to community,
                  events, quests, affiliate marketing and more.
                </span>
              </li>
              <li className="flex items-baseline space-x-2">
                <img
                  src={greenCheck}
                  className="rounded-full h-4"
                  alt="Checkmark"
                />
                <span className="text-[#858585]">
                  Exclusive Room Membership: Get access to our premium
                  networking events and opportunities.
                </span>
              </li>
              <li className="flex items-baseline space-x-2">
                <img
                  src={greenCheck}
                  className="rounded-full h-4"
                  alt="Checkmark"
                />
                <span className="text-[#858585]">
                  Premium Support: Direct support from our team to help you
                  achieve your goals.
                </span>
              </li>
            </ul>
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
                    {isSubscribeLoading
                      ? "Loading..."
                      : paymentMethod === "crypto"
                      ? "Proceed with Crypto"
                      : "Pay & Confirm"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
