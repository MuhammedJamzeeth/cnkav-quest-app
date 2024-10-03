import React, { useState } from "react";
import { cameraIcon } from "../../images";

const AffiliateProductModal = ({ setAffiliateProductModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyType: "",
    website: "",
    phone: "",
    clientSize: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle the form submission
    alert("Message sent! We will get back to you soon.");
    // Reset form data
    setFormData({
      name: "",
      email: "",
      companyType: "",
      website: "",
      phone: "",
      clientSize: "",
    });
  };

  return (

    <div className="fixed inset-0 bg-black bg-opacity-50  items-center justify-center z-50 overflow-auto">
      <div className="flex flex-col md:mx-[30%] bg-black px-[10px] ">
        <div className="text-right md:mt-20 mt-10">
          <button
            onClick={() => setAffiliateProductModal(false)}
            className="text-3xl text-white mr-4"
          >
            &times;
          </button>
        </div>
        <div className="mx-6">
          <button className="text-2xl font-bold mb-6 mt-10">
            Request Affiliate Products
          </button>
          <p className="mb-10">Request for potential listing of an product.</p>
          <p>
            Steps are for listing after requesting , listing payments and
            commissions and contracts. Also, after that process you paying the
            commissions for the clients on the platform that sell as an
            affiliate on sale.
          </p>
        </div>

        <section className="bg-black shadow-md rounded-lg p-6 mb-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="name"
                value={formData.name}
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
                name="companyType"
                value={formData.companyType}
                onChange={handleInputChange}
                className="w-full p-3 border-2 text-black border-gray-300 rounded-lg"
                required
                placeholder="Company name"
              />
            </div>

            <div className="mb-4">
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full p-3 border-2 text-black border-gray-300 rounded-lg"
                required
                placeholder="Company Website"
              />
            </div>

            <div className="mb-4">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-3 border-2 text-black border-gray-300 rounded-lg"
                required
                placeholder="Phone Number"
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                name="clientSize"
                value={formData.clientSize}
                onChange={handleInputChange}
                className="w-full p-3 border-2 text-black border-gray-300 rounded-lg"
                required
                placeholder="Typical Client size and revenue (Annual Revenue)?"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="clientSize"
                // value={formData.clientSize}
                onChange={handleInputChange}
                className="w-full p-3 border-2 text-black border-gray-300 rounded-lg"
                required
                placeholder="Photo Image"
              />
              <img
                src={cameraIcon}
                alt=""
                className="bg-white h-10 relative -top-12 left-[87%]"
              />
            </div>

            <button
              to=""
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
          </form>
        </section>
      </div>
    </div>

  );
};

export default AffiliateProductModal;
