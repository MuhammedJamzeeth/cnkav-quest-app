import React from "react";

const CommunityChats = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-8 ">
      <div className="w-full max-w-lg mt-16">
        <form className="space-y-4 flex flex-col justify-center items-center">
          <div className="relative w-full">
            <label>Give Your Event Brief A Title</label>
            <input
              type="text"
              id="search"
              className="bg-white  border border-gray-700 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 pr-10"
              placeholder="Search"
            />
          </div>
          <div className="relative w-full">
            <label>Event Description ?</label>
            <input
              type="text"
              id="search"
              className="bg-white  border border-gray-700 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 pr-10"
              placeholder="Search"
            />
          </div>
          <div className="relative w-full">
            <label>Start Date and time</label>

            <input
              type="datetime-local"
              id="endDateTime"
              className="bg-white border border-gray-700 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 pr-10"
            />
          </div>
          <div className="relative w-full">
            <label>End Date and time</label>

            <input
              type="datetime-local"
              id="endDateTime"
              className="bg-white border border-gray-700 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 pr-10"
            />
          </div>
          <div className="relative w-full">
            <label>Location</label>

            <input
              type="text"
              id="search"
              className="bg-white  border border-gray-700 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 pr-10"
              placeholder="Enter"
            />
          </div>
          <div className="relative w-full">
            <label>Event Code/Password if none keep it empty</label>

            <input
              type="text"
              id="search"
              className="bg-white  border border-gray-700 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 pr-10"
              placeholder="Search"
            />
          </div>
          <div className="relative w-full">
            <label>Price</label>

            <input
              type="text"
              id="search"
              className="bg-white  border border-gray-700 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 pr-10"
              placeholder="Search"
            />
          </div>
          <div className="relative w-full">
            <label>Quantity</label>

            <input
              type="text"
              id="search"
              className="bg-white  border border-gray-700 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 pr-10"
              placeholder="Search"
            />
          </div>
          <div className="relative w-full">
            <label>Ticket Image</label>

            <input
              type="file"
              id="ticketImage"
              className="bg-white border border-gray-700 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 pr-10"
              accept="image/*"
            />
          </div>
        </form>

        <div className="flex justify-center ">
          <button className="bg-white  text-black py-3 w-[70%] mt-8 rounded-lg hover:bg-black hover:text-white transition duration-300">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityChats;
