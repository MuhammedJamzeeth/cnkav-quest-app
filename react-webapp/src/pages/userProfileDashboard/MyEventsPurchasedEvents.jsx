import React, { useState } from "react";
import { Link } from "react-router-dom";
import PublishNewEventModal from "./PublishNewEventModal";
import ExclusiveRoomEventCard from "../../components/ExclusiveRoomEventCard";
import api from "../../lib/api";
import { useNavigate } from "react-router-dom";
import {
  FaChevronLeft,
  FaArrowRightLong,
  FaEllipsisVertical,
} from "react-icons/fa6";
import { Tabs } from "flowbite-react";

import PostNewEventModal from "../userPages/PostNewEventModal";
import { useQuery } from "react-query";

const MyEventsPurchasedEvents = () => {
  const [filter, setFilter] = useState("community");
  const [isPublishNewEventModal, setPublishNewEventModal] = useState(false);
  const navigate = useNavigate();
  const userToken = JSON.parse(localStorage.getItem("user"));

  const handleSelectChange = (event) => {
    if (event.target.value === "exclusive-room-events") {
      navigate("/dashboard/events/exclusive-room-events");
    }
  };

  const [showDropdown, setShowDropdown] = useState(false);
  const [category, setCategory] = useState("");
  const [isModal, setModal] = useState(false);
  const [isPostNewEventModal, setisPostNewEventModal] = useState(false);

  const categories = ["Conference", "Workshop", "Webinar", "Gaming", "Meetup"];
  const events_list_query = useQuery({
    queryKey: ["events"],
    queryFn: () => {
      const token = localStorage.getItem("access_token");
      return api.get("/event/user/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });

  const purchasedEvents_list_query = useQuery({
    queryKey: ["purchasedEvents"],
    queryFn: () => {
      const token = localStorage.getItem("access_token");
      return api.get(`/event/user/${userToken.sub}/purchased-events`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });
  const handleInputClick = () => {
    setShowDropdown(!showDropdown);
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

  console.log(events_list_query);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-8 ">
      <div className="w-full max-w-lg mt-16 ">
        <div className=" flex justify-between gap-4 pb-4">
          <Link to="/dashboard/profile">
            <button
              className={`flex gap-4 items-center px-2 py-2 rounded-lg font-semibold text-sm text-white text-[24px]`}
            >
              <FaChevronLeft />
            </button>
          </Link>
        </div>
        <h1 class="mt-4 text-xl pb-2 font-medium text-white tracking-wide">
          My Events and Purchased Events
        </h1>

        <form className="space-y-4">
          <div className="relative">
            <input
              type="text"
              id="search"
              className="bg-white border border-gray-700 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 pr-10"
              placeholder="Search"
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
        </form>
        <section>
          <Tabs aria-label="Full width tabs" variant="underline">
            <Tabs.Item
              active
              onClick={() => alert("clicked")}
              title="Community Events"
              icon={""}
            >
              <div class="flex    max-h-screen  pb-8 hide-scroll-bar">
                <div
                  className="mt-8 p-3 flex min-h-screen flex-col gap-8"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#ccc #f0f0f0",
                  }}
                >
                  {events_list_query.isLoading
                    ? "Loading..."
                    : events_list_query.isError
                    ? "Error loading events" // Handle error case here
                    : events_list_query?.data?.data
                        ?.filter((event) => event.event_type === "community")
                        .map((event, key) => {
                          if (!event) return null; // Handle potential null/undefined event
                          return (
                            <ExclusiveRoomEventCard
                              onClick={() => toggleModal("postnew-event")}
                              key={key}
                              event={event}
                            />
                          );
                        })}
                </div>
              </div>
            </Tabs.Item>

            <Tabs.Item title="Exclusive Room Events" icon={""}>
              <div class="flex    max-h-screen  pb-8 hide-scroll-bar">
                <div
                  className="mt-8 p-3 flex  min-h-screen flex-col gap-8"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#ccc #f0f0f0",
                  }}
                >
                  {events_list_query.isLoading
                    ? "Loading..."
                    : events_list_query?.data?.data
                        ?.filter(
                          (event) => event.event_type === "exclusive_room"
                        )
                        .map((event, key) => {
                          return (
                            <ExclusiveRoomEventCard
                              onClick={() => toggleModal("postnew-event")}
                              key={key}
                              event={event}
                            />
                          );
                        })}
                </div>
              </div>
            </Tabs.Item>
            <Tabs.Item title="My Events" icon={""}>
              <div class="flex  pb-8 ">
                <div
                  className="mt-8 p-3 flex min-h-screen flex-col gap-8"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#ccc #f0f0f0",
                  }}
                >
                  {purchasedEvents_list_query.isLoading
                    ? "Loading..."
                    : purchasedEvents_list_query.isError
                    ? "Error loading events"
                    : purchasedEvents_list_query?.data?.data.map(
                        (event, key) => {
                          if (!event) return null;
                          return (
                            <ExclusiveRoomEventCard
                              onClick={() => toggleModal("postnew-event")}
                              key={key}
                              event={event}
                            />
                          );
                        }
                      )}
                </div>
              </div>
            </Tabs.Item>
          </Tabs>
        </section>

        <div className=" flex mb-6 justify-between gap-4"></div>

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

      <PostNewEventModal
        isModal={isPostNewEventModal}
        toggleModal={toggleModal}
      />
    </div>
  );
};

export default MyEventsPurchasedEvents;
