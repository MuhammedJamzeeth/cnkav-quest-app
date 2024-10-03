import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import useUserHandler from "../../hooks/useUserHandler.jsx";
import {
  FaPlus,
  FaMessage,
  FaCommentDots,
  FaCommentsDollar,
} from "react-icons/fa6";
import { Tabs } from "flowbite-react";
import useChatHandler from "../../hooks/useChatHandler.jsx";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import ChatsNewModal from "./ChatsNewModal";

const Chats = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [category, setCategory] = useState("");
  const [select, seSelect] = useState();
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const userToken = JSON.parse(localStorage.getItem("user"));
  const websocket = useRef(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { getAllUsers } = useUserHandler();
  const { useChatList } = useChatHandler();

  const categories = [
    "Community Chat",
    "Quest Community",
    "Exclusive Room Chat",
    // "Software Development",
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []); // No dependencies required here

  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { data, error, isLoading } = useChatList(
    page,
    pageSize,
    selectedUser?.email
  );

  const extractTime = (isoString) => {
    const date = new Date(isoString);
    let hours = date.getUTCHours();
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const amPm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12 || 12; // If hour is 0, set it to 12
    hours = String(hours).padStart(2, "0");

    // Return in HH:MM AM/PM format
    return `${hours}:${minutes} ${amPm}`;
  };

  useEffect(() => {
    if (selectedUser) {
      setMessages([]);

      if (data) setMessages(data);

      websocket.current = new WebSocket(
        `ws:https://backend.cnkav.com/ws/${selectedUser.email}`
      );

      websocket.current.onopen = () => {
        console.log("WebSocket connection opened");
      };

      websocket.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log("Received message:", message);
        setMessages((prevMessages) => [...prevMessages, message]);
      };

      websocket.current.onclose = () => {
        console.log("WebSocket connection closed");
      };

      websocket.current.onerror = (error) => {
        console.error("WebSocket error", error);
      };

      return () => {
        if (websocket.current) {
          websocket.current.close();
        }
      };
    }
  }, [selectedUser, data]);

  const handlePersonalMessageClick = (user) => {
    setSelectedUser(user);
  };
  const getAvatarColor = (email) => {
    // Generate a hash from the email
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = email.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Convert the hash to a hexadecimal color code
    const color = `#${((hash >> 24) & 0xff).toString(16)}${(
      (hash >> 16) &
      0xff
    ).toString(16)}${((hash >> 8) & 0xff).toString(16)}${(hash & 0xff).toString(
      16
    )}`;

    // Ensure the color code is 6 characters long (by repeating characters if necessary)
    return `#${color.slice(1, 7).padEnd(6, "0")}`;
  };

  const getInitials = (name) => {
    // Split the name into parts (assuming a first and last name or multiple parts)
    const nameParts = name.trim().split(" ");

    // Get the first letter of the first name and the first letter of the last name
    const initials =
      nameParts.length > 1
        ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
        : `${nameParts[0][0]}`;

    // Return the initials in uppercase
    return initials.toUpperCase();
  };

  const formatName = (name) => {
    // Split the name into parts
    const nameParts = name.trim().split(" ");

    // Capitalize the first letter of each part of the name
    const formattedName = nameParts
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(" ");

    return formattedName;
  };
  const handleSendMessage = () => {
    if (
      websocket.current &&
      websocket.current.readyState === WebSocket.OPEN &&
      newMessage.trim()
    ) {
      const messageData = {
        sender_email: userToken.sub,
        receiver_email: selectedUser.email,
        content: newMessage,
        timestamp: new Date().toISOString(),
      };
      websocket.current.send(JSON.stringify(messageData));
      setNewMessage("");
    } else {
      console.warn("WebSocket is not open or message is empty");
    }
  };
  const handleInputClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionClick = (option) => {
    setCategory(option);
    setShowDropdown(false);
  };

  const [isChatNewModal, setChatNewModal] = useState(false);

  const toggleModal = (type) => {
    if (type === "closed") {
      setChatNewModal(false);
      setModal(false);
    }

    if (type === "questModals/new-chat") {
      setChatNewModal(true);
      setModal(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-20 py-1">
        <div className="w-full max-w-lg mt-8">
          <section>
            <div className="flex flex-col justify-center items-center mt-30 mb-8">
              <div
                className=""
                id="dropdownUsersButton"
                data-dropdown-toggle="dropdownUsers"
                data-dropdown-placement="bottom"
              >
                <div
                  id="dropdownUsers"
                  class="z-10 hidden bg-white rounded-lg shadow w-60 dark:bg-gray-700"
                >
                  <ul
                    class="h-48 py-2 overflow-y-auto text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownUsersButton"
                  >
                    <li>
                      <a
                        href="#"
                        class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Jese Leos
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Robert Gough
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Bonnie Green
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Leslie Livingston
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Michael Gough
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Joseph Mcfall
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Roberta Casas
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Neil Sims
                      </a>
                    </li>
                  </ul>
                  <a
                    href="#"
                    class="flex items-center p-3 text-sm font-medium text-blue-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-blue-500 hover:underline"
                  >
                    <svg
                      class="w-4 h-4 me-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
                    </svg>
                    Add new user
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className=" flex flex-col md:flex-row ">
        {/* <div className="w-full md:w-1/3 p-4 border-b  md:border border-gray-900"> */}
        <div className="w-full md:w-[30%] p-4 border-b  md:border border-gray-900">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search (Ctrl+/)"
              className="w-full p-2 border border-gray-900 rounded"
            />
          </div>
          <Link
            class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            to="#/dashboard/new-chat"
            onClick={() => {
              toggleModal("questModals/new-chat");
            }}
          >
            <FaPlus />
          </Link>

          <div class="border-b border-text-black bg-black font-medium text-black dark:text-black">
            {/* <div class=""> */}
            {/* <Tabs aria-label="Full width tabs " variant="fullWidth"> */}
            <Tabs aria-label="" variant="underline">
              <Tabs.Item active title="Chat">
                <ul>
                  {/* <li className="flex items-center p-2 mb-2">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                      PF
                    </div>
                    <div className="ml-2">
                      <p className="font-semibold text-gray-700">Username</p>
                      <p className="text-sm" style={{ color: "#BDBDBD" }}>
                        short version of the text message...
                      </p>
                    </div>
                  </li> */}
                  <div className="h-96 overflow-y-auto custom-scrollbar">
                    {users.map((user) => (
                      <div
                        key={user.email}
                        onClick={() => handlePersonalMessageClick(user)}
                        className="cursor-pointer"
                      >
                        <ul>
                          <li className="flex items-center p-2 mb-2">
                            <div
                              className="w-10 h-10  rounded-full flex items-center justify-center text-white"
                              style={{
                                backgroundColor: getAvatarColor(user.email),
                              }}
                            >
                              {getInitials(user.name)}
                            </div>
                            <div className="ml-2">
                              <p className="font-semibold text-gray-700">
                                {formatName(user.name)}
                              </p>
                              <p
                                className="text-sm"
                                style={{ color: "#BDBDBD" }}
                              >
                                UI/UX Designer
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    ))}
                  </div>
                  {/* {selectedUser && (
                    <>
                      <div className="flex items-center justify-between p-4  border-b border-gray-200">
                        <div className="flex items-center">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                            style={{
                              backgroundColor: getAvatarColor(
                                selectedUser.email
                              ),
                            }}
                          >
                            {getInitials(selectedUser.name)}
                          </div>
                          <div className="ml-2">
                            <p className="font-semibold text-white">
                              {formatName(selectedUser.name)}
                            </p>
                            <p className="text-sm text-gray-500">
                              NextJS Developer
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 p-4 overflow-y-auto">
                        {messages.map((msg, index) => (
                          <div
                            key={index}
                            className={`flex items-start ${
                              msg.sender_email === userToken.sub
                                ? "justify-end"
                                : "justify-start"
                            } mb-4`}
                          >
                            <div
                              className="w-10 h-10  rounded-full flex items-center justify-center text-white"
                              style={{
                                backgroundColor:
                                  msg.sender_email === userToken.sub
                                    ? getAvatarColor(msg?.sender_email)
                                    : getAvatarColor(msg?.sender_email),
                              }}
                            >
                              {msg.sender_email === userToken.sub
                                ? getInitials(userToken?.name)
                                : getInitials(selectedUser?.name)}
                            </div>
                            <div className="ml-2">
                              <div className="bg-gray-100 p-2 rounded">
                                <p className="text-gray-700">{msg?.content}</p>
                              </div>
                              <p className="text-sm text-gray-500 mt-1">
                                {extractTime(msg?.timestamp)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-4  border-t ">
                        <div className="flex items-center">
                          <input
                            type="text"
                            name="newMessage"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message here"
                            className="flex-1 p-2 border border-gray-300 rounded text-black"
                          />
                          <button
                            className="ml-2 p-2 bg-blue-500 text-white rounded"
                            onClick={handleSendMessage}
                          >
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </>
                  )} */}
                </ul>
              </Tabs.Item>

              {/* <Tabs.Item title="Quest Community"> */}
              <Tabs.Item title="Quest Community" icon={""}>
                <div className="h-96 overflow-y-auto custom-scrollbar">
                  <div class="font-sans antialiased h-full-screen flex">
                    <div class="bg-black text-purple-lighter flex-none w-68 pb-6 md:block">
                      <div class="text-white mb-2 mt-3 px-4 flex justify-between border-b border-gray-800 py-1 shadow-xl">
                        <div class="flex-auto">
                          <h1 class="font-semibold text-xl leading-tight mb-1 truncate">
                            Quest Community
                          </h1>
                        </div>
                        <div>
                          <svg
                            class="arrow-gKvcEx icon-2yIBmh opacity-50 cursor-pointer"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M16.59 8.59004L12 13.17L7.41 8.59004L6 10L12 16L18 10L16.59 8.59004Z"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <div class="mb-8 overflow-y-scroll overflow-h-scroll">
                        <div class="px-4 mb-2 text-white flex justify-between items-center"></div>
                        <div class="bg-teal-dark hover:bg-gray-800 cursor-pointer font-semibold py-1 px-4 text-gray-300">
                          Task Emergency
                        </div>
                      </div>

                      <div class="mb-8">
                        <div class="px-4 mb-2 text-white flex justify-between items-center"></div>
                        <div class="bg-teal-dark hover:bg-gray-800 cursor-pointer font-semibold py-1 px-4 text-gray-300">
                          Quest Support
                        </div>
                      </div>

                      <div class="mb-8">
                        <div class="px-4 mb-2 text-white flex justify-between items-center"></div>
                        <div class="bg-teal-dark hover:bg-gray-800 cursor-pointer font-semibold py-1 px-4 text-gray-300">
                          Summit An Ticket
                        </div>
                      </div>

                      <div class="mb-8">
                        <div class="px-4 mb-2 text-white flex justify-between items-center"></div>
                        <div class="bg-teal-dark hover:bg-gray-800 cursor-pointer font-semibold py-1 px-4 text-gray-300">
                          Rookie
                        </div>
                      </div>

                      <div class="mb-8">
                        <div class="px-4 mb-2 text-white flex justify-between items-center"></div>
                        <div class="bg-teal-dark hover:bg-gray-800 cursor-pointer font-semibold py-1 px-4 text-gray-300">
                          Single Star
                        </div>
                      </div>

                      <div class="mb-8">
                        <div class="px-4 mb-2 text-white flex justify-between items-center"></div>
                        <div class="bg-teal-dark hover:bg-gray-800 cursor-pointer font-semibold py-1 px-4 text-gray-300">
                          Double Star
                        </div>
                      </div>

                      <div class="mb-8">
                        <div class="px-4 mb-2 text-white flex justify-between items-center"></div>
                        <div class="bg-teal-dark hover:bg-gray-800 cursor-pointer font-semibold py-1 px-4 text-gray-300">
                          Triple Star
                        </div>
                      </div>

                      <div class="mb-8">
                        <div class="px-4 mb-2 text-white flex justify-between items-center"></div>
                        <div class="bg-teal-dark hover:bg-gray-800 cursor-pointer font-semibold py-1 px-4 text-gray-300">
                          S-Rank
                        </div>
                      </div>

                      <div class="mb-8">
                        <div class="px-4 mb-2 text-white flex justify-between items-center"></div>
                        <div class="bg-teal-dark hover:bg-gray-800 cursor-pointer font-semibold py-1 px-4 text-gray-300">
                          Group Tasks
                        </div>
                      </div>

                      <div class="mb-8">
                        <div class="px-4 mb-2 text-white flex justify-between items-center"></div>
                        <div class="bg-teal-dark hover:bg-gray-800 cursor-pointer font-semibold py-1 px-4 text-gray-300">
                          Party Tasks
                        </div>
                      </div>

                      <div class="mb-8">
                        <div class="px-4 mb-2 text-white flex justify-between items-center"></div>
                        <div class="bg-teal-dark hover:bg-gray-800 cursor-pointer font-semibold py-1 px-4 text-gray-300">
                          Cooperate Tasks
                        </div>
                      </div>

                      <div class="mb-8">
                        <div class="px-4 mb-2 text-white flex justify-between items-center"></div>
                        <div class="bg-teal-dark hover:bg-gray-800 cursor-pointer font-semibold py-1 px-4 text-gray-300">
                          Looking For Specific Product in person
                        </div>
                      </div>

                      <div class="mb-8">
                        <div class="px-4 mb-2 text-white flex justify-between items-center"></div>
                        <div class="bg-teal-dark hover:bg-gray-800 cursor-pointer font-semibold py-1 px-4 text-gray-300">
                          Recurring Tasks
                        </div>
                      </div>

                      <div class="mb-8">
                        <div class="px-4 mb-2 text-white flex justify-between items-center"></div>
                        <div class="bg-teal-dark hover:bg-gray-800 cursor-pointer font-semibold py-1 px-4 text-gray-300">
                          Local Tasks
                        </div>
                      </div>

                      <div class="mb-8">
                        <div class="px-4 mb-2 text-white flex justify-between items-center"></div>
                        <div class="bg-teal-dark hover:bg-gray-800 cursor-pointer font-semibold py-1 px-4 text-gray-300">
                          Assisting in Person
                        </div>
                      </div>

                      <div class="mb-8">
                        <div class="px-4 mb-2 text-white flex justify-between items-center"></div>
                        <div class="bg-teal-dark hover:bg-gray-800 cursor-pointer font-semibold py-1 px-4 text-gray-300">
                          Consulting
                        </div>
                      </div>

                      <div class="mb-8">
                        <div class="px-4 mb-2 text-white flex justify-between items-center"></div>
                        <div class="bg-teal-dark hover:bg-gray-800 cursor-pointer font-semibold py-1 px-4 text-gray-300">
                          Software Development
                        </div>
                      </div>

                      <div class="mb-8">
                        <div class="px-4 mb-2 text-white flex justify-between items-center"></div>
                        <div class="bg-teal-dark hover:bg-gray-800 cursor-pointer font-semibold py-1 px-4 text-gray-300">
                          Digital Marketing
                        </div>
                      </div>

                      <div class="mb-8">
                        <div class="px-4 mb-2 text-white flex justify-between items-center"></div>
                        <div class="bg-teal-dark hover:bg-gray-800 cursor-pointer font-semibold py-1 px-4 text-gray-300">
                          Trading
                        </div>
                      </div>

                      <div class="mb-8">
                        <div class="px-4 mb-2 text-white flex justify-between items-center"></div>
                        <div class="bg-teal-dark hover:bg-gray-800 cursor-pointer font-semibold py-1 px-4 text-gray-300">
                          Private Tasks
                        </div>
                      </div>

                      <div class="mb-8">
                        <div class="px-4 mb-2 text-white flex justify-between items-center"></div>
                        <div class="bg-teal-dark hover:bg-gray-800 cursor-pointer font-semibold py-1 px-4 text-gray-300">
                          E-sports
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tabs.Item>
              {/* <Tabs.Item title="Exclusive Room"> */}
              <Tabs.Item title="Exclusive Room" icon={""}>
                <div className="h-96 overflow-y-auto custom-scrollbar">
                  <div class="font-sans antialiased h-full-screen flex">
                    <div class="bg-black text-purple-lighter flex-none w-68 pb-4 md:block">
                      <div class="text-white mb-2 mt-3 px-4 flex justify-between border-b border-gray-800 py-1 shadow-xl">
                        <div class="flex-auto">
                          <h1 class="font-semibold text-xl leading-tight mb-1 truncate">
                            Exclusive Room
                          </h1>
                        </div>
                        <div>
                          <svg
                            class="arrow-gKvcEx icon-2yIBmh opacity-50 cursor-pointer"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M16.59 8.59004L12 13.17L7.41 8.59004L6 10L12 16L18 10L16.59 8.59004Z"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <div class="mb-8 overflow-y-scroll overflow-h-scroll">
                        <div class="px-4 mb-2 text-white flex justify-between items-center"></div>
                        <div class="bg-teal-dark hover:bg-gray-800 cursor-pointer font-semibold py-1 px-4 text-gray-300">
                          Events
                        </div>
                      </div>

                      <div class="mb-8">
                        <div class="px-4 mb-2 text-white flex justify-between items-center"></div>
                        <div class="bg-teal-dark hover:bg-gray-800 cursor-pointer font-semibold py-1 px-4 text-gray-300">
                          Weekly news overview (Read only)
                        </div>
                      </div>

                      <div class="mb-8">
                        <div class="px-4 mb-2 text-white flex justify-between items-center"></div>
                        <div class="bg-teal-dark hover:bg-gray-800 cursor-pointer font-semibold py-1 px-4 text-gray-300">
                          Insider Business
                        </div>
                      </div>

                      <div class="mb-8">
                        <div class="px-4 mb-2 text-white flex justify-between items-center"></div>
                        <div class="bg-teal-dark hover:bg-gray-800 cursor-pointer font-semibold py-1 px-4 text-gray-300">
                          Investing
                        </div>
                      </div>

                      <div class="mb-8">
                        <div class="px-4 mb-2 text-white flex justify-between items-center"></div>
                        <div class="bg-teal-dark hover:bg-gray-800 cursor-pointer font-semibold py-1 px-4 text-gray-300">
                          Trends
                        </div>
                      </div>

                      <div class="mb-8">
                        <div class="px-4 mb-2 text-white flex justify-between items-center"></div>
                        <div class="bg-teal-dark hover:bg-gray-800 cursor-pointer font-semibold py-1 px-4 text-gray-300">
                          Market speculations
                        </div>
                      </div>

                      <div class="mb-8">
                        <div class="px-4 mb-2 text-white flex justify-between items-center"></div>
                        <div class="bg-teal-dark hover:bg-gray-800 cursor-pointer font-semibold py-1 px-4 text-gray-300">
                          Business opportunities
                        </div>
                      </div>

                      <div class="mb-8">
                        <div class="px-4 mb-2 text-white flex justify-between items-center"></div>
                        <div class="bg-teal-dark hover:bg-gray-800 cursor-pointer font-semibold py-1 px-4 text-gray-300">
                          Strategy discussion
                        </div>
                      </div>

                      <div class="mb-8">
                        <div class="px-4 mb-2 text-white flex justify-between items-center"></div>
                        <div class="bg-teal-dark hover:bg-gray-800 cursor-pointer font-semibold py-1 px-4 text-gray-300">
                          Network
                        </div>
                      </div>

                      <div class="mb-8">
                        <div class="px-4 mb-2 text-white flex justify-between items-center"></div>
                        <div class="bg-teal-dark hover:bg-gray-800 cursor-pointer font-semibold py-1 px-4 text-gray-300">
                          Entering markets
                        </div>
                      </div>

                      <div class="mb-8">
                        <div class="px-4 mb-2 text-white flex justify-between items-center"></div>
                        <div class="bg-teal-dark hover:bg-gray-800 cursor-pointer font-semibold py-1 px-4 text-gray-300">
                          Trading discussion
                        </div>
                      </div>

                      <div class="mb-8">
                        <div class="px-4 mb-2 text-white flex justify-between items-center"></div>
                        <div class="bg-teal-dark hover:bg-gray-800 cursor-pointer font-semibold py-1 px-4 text-gray-300">
                          Post of real products Trades
                        </div>
                      </div>

                      <div class="mb-8">
                        <div class="px-4 mb-2 text-white flex justify-between items-center"></div>
                        <div class="bg-teal-dark hover:bg-gray-800 cursor-pointer font-semibold py-1 px-4 text-gray-300">
                          Looking For Specific Product in person
                        </div>
                      </div>

                      <div class="mb-8">
                        <div class="px-4 mb-2 text-white flex justify-between items-center"></div>
                        <div class="bg-teal-dark hover:bg-gray-800 cursor-pointer font-semibold py-1 px-4 text-gray-300">
                          Discussion
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tabs.Item>
            </Tabs>
          </div>
        </div>

        {selectedUser && (
          <div className="flex-1 flex flex-col bg-gray-900">
            <div className="flex-1 flex flex-col border border-gray-800 h-96">
              <div className="flex items-center justify-between p-4 border-b border-gray-600">
                <div className="flex items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                    style={{
                      backgroundColor: getAvatarColor(userToken?.sub),
                    }}
                  >
                    {getInitials(userToken?.name)}
                  </div>
                  <div className="ml-2">
                    <p className="font-semibold text-white">
                      {userToken?.name}
                    </p>
                    <p className="text-sm text-gray-500">{userToken?.sub}</p>
                  </div>
                </div>
              </div>
              <div className="h-96 p-4 overflow-y-auto custom-scrollbar">
                {messages.map((msg, index) => (
                  <div key={index}>
                    <div
                      className={`flex items-start ${
                        msg.sender_email === userToken.sub
                          ? "justify-end"
                          : "justify-start"
                      } mb-4`}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                        style={{
                          backgroundColor:
                            msg.sender_email === userToken.sub
                              ? getAvatarColor(msg?.sender_email)
                              : getAvatarColor(msg?.receiver_email),
                        }}
                      >
                        {msg.sender_email === userToken.sub
                          ? getInitials(userToken?.name)
                          : getInitials(selectedUser?.name)}
                      </div>
                      <div className="ml-2">
                        <div className="bg-gray-100 p-2 rounded">
                          <p className="text-black">{msg?.content}</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {extractTime(msg?.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* {selectedUser && (
            <>
              <div className="flex items-center justify-between p-4  border-b border-gray-200">
                <div className="flex items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                    style={{
                      backgroundColor: getAvatarColor(selectedUser.email),
                    }}
                  >
                    {getInitials(selectedUser.name)}
                  </div>
                  <div className="ml-2">
                    <p className="font-semibold text-white">
                      {formatName(selectedUser.name)}
                    </p>
                    <p className="text-sm text-gray-500">NextJS Developer</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 p-4 overflow-y-auto">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-start ${
                      msg.sender_email === userToken.sub
                        ? "justify-end"
                        : "justify-start"
                    } mb-4`}
                  >
                    <div
                      className="w-10 h-10  rounded-full flex items-center justify-center text-white"
                      style={{
                        backgroundColor:
                          msg.sender_email === userToken.sub
                            ? getAvatarColor(msg?.sender_email)
                            : getAvatarColor(msg?.sender_email),
                      }}
                    >
                      {msg.sender_email === userToken.sub
                        ? getInitials(userToken?.name)
                        : getInitials(selectedUser?.name)}
                    </div>
                    <div className="ml-2">
                      <div className="bg-gray-100 p-2 rounded">
                        <p className="text-gray-700">{msg?.content}</p>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {extractTime(msg?.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4  border-t ">
                <div className="flex items-center">
                  <input
                    type="text"
                    name="newMessage"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here"
                    className="flex-1 p-2 border border-gray-300 rounded text-black"
                  />
                  <button
                    className="ml-2 p-2 bg-blue-500 text-white rounded"
                    onClick={handleSendMessage}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )} */}

            <div className="p-4  border-t ">
              <div className="px-6 py-4 flex-1">
                <div className="flex rounded-lg overflow-hidden">
                  <span className="text-3xl text-grey border-r-4 border-gray-800 bg-gray-800 p-2">
                    <svg
                      className="h-6 w-6 block bg-black hover:bg-blue-600 cursor-pointer rounded-xl"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601-.553 0-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4c.553 0 1 .048 1 .601V9h4.399c.553 0 .601.447.601 1z"
                        fill="#FFFFFF"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="newMessage"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className=" flex-1 p-2 w-full px-4 bg-gray-800 border border-gray-700 rounded"
                    placeholder="Type your message here"
                  />
                  <button
                    className="ml-2 p-2 bg-blue-500 text-white rounded"
                    onClick={handleSendMessage}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <ChatsNewModal isModal={isChatNewModal} toggleModal={toggleModal} />
      </div>
    </>
  );
};

export default Chats;
