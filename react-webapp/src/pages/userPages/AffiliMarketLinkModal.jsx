import React, { useState } from "react";
import api from "../../lib/api";

const AffiliMarketLinkModal = ({ setAffiliMarketLinkModal, productId }) => {
  const userToken = JSON.parse(localStorage.getItem("user"));

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    link: "",
    custom_slug: "",
  });
  const [affiliateLink, setAffiliateLink] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(affiliateLink); // Copy link to clipboard
    alert("Affiliate link copied to clipboard!");
    setAffiliateLink("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      affiliate_id: "dummy-affiliate-id",
      product_id: productId,
      link: formData.link,
      custom_slug: formData.custom_slug,
      email: userToken.sub,
    };
    try {
      const resp = await api.post(
        "/affiliate/generate-link",
        JSON.stringify(data)
      );
      console.log(resp);
      if (resp.status === 200) {
        // Assuming this is the generated affiliate link
        const generatedLink = `https://backend.cnkav.com/dashboard/affiliatetools/${formData.custom_slug}?affiliate_id=${resp.data.affiliate_id}`;
        setAffiliateLink(generatedLink); // Save the generated link in state
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 items-center justify-center z-50 overflow-auto">
      <div className="flex flex-col md:mx-[30%] bg-black px-[10px]">
        <div className="text-right md:mt-20 mt-10">
          <button
            onClick={() => setAffiliMarketLinkModal(false)}
            className="text-3xl text-white mr-4"
          >
            &times;
          </button>
        </div>
        <div className="mx-6">
          <h1 className="text-2xl font-bold mb-6 mt-10">
            Generate Affiliate Product Link
          </h1>
          <p className="mb-10">
            Generate a link to start earning from affiliate marketing.
          </p>
        </div>

        <section className="bg-black shadow-md rounded-lg p-6 mb-8">
          {!affiliateLink ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 text-black border-gray-300 rounded-lg"
                  required
                  placeholder="Enter any page URL from our site"
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  name="custom_slug"
                  value={formData.custom_slug}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 text-black border-gray-300 rounded-lg"
                  required
                  placeholder="Add a new custom slug"
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
          ) : (
            <div className="text-center">
              <p className="text-white mb-4">Your affiliate link:</p>
              <div className="bg-gray-800 text-white py-2 px-4 rounded-lg mb-4">
                {affiliateLink}
              </div>
              <button
                onClick={handleCopy}
                className="rounded-3xl w-full bg-black text-white py-3 px-4 font-bold"
                style={{
                  border: "2px solid transparent",
                  borderImage: "linear-gradient(120deg, red, yellow)",
                  borderImageSlice: 1,
                }}
              >
                Copy Link
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AffiliMarketLinkModal;
