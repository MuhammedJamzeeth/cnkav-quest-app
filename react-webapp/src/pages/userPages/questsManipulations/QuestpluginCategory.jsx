import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const QuestpluginCategory = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [category, setCategory] = useState("");

    // const navigate = useNavigate();

    // const handleSelectChange = (event) => {
    //   if (event.target.value === "exclusive-room-events") {
    //     navigate("/questModals/events/exclusive-room-events");
    //   }
    // };

    const categories = [
        "One Time Tasks",
        "Necessity Tasks",
        "E sports",
        "Digital Marketing",
        "Software Development",
        "Gaming",
        "Cooperate Task",
        "Monthly Recurring Task",
        "Looking for a product",
        "Philanthropy Task",
        "Collecting Task",
        "Trading",
        "Coaching",
        "Consulting",
        "AI",
    ];

    const handleInputClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleOptionClick = (option) => {
        setCategory(option);
        setShowDropdown(false);
    };
    return (
        <div className="relative">
            <input
                type="text"
                id="questName"
                value={category}
                onClick={handleInputClick}
                readOnly
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Quest app category"
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

export default QuestpluginCategory;
