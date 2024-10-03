import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";
import { IoAnalytics } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaHandHoldingUsd } from "react-icons/fa";

const orders = [
  { id: "001", date: "2024-07-15", status: "Shipped", total: "$120.00" },
  { id: "002", date: "2024-07-12", status: "Delivered", total: "$85.50" },
  { id: "003", date: "2024-07-10", status: "Processing", total: "$45.75" },
];

const OrderDetail = ({ order }) => (
  <div className="bg-white shadow-md rounded-lg p-6 mb-8 ">
    <h2 className="text-2xl font-semibold mb-4 ">Order #{order.id}</h2>

    <div className="mb-4">
      <p className="text-lg font-medium">Date:</p>
      <p className="text-gray-600">{order.date}</p>
    </div>
    <div className="mb-4">
      <p className="text-lg font-medium">Status:</p>
      <p
        className={`text-lg font-semibold ${
          order.status === "Delivered"
            ? "text-green-600"
            : order.status === "Shipped"
            ? "text-blue-600"
            : "text-yellow-600"
        }`}
      >
        {order.status}
      </p>
    </div>
    <div className="mb-4">
      <p className="text-lg font-medium">Total:</p>
      <p className="text-gray-600">{order.total}</p>
    </div>
  </div>
);

const OrderPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="container mx-auto pt-8">
      <h1 className="text-4xl font-bold mb-6 mt-40">
        <Link to="/dashboard/profile">
          <button
            className={`flex gap-4 items-center px-2 py-2 rounded-lg font-semibold text-sm text-white text-[24px]`}
          >
            <FaChevronLeft />
          </button>
        </Link>
        Your Orders
      </h1>

      <section className="bg-white shadow-md rounded-lg p-6 mb-8 w-full">
        <h2 className="text-2xl font-semibold mb-4">Order History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      order.status === "Delivered"
                        ? "text-green-600"
                        : order.status === "Shipped"
                        ? "text-blue-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.total}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 cursor-pointer hover:underline"
                    onClick={() => setSelectedOrder(order)}
                  >
                    View
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>


      {selectedOrder && <OrderDetail order={selectedOrder} />}
            {/* matrics sections */}
            <div className="pb-8">
        <h1 class="mt-4 pb-8 text-xl font-semibold text-red-700 tracking-wide">
          Metrics
        </h1>

        <div className="grid grid-cols-4 max-md:grid-cols-1 gap-4">
          <div className="">
            <div className="py-4 px-4">
              <h2>Quest</h2>
            </div>
            <div className=" ">
              {/* <div className="bg-blue-700 py-16"></div> */}
              <div className="bg-white px-4 w-[90%] rounded-2xl shadow-md mx-auto  ">
                <div className="flex justify-between items-center">
                  <div className="text-black flex items-center gap-4 mt-2 mb-2">
                    <p className="bg-blue-200 rounded-lg py-3 px-3">
                      <IoAnalytics />
                    </p>
                    <span className="text-gray-500 uppercase text-sm font-medium">
                      Client
                    </span>
                  </div>
                  <div className="text-black">
                    <HiDotsHorizontal />
                  </div>
                </div>
                <div className="text-black pt-24 text-lg font-semibold pb-4">
                  4299
                </div>
              </div>
            </div>
          </div>
          <div className="pt-14">
            <div className="bg-white px-4 w-[90%] rounded-2xl shadow-md mx-auto  ">
              <div className="flex justify-between items-center">
                <div className="text-black flex items-center gap-4 mt-2 mb-2">
                  <p className="bg-red-200 rounded-lg py-3 px-3">
                    <FaHandHoldingUsd />
                  </p>
                  <span className="text-gray-500 text-sm font-medium">
                    Quest Revenue
                  </span>
                </div>
                <div className="text-black">
                  <HiDotsHorizontal />
                </div>
              </div>
              <div className="text-black pt-24 text-lg font-semibold pb-4">
                $48.90k
              </div>
            </div>
          </div>
          <div className="">
            <div className="py-4 px-4">
              <h2>Affiliate Marketing</h2>
            </div>
            <div className=" ">
              {/* <div className="bg-blue-700 py-16"></div> */}
              <div className="bg-white px-4 w-[90%] rounded-2xl shadow-md mx-auto  ">
                <div className="flex justify-between items-center">
                  <div className="text-black flex items-center gap-4 mt-2 mb-2">
                    <p className="bg-blue-200 rounded-lg py-3 px-3">
                      <IoAnalytics />
                    </p>
                    <span className="text-gray-500 text-sm font-medium">
                      Active Links
                    </span>
                  </div>
                  <div className="text-black">
                    <HiDotsHorizontal />
                  </div>
                </div>
                <div className="text-black pt-24 text-lg font-semibold pb-4">
                  4295
                </div>
              </div>
            </div>
          </div>
          <div className="pt-14">
            <div className="bg-white px-4 w-[90%] rounded-2xl shadow-md mx-auto  ">
              <div className="flex justify-between items-center">
                <div className="text-black flex items-center gap-4 mt-2 mb-2">
                  <p className="bg-red-200 rounded-lg py-3 px-3">
                    <FaHandHoldingUsd />
                  </p>
                  <span className="text-gray-500 text-sm font-medium">
                    Commissions
                  </span>
                </div>
                <div className="text-black">
                  <HiDotsHorizontal />
                </div>
              </div>
              <div className="text-black pt-24 text-lg font-semibold pb-4">
                4299
              </div>
            </div>
          </div>
          {/* <div className="bg-gray-400">hello</div> */}
        </div>
        <div className="grid grid-cols-4 max-md:grid-cols-1 gap-4">
          <div className="">
            <div className="py-4 px-4">
              <h2>Events</h2>
            </div>
            <div className=" ">
              {/* <div className="bg-blue-700 py-16"></div> */}
              <div className="bg-white px-4 w-[90%] rounded-2xl shadow-md mx-auto  ">
                <div className="flex justify-between items-center">
                  <div className="text-black flex items-center gap-4 mt-2 mb-2">
                    <p className="bg-blue-200 rounded-lg py-3 px-3">
                      <IoAnalytics />
                    </p>
                    <span className="text-gray-500 uppercase text-sm font-medium">
                      Client
                    </span>
                  </div>
                  <div className="text-black">
                    <HiDotsHorizontal />
                  </div>
                </div>
                <div className="text-black pt-24 text-lg font-semibold pb-4">
                  4299
                </div>
              </div>
            </div>
          </div>
          <div className="pt-14">
            <div className="bg-white px-4 w-[90%] rounded-2xl shadow-md mx-auto  ">
              <div className="flex justify-between items-center">
                <div className="text-black flex items-center gap-4 mt-2 mb-2">
                  <p className="bg-red-200 rounded-lg py-3 px-3">
                    <FaHandHoldingUsd />
                  </p>
                  <span className="text-gray-500 text-sm font-medium">
                    Events Revenue
                  </span>
                </div>
                <div className="text-black">
                  <HiDotsHorizontal />
                </div>
              </div>
              <div className="text-black pt-24 text-lg font-semibold pb-4">
                $48.90k
              </div>
            </div>
          </div>
          <div className="">
            <div className="py-4 px-4">
              <h2>Quest Apps</h2>
            </div>
            <div className=" ">
              {/* <div className="bg-blue-700 py-16"></div> */}
              <div className="bg-white px-4 w-[90%] rounded-2xl shadow-md mx-auto  ">
                <div className="flex justify-between items-center">
                  <div className="text-black flex items-center gap-4 mt-2 mb-2">
                    <p className="bg-blue-200 rounded-lg py-3 px-3">
                      <IoAnalytics />
                    </p>
                    <span className="text-gray-500 text-sm font-medium">
                      CLIENT
                    </span>
                  </div>
                  <div className="text-black">
                    <HiDotsHorizontal />
                  </div>
                </div>
                <div className="text-black pt-24 text-lg font-semibold pb-4">
                  4295
                </div>
              </div>
            </div>
          </div>
          <div className="pt-14">
            <div className="bg-white px-4 w-[90%] rounded-2xl shadow-md mx-auto  ">
              <div className="flex justify-between items-center">
                <div className="text-black flex items-center gap-4 mt-2 mb-2">
                  <p className="bg-red-200 rounded-lg py-3 px-3">
                    <FaHandHoldingUsd />
                  </p>
                  <span className="text-gray-500 text-sm font-medium">
                    Downloads
                  </span>
                </div>
                <div className="text-black">
                  <HiDotsHorizontal />
                </div>
              </div>
              <div className="text-black pt-24 text-lg font-semibold pb-4">
                $48.90k
              </div>
            </div>
          </div>
          {/* <div className="bg-gray-400">hello</div> */}
        </div>
      </div>

    </div>
  );
};

export default OrderPage;
