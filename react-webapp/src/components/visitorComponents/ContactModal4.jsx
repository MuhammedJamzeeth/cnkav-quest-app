import React, {useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {cnkavLogo} from "../../images";
import {Modal} from "flowbite-react";

export default function Component({isModal, toggleModal}) {
    const navigate = useNavigate();
    const location = useLocation();
    const {
        email,
        fullname,
        gender,
        maritalStatus,
        employmentStatus,
        productInterest,
    } = location.state || {};

    const [category, setCategory] = useState("");
    const [edit, setEdit] = useState("");
    const [errors, setErrors] = useState({});

    const categories = [
        "North America",
        "South America",
        "Europe",
        "Africa",
        "Australia",
        "Antarctica",
    ];

    const editdelete = [
        "Christianity",
        "Islam",
        "Hinduism",
        "Judaism",
        "Prefer not to say",
    ];

    const [showDropdown, setShowDropdown] = useState(false);
    const [showDropd, setShowDropd] = useState(false);

    const handleInputClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleEditInputClick = () => {
        setShowDropd(!showDropd);
    };

    const handleOptionClick = (option) => {
        setCategory(option);
        setShowDropdown(false);
    };

    const handleOptionClickReligion = (option) => {
        setEdit(option);
        setShowDropd(false);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!category) newErrors.location = "Location is required";
        if (!edit) newErrors.religion = "Religion is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const formData = {
                ...location.state,
                locations: category,
                religions: edit,
            };
            navigate("#/contactus/step5", {state: formData});
            toggleModal("contact-modal5");
        }
    };

    return (
        <div className="w-full h-full flex justify-center items-center text-center">
            <Modal show={isModal} onClose={() => toggleModal("closed")}>
                <div className="bg-black flex flex-col justify-end items-end px-4 md:px-12">
                    <button
                        onClick={() => toggleModal("closed")}
                        className="text-white text-2xl font-bold mt-4"
                    >
                        &times;
                    </button>
                </div>
                <div className="bg-black flex flex-col items-center justify-center py-4 pb-8">
                    <img src={cnkavLogo} alt="cnkav logo" className="h-36 img-fluid"/>
                    <div className="bg-black text-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label
                                    htmlFor="location"
                                    className="block text-sm font-medium mb-2"
                                >
                                    Where are you from? {errors.location && (
                                    <span className="text-red-500 text-sm mt-1"> *{errors.location}</span>
                                )}
                                </label>
                                <div className="relative mb-4">
                                    <input
                                        type="text"
                                        id="questName"
                                        value={category}
                                        onClick={handleInputClick}
                                        readOnly
                                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Select your location"
                                    />
                                    <div
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <svg
                                            className="h-5 w-5 text-gray-400"
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
                                        <ul className="absolute z-10 bg-white border text-black border-gray-900 mt-1 rounded-lg w-full">
                                            {categories.map((option, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => handleOptionClick(option)}
                                                    className="cursor-pointer px-2 pt-[4px] pb-[4px] hover:bg-gray-200 hover:text-black"
                                                >
                                                    {option}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="religion"
                                    className="block text-sm font-medium mb-2"
                                >
                                    What is your religion? {errors.religion && (
                                    <span className="text-red-500 text-sm mt-1"> *{errors.religion}</span>
                                )}
                                </label>
                                <div className="relative mb-4 mt-4">
                                    <input
                                        type="text"
                                        id="questName"
                                        value={edit}
                                        onClick={handleEditInputClick}
                                        readOnly
                                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Select your religion"
                                    />
                                    <div
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <svg
                                            className="h-5 w-5 text-gray-400"
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
                                    {showDropd && (
                                        <ul className="absolute z-10 bg-white border text-black border-gray-900 mt-1 rounded-lg w-full">
                                            {editdelete.map((option, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => handleOptionClickReligion(option)}
                                                    className="cursor-pointer px-2 pt-[4px] pb-[4px] hover:bg-gray-200 hover:text-black"
                                                >
                                                    {option}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                </div>
                            </div>
                            <div className="pt-6">
                                <button
                                    type="submit"
                                    className="rounded-3xl w-full bg-black text-white py-3 px-4 font-bold"
                                    style={{
                                        border: "2px solid transparent",
                                        borderImage: "linear-gradient(120deg, red, yellow)",
                                        borderImageSlice: 1,
                                    }}
                                >
                                    Confirm
                                </button>
                            </div>
                        </form>
                        <p className="mt-6 text-center text-sm text-white">
                            By signing up, you agree to Cnkav <br/>
                            <a href="/terms-of-services" className="text-white underline">
                                Terms and Conditions
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
