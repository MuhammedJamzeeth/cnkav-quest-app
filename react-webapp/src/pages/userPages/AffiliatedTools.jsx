import React, { useState } from "react";
import { Link } from "react-router-dom";
import AffiliateProductModal from "./AffiliateProductModal";
import AffiliMarketLinkModal from "./AffiliMarketLinkModal";
import AffiliatePModal from "./AffiliatePModal";

import { waveInflue, waveCnkav, waveER } from "../../images";

const AffiliatedTools = () => {
  const [isAffiliateProductModal, setAffiliateProductModal] = useState(false);
  const [isAffiliMarketLinkModal, setAffiliMarketLinkModal] = useState(false);

  const [isAffiliatePModal, setisAffiliatePModal] = useState(false);

  const toggleModal = (type) => {
    if (type === "closed") {
      // setisLoginModal(false);
      setisAffiliatePModal(false);
    }

    //
    if (type === "affiliate") {
      setisAffiliatePModal(true);
    }
  };

  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropd, setShowDropd] = useState(false);
  const [category, setCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [edit, setEdit] = useState("");

  const categories = [
    { name: "FreeTier", id: "prod_Qu6ElV2W7zDAnB" },
    { name: "Cnkav Subscription", id: "prod_QtoYGxBJEUJS50" },
    { name: "Exclusive Room Subscription", id: "prod_QtoXaaPyqNKvb2" },
    { name: "nfluewave Subscription", id: "prod_QtoVFUhUo4GRdy" },
  ];

  const editdelete = ["Add", "Edit", "Delete"];

  const handleInputClick = () => {
    setShowDropdown(!showDropdown);
  };
  const handleeditInputClick = () => {
    setShowDropd(!showDropd);
  };

  const handleOptionClick = (option) => {
    setCategory(option);
    setShowDropdown(false);
  };
  const handleoptionClick = (option) => {
    setEdit(option);
    setShowDropd(false);
  };

  return (
    <div className="min-h-screen py-2  bg-black ">
      <div className="flex flex-col justify-center items-center mt-32">
        <form className="space-y-4 w-full md:w-[37.5%] mx-auto md:py-32">
          {/* <div>
            <select
              id="selectOptions"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="" disabled selected>
                Select Options
              </option>
              <option value="option1">Influewave Subscription</option>
              <option value="option2">Cnkav Subscription</option>
              <option value="option3">Exclusive Room Subscription</option>
            </select>
          </div> */}

          <div className="relative mb-4">
            <input
              type="text"
              id="questName"
              // value={category.id}
              onClick={handleInputClick}
              readOnly
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder={
                category.id
                  ? category.name
                  : "Select Affiliate Marketing Product"
              }
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg
                class=" h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>

            {showDropdown && (
              <ul className="absolute z-10 bg-white border text-black border-gray-900  mt-1 rounded-lg w-full">
                {categories.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className="cursor-pointer  px-2 pt-[4px] pb-[4px] hover:bg-gray-200 hover:text-black"
                  >
                    {option.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div class="h-16 grid grid-cols-3 gap-1 content-evenly ...">
            <div>
              <Link>
                <button
                  type="button"
                  className="text-white-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 p-2.5 items-center"
                  // onClick={() => setAffiliateProductModal(!isAffiliateProductModal)}
                  to="#/affiliate"
                  onClick={() => {
                    toggleModal("affiliate");
                  }}
                >
                  Request Product
                </button>
              </Link>
            </div>

            <div>
              <button
                type="button"
                className="text-white-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 p-2.5 items-center"
                onClick={() =>
                  setAffiliMarketLinkModal(!isAffiliMarketLinkModal)
                }
              >
                Generate Links
              </button>
            </div>
            <div className="relative mb-4">
              <input
                type="text"
                id="questName"
                value={edit}
                onClick={handleeditInputClick}
                readOnly
                className=" border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-300 block w-full p-2.5"
                placeholder="Affiliate Options"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                  className=" h-5 w-5 text-blue-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>

              {showDropd && (
                <ul className="absolute z-10 bg-white border text-black border-blue-900  mt-1 rounded-lg w-full">
                  {editdelete.map((option, index) => (
                    <li
                      key={index}
                      onClick={() => handleoptionClick(option)}
                      className="cursor-pointer px-2 pt-[4px] pb-[4px] hover:bg-red-200 hover:text-black"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {/* <div>
            <select
              id="affiliateLinks"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="" disabled selected>
                Affiliate marketing links Option (Edit/Delete)
              </option>
              <option value="edit">Edit</option>
              <option value="delete">Delete</option>
            </select>
          </div> */}
        </form>

        <div className="w-full md:w-[30%] p-5 mb-3">
          <img src={waveCnkav} alt="" className="" />

          <div className="p-2">
            <p className="text-xl">Cnkav Subscription</p>
            <p>€199.99/ month</p>
          </div>
        </div>

        <div className="w-full md:w-[30%] p-5 mb-3">
          <img src={waveER} alt="" className="w-full" />

          <div className="p-2">
            <p className="text-xl">Exclusive Room Subscription</p>
            <p>€499.99/ month</p>
          </div>
        </div>

        <div className="w-full md:w-[30%] p-5 mb-3">
          <img src={waveInflue} alt="" className="w-full" />

          <div className="p-2">
            <p className="text-xl">Influwave Subscription</p>
            <p>49.99/ month</p>
          </div>
        </div>
        {/* <img src={waveInflue} alt="" className="w-3/5 py-5" /> */}

        <section className="flex justify-center items-center py-4  px-8">
          <button
            disabled
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              role="status"
              class="inline w-4 h-4 me-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            Load More
          </button>
        </section>
      </div>
      {/* {isAffiliateProductModal && (
        <AffiliateProductModal
          setAffiliateProductModal={setAffiliateProductModal}
        />
      )} */}
      {isAffiliMarketLinkModal && (
        <AffiliMarketLinkModal
          productId={category.id}
          setAffiliMarketLinkModal={setAffiliMarketLinkModal}
        />
      )}

      <AffiliatePModal isModal={isAffiliatePModal} toggleModal={toggleModal} />
    </div>
  );
};

export default AffiliatedTools;
