import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaChevronLeft,
  FaRightLeft,
  FaArrowUpLong,
  FaArrowDownLong,
  FaEllipsisVertical,
} from "react-icons/fa6";
import { Tabs } from "flowbite-react";
import { Dropdown } from "flowbite-react";

import ContactQModal from "../../pages/userProfileDashboard/ContactQModal";
import ContactQModal2 from "../../pages/userProfileDashboard/ContactQModal2";
import ContactQModal3 from "../../pages/userProfileDashboard/ContactQModal3";
import ContactQModal4 from "../../pages/userProfileDashboard/ContactQModal4";
import ContactQModal5 from "../../pages/userProfileDashboard/ContactQModal5";
import ContactQModal6 from "../../pages/userProfileDashboard/ContactQModal6";
import ContactQModal7 from "../../pages/userProfileDashboard/ContactQModal7";
import ContactQModal8 from "../../pages/userProfileDashboard/ContactQModal8";

const Wallet = () => {
  // Sample state for transactions and balance
  const [balance, setBalance] = useState(500.0);
  const [transactions, setTransactions] = useState([
    { id: 1, type: "Deposit", amount: 200.0, date: "2024-07-20" },
    { id: 2, type: "Purchase", amount: -50.0, date: "2024-07-19" },
    { id: 3, type: "Deposit", amount: 100.0, date: "2024-07-18" },
    { id: 4, type: "Withdrawal", amount: -30.0, date: "2024-07-17" },
  ]);

  const [isModal, setModal] = useState(false);
  const [isContactQModal, setisContactQModal] = useState(false);
  const [isContactQModal2, setisContactQModal2] = useState(false);
  const [isContactQModal3, setisContactQModal3] = useState(false);
  const [isContactQModal4, setisContactQModal4] = useState(false);
  const [isContactQModal5, setisContactQModal5] = useState(false);
  const [isContactQModal6, setisContactQModal6] = useState(false);
  const [isContactQModal7, setisContactQModal7] = useState(false);
  const [isContactQModal8, setisContactQModal8] = useState(false);

  const handleButtonClick = () => {
    navigate("/dashboard/profile");
  };

  const toggleModal = (type) => {
    if (type === "closed") {
      setisContactQModal(false);
      // setisLoginModal(false);
      setisContactQModal2(false);
      setisContactQModal3(false);
      setisContactQModal4(false);
      setisContactQModal5(false);
      setisContactQModal6(false);
      setisContactQModal7(false);
      setisContactQModal8(false);
      setModal(false);
      // setisForgotModal(false);
    }

    //
    if (type === "contactQ-modal") {
      setisContactQModal(true);
      setModal(false);
    }
    if (type === "contactQ-modal2") {
      setisContactQModal(false);
      setisContactQModal2(true);
      setModal(false);
    }
    if (type === "contactQ-modal3") {
      setisContactQModal2(false);
      setisContactQModal3(true);
      setModal(false);
    }
    if (type === "contactQ-modal4") {
      setisContactQModal3(false);
      setisContactQModal4(true);
      setModal(false);
    }
    if (type === "contactQ-modal5") {
      setisContactQModal4(false);
      setisContactQModal5(true);
      setModal(false);
    }
    if (type === "contactQ-modal6") {
      setisContactQModal5(false);
      setisContactQModal6(true);
      setModal(false);
    }
    if (type === "contactQ-modal7") {
      setisContactQModal6(false);
      setisContactQModal7(true);
      setModal(false);
    }
    if (type === "contactQ-modal8") {
      setisContactQModal7(false);
      setisContactQModal8(true);
      setModal(false);
    }
  };

  return (
    <>
      <div className="container mx-auto pt-8 ">
        <h1 className="text-4xl font-bold mb-6 mt-40 ">
          <button
            className={`flex gap-4 items-center px-2 py-2 rounded-lg font-semibold text-sm text-white text-[24px] `}
          >
            <Link to="/dashboard/profile">
              <FaChevronLeft />
            </Link>
          </button>
          Your Wallet
        </h1>

        <section className="bg-black border-2 border-gray-800 shadow-md rounded-lg p-6 mb-8 ">
          <h2 className="text-2xl font-semibold mb-4">Balance</h2>
          <div class="bg-black md:p-2 p-6 rounded-lg border border-black mb-4 lg:mb-0 shadow-md lg:w-[35%]">
            <div class="flex justify-start items-center space-x-5 h-full">
              <div>
                <h2 class="text-5xl font-bold text-gray-300">
                  <p>${balance.toFixed(2)}</p>
                </h2>
              </div>
            </div>
          </div>
          <div class="lg:flex gap-4 items-stretch">
            <div class="bg-black p-4 rounded-lg xs:mb-4 max-w-full shadow-md lg:w-[65%]">
              <div class="flex flex-wrap justify-between h-full">
                <div class="flex-1 bg-gradient-to-r from-blue-900 to-blue-600 rounded-lg flex flex-col items-center justify-center p-4 space-y-2 border border-gray-200 m-2">
                  <Link
                    to="/dashboard/choose-pay"
                    className="text-xl font-semibold"
                    state={{ data: "transfer" }}
                  >
                    <p class="text-white inline-flex">
                      <FaArrowUpLong /> Transfer
                    </p>
                  </Link>
                </div>

                <div class="flex-1 bg-gradient-to-r from-blue-900 to-blue-600 rounded-lg flex flex-col items-center justify-center p-4 space-y-2 border border-gray-200 m-2">
                  <Link
                    to="/dashboard/choose-pay"
                    state={{ data: "withdraw" }}
                    className="text-xl font-semibold"
                  >
                    <p class="text-white inline-flex">
                      <FaArrowDownLong />
                      Recieve
                    </p>
                  </Link>
                </div>
                <div class="flex-1 bg-gradient-to-r from-blue-900 to-blue-600 rounded-lg flex flex-col items-center justify-center p-4 space-y-2 border border-gray-200 m-2">
                  <Link
                    to="/dashboard/choose-pay"
                    className="text-xl font-semibold"
                    state={{ data: "addPaymentMethod" }}
                  >
                    <p class="text-white inline-flex">
                      <FaRightLeft />
                      Payment Methods
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-black shadow-md rounded-lg p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full ">
              <thead className="bg-blackbg-black">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    Balance
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    Status
                  </th>
                  <th className=""></th>
                </tr>
              </thead>
              <tbody className="bg-black ">
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {transaction.type}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                        transaction.amount < 0
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {transaction.amount < 0
                        ? `-${Math.abs(transaction.amount).toFixed(2)}`
                        : `+${transaction.amount.toFixed(2)}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${Math.max(balance + transaction.amount, 0).toFixed(2)}
                    </td>

                    <td className="px-0 py-2 whitespace-nowrap text-sm text-gray-500">
                      <div class="relative">
                        <span class="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                      </div>
                    </td>

                    <td>
                      <Dropdown
                        label=""
                        placement="left-start"
                        size="sm"
                        dismissOnClick={false}
                        renderTrigger={() => (
                          <span className="cursor-pointer">
                            <FaEllipsisVertical />
                          </span>
                        )}
                      >
                        <Dropdown.Item>
                          <Link
                            to="#/contactus/step1"
                            onClick={() => {
                              toggleModal("contactQ-modal");
                            }}
                          >
                            Report
                          </Link>
                        </Dropdown.Item>
                        {/* <Dropdown.Item>Report</Dropdown.Item> */}
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
      <ContactQModal isModal={isContactQModal} toggleModal={toggleModal} />
      <ContactQModal2 isModal={isContactQModal2} toggleModal={toggleModal} />
      <ContactQModal3 isModal={isContactQModal3} toggleModal={toggleModal} />
      <ContactQModal4 isModal={isContactQModal4} toggleModal={toggleModal} />
      <ContactQModal5 isModal={isContactQModal5} toggleModal={toggleModal} />
      <ContactQModal6 isModal={isContactQModal6} toggleModal={toggleModal} />
      <ContactQModal7 isModal={isContactQModal7} toggleModal={toggleModal} />
      <ContactQModal8 isModal={isContactQModal8} toggleModal={toggleModal} />
    </>
  );
};

export default Wallet;
