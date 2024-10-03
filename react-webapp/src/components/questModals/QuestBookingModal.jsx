import React, {useEffect, useState} from "react";
import {Modal} from "flowbite-react";

import {FaArrowRightLong, FaPlus, FaMinus} from "react-icons/fa6";
import {questEdit} from "../../utils/data.js";

const QuestBookingModal = ({isModal, toggleModal, updateDateAndTime, formDataEdit = questEdit, errors}) => {
    if (!isModal) return null;
    const [val, setVal] = useState([{value: ""}]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDrop, setShowDrop] = useState(false);
    const [showtime, setShowtime] = useState()
    const [index, setIndex] = useState("")
    const [updateData, setUpdateData] = useState({
        date:
            {
                start_date: "",
                end_date: "",
            },
        time_slots: [
            {
                startTime: "",
                endTime: "",
            }, {
                startTime: "",
                endTime: "",
            }]
    })

    useEffect(() => {
        console.log(formDataEdit)
    }, [])

    const [availableTime, setAvailableTime] = useState([{
        startTime: "", endTime: "",
    }])

    const handleAdd = (e) => {
        e.preventDefault();
        setUpdateData((prev) => {
            return {
                ...prev,
                time_slots: [...prev.time_slots, {startTime: "", endTime: ""}]
            }

        })
    }
    const handleDelete = (e, index) => {
        e.preventDefault();
        setUpdateData((prev) => {
            return {
                ...prev,
                time_slots: prev.time_slots.filter((item, i) => i !== index)
            }
        })
    }
    const handleEditInputClick = () => {
        setShowDrop(!showDrop);
    }
    const handleoptionClick = (option, index) => {
        setShowtime(option);
        setIndex(index)
        setShowDrop(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        updateDateAndTime(formDataEdit._id, index, updateData, () => toggleModal("closed"))
    }

    const handleInputChange = (e, index = null) => {
        if (index !== null) {
            const updatedTimeSlotList = updateData.time_slots.map((item, i) => {
                if (i === index) {
                    return {
                        ...item,
                        [e.target.name]: e.target.value
                    }
                }
                return item
            })
            setUpdateData((prev) => ({
                ...prev,
                time_slots: updatedTimeSlotList
            }))
        } else {
            setUpdateData((prev) => ({
                ...prev,
                date: {
                    ...prev.date,
                    [e.target.name]: e.target.value
                }
            }))
        }

    }

    return (
        <div className=" w-full h-full flex">
            <Modal show={isModal} onClose={() => toggleModal("closed")}>
                <div className=" bg-black flex flex-col px-4 md:px-12 ">
                    <button
                        onClick={() => toggleModal("closed")}
                        className=" text-white flex justify-end pt-4 text-2xl hover:text-gray-400"
                    >
                        &times;
                    </button>
                    <h2 className="text-xl font-bold mb-6 mt-20">Book Quest Meeting</h2>
                    <form className="space-y-4">
                        <div className="pb-1">
                            <label
                                htmlFor="questTitle"
                                className="block text-xs font-medium mb-2"
                            >
                                Select Date{""}

                            </label>
                            <div
                                className="flex w-full items-center justify-center gap-2 bg-white py-1.5 rounded-md px-2">
                                <input
                                    // required
                                    type="date"
                                    // id="startDateTime"
                                    id="questDate"
                                    name={"start_date"}
                                    value={updateData.date.start_date}
                                    onChange={handleInputChange}
                                    className="text-black text-xs border-none outline-none flex w-full justify-center "
                                    placeholder=""
                                />
                                <FaArrowRightLong className="text-black h-8 w-8"/>
                                <input
                                    // required
                                    type="date"
                                    // id="endDateTime"
                                    name={"end_date"}
                                    value={updateData.date.end_date}
                                    onChange={handleInputChange}
                                    className=" text-black text-xs border-none outline-none px-1 flex w-full justify-center"
                                    placeholder=""
                                />
                            </div>
                        </div>
                        <div className="">
                            <label htmlFor="" className="block text-xs font-medium pb-2">
                                Select Time {errors.bookAvailabilityTime && (
                                <span className="text-red-600 font-bold">
                                     *{errors.bookAvailabilityTime}
                </span>
                            )}
                            </label>

                            <div
                                className="flex w-full items-center justify-center gap-2 bg-white py-1.5 rounded-md px-2">
                                <input
                                    // required
                                    type="Time"
                                    id="startDateTime"
                                    // id="questDate"
                                    name={"startTime"}
                                    value={updateData.time_slots?.[0]?.startTime}
                                    onChange={(e) => handleInputChange(e, 0)}
                                    className="text-black text-xs border-none outline-none flex w-full justify-center "
                                    placeholder=""
                                />
                                <FaArrowRightLong className="text-black h-8 w-8"/>
                                <input
                                    // required
                                    type="Time"
                                    // id="endDateTime"
                                    name={"endTime"}
                                    value={updateData.time_slots?.[0]?.endTime}
                                    onChange={(e) => handleInputChange(e, 0)}
                                    className=" text-black text-xs border-none outline-none px-1 flex w-full justify-center"
                                    placeholder=""
                                />
                            </div>
                        </div>
                        <button
                            className="pt-1"
                            onClick={(e) => handleAdd(e)}
                        >
                            <div className=" bg-blue-700 py-2 px-4 rounded-md">
                                <FaPlus className="h-3 w-3"/>
                            </div>
                        </button>
                        <div className="">
                            {updateData.time_slots.slice(1).map((slot, i) => (
                                <div className="">
                                    <div
                                        className="mb-3 flex w-full items-center justify-center gap-2 bg-white py-1.5 rounded-md px-2">
                                        <input
                                            // required
                                            type="Time"
                                            id="startDateTime"
                                            // id="questDate"
                                            name={"startTime"}
                                            value={updateData.time_slots?.[i + 1].startTime}
                                            // value={data}
                                            onChange={(e) => handleInputChange(e, i + 1)}
                                            className="text-black text-xs border-none outline-none flex w-full justify-center "
                                            placeholder=""
                                        />
                                        {/* <FaArrowRightLong className="text-black h-8 w-8" /> */}
                                        <input
                                            // required
                                            type="Time"
                                            // id="endDateTime"
                                            name={"endTime"}
                                            value={updateData.time_slots?.[i + 1].endTime}
                                            onChange={(e) => handleInputChange(e, i + 1)}
                                            className=" text-black text-xs border-none outline-none px-1 flex w-full justify-center"
                                            placeholder=""
                                        />
                                        <button
                                            className=""
                                            onClick={(e) => handleDelete(e, i + 1)}
                                        >
                                            <div className=" bg-red-600 py-2 px-2 rounded-md">
                                                <FaMinus className="h-3 w-3"/>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div>
                            <label
                                htmlFor="questTitle"
                                className="block text-sm font-medium mb-4 text-white"
                            >
                                Book Availability{" "}
                            </label>
                            <div className="relative mb-4">
                                <input
                                    type="text"
                                    id="questName"
                                    value={formDataEdit?.date_and_time?.[0].date?.start_date}
                                    // onClick={handleInputClick}
                                    readOnly
                                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Available Date"
                                />
                            </div>
                            <div className="text-black">
                                <div>
                                    <div className="relative mb-4">

                                        <input
                                            type="text"
                                            id="questName"
                                            value={showtime}
                                            onClick={handleEditInputClick}
                                            readOnly
                                            className=" border-gray-300 text-black text-sm rounded-lg focus:ring-gray-300 block w-full p-2.5"
                                            placeholder="Select Available Time"
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

                                        {showDrop && (
                                            <ul className="absolute z-10 bg-white border text-black border-gray-300  mt-1 rounded-lg w-full">
                                                {formDataEdit?.date_and_time?.[0]?.time_slots.map((option, index) => (
                                                    <li
                                                        key={index}
                                                        onClick={() => handleoptionClick(option.startTime, index)}
                                                        className="cursor-pointer px-2 pt-[4px] pb-[4px] hover:bg-red-200 hover:text-black"
                                                    >
                                                        {option.startTime}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        {errors.bookAvailabilityDate && (
                                            <span
                                                className="text-red-600 font-medium text-sm flex-flex-col items-center pl-[2px]">
                                                *{errors.bookAvailabilityDate}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="">
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="rounded-3xl w-full  text-white py-3 px-4 font-bold"
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
                    <p className="mt-6 text-center text-sm text-white pb-4">
                        By signing up, you agree to Cnkav <br/>
                        <a href="/terms-of-services" className="text-white underline">
                            Terms and Conditions
                        </a>
                        .
                    </p>
                </div>
            </Modal>
        </div>
    );
};

export default QuestBookingModal;
