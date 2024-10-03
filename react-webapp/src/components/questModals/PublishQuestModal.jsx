import React, {memo, useCallback, useState} from 'react';
import {Modal} from "flowbite-react";
import {cnkavLogo} from "../../images.js";
import QuestsCategory from "../../pages/userPages/questsManipulations/QuestsCategory.jsx";
import QuestsRank from "../../pages/userPages/questsManipulations/QuestsRank.jsx";
import QuestsStyles from "../../pages/userPages/questsManipulations/QuestsStyles.jsx";
import {FaArrowRightLong, FaMinus, FaPlus} from "react-icons/fa6";
import {Link} from "react-router-dom";
import {publishQuestState} from "../../utils/data.js";
import useQuestsHandler from "../../hooks/useQuestsHandler.jsx";

const PublishQuestModal = memo(({
                                    openModal,
                                    closeModal,
                                }) => {
    const [formData, setFormData] = useState(publishQuestState);
    const {
        errors,
        handleSubmit,
    } = useQuestsHandler(formData, setFormData, closeModal);

    const handleDelete = (e, index) => {
        e.preventDefault();
        setFormData((prev) => {
            return {
                ...prev,
                dateAndTime: {
                    ...prev.dateAndTime,
                    time_slots: prev.dateAndTime.time_slots.filter((_, i) => i !== index)
                }
            };
        });
    };

    const handleAdd = useCallback((e) => {
        e.preventDefault();
        setFormData((prev) => ({
            ...prev,
            dateAndTime: {
                ...prev.dateAndTime,
                time_slots: [
                    ...prev.dateAndTime.time_slots,
                    {startTime: "", endTime: ""},
                ]
            },
        }));
    }, [setFormData]);


    const handleInputChange = useCallback((e, index = null) => {
        const {value, name} = e.target;
        if (index !== null) {
            const updatedAvailableTimeList = formData.dateAndTime.time_slots.map(
                (item, i) => {
                    if (i === index) {
                        return {...item, [name]: value};
                    }
                    return item;
                }
            );
            setFormData((prev) => ({
                ...prev,
                dateAndTime: {
                    ...prev.dateAndTime,
                    time_slots: updatedAvailableTimeList
                },
            }));
        } else {
            if (name === "start_date" || name === "end_date") {
                return setFormData((prev) => ({
                    ...prev, dateAndTime: {
                        ...prev.dateAndTime,
                        date: {
                            ...prev.dateAndTime.date,
                            [name]: value
                        }
                    }
                }))
            }

            setFormData((prev) => {
                return {...prev, [name]: value};
            });
        }
    }, [formData.dateAndTime.time_slots, setFormData]);

    console.log('new quest')

    return (
        <div className="w-full h-full flex justify-center items-center text-center">
            <Modal
                show={openModal}
                size="xl"
                onClose={closeModal}
                popup
            >
                <div className="bg-black rounded-md">
                    <Modal.Header/>
                    <div className=" flex flex-col items-center justify-center py-4 pb-1">
                        <div>
                            <img
                                src={cnkavLogo}
                                alt="cnkav logo"
                                className="h-16 w-16 img-fluid"
                            />
                        </div>
                    </div>

                    <div
                        className=" text-white  rounded-lg shadow-lg w-full md:px-8 px-6 relative pt-4">
                        <form className="space-y-2">
                            {/* 1 div section */}
                            <div className=" pb-1">
                                <label
                                    htmlFor="title"
                                    className="block text-xs pb-2 font-medium text-white"
                                >
                                    Give Your Project A Brief Title
                                    {errors.title && (
                                        <span
                                            className="text-red-600 font-bold flex-flex-col items-center pl-[2px]">
                              {" "}
                                            *{errors.title}
                            </span>
                                    )}
                                </label>
                                <input
                                    //   required
                                    type="text"
                                    name={"title"}
                                    id="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border text-black text-sm border-gray-300 rounded-lg"
                                    placeholder="Enter Task Title"
                                />
                            </div>

                            {/* 2nd div section */}
                            <div className=" pb-1">
                                <label
                                    htmlFor="TaskDetails"
                                    className="block text-xs pb-2 font-medium text-white"
                                >
                                    What Are Your Looking To Get Done?{" "}
                                    {errors.taskDetails && (
                                        <span
                                            className="text-red-600 font-bold flex-flex-col items-center pl-[2px]">
                              {" "}
                                            *{errors.taskDetails}
                            </span>
                                    )}
                                </label>

                                <input
                                    type="text"
                                    name={"taskDetails"}
                                    id="TaskDetails"
                                    value={formData.taskDetails}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border text-black text-sm border-gray-300 rounded-lg"
                                    placeholder="Enter What the task details"
                                />
                            </div>

                            {/* 3rd div section */}
                            <div className=" pb-1">
                                <label
                                    htmlFor="durationDays"
                                    className="block text-xs pb-2 font-medium text-white"
                                >
                                    Task Duration in Days{""}
                                    {errors.durationDays && (
                                        <span
                                            className="text-red-600 font-bold flex-flex-col items-center pl-[2px]">
                              {" "}
                                            *{errors.durationDays}
                            </span>
                                    )}
                                </label>

                                <input
                                    type="text"
                                    name={"durationDays"}
                                    id="durationDays"
                                    value={formData.durationDays}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border text-black text-sm border-gray-300 rounded-lg"
                                    placeholder="Select"
                                />
                            </div>

                            {/* 4th div section */}
                            <div className=" pb-1">
                                <label
                                    htmlFor="category"
                                    className="block text-xs font-medium mb-2"
                                >
                                    Category{""}
                                    {errors.category && (
                                        <span
                                            className="text-red-600 font-bold flex-flex-col items-center pl-[2px]">
                              {" "}
                                            *{errors.category}
                            </span>
                                    )}
                                </label>
                                <QuestsCategory
                                    name={"category"}
                                    id="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                />
                            </div>

                            {/* 5th div section */}
                            <div className="pb-1">
                                <label
                                    htmlFor="rank"
                                    className="block text-xs font-medium mb-2"
                                >
                                    Rank{""}
                                    {errors.rank && (
                                        <span
                                            className="text-red-600 font-bold flex-flex-col items-center pl-[2px]">
                              {" "}
                                            *{errors.rank}
                            </span>
                                    )}
                                </label>
                                <QuestsRank
                                    name={"rank"}
                                    id="Rank"
                                    value={formData.rank}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {/* 6th div section */}
                            <div className="pb-1">
                                <label
                                    htmlFor="Styles"
                                    className="block text-xs font-medium mb-2"
                                >
                                    Quest Style{""}
                                    {errors.style && (
                                        <span
                                            className="text-red-600 font-bold flex-flex-col items-center pl-[2px]">
                              {" "}
                                            *{errors.style}
                            </span>
                                    )}
                                </label>
                                <QuestsStyles
                                    name={"style"}
                                    id="Styles"
                                    value={formData.style}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {/* 7th div section */}
                            <div className="pb-1">
                                <label
                                    htmlFor="questTitle"
                                    className="block text-xs font-medium mb-2"
                                >
                                    Price{""}
                                    {errors.price && (
                                        <span
                                            className="text-red-600 font-bold flex-flex-col items-center pl-[2px]">
                                            *{errors.price}
                                        </span>
                                    )}
                                </label>
                                <input
                                    //   required
                                    type="text"
                                    //   id="questTitle"
                                    name={"price"}
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border text-sm text-black border-gray-300 rounded-lg"
                                    placeholder="Enter The amount the quest doer gets paid"
                                />
                            </div>
                            {/* 8th deiv section */}
                            <div className="pb-1">
                                <label
                                    htmlFor="questTitle"
                                    className="block text-xs font-medium mb-2"
                                >
                                    Select Date{""}
                                    {errors.bookAvailabilityDate && (
                                        <span
                                            className="text-red-600 font-bold flex-flex-col items-center pl-[2px]">
                              {" "}
                                            *{errors.bookAvailabilityDate}
                            </span>
                                    )}
                                </label>
                                <div
                                    className="flex w-full items-center justify-center gap-2 bg-white py-1.5 rounded-md px-2">
                                    <input
                                        // required
                                        type="date"
                                        // id="startDateTime"
                                        id="questDate"
                                        name={"start_date"}
                                        value={formData.dateAndTime.date.start_date}
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
                                        value={formData.dateAndTime.date.end_date}
                                        onChange={handleInputChange}
                                        className=" text-black text-xs border-none outline-none px-1 flex w-full justify-center"
                                        placeholder=""
                                    />
                                </div>
                            </div>
                            <div className="">
                                <label
                                    htmlFor=""
                                    className="block text-xs font-medium pb-2"
                                >
                                    Select Time{" "}
                                    {errors.bookAvailabilityTime && (
                                        <span className="text-red-600 font-bold">
                              {" "}
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
                                        value={formData.dateAndTime?.time_slots[0]?.startTime}
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
                                        value={formData.dateAndTime?.time_slots[0]?.endTime}
                                        onChange={(e) => handleInputChange(e, 0)}
                                        className=" text-black text-xs border-none outline-none px-1 flex w-full justify-center"
                                        placeholder=""
                                    />
                                </div>
                            </div>
                            <button
                                className="pt-1"
                                // onClick={() => setShowtime(!showtime)}
                                onClick={handleAdd}
                            >
                                <div className=" bg-blue-700 py-2 px-4 rounded-md">
                                    <FaPlus className="h-3 w-3"/>
                                </div>
                            </button>
                            <div className="">
                                {formData.dateAndTime?.time_slots?.slice(1).map((slot, i) => (
                                    <div className="" key={i}>
                                        {/* <input value={data} /> */}
                                        <div
                                            className="mb-3 flex w-full items-center justify-center gap-2 bg-white py-1.5 rounded-md px-2">
                                            <input
                                                // required
                                                type="Time"
                                                id="startDateTime"
                                                // id="questDate"
                                                name={"startTime"}
                                                value={slot.startTime}
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
                                                value={slot.endTime}
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
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="rounded-3xl w-full  text-white py-3 px-4 font-bold mt-8"
                                style={{
                                    border: "2px solid transparent",
                                    borderImage: "linear-gradient(120deg, red, yellow)",
                                    borderImageSlice: 1,
                                }}
                            >
                                Confirm
                            </button>
                        </form>
                        <p className="mt-6 text-center text-sm text-white">
                            By signing up, you agree to Cnkav <br/>
                            <Link
                                to="termsofservices"
                                href="#"
                                className="text-white underline hover:text-gray-400"
                            >
                                Terms and Conditions
                            </Link>
                        </p>
                    </div>
                </div>
            </Modal>
        </div>
    );
});

export default PublishQuestModal;
