import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const QuestStyles = ({name, value, onChange}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [category, setCategory] = useState("");
    const navigate = useNavigate();

    // const handleSelectChange = (event) => {
    //   if (event.target.value === "exclusive-room-events") {
    //     navigate("/questModals/events/exclusive-room-events");
    //   }
    // };

    const questStyles = [
        "",
        "On-site",
        "Travel",
        "Remote",
        "One Time Tasks",
        "One Time Tasks Party",
        "One Time Tasks Group",
        "Monthly Recurring Task",
        "Monthly Recurring Task Party",
        "Monthly Recurring Task Group",
        "On-site Party Task (Task with online group)",
        "Partly on-site and Remote",
        "On-site Group Task (Task with a group)",
        "Travel Party Task (Task with online group)",
        "Travel Group Task (Task with a group)",
        "Remote Party Task (Task with online group)",
        "Remote Group Task (Task with a group)",
        "Partly on-site and Remote Party Task (Task with online group)",
        "Partly on-site and Remote Group Task (Task with a group)",
    ];

    const handleInputClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleOptionClick = (option) => {
        onChange({target: {name, value: option}});
        setShowDropdown(false);
    };

    return (
        // <>
        //   <div className="">
        //     <form className="space-y-4">
        //       <select
        //         id="eventType"
        //         className="bg-white border-gray-700 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
        //         onChange={handleSelectChange}
        //       >
        //         <option value="" disabled selected>
        //           Quest Style
        //         </option>

        //         <option value="exclusive-room-events">On-site</option>
        //         <option value="community-events">Travel</option>
        //         <option value="conference">Remote</option>
        //         <option value="workshop">On-site Party Task (Task with online group)</option>
        //         <option value="webinar">Partly on-site and Remote</option>
        //         <option value="meetup">On-site Group Task (Task with a group)</option>
        //         <option value="meetup">Travel Party Task (Task with online group)</option>
        //         <option value="meetup">Travel Group Task (Task with a group)</option>
        //         <option value="meetup">Remote Party Task (Task with online group)</option>
        //         <option value="meetup">Remote Group Task (Task with a group)</option>
        //         <option value="meetup">Partly on-site and Remote Party Task (Task with online group)</option>
        //         <option value="meetup">Partly on-site and Remote Group Task (Task with a group)</option>
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
                id="questStyle"
                name={name}
                value={value}
                onClick={handleInputClick}
                readOnly
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Quest Style"
            />

            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                    class=" h-5 w-5 text-gray-400"
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
                <ul className="absolute z-10 bg-white text-black border border-gray-300 mt-1 rounded-lg w-full">
                    {questStyles.map((option, index) => (
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

export default QuestStyles;
