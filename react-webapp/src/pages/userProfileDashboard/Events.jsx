import React, { useState } from "react";
import { Link } from "react-router-dom";
import PublishNewEventModal from "./PublishNewEventModal";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong, FaEllipsisVertical } from "react-icons/fa6";
import PostNewEventModal from "../userPages/PostNewEventModal";
import EventCard from "../../components/EventCard";
import ExclusiveRoomEventCard from "../../components/ExclusiveRoomEventCard";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween"; // Import the isBetween plugin

import { useQuery } from "react-query";
import api from "../../lib/api";
dayjs.extend(isBetween);

const MyEventsPurchasedEvents = () => {
  const navigate = useNavigate();
  const userToken = JSON.parse(localStorage.getItem("user"));

  const [isPublishNewEventModal, setPublishNewEventModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownCommunity, setShowDropdownCommunity] = useState(false);

  const [categoryCommunity, setCategoryCommunity] = useState("");
  const [category, setCategory] = useState("");

  const [isModal, setModal] = useState(false);
  const [isPostNewEventModal, setisPostNewEventModal] = useState(false);
  const [skip, setSkip] = useState(0);
  const limit = 10;
  const [searchTerm, setSearchTerm] = useState("");

  const events_list_query = useQuery(
    ["events", skip], // include 'skip' in query key for refetching when 'skip' changes
    () => {
      const token = localStorage.getItem("access_token");
      return api.get(`/event/all?skip=${skip}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    {
      keepPreviousData: true,
    }
  );

  const categories = [
    "Today",
    "Tomorrow",
    "Weekend",
    "Next Week",
    "This Month",
  ];

  const getFilteredEvents = (events) => {
    const today = dayjs();
    let filteredEvents = [];

    switch (category) {
      case "Today":
        filteredEvents = events.filter((event) =>
          dayjs(event.start_datetime).isSame(today, "day")
        );
        break;
      case "Tomorrow":
        const tomorrow = today.add(1, "day");
        filteredEvents = events.filter((event) =>
          dayjs(event.start_datetime).isSame(tomorrow, "day")
        );
        break;
      case "Weekend":
        filteredEvents = events.filter((event) => {
          const dayOfWeek = dayjs(event.start_datetime).day();
          return dayOfWeek === 6 || dayOfWeek === 0; // Saturday or Sunday
        });
        break;
      case "Next Week":
        const nextWeekStart = today.add(1, "week").startOf("week");
        const nextWeekEnd = today.add(1, "week").endOf("week");
        filteredEvents = events.filter((event) =>
          dayjs(event.start_datetime).isBetween(
            nextWeekStart,
            nextWeekEnd,
            "day"
          )
        );
        break;
      case "This Month":
        filteredEvents = events.filter((event) =>
          dayjs(event.start_datetime).isSame(today, "month")
        );
        break;
      default:
        filteredEvents = events;
        break;
    }

    return filteredEvents.filter((event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getFilteredEventsCommunity = (events) => {
    const today = dayjs();
    let filteredEvents = [];

    switch (categoryCommunity) {
      case "Today":
        filteredEvents = events.filter((event) =>
          dayjs(event.start_datetime).isSame(today, "day")
        );
        break;
      case "Tomorrow":
        const tomorrow = today.add(1, "day");
        filteredEvents = events.filter((event) =>
          dayjs(event.start_datetime).isSame(tomorrow, "day")
        );
        break;
      case "Weekend":
        filteredEvents = events.filter((event) => {
          const dayOfWeek = dayjs(event.start_datetime).day();
          return dayOfWeek === 6 || dayOfWeek === 0; // Saturday or Sunday
        });
        break;
      case "Next Week":
        const nextWeekStart = today.add(1, "week").startOf("week");
        const nextWeekEnd = today.add(1, "week").endOf("week");
        filteredEvents = events.filter((event) =>
          dayjs(event.start_datetime).isBetween(
            nextWeekStart,
            nextWeekEnd,
            "day"
          )
        );
        break;
      case "This Month":
        filteredEvents = events.filter((event) =>
          dayjs(event.start_datetime).isSame(today, "month")
        );
        break;
      default:
        filteredEvents = events;
        break;
    }

    return filteredEvents.filter((event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleInputClickCommunity = () => {
    setShowDropdownCommunity(!showDropdownCommunity);
  };
  const handleInputClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionClickCommunity = (option) => {
    setCategoryCommunity(option);
    setShowDropdownCommunity(false);
  };
  const handleOptionClick = (option) => {
    setCategory(option);
    setShowDropdown(false);
  };

  const toggleModal = (type) => {
    if (type === "closed") {
      // setisLoginModal(false);
      setModal(false);
      setisPostNewEventModal(false);
    }

    //
    if (type === "postnew-event") {
      setisPostNewEventModal(true);
      setModal(false);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const eventsToDisplay = events_list_query.isLoading
    ? []
    : getFilteredEvents(events_list_query?.data?.data || []);

  const eventsToDisplayCommunity = events_list_query.isLoading
    ? []
    : getFilteredEventsCommunity(events_list_query?.data?.data || []);
  const loadMore = () => {
    setSkip((prevSkip) => prevSkip + limit);
  };

  console.log(events_list_query);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-12 pb-4 gap-8">
      <div className="w-full max-w-lg mt-16 ">
        <div>
          <div className="relative">
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={handleSearchInputChange}
              className="bg-white border border-gray-700 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 pr-10"
              placeholder="Search for events..."
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <form className="space-y-4 mt-8">
            <div className="inline-flex  rounded-md shadow-sm" role="group">
              <div className="relative flex gap-4">
                <input
                  type="text"
                  id="questName"
                  value={categoryCommunity}
                  onClick={handleInputClickCommunity}
                  readOnly
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  w-56 p-2.5"
                  placeholder="Select Event Type"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    className=" h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {showDropdownCommunity && (
                  <ul className="absolute z-10 bg-black   w-56 border text-white border-gray-300  mt-1 rounded-lg ">
                    {categories.map((option, index) => (
                      <li
                        key={index}
                        onClick={() => handleOptionClickCommunity(option)}
                        className="cursor-pointer p-2 hover:bg-gray-200 hover:text-black"
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
                {
                  <Link
                    to="#/publishnewquest"
                    state={{ event_type: "community", _id: null }}
                    onClick={() => {
                      toggleModal("postnew-event");
                    }}
                    className="flex"
                  >
                    <button
                      type="submit"
                      className=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      // onClick={() => setPublishNewEventModal(!isPublishNewEventModal)}
                    >
                      Post New Community Event
                    </button>
                  </Link>
                }
              </div>
            </div>
          </form>
        </div>

        <section>
          <div className="w-full pt-9 ">
            {userToken.role !== "free-tier-user" &&
              userToken.role !== "influewave" && (
                <form className="space-y-4">
                  <div
                    className="inline-flex mb-8 rounded-md shadow-sm"
                    role="group"
                  >
                    <div className="relative flex gap-4">
                      <input
                        type="text"
                        id="questName"
                        value={category}
                        onClick={handleInputClick}
                        readOnly
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  w-56 p-2.5"
                        placeholder="Select Event Type"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg
                          className=" h-5 w-5 text-gray-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      {showDropdown && (
                        <ul className="absolute z-10 bg-black   w-56 border text-white border-gray-300  mt-1 rounded-lg ">
                          {categories.map((option, index) => (
                            <li
                              key={index}
                              onClick={() => handleOptionClick(option)}
                              className="cursor-pointer p-2 hover:bg-gray-200 hover:text-black"
                            >
                              {option}
                            </li>
                          ))}
                        </ul>
                      )}

                      <Link
                        to="#/publishnewquest"
                        state={{ event_type: "exclusive_room", _id: null }}
                        onClick={() => {
                          toggleModal("postnew-event");
                        }}
                        className="flex"
                      >
                        <button
                          type="submit"
                          className=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                          // onClick={() => setPublishNewEventModal(!isPublishNewEventModal)}
                        >
                          Post New Exclusive Event
                        </button>
                      </Link>
                    </div>
                  </div>
                </form>
              )}
          </div>
        </section>
        {userToken.role !== "free-tier-user" &&
          userToken.role !== "influewave" && (
            <div className=" flex flex-col justify-between gap-4">
              <h1>Exclusive Events</h1>
              <div class="flex      pb-8 hide-scroll-bar">
                {/* <div class="flex flex-nowrap lg:ml-20 md:ml-20 ml-10 ">
              <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl "></div>
            </div> */}

                <div
                  className="mt-8 p-3 flex  flex-col gap-8"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#ccc #f0f0f0",
                  }}
                >
                  {events_list_query.isLoading
                    ? "Loading..."
                    : eventsToDisplay
                        ?.filter(
                          (event) => event.event_type === "exclusive_room"
                        )
                        .map((event, key) => {
                          return (
                            <ExclusiveRoomEventCard
                              onClick={() => toggleModal("postnew-event")}
                              key={key}
                              refetch={events_list_query.refetch}
                              event={event}
                            />
                          );
                        })}
                </div>
              </div>
              {/* <p class="flex justify-start items-start [writing-mode:vertical-lr] text-3xl">
              Exclusive Room Events <FaArrowRightLong />
            </p> */}
            </div>
          )}

        <section>
          <h1>Community Events</h1>

          <div className="flex flex-col gap-4">
            {events_list_query.isLoading
              ? "Loading..."
              : eventsToDisplayCommunity
                  ?.filter((event) => event.event_type === "community")
                  .map((event, key) => {
                    return (
                      <EventCard
                        onClick={() => toggleModal("postnew-event")}
                        key={key}
                        event={event}
                        refetch={events_list_query.refetch}
                      />
                    );
                  })}
          </div>
        </section>

        <section className="flex justify-center items-center py-4  px-8">
          <button
            onClick={() => loadMore()}
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
      {/* {isPublishNewEventModal && (
        <PublishNewEventModal
          setPublishNewEventModal={setPublishNewEventModal}
        />
      )} */}

      <PostNewEventModal
        isModal={isPostNewEventModal}
        toggleModal={toggleModal}
        refetch={events_list_query.refetch}
      />
    </div>
  );
};

export default MyEventsPurchasedEvents;
