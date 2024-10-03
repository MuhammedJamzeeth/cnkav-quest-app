import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import QuestpluginCategory from "./questsManipulations/QuestpluginCategory";
import QuestsPluginModal from "./QuestsPluginModal";
import PublishNewQAppModal from "./PublishNewQAppModal";
import {Tabs} from "flowbite-react";
import useQuestAppHandler from "../../hooks/useQuestAppHandler.js";

const DeployQuests = () => {
    const [isPublishNewQAppModal, setPublishNewQAppModal] = useState(false);
    const [isQuestpluginModal, setQuestPluginModal] = useState(false);
    const [questAppList, setQuestAppList] = useState([])
    const {useQuestList} = useQuestAppHandler();

    const {data, error, isLoading} = useQuestList();

    useEffect(() => {
        setQuestAppList(data)
        console.log(data)
    }, [data]);

    const toggleModal = (type) => {
        if (type === "closed") {
            setQuestPluginModal(false);
            setPublishNewQAppModal(false);
            setModal(false);
        }

        if (type === "questModals/deploy-plugin") {
            setPublishNewQAppModal(true);
            setModal(false);
        }

        if (type === "questModals/plugin") {
            setQuestPluginModal(true);
            setModal(false);
        }
    };

    return (
        <div className="flex flex-col  items-center justify-center min-h-screen py-2 bg-black">
            <div className="flex flex-col lg:w-[50%] justify-center mt-36 pt-2">
                <h1 class="mt-4 text-xl pb-2 font-medium text-white tracking-wide">
                    Quest Apps
                </h1>
                <form className="relative">
                    <input
                        type="text"
                        id="search"
                        className="bg-white border border-gray-700 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 pr-10"
                        placeholder="Search Quest Apps"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg
                            className="h-5 w-5 text-gray-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </form>
                <div className="flex flex-col justify-center pt-4 pb-12">
                    <div className="flex gap-4">
                        <div className="flex flex-col w-full font-medium text-black text-sm rounded-lg ">
                            <QuestpluginCategory/>
                        </div>
                        <div
                            className="flex w-[40%] justify-center py-2.5 rounded-lg px-3 text-sm font-medium
            hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 p-2.5 items-cente"
                        >
                            <Link
                                to="#/dashboard/deploy-plugin"
                                onClick={() => {
                                    toggleModal("questModals/deploy-plugin");
                                }}
                            >
                                <button className="">Publish Quest App</button>
                            </Link>
                        </div>
                        <div
                            className="flex w-[40%] justify-center py-2.5 rounded-lg px-3 text-sm font-medium
            hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 p-2.5 items-center"
                        >
                            <Link
                                to="#/quest/plugin"
                                onClick={() => {
                                    toggleModal("questModals/plugin");
                                }}
                            >
                                <button className=" ">Quest Apps</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <section className="flex w-full">
                <Tabs
                    aria-label="Full width tabs"
                    variant="underline"
                    className="flex w-full"
                >
                    <Tabs.Item
                        active
                        title="Deployed Quest Apps"
                        icon={""}
                        className="flex w-full"
                    >
                        <section className="">
                            <h1 class="mt-4 pb-8 text-xl font-semibold text-red-700 tracking-wide">
                                Manage Quest Apps
                            </h1>

                            {/* <div className="text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
                            <div className="flex w-full">
                                <div className="text-white flex flex-col w-full gap-6">
                                    {questAppList?.map((app, index) => (
                                        <div key={index} class=" rounded-md shadow-sm">
                                            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 mb-6 ">
                                                <div className="">
                                                    <div className="flex">
                                                        {app.image ? <img
                                                            src={`https://backend.cnkav.com${app.image}`}
                                                            alt={app.title}
                                                            className="w-14 h-14 mr-4 mt-[2px] rounded-md shadow"
                                                        /> : <img
                                                            src={"https://via.placeholder.com/50"}
                                                            alt={"view"}
                                                            className="w-14 h-14 mr-4 mt-[2px] rounded-md shadow"
                                                        />}

                                                        <div className="flex flex-col gap-2">
                                                            <p className="text-xl font-semibold">
                                                                {app?.title}
                                                            </p>
                                                            <p className="text-md text-gray-400 flex w-full items-center">
                                                                {app?.details}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <div
                                                        className="flex w-full justify-between mt-5 items-center md:px-4 px-0">
                                                        <a
                                                            // href={tool.link}
                                                            className="text-blue-600 text-sm hover:underline"
                                                        >
                                                            Price
                                                        </a>
                                                        <a
                                                            // href={tool.link}
                                                            className="text-blue-600 text-sm hover:underline "
                                                        >
                                                            Download
                                                        </a>
                                                        <div className="flex">
                                                            <a
                                                                // href={tool.link}
                                                                className="text-blue-600 text-sm hover:underline "
                                                            >
                                                                Update/
                                                            </a>
                                                            <div></div>
                                                            <a
                                                                // href={tool.link}
                                                                className="text-blue-600 text-sm hover:underline "
                                                            >
                                                                Edit
                                                            </a>
                                                        </div>
                                                        <a
                                                            // href={tool.link}
                                                            className="text-blue-600 text-sm hover:underline "
                                                        >
                                                            Delete
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className=""/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </Tabs.Item>
                    <Tabs.Item title="Quick Start Guide For Developers" icon={""}>
                        <section>
                            <h1 class="mt-4 text-xl font-semibold text-red-700 tracking-wide">
                                Quest Apps Quick Start Guide
                            </h1>
                            <label className="block text-sm font-medium mb-8 ">
                                {" "}
                                Information on how to set up quest plugins
                            </label>

                            <span className="h-5 w-5"></span>

                            <div
                                class="grid mb-8 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-2 dark:bg-gray-800">
                                <figure
                                    class=" flex flex-col items-center justify-center p-8 text-center  rounded-t-lg md:rounded-t-none md:rounded-ss-lg">
                                    <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                                        <h3 class="text-lg font-semibold text-white">
                                            Quick Start
                                        </h3>
                                        <p class="my-4 text-gray-500">
                                            Learn how to get started by configuring your quest apps
                                            locally on your machine and start developing with
                                            mentioned details."
                                        </p>
                                    </blockquote>
                                </figure>
                                <figure class="flex flex-col items-center justify-center p-8 text-center">
                                    <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                                        <h3 class="text-lg font-semibold text-white">
                                            Tech Stack Details for building Quest Apps
                                        </h3>
                                        <p class="my-4 text-gray-500">
                                            Explore the component elements to use and use them to
                                            build your quest apps.
                                        </p>
                                    </blockquote>
                                </figure>
                                <figure class="flex flex-col items-center justify-center p-8 text-center  bo">
                                    <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                                        <h3 class="text-lg font-semibold text-white">
                                            Quest Apps API's
                                        </h3>
                                        <p class="my-4 text-gray-500">
                                            Prototype and build your quest apps and coding with the
                                            cnkav quest api's details that works with the mentioned
                                            tech stack.
                                        </p>
                                    </blockquote>
                                </figure>
                                <figure class="flex flex-col items-center justify-center p-8 text-center ">
                                    <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                                        <h3 class="text-lg font-semibold text-white">
                                            Quest Api Tutorials
                                        </h3>
                                        <p class="my-4 text-gray-500">
                                            Watch tutorials about quest api's.
                                        </p>
                                    </blockquote>
                                </figure>
                            </div>
                            <div className="">
                                <div className="w-[85%] mx-auto bg-gray-950 px-6 py-4">
                                    <div className="pb-12">
                                        <h1 className="text-lg font-semibold pb-2">
                                            How to setup Quest App
                                        </h1>
                                        <span className="font-medium pl-2 opacity-70">
                      Step to Step and Deploy Quest Apps
                    </span>
                                    </div>
                                    <hr/>
                                    <div className="flex gap-8 pt-4 pb-4 items-center">
                                        <h1 className="text-lg font-semibold">1.</h1>
                                        <span className="text-sm font-normal">
                      First Create the app According to instructions.
                    </span>
                                    </div>
                                    <hr/>
                                    <div className="flex gap-8 pt-4 pb-4 items-center">
                                        <h1 className="text-lg font-semibold">2.</h1>
                                        <span className="text-sm font-normal">
                      Setup the api based on the tech stack.
                    </span>
                                    </div>
                                    <hr/>
                                    <div className="flex gap-8 pt-4 pb-4 items-center">
                                        <h1 className="text-lg font-semibold">3.</h1>
                                        <span className="text-sm font-normal">
                      Api and Developer environment settings.
                    </span>
                                    </div>
                                    <hr/>
                                    <div className="flex gap-8 pt-4 pb-4 items-center">
                                        <h1 className="text-lg font-semibold">4.</h1>
                                        <span className="text-sm font-normal">
                      Develop the app and then publish the app to cnkav by
                      clicking publish Quest App.
                    </span>
                                    </div>
                                    <hr/>
                                    <div className="flex gap-8 pt-4 pb-4 items-center">
                                        <h1 className="text-lg font-semibold">5.</h1>
                                        <span className="text-sm font-normal">
                      What That the app is Deployed and manage the app and its
                      settinf there.
                    </span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </Tabs.Item>
                </Tabs>
            </section>

            <section className="flex justify-center items-center py-4 pt-12  px-8">
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

            <PublishNewQAppModal
                isModal={isPublishNewQAppModal}
                toggleModal={toggleModal}
            />

            <QuestsPluginModal
                isModal={isQuestpluginModal}
                toggleModal={toggleModal}
            />
        </div>
    );
};

export default DeployQuests;
