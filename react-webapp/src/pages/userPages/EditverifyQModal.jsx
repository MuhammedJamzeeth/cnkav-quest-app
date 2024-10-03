import React, {useCallback, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Modal} from "flowbite-react";
import NotificationAlert from "../../components/ui/Notification.jsx";


export default function Component({
                                      isModal,
                                      toggleModal,
                                      formDataEdit,
                                      updateQuestDetails,
                                      errorResponse,
                                      setErrorResponse,
                                  }) {

    const [formData, setFormData] = useState(formDataEdit || {
        title: '',
        task_details: '',
        duration_days: '',
        category: '',
        rank: '',
        style: '',
        price: '',
        date_and_time: [{
            date: {start_date: '', end_date: ''},
            time_slots: [{startTime: '', endTime: ''}]
        }]
    });
    const [error, setError] = useState("")
    const [val, setVal] = useState([{value: ""}]);

    const handleadddrop = () => {
        setVal([...val, {value: ""}]);
    };

    const handleremove = (index) => {
        const list = [...val];
        list.splice(index, 1);
        setVal(list);
    };

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const [showDropdown, setShowDropdown] = useState(false);
    const [showDropd, setShowDropd] = useState(false);
    const [category, setCategory] = useState("");
    const [showtime, setShowtime] = useState("");


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
        setShowtime(option);
        setShowDropd(false);
    };

    const handleAdd = useCallback((e) => {
        e.preventDefault();

        setFormData((prev) => ({
            ...prev,
            available_time_list: [
                ...prev.available_time_list,
                {startTime: "", endTime: ""},
            ],
        }));
    }, []);

    useEffect(() => {
        setFormData(formDataEdit);
        console.log("formDataEdit", formDataEdit);
    }, [formDataEdit]);

    const handleClick = (e, formData) => {
        e.preventDefault();
        console.log(errorResponse)
        console.log("handleClick", formData)
        if (!showtime) {
            setError("Time is required")
            return
        }
        setError("")
        console.log(formData._id)
        updateQuestDetails(formData._id, showtime, () => toggleModal("closed"));
    };

    const handleInputChange = (e, index = null) => {
        const {value, name} = e.target;
        if (index !== null) {
            const updatedAvailableTimeList = formData.available_time_list.map(
                (item, i) => {
                    if (i === index) {
                        return {...item, [name]: value};
                    }
                    return item;
                }
            );
            setFormData((prev) => ({
                ...prev,
                available_time_list: updatedAvailableTimeList,
            }));
        } else {
            setFormData((prev) => {
                return {...prev, [name]: value};
            });
        }
    };


    return (
        <>
            <div className=" w-full h-full flex justify-center items-center text-center">
                <Modal show={isModal} onClose={() => toggleModal("closed")}>
                    <div className="  text-black flex flex-col justify-end items-end px-4 md:px-12">
                        <button
                            onClick={() => toggleModal("closed")}
                            className=" text-2xl font-bold mt-4 text-black"
                        >
                            &times;
                        </button>
                    </div>
                    {errorResponse?.isConfirmed &&
                        <NotificationAlert type={"warning"} message={errorResponse?.isConfirmed}
                                           setErrorResponse={setErrorResponse}/>
                    }
                    <div className=" bg-white flex flex-col items-center justify-center py-4 pb-8">
                        <div className="bg-white text-white p-8 rounded-lg  w-full max-w-md">
                            <h2 className="text-xl font-bold mb-4 text-black">
                                Quest Details
                            </h2>
                            <form action="">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-black">
                                            Quest Title:
                                        </label>

                                        <input
                                            required
                                            type="text"
                                            name={"title"}
                                            id="title"
                                            value={formData?.title}
                                            // onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 border text-black text-sm border-gray-300 rounded-lg"
                                            placeholder="Enter Task Title"
                                        />

                                        {/* <QuestsCategory /> */}
                                    </div>
                                    <div>
                                        <div className="">
                                            <div className="w-full bg-gray-300 h-[300px] rounded-xl p-4 text-black">
                                                <div className="flex items-center flex-row gap-11">
                                                    <span>Duration:</span>
                                                    <span className="items-start">
                            {formData?.duration_days}
                          </span>
                                                </div>
                                                <div className="flex items-center flex-row gap-14">
                                                    <span>Budget:</span>
                                                    <span>{formData?.price}</span>
                                                </div>
                                                <div className="flex items-center flex-row gap-11">
                                                    <span>Category:</span>
                                                    <span>{formData?.category}</span>
                                                </div>
                                                <div className="flex items-center flex-row gap-[72px]">
                                                    <span>Level:</span> <span>{formData?.rank}</span>
                                                </div>
                                                <div className="flex items-center flex-row gap-6">
                                                    <span>RookiePrice:</span>
                                                    <span>{formData?.price}</span>
                                                </div>
                                                <div className="flex items-center flex-row gap-[76px]">
                                                    <span>Type:</span>
                                                    <span>{formData?.task_details}</span>
                                                </div>
                                                <div className="flex items-center flex-row gap-[76px]">
                                                    <span>Style:</span> <span>{formData?.style}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="questTitle"
                                            className="block text-sm font-medium mb-2 text-black"
                                        >
                                            Book Availability
                                        </label>
                                        <div className="relative mb-4">
                                            <input
                                                type="text"
                                                id="questName"
                                                value={formData?.date_and_time[0].date.start_date}
                                                onClick={handleInputClick}
                                                readOnly
                                                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                placeholder="Available Date"
                                            />
                                        </div>
                                        <div className="text-black">
                                            {val.map((data, i) => {
                                                return (
                                                    <div key={i}>
                                                        <div className="relative mb-4">
                                                            <input
                                                                type="text"
                                                                id="questName"
                                                                value={showtime}
                                                                onClick={handleeditInputClick}
                                                                readOnly
                                                                className={`border-gray-300 text-black text-sm rounded-lg block w-full p-2.5
                                                                ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500 placeholder-red-500' : 'focus:border-gray-300 focus:ring-gray-300'} `}
                                                                placeholder={error ? "Time is required" : "Select Available Time"}
                                                            />
                                                            <div
                                                                className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                                <svg
                                                                    className=" h-5 w-5 text-gray-300"
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

                                                            {showDropd && (
                                                                <ul className="absolute z-10 bg-white border text-black border-gray-300  mt-1 rounded-lg w-full">
                                                                    {formData?.date_and_time?.[0].time_slots.map(
                                                                        (option, index) => (
                                                                            <li
                                                                                key={index}
                                                                                onClick={() =>
                                                                                    handleoptionClick(option.startTime)
                                                                                }
                                                                                className="cursor-pointer px-2 pt-[4px] pb-[4px] hover:bg-red-200 hover:text-black"
                                                                            >
                                                                                {option.startTime}
                                                                            </li>
                                                                        )
                                                                    )}
                                                                </ul>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="confirmQuestDetails"
                                            className="mr-2"
                                            checked={isChecked}
                                            onChange={handleCheckboxChange}
                                        />
                                        <label
                                            htmlFor="confirmQuestDetails"
                                            className="text-sm text-black"
                                        >
                                            Confirm and Verify Quest Details
                                        </label>
                                    </div>

                                    <div className="pt-6">
                                        <button
                                            disabled={!isChecked}
                                            onClick={(e) => handleClick(e, formData)}
                                            // type="submit"
                                            className={`rounded-3xl w-full  text-gray-600 py-3 px-4 font-bold  ${
                                                !isChecked && "cursor-not-allowed"
                                            }`}
                                            style={{
                                                border: "2px solid transparent",
                                                borderImage: "linear-gradient(120deg, red, yellow)",
                                                borderImageSlice: 1,
                                            }}
                                        >
                                            Confirm Meeting
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <p className="mt-6 text-center text-sm text-black">
                                By signing up, you agree to Cnkav <br/>
                                <Link
                                    to="termsofservices"
                                    href="#"
                                    className="text-black underline hover:text-gray-400"
                                >
                                    Terms and Conditions
                                </Link>
                            </p>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    );
}
