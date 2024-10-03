import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "flowbite-react";
import { cameraIcon } from "../../images";
import api from "../../lib/api";

export default function Component({ isModal, toggleModal }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const [isLoading, setIsloading] = useState(false);
  const userToken = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    company_name: "",
    company_website: "",
    phone_number: "",
    size_and_revenue: "",
    product_image: "",
    pending: true,
    user_id: userToken.id,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);
    try {
      const resp = await api.post(
        "/product_request/create",
        JSON.stringify(formData),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toggleModal("closed");
      setIsloading(false);
    } catch (error) {
      toggleModal("closed");
      setIsloading(false);
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center text-center">
      <Modal show={isModal} onClose={() => toggleModal("closed")}>
        <div className="bg-black flex flex-col justify-end items-end px-4 md:px-12">
          <button
            onClick={() => toggleModal("closed")}
            className="text-white text-2xl font-bold mt-4"
          >
            &times;
          </button>
        </div>
        <div className="bg-black flex flex-col items-center justify-center pt-4">
          <div className="mx-6">
            <button className="text-2xl font-bold mb-2 mt-2">
              Request Affiliate Products
            </button>
            <p className="mb-4">Request for potential listing of a product.</p>
          </div>

          <div className="bg-black text-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <section className="bg-black shadow-md rounded-lg mb-8">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 text-black border-gray-300 rounded-lg"
                    required
                    placeholder="Full name"
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 text-black border-gray-300 rounded-lg"
                    required
                    placeholder="Email"
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 text-black border-gray-300 rounded-lg"
                    required
                    placeholder="Company name"
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="url"
                    name="company_website"
                    value={formData.company_website}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 text-black border-gray-300 rounded-lg"
                    required
                    placeholder="Company Website"
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 text-black border-gray-300 rounded-lg"
                    required
                    placeholder="Phone Number"
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    name="size_and_revenue"
                    value={formData.size_and_revenue}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 text-black border-gray-300 rounded-lg"
                    required
                    placeholder="Typical Client size and revenue (Annual Revenue)"
                  />
                </div>

                <div className="mb-4 relative flex items-center">
                  <input
                    type="text"
                    name="product_image"
                    value={formData.product_image}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 text-black border-gray-300 rounded-lg"
                    required
                    placeholder="Photo Image"
                  />
                  <img
                    src={cameraIcon}
                    alt=""
                    className="bg-white h-10 absolute  right-4"
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-3xl w-full bg-black text-white py-3 px-4 font-bold"
                  style={{
                    border: "2px solid transparent",
                    borderImage: "linear-gradient(120deg, red, yellow)",
                    borderImageSlice: 1,
                  }}
                >
                  {isLoading ? "Loading..." : "Confirm"}
                </button>
              </form>
            </section>
          </div>
        </div>
      </Modal>
    </div>
  );
}
