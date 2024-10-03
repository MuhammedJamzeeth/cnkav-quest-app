import React, {useState} from "react";
import {useLocation, useNavigate, Link} from "react-router-dom";
import {cnkavLogo} from "../../images";
import {Button, Modal} from "flowbite-react";

export default function Component({isModal, toggleModal}) {
    const navigate = useNavigate();
    const location = useLocation();
    const {email, fullname, gender, maritalStatus} = location.state || {};

    const [category, setCategory] = useState("");
    const [edit, setEdit] = useState("");

    const [errors, setErrors] = useState({
        employmentStatus: "",
        productInterest: "",
    });

    const [showDropdown, setShowDropdown] = useState(false);
    const [showDropd, setShowDropd] = useState(false);

    const categories = [
        "Student",
        "Employed",
        "Not Employed",
        // "Prefer not to say",
        // "Software Development",
    ];

    const editdelete = [
        "Influewave (communities and Events)",
        "(Seller Platform that means accepting tasks online)",
        "Exclusive Room (Exclusive Business Network)",
        "Purchasing Real Estate",
    ];

    const handleInputClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleeditInputClick = () => {
        setShowDropd(!showDropd);
    };

    const handleOptionClick = (option) => {
        setCategory(option);
        setShowDropdown(false);
    };

    const handleoptionClick = (option) => {
        setEdit(option);
        setShowDropd(false);
    };

    const validateForm = () => {
        const newErrors = {employmentStatus: "", productInterest: ""};
        let isValid = true;

        if (!category) {
            newErrors.employmentStatus = "Please select your employment status.";
            isValid = false;
        }

        if (!edit) {
            newErrors.productInterest = "Please select a product interest.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const step3Data = {
                email,
                fullname,
                gender,
                maritalStatus,
                employmentStatus: category,
                productInterest: edit,
            };

            navigate("#/contactus/step4", {state: step3Data});
            toggleModal("contact-modal4");
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
                    <div>
                        <img src={cnkavLogo} alt="cnkav logo" className="h-36 img-fluid"/>
                    </div>
                    <div className="bg-black text-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label
                                    htmlFor="employmentStatus"
                                    className="block text-sm font-medium mb-2"
                                >
                                    Are you employed?{errors.employmentStatus && (
                                    <span className="text-red-500 text-sm"> *{errors.employmentStatus}</span>
                                )}
                                </label>

                                <div className="relative mb-4">
                                    <input
                                        type="text"
                                        id="employmentStatus"
                                        value={category}
                                        onClick={handleInputClick}
                                        readOnly
                                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Select an option"
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
                                    htmlFor="productInterest"
                                    className="block text-sm font-medium mb-2"
                                >
                                    Have you ever tried or want to try any product? {errors.productInterest && (
                                    <span className="text-red-500 text-sm"> *{errors.productInterest}</span>
                                )}
                                </label>

                                <div className="relative mb-4 mt-4">
                                    <input
                                        type="text"
                                        id="productInterest"
                                        value={edit}
                                        onClick={handleeditInputClick}
                                        readOnly
                                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Select Influewave (Affiliate Marketing)"
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
                                                    onClick={() => handleoptionClick(option)}
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
                        </p>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
