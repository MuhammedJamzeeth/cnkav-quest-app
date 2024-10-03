import React, {useCallback, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {cnkavLogo} from "../../images";
import {FaArrowRightLong, FaPlus, FaMinus} from "react-icons/fa6";
import {Modal} from "flowbite-react";
import QuestsCategory from "./questsManipulations/QuestsCategory";
import QuestsRank from "./questsManipulations/QuestsRank";
import QuestsStyles from "./questsManipulations/QuestsStyles";
import {formatDate, formatTime} from "../../utils/date.js";

export default function Component({
                                      isModal,
                                      toggleModal,
                                      formDataEdit,
                                      errors,
                                      updateQuestDetails,
                                  }) {
    const [showtime, setShowtime] = useState(false);

    const [formData, setFormData] = useState(formDataEdit || {});

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

    const handleClick = (e) => {
        e.preventDefault();
        updateQuestDetails(formData._id, formData, () => toggleModal("closed"));
        console.log(errors);
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

    const handleDelete = (index) => {
        setFormData((prev) => {
            return {
                ...prev,
                available_time_list: prev.available_time_list.filter(
                    (_, i) => i !== index
                ),
            };
        });
    };

    return (
        <div className=" w-full h-full flex justify-center items-center text-center">
            <Modal show={isModal} onClose={() => toggleModal("closed")}>
                <div className=" bg-black flex flex-col justify-end items-end px-4 md:px-12">
                    <button
                        onClick={() => toggleModal("closed")}
                        className="text-white text-2xl font-bold mt-4"
                    >
                        &times;
                    </button>
                </div>
                <div className=" bg-black flex flex-col items-center justify-center py-4 pb-8">
                    <div>
                        <img
                            src={cnkavLogo}
                            alt="cnkav logo"
                            className="h-16 w-16 img-fluid"
                        />
                    </div>

                    <div className="bg-black text-white rounded-lg shadow-lg w-full max-w-md relative">
                        <h2 className="text-xl font-bold mb-4 mt-4">Edit Quest</h2>
                        <form className="space-y-2">
                            {/* 1 div section */}
                            <div className=" pb-1">
                                <label
                                    htmlFor="title"
                                    className="block text-xs pb-2 font-medium text-white"
                                >
                                    Give Your Project A Brief Title
                                    {errors?.title && (
                                        <span className="text-red-600 font-bold">
                      {" "}
                                            *{errors?.title}
                    </span>
                                    )}
                                </label>
                                <input
                                    required
                                    type="text"
                                    name={"title"}
                                    id="title"
                                    value={formData?.title}
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
                                    {errors?.taskDetails && (
                                        <span className="text-red-600 font-bold">
                      {" "}
                                            *{errors?.taskDetails}
                    </span>
                                    )}
                                </label>

                                <input
                                    required
                                    type="text"
                                    name="task_details"
                                    id="TaskDetails"
                                    value={formData?.task_details}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border text-black text-sm border-gray-300 rounded-lg"
                                    placeholder="Enter What the task details"
                                />
                            </div>

                            {/* 3rd div section */}
                            <div className=" pb-1">
                                <label
                                    htmlFor="DurationDays"
                                    className="block text-xs pb-2 font-medium text-white"
                                >
                                    Task Duration in Days
                                    {errors?.durationDays && (
                                        <span className="text-red-600 font-bold">
                      {" "}
                                            *{errors.durationDays}
                    </span>
                                    )}
                                </label>

                                <input
                                    required
                                    type="text"
                                    name="duration_days"
                                    id="DurationDays"
                                    value={formData?.duration_days}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border text-black text-sm border-gray-300 rounded-lg"
                                    placeholder="Select"
                                />
                            </div>

                            {/* 4th div section */}
                            <div className=" pb-1">
                                <label
                                    htmlFor="Category"
                                    className="block text-xs font-medium mb-2"
                                >
                                    Category
                                    {errors?.category && (
                                        <span className="text-red-600 font-bold">
                      {" "}
                                            *{errors?.category}
                    </span>
                                    )}
                                </label>
                                <QuestsCategory
                                    name="category"
                                    id="Category"
                                    value={formData?.category}
                                    onChange={handleInputChange}
                                />
                            </div>

                            {/* 5th div section */}
                            <div className="pb-1">
                                <label
                                    htmlFor="Rank"
                                    className="block text-xs font-medium mb-2"
                                >
                                    Rank
                                    {errors?.rank && (
                                        <span className="text-red-600 font-bold">
                      {" "}
                                            *{errors?.rank}
                    </span>
                                    )}
                                </label>
                                <QuestsRank
                                    name="rank"
                                    id="Rank"
                                    value={formData?.rank}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {/* 6th div section */}
                            <div className="pb-1">
                                <label
                                    htmlFor="Styles"
                                    className="block text-xs font-medium mb-2"
                                >
                                    Quest Style
                                    {errors?.style && (
                                        <span className="text-red-600 font-bold">
                      {" "}
                                            *{errors?.style}
                    </span>
                                    )}
                                </label>
                                <QuestsStyles
                                    name="style"
                                    id="Styles"
                                    value={formData?.style}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {/* 7th div section */}
                            <div className="pb-1">
                                <label
                                    htmlFor="questTitle"
                                    className="block text-xs font-medium mb-2"
                                >
                                    Price
                                    {errors?.price && (
                                        <span className="text-red-600 font-bold">
                      {" "}
                                            *{errors?.price}
                    </span>
                                    )}
                                </label>
                                <input
                                    required
                                    type="text"
                                    //   id="questTitle"
                                    name="price"
                                    value={formData?.price}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
                                    placeholder="Enter The amount the quest doer gets paid"
                                />
                            </div>
                            {/* 8th deiv section */}
                            <div className="pb-1">
                                <label
                                    htmlFor="questTitle"
                                    className="block text-xs font-medium mb-2"
                                >
                                    Select Date{" "}
                                    {errors?.bookAvailabilityDate && (
                                        <span className="text-red-600 font-bold">
                      {errors?.bookAvailabilityDate}
                    </span>
                                    )}
                                </label>
                                <div
                                    className="flex w-full items-center justify-center gap-2 bg-white py-1.5 rounded-md px-2">
                                    <input
                                        required
                                        type="date"
                                        // id="startDateTime"
                                        id="questDate"
                                        name="start_date"
                                        value={formatDate(formData?.start_date)}
                                        onChange={handleInputChange}
                                        className="text-black text-xs border-none outline-none flex w-full justify-center "
                                        placeholder=""
                                    />
                                    <FaArrowRightLong className="text-black h-8 w-8"/>
                                    <input
                                        required
                                        type="date"
                                        // id="endDateTime"
                                        name="end_date"
                                        value={formatDate(formData?.end_date)}
                                        onChange={handleInputChange}
                                        className=" text-black text-xs border-none outline-none px-1 flex w-full justify-center"
                                        placeholder=""
                                    />
                                </div>

                                <label htmlFor="" className="block text-xs font-medium">
                                    End Date and time{" "}
                                    {errors?.startDate && (
                                        <span className="text-red-600 font-bold">
                      {" "}
                                            *{errors?.startDate}
                    </span>
                                    )}
                                </label>
                            </div>
                            <div className="pb-1">
                                <label
                                    // htmlFor="questTitle"
                                    className="block text-xs font-medium mb-2"
                                >
                                    Select Time{" "}
                                    {errors?.bookAvailabilityTime && (
                                        <span className="text-red-600 font-bold">
                      {errors?.bookAvailabilityTime}
                    </span>
                                    )}
                                </label>

                                <div
                                    className="flex w-full items-center justify-center gap-2 bg-white py-1.5 rounded-md px-2">
                                    <input
                                        required
                                        type="Time"
                                        id="startDateTime"
                                        // id="questDate"
                                        name="start_time"
                                        value={formatTime(formData?.start_time)}
                                        onChange={handleInputChange}
                                        className="text-black text-xs border-none outline-none flex w-full justify-center "
                                        placeholder=""
                                    />
                                    <FaArrowRightLong className="text-black h-8 w-8"/>
                                    <input
                                        required
                                        type="Time"
                                        // id="endDateTime"
                                        name="end_time"
                                        value={formatTime(formData?.end_time)}
                                        onChange={handleInputChange}
                                        className=" text-black text-xs border-none outline-none px-1 flex w-full justify-center"
                                        placeholder=""
                                    />
                                </div>
                            </div>
                            <button className="pt-1" onClick={handleAdd}>
                                <div className=" bg-blue-700 py-2 px-4 rounded-md">
                                    <FaPlus className="h-3 w-3"/>
                                </div>
                            </button>
                            <div className="">
                                {formData?.available_time_list?.map((slot, i) => (
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
                                                value={formData.available_time_list[i].startTime}
                                                // value={data}
                                                onChange={(e) => handleInputChange(e, i)}
                                                className="text-black text-xs border-none outline-none flex w-full justify-center "
                                                placeholder=""
                                            />
                                            <FaArrowRightLong className="text-black h-8 w-8"/>
                                            <input
                                                // required
                                                type="Time"
                                                // id="endDateTime"
                                                name={"endTime"}
                                                value={formData.available_time_list[i].endTime}
                                                onChange={(e) => handleInputChange(e, i)}
                                                className=" text-black text-xs border-none outline-none px-1 flex w-full justify-center"
                                                placeholder=""
                                            />
                                            <button className="" onClick={() => handleDelete(i)}>
                                                <div className=" bg-red-600 py-2 px-2 rounded-md">
                                                    <FaMinus className="h-3 w-3"/>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </form>
                        {/* <div className="flex justify-center " onClick={handleAddClick}> */}
                        <div className="flex justify-center ">
                            <button
                                className="rounded-3xl w-full  text-white py-3 px-4 font-bold mt-8"
                                onClick={handleClick}
                                style={{
                                    border: "2px solid transparent",
                                    borderImage: "linear-gradient(120deg, red, yellow)",
                                    borderImageSlice: 1,
                                }}
                            >
                                Confirm
                            </button>
                        </div>
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
}
