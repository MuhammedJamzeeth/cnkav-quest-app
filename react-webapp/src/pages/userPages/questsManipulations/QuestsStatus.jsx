import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const questStatus = ({name, value, onChange}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [questStyle, setQuestStyle] = useState("");
    const navigate = useNavigate();

    // const handleSelectChange = (event) => {
    //   if (event.target.value === "exclusive-room-events") {
    //     navigate("/questModals/events/exclusive-room-events");
    //   }
    // };

    const questStatus = [
        "Pending",
        "In Progress",
        "Waiting For verification",
        "Current Quest's",
        "Todays Quest Schedule",
        "Completed",
    ];

    const handleInputClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleOptionClick = (option) => {
        onChange({
            target: {
                name,
                value: option,
            },
        });
        setShowDropdown(false);
    };

    return (
        <div className="relative max-w-sm w-full ">
            <input
                type="text"
                id="questStatus"
                name={name}
                value={value}
                onClick={handleInputClick}
                readOnly
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5"
                placeholder="Quest Status"
            />

            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                    className=" h-5 w-5 text-gray-400"
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
                <ul className="absolute z-10 bg-black border border-gray-300 mt-1 rounded-lg w-full">
                    {questStatus.map((option, index) => (
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

export default questStatus;
