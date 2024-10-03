import React, {useState} from "react";
import QuestsCategory from "./questsManipulations/QuestsCategory";
import QuestsRank from "./questsManipulations/QuestsRank";
import QuestsStyles from "./questsManipulations/QuestsStyles";
import {cameraIcon, cnkavLogo} from "../../images";
import {Button, Modal} from "flowbite-react";
import {Link} from "react-router-dom";
import {BsThreeDotsVertical} from "react-icons/bs";

const QuestsPluginModal = ({isModal, toggleModal}) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <>
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

                        <div className="bg-black text-white pt-8 pb-8 rounded-lg shadow-lg w-full max-w-lg">
                            <form className="space-y-4 pb-6 ">
                                <div className="flex divide-x gap-2 divide-gray-800 row">
                                    <QuestsCategory/>
                                    <QuestsRank/>
                                    <QuestsStyles/>
                                </div>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Search Quest Apps"
                                />
                            </form>
                            <section>
                                <div className="flex divide-x  mb-2 divide-gray-800 row">
                                    <div
                                        className="relative flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-[48rem] flex-row">
                                        <div
                                            className="relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
                                            <img
                                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
                                                alt="card-image"
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        <div
                                            className="absolute cursor-pointer left-[94%] top-3 right-0"
                                            onClick={() => setShowMenu(!showMenu)}
                                        >
                                            <BsThreeDotsVertical className="w-5 h-5"/>
                                            <div className="flex ">
                                                {showMenu && (
                                                    <div
                                                        className="absolute right-4 pt-4 text-xs  z-20  h-[100px] flex bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 ">
                                                        <ul>
                                                            <li className=" py-2 flex justify-center hover:text-black  hover:bg-gray-300">
                                                                <a href="" className="">
                                                                    Report app
                                                                </a>
                                                            </li>
                                                            <p className="px-16"></p>
                                                            <li className="py-2 flex justify-center hover:text-black  hover:bg-gray-300">
                                                                <a href="">Remove app</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className=" pt-14 px-6 flex flex-col w-full">
                                            <div className="flex justify-between w-full items-center">
                                                <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">
                                                    App name
                                                </h6>
                                                <label className="flex items-center cursor-pointer mt-1">
                                                    <input
                                                        type="checkbox"
                                                        value=""
                                                        className="sr-only peer"

                                                    />
                                                    <div
                                                        className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                                </label>
                                            </div>
                                            <p className="mb-1"></p>
                                            <p className=" items-center justify-center gap-4 mb-1 font-sans text-sm font-semibold leading-relaxed text-gray-700">
                                                Description of the app
                                            </p>
                                            <p className="flex justify-between text-sm  pt-1">
                                                <span className="font-semibold">Price </span>
                                                <button className="bg-blue-700 px-4 text-white py-1.5  rounded-md">
                                                    Get
                                                </button>
                                            </p>
                                            <div className="pt-1 pb-8 flex justify-between">
                                                {/* <button className="text-sm text-red-500 font-semibold">
                          Download
                        </button> */}
                                                <span className="">(432)</span>
                                                <span className="">Category</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="flex justify-center items-center py-4  px-8">
                                <button
                                    disabled
                                    type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
                                >
                                    <svg
                                        aria-hidden="true"
                                        role="status"
                                        className="inline w-4 h-4 me-3 text-white animate-spin"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="#E5E7EB"
                                        />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    Load More
                                </button>
                            </section>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    );
};

export default QuestsPluginModal;
