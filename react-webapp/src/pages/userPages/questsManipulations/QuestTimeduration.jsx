import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const QuestCategory = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [category, setCategory] = useState("");

    // const navigate = useNavigate();

    // const handleSelectChange = (event) => {
    //   if (event.target.value === "exclusive-room-events") {
    //     navigate("/questModals/events/exclusive-room-events");
    //   }
    // };

    const categories = [
        "One Day",
        "Two Day",
        "Five Day",
        "Ten Day",
    ];

    const handleInputClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleOptionClick = (option) => {
        setCategory(option);
        setShowDropdown(false);
    };
    return (
        // <>

        //   <div className="">
        //     <form className="space-y-4">
        //       <select
        //         id="eventType"
        //         className="bg-white border-gray-700 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-full w-full overflow-auto p-3"
        //         onChange={handleSelectChange}
        //       >
        //         <option value="" disabled selected className="">
        //           Categories
        //         </option>

        //         <option value="exclusive-room-events">One Time Tasks</option>
        //         <option value="community-events">Necessity Tasks</option>
        //         <option value="conference">E sports</option>
        //         <option value="workshop">Digital Marketing</option>
        //         <option value="webinar">Software Development</option>
        //         <option value="meetup">Gaming</option>
        //         <option value="meetup">Cooperate Task</option>
        //         <option value="meetup">Monthly Recurring Task</option>
        //         <option value="meetup">Looking for a product</option>
        //         <option value="meetup">Philanthropy Task</option>
        //         <option value="meetup">Collecting Task</option>
        //         <option value="meetup">Trading</option>
        //         <option value="meetup">Coaching</option>
        //         <option value="meetup">Consulting</option>
        //         <option value="meetup">AI</option>
        //       </select>
        //       {/* <div className="relative">
        //         <input
        //           type="text"
        //           id="search"
        //           className="bg-white border border-gray-700 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 pr-10"
        //           placeholder="Search"
        //         />
        //         <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        //           <svg
        //             className="h-5 w-5 text-gray-500"
        //             fill="currentColor"
        //             viewBox="0 0 20 20"
        //           >
        //             <path
        //               fillRule="evenodd"
        //               d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
        //               clipRule="evenodd"
        //             />
        //           </svg>
        //         </div>
        //       </div> */}
        //       {/* <button
        //         type="submit"
        //         className="bg-white border border-gray-700 text-left text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
        //         onClick={() => setPublishNewEventModal(!isPublishNewEventModal)}
        //       >
        //         Post New Community Event
        //       </button> */}
        //     </form>
        //   </div>

        // </>
        <div className="relative">

            <input
                type="text"
                id="questName"
                value={category}
                onClick={handleInputClick}
                readOnly
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Select"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg class=" h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                          clip-rule="evenodd"/>
                </svg>
            </div>


            {showDropdown && (
                <ul className="absolute z-10 bg-black border text-white border-gray-300  mt-1 rounded-lg w-full">
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
        </div>
    );
};

export default QuestCategory;
