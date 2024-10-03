import React, { useState } from "react";
import {
  FaInfoCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";
import { BiMessageRounded } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      username: "john Doe",
      type: "info",
      message: "Your account was updated successfully.",
      // timestamp: "2024-07-21 10:30 AM",
      read: false,
    },
    {
      id: 2,
      username: "Smith john",
      type: "warning",
      message: "Your password will expire in 3 days.",
      // timestamp: "2024-07-20 08:00 AM",
      read: true,
    },
    {
      id: 3,
      username: "Amy John",
      type: "error",
      message: "Failed to process your last transaction.",
      // timestamp: "2024-07-19 03:45 PM",
      read: false,
    },
    {
      id: 4,
      username: "Amy John",
      type: "warning",
      message: "Failed to process your last transaction.",
      // timestamp: "2024-07-19 03:45 PM",
      read: false,
    },
    {
      id: 5,
      username: "Amy John",
      type: "info",
      message: "Failed to process your last transaction.",
      // timestamp: "2024-07-19 03:45 PM",
      read: false,
    },
    {
      id: 6,
      username: "Amy John",
      type: "error",
      message: "Failed to process your last transaction.",
      // timestamp: "2024-07-19 03:45 PM",
      read: false,
    },
  ]);

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <div className="container mx-auto md:px-8 pt-4">
      <h1 className="text-4xl font-bold mb-6 mt-40">Notifications</h1>
      <Link to="/dashboard/profile">
        <button
          className={`flex gap-4 items-center px-2 py-2 rounded-lg font-semibold text-sm text-white text-[24px]`}
        >
          <FaChevronLeft />
        </button>
      </Link>
      <section className="bg-black  text-white shadow-md rounded-lg pt-4">
        <div className="flex items-center justify-between mb-6">
          <div className="">
            <span className="flex">Today</span>
          </div>

          <button
            type="button"
            className="border  border-blue-700 py-3 rounded-md px-4 text-blue-700 text-sm font-semibold hover:bg-blue-700 hover:text-white transition-all"
          >
            Mark them all read
          </button>
        </div>
        {notifications.length === 0 ? (
          <p className="text-white">No notifications to display.</p>
        ) : (
          <ul>
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={`flex items-center p-4 mb-4 rounded-lg ${
                  notification.read ? "bg-gray-900 " : "bg-gray-900 "
                } ${
                  notification.type === "info"
                    ? "border-blue-400"
                    : notification.type === "warning"
                    ? "border-yellow-400"
                    : "border-red-400"
                }  `}
              >
                <div className="mr-4 flex">
                  {notification.type === "info" && (
                    <div className="py-[6px] flex px-1.5 justify-center rounded-lg items-center bg-slate-800">
                      <BiMessageRounded className="text-blue-500 w-6 h-6" />
                    </div>
                  )}
                  {notification.type === "warning" && (
                    <div className="py-[6px] flex px-1.5 justify-center rounded-lg items-center z-20 bg-slate-800">
                      <FaCheck className="text-green-500 w-6 h-6" />
                    </div>
                  )}
                  {notification.type === "error" && (
                    <div className="py-[6px] flex px-1.5 justify-center rounded-lg items-center bg-slate-800 ">
                      <MdDeleteOutline className="text-red-500 w-6 h-6" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-md font-semibold text-white">
                    {notification.username}
                  </p>
                  <p className="text-sm font-normal text-gray-400 pt-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500">
                    {notification.timestamp}
                  </p>
                </div>

                {!notification.read && (
                  <button
                    onClick={() => handleMarkAsRead(notification.id)}
                    className="ml-4 text-blue-500 hover:underline"
                  >
                    Mark as read
                  </button>
                )}
              </li>
            ))}
            <span className="flex mb-8 mt-8">Yesterday</span>
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={`flex items-center p-4 mb-4 rounded-lg ${
                  notification.read ? "bg-gray-900" : "bg-gray-900"
                } ${
                  notification.type === "info"
                    ? "border-blue-400"
                    : notification.type === "warning"
                    ? "border-yellow-400"
                    : "border-red-400"
                }  `}
              >
                <div className="mr-4 flex">
                  {notification.type === "info" && (
                    <div className="py-[6px] flex px-1.5 justify-center rounded-lg items-center bg-slate-800">
                      <BiMessageRounded className="text-blue-500 w-6 h-6" />
                    </div>
                  )}
                  {notification.type === "warning" && (
                    <div className="py-[6px] flex px-1.5 justify-center rounded-lg items-center z-20 bg-slate-800">
                      <FaCheck className="text-green-500 w-6 h-6" />
                    </div>
                  )}
                  {notification.type === "error" && (
                    <div className="py-[6px] flex px-1.5 justify-center rounded-lg items-center bg-slate-800 ">
                      <MdDeleteOutline className="text-red-500 w-6 h-6" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-md font-semibold text-white">
                    {notification.username}
                  </p>
                  <p className="text-sm font-normal text-gray-400 pt-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500">
                    {notification.timestamp}
                  </p>
                </div>

                {!notification.read && (
                  <button
                    onClick={() => handleMarkAsRead(notification.id)}
                    className="ml-4 text-blue-500 hover:underline"
                  >
                    Mark as read
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default NotificationPage;
