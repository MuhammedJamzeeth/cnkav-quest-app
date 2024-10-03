import React, { useState } from "react";

const AffiliateProductRequestPage = () => {
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
    <div className="container mx-auto p-8">
      <button className="text-2xl font-bold mb-6 mt-10">
            Request Affiliate Products
          </button>
      <p className="mb-4">
        In This Page You Will You Will Request To List Your Product As An
        Affiliate.
      </p>
      <ol className="list-decimal list-inside mb-8">
        <li>Request And Wait For Response.</li>
        <li>Listing Payment And Commission Deals.</li>
        <li>Contracts And Commission Payments For Affiliates On Sale.</li>
      </ol>

      <section className="bg-black shadow-md rounded-lg p-6 mb-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Name and Surname
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border-2 text-black border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Business Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border-2 text-black border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Company Type
            </label>
            <input
              type="text"
              name="companyType"
              value={formData.companyType}
              onChange={handleInputChange}
              className="w-full p-3 border-2 text-black border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Company Website
            </label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              className="w-full p-3 border-2 text-black border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-3 border-2 text-black border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              What Is Your Typical Client Size (Annual Revenue)?
            </label>
            <input
              type="text"
              name="clientSize"
              value={formData.clientSize}
              onChange={handleInputChange}
              className="w-full p-3 border-2 text-black border-gray-300 rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4  hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default AffiliateProductRequestPage;
