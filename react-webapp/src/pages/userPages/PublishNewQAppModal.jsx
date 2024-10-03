import React, {useState} from "react";
import {Button, Modal} from "flowbite-react";
import QuestsStyles from "./questsManipulations/QuestsStyles";
import QuestsCategory from "./questsManipulations/QuestsCategory";
import Apptype from "./questsManipulations/Apptype";
import useQuestAppHandler from "../../hooks/useQuestAppHandler.js";
import {questAppInitState} from "../../utils/data.js";
import Dropzone from "../../components/Dropzone.jsx";

const PublishNewQAppModal = ({isModal, toggleModal}) => {
    if (!isModal) return null;

    const [formInput, setFormInput] = useState(questAppInitState)
    const {errors, loading, handleAddApp} = useQuestAppHandler(formInput, () => toggleModal("closed"))


    const handleInputChange = (e) => {
        const {value, name} = e.target
        setFormInput((prev) => ({
            ...prev,
            [name]: value
        }))
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
                    <h2 className="text-xl font-bold mb-4 mt-20">
                        Publish New Quest App
                    </h2>
                    <form className="space-y-4">
                        <div>
                            <label
                                htmlFor="questTitle"
                                className="block text-sm font-medium mb-2 text-white"
                            >
                                Give Your Quest App A Brief Title
                                {errors.title && (
                                    <span className="text-red-600 font-normal flex-flex-col items-center pl-[2px]">
                                        *{errors.title}
                                    </span>
                                )}
                            </label>
                            <input
                                type="text"
                                id="questTitle"
                                name={"title"}
                                value={formInput.title}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
                                placeholder="Enter Task Title"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="questDescription"
                                className="block text-sm font-medium mb-2"
                            >
                                What Does the Quest App Do ?
                                {errors.details && (
                                    <span className="text-red-600 font-normal flex-flex-col items-center pl-[2px]">
                                        *{errors.details}
                                    </span>
                                )}
                            </label>
                            <textarea
                                id="questDescription"
                                name="details"
                                value={formInput.details}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
                                placeholder="Enter What the task details"
                            />
                        </div>

                        <div>
                            <label htmlFor="" className="block text-sm font-medium mb-2">
                                Quest App Category
                                {errors.category && (
                                    <span className="text-red-600 font-normal flex-flex-col items-center pl-[2px]">
                                        *{errors.category}
                                    </span>
                                )}
                            </label>
                            <QuestsCategory name={"category"} value={formInput.category}
                                            onChange={handleInputChange}/>
                        </div>
                        <div>
                            <label htmlFor="" className="block text-sm font-medium mb-2">
                                Api Key
                                {errors.api_key && (
                                    <span className="text-red-600 font-normal  flex-flex-col items-center pl-[2px]">
                                        *{errors.api_key}
                                    </span>
                                )}
                            </label>
                            <input
                                type="text"
                                // id="questTitle"
                                name="api_key"
                                value={formInput.api_key}
                                onChange={handleInputChange}
                                className="w-full px-4 text-sm py-2 border text-black border-gray-300 rounded-lg"
                                placeholder="Api Key"
                            />
                        </div>
                        <div>
                            <label htmlFor="" className="block text-sm font-medium mb-2">
                                Api Key Secret
                                {errors.api_key_secret && (
                                    <span className="text-red-600 font-normal flex-flex-col items-center pl-[2px]">
                                        *{errors.api_key_secret}
                                    </span>
                                )}
                            </label>
                            <input
                                type="text"
                                // id="questTitle"
                                name="api_key_secret"
                                value={formInput.api_key_secret}
                                onChange={handleInputChange}
                                className="w-full text-sm px-4 py-2 border text-black border-gray-300 rounded-lg"
                                placeholder="Api Key Secret"
                            />
                        </div>

                        <div>
                            <label htmlFor="" className="block text-sm font-medium mb-2">
                                App Type
                                {errors.app_type && (
                                    <span className="text-red-600 font-normal flex-flex-col items-center pl-[2px]">
                                        *{errors.app_type}
                                    </span>
                                )}
                            </label>
                            <Apptype name={"app_type"} value={formInput.app_type} onChange={handleInputChange}/>
                        </div>

                        <div>
                            <label htmlFor="" className="block text-sm font-medium mb-2">
                                App URL
                                {errors.app_url && (
                                    <span className="text-red-600 font-normal flex-flex-col items-center pl-[2px]">
                                        *{errors.app_url}
                                    </span>
                                )}
                            </label>
                            <input
                                type="text"
                                // id="questTitle"
                                name="app_url"
                                value={formInput.app_url}
                                onChange={handleInputChange}
                                className="w-full text-sm px-4 py-2 border text-black border-gray-300 rounded-lg"
                                placeholder="App URL"
                            />
                        </div>
                        <div>
                            <label htmlFor="" className="block text-sm font-medium mb-2">
                                App URL Redirect
                                {errors.app_url_redirect && (
                                    <span className="text-red-600 font-normal flex-flex-col items-center pl-[2px]">
                                        *{errors.app_url_redirect}
                                    </span>
                                )}
                            </label>
                            <input
                                type="text"
                                id="questTitle"
                                name="app_url_redirect"
                                value={formInput.app_url_redirect}
                                onChange={handleInputChange}
                                className="w-full text-sm px-4 py-2 border text-black border-gray-300 rounded-lg"
                                placeholder="App URL Redirect"
                            />
                        </div>

                        <div>
                            <label htmlFor="" className="block text-sm font-medium mb-2">
                                Quest Style of the App
                                {errors.quest_style && (
                                    <span className="text-red-600 font-normal flex-flex-col items-center pl-[2px]">
                                        *{errors.quest_style}
                                    </span>
                                )}
                            </label>
                            <QuestsStyles name={"quest_style"} value={formInput.quest_style}
                                          onChange={handleInputChange}/>
                        </div>

                        <div>
                            <label
                                htmlFor="questTitle"
                                className="block text-sm font-medium mb-2"
                            >
                                Price
                                {errors.price && (
                                    <span className="text-red-600 font-normal flex-flex-col items-center pl-[2px]">
                                        *{errors.price}
                                    </span>
                                )}
                            </label>
                            <input
                                type="text"
                                id="questTitle"
                                name="price"
                                value={formInput.price}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
                                placeholder="Enter The amount the quest doer gets paid"
                            />
                        </div>
                        <Dropzone setFormInput={setFormInput}/>

                        <div className="pt-6">
                            <button
                                type="submit"
                                className="rounded-3xl w-full  text-white py-3 px-4 font-bold"
                                onClick={(e) => handleAddApp(e)}
                                style={{
                                    border: "2px solid transparent",
                                    borderImage: "linear-gradient(120deg, red, yellow)",
                                    borderImageSlice: 1,
                                }}
                            >
                                Confirm and Publish App
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
            </Modal>
        </div>
    );
};

export default PublishNewQAppModal;
