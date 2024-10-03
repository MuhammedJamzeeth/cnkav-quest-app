import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {
    editq,
} from "../../images";
import QuestsCategory from "./questsManipulations/QuestsCategory";
import QuestsStyles from "./questsManipulations/QuestsStyles";
import EditverifyQModal from "./EditverifyQModal";
import {MdOutlineModeEdit} from "react-icons/md";
import {FaMap} from "react-icons/fa6";
import useQuestsHandler, {ErrorState} from "../../hooks/useQuestsHandler";
import PublishQuestModal from "../../components/questModals/PublishQuestModal.jsx";
import {publishQuestState} from "../../utils/data.js";
import EditQuestModal from "../../components/questModals/EditQuestModal.jsx";

const QuestslandingPage = () => {
    const [isModal, setModal] = useState(false);
    const [isEditNewQModal, setIsEditNewQModal] = useState(false);
    const [isEditverifyQModal, setIsEditverifyQModal] = useState(false);

    const [isPublishNewQModal, setisPublishNewQModal] = useState(false);
    const [isQuestVerifyModal, setisQuestVerifyModal] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedType, setSelectedType] = useState("");

    const toggleModal = (type) => {
        if (type === "closed") {
            setModal(false);
            setisPublishNewQModal(false);
            setIsEditNewQModal(false);
            setisQuestVerifyModal(false);
            setIsEditverifyQModal(false);
        }

        //
        if (type === "publish/NewQuest") {
            setisPublishNewQModal(true);
            setModal(false);
        }
        if (type === "questModals/edit-questModals") {
            setIsEditNewQModal(true);
            setModal(false);
        }
        if (type === "Quest/Verify") {
            setisQuestVerifyModal(true);
            setModal(false);
        }
        if (type === "verify/edit") {
            setIsEditverifyQModal(true);
            setModal(false);
        }
    };


    // free code for modal
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState(publishQuestState);

    const {
        errors,
        setErrors,
        handleSubmit,
        useQuestList,
        fetchQuestDetails,
        updateQuestDetails,
        confirmQuest
    } = useQuestsHandler(formData, setFormData, () => setOpenModal(false));

    const [quest, setQuest] = useState([]);
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const {data, error, isLoading} = useQuestList(page, pageSize);

    useEffect(() => {
        if (data && Array.isArray(data)) {
            setQuest((prevQuests) =>
                prevQuests
                    .filter((q) => !data.some((d) => d._id === q._id))
                    .concat(data)
            ); // Append new items to the existing list
        } else {
            console.error("Unexpected data structure:", data);
        }
    }, [data]);

    const [editQuest, setEditQuest] = useState();
    const toggleModalEdit = (id) => {
        setIsEditNewQModal(true);
        setModal(false);
        fetchQuestDetails(id).then((r) => setEditQuest(r));
    };

    // verify popups modal section
    const [verifyQuest, setVerifyQuest] = useState();
    const toggleverifyModalEdit = (id) => {
        setIsEditverifyQModal(true);
        setModal(false);
        fetchQuestDetails(id).then((r) => setVerifyQuest(r));
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    };

    const filteredQuest = quest.filter((item) => {
        const matchesTitle = item.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesCategory =
            selectedCategory === "" || item.category === selectedCategory;
        const matchesType = selectedType === "" || item.type === selectedType;
        return matchesTitle && matchesCategory && matchesType;
    });

    console.log(quest);

    return (
        <>
            <div className="flex flex-col items-center w-full justify-center  min-h-screen py-2">
                <div className="flex flex-col justify-center  items-center pt-48 ">
                    {/* Quest new publish modal */}
                    <>
                        <div className="w-full md:px-4 px-1 justify-center items-center">
                            <button
                                type="button"
                                id="questName"
                                // onClick={handlePublishNewQuestClick}
                                readOnly
                                className="text-white w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-3 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                placeholder="Publish New Quest"
                                onClick={() => setOpenModal(true)}
                            >
                                <img
                                    src={editq}
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                    fill="none"
                                    viewBox="0 0 14 10"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                            </button>
                        </div>
                        <PublishQuestModal openModal={openModal}
                                           closeModal={() => setOpenModal(false)}
                        />
                    </>
                    <form className="space-y-4 md:px-4 px-1 pt-1 pb-6 w-full mb-4">
                        <div className=" w-full flex flex-col gap-4 rounded-md shadow-sm"></div>

                        <div>
                            <form className="relative">
                                <input
                                    type="text"
                                    id="search"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className="bg-white border border-gray-700 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 pr-10"
                                    placeholder="Search Quest by title"
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
                            <div className="flex flex-row justify-center items-center pt-4">
                                <QuestsCategory
                                    name={"category"}
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                />
                                <span className="flex justify-center w-4"> </span>
                                <QuestsStyles
                                    name={"style"}
                                    value={selectedType}
                                    onChange={handleTypeChange}
                                />
                            </div>
                        </div>
                    </form>

                    <div className="">
                        {filteredQuest.filter(item => item.created_by === user?.sub).map((item, id) => {
                            return (
                                <section className="flex flex-col gap-8 w-full pb-20" key={id}>
                                    <div className="flex flex-col gap-8 w-full rounded-md p-1">
                                        <button className="relative bg-blue-700 mt-10 rounded-md p-0.5">
                                            <div
                                                className="flex gap-1 bg-red-400 absolute right-0 rounded-md p-1 mt-[-10px]">
                                                <div className="">
                                                    <span>{item.price}</span>
                                                </div>
                                                <div className="">
                                                    <span>{item.rank}</span>
                                                </div>
                                                <div className="">
                                                    <span>{item.style}</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center py-8 bg-gray-600 px-5">
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        className="rounded-full w-12 h-12"
                                                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                                        alt=""
                                                    />
                                                    <p className="text-l pb-6">{item.user?.name}</p>
                                                    <span className="text-red-600 font-normal"></span>
                                                </div>
                                                <p className="flex gap-4 items-center w-full justify-end pr-2 pt-1 text-lg">
                                                <div className="text-l">  {item.title} </div>
                                                    <div className="text-sm">{item.category}</div>
                                                </p>
                                            </div>
                                            <div className="bg-gray-600 flex flex-col justify-center">
                                                <p className="text-white text-1xl font-bold pt-10 flex w-full justify-center items-center pb-3">
                                                    {item.task_details}
                                                </p>
                                                <div className="flex gap-2 px-8 pt-4 pb-2 text-red-700 text-xs">
                                                    <span>{item.durationDays}</span>
                                                    <span>{item.startDate}</span>
                                                    <span>{item.endDate}</span>
                                                    <span>{item.startTime}</span>
                                                    <span>{item.endTime}</span>
                                                </div>
                                            </div>
                                            <div
                                                className="flex flex-col justify-center items-center py-4 bg-gray-600 px-8">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        to={`#/${item._id}`}
                                                        onClick={() => {
                                                            toggleModalEdit(item._id);
                                                        }}
                                                    >
                                                        <div
                                                            // onClick={handlePublishNewQuestClick}
                                                            className="bg-blue-700 px-7 py-7 rounded-full "
                                                        >
                                                            <button>
                                                                <MdOutlineModeEdit className="h-5 w-5"/>
                                                            </button>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                </section>
                            );
                        })}
                    </div>

                    {/* faedit questModals verify page popups */}
                    <div className="">
                        {quest.map((item, id) => {
                            return (
                                <section key={id}>
                                    <div className="w-full relative bg-blue-700 mt-10 rounded-md p-0.5">
                                        <div
                                            className="flex gap-1 bg-red-400 absolute right-0 rounded-md p-1 mt-[-10px]">
                                            <div className=""><span>{item.price}</span></div>
                                            <div className="">
                                                <span>{item.rank}</span>
                                            </div>
                                            <div className="">
                                                <span>{item.style}</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center py-8 bg-gray-600 px-5">
                                            <div className="flex items-center gap-2">
                                                <img
                                                    className="rounded-full w-12 h-12"
                                                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                                    alt=""
                                                />
                                                {/* <p className="text-xl">Username</p> */}
                                                <p className="text-xl">{item.user?.name}</p>
                                                <span className="text-red-600 font-normal"> </span>
                                            </div>
                                            <p className="flex gap-4 items-center w-full justify-end pr-2 pt-1 text-lg">
                                            <div className="text-l">    {item.title} </div>
                                                {/* <div className="">{item.taskDetails}</div> */}
                                                <div className="text-sm">{item.category}</div>
                                            </p>
                                        </div>
                                        <div className="bg-gray-600 flex flex-col justify-center">
                                            <p className="text-white text-1xl font-bold pt-10 flex w-full justify-center items-center pb-3">
                                                {item.task_Details}
                                            </p>
                                            <div className="flex gap-2 px-8 pt-4 pb-2 text-red-700 text-xs">
                                                <span>{item.durationDays}</span>
                                                <span>{item.startDate}</span>
                                                <span>{item.endDate}</span>
                                                <span>{item.startTime}</span>
                                                <span>{item.endTime}</span>
                                            </div>
                                        </div>

                                        <div className="flex justify-center items-center py-4 bg-gray-600 px-8">
                                            <div className="flex items-center gap-2 ">
                                                <Link
                                                    to={`#/${item._id}`}
                                                    onClick={() => {
                                                        toggleverifyModalEdit(item._id);
                                                        // setisQuestVerifyModal(false);
                                                    }}
                                                >
                                                    <button
                                                        // onClick={() => setOpenverifyModal(true)}
                                                        className="bg-blue-700 px-8 py-8 rounded-full"
                                                    >
                            <span>
                              <FaMap className="h-6 w-6"/>
                                {/* verify */}
                            </span>
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                    {/* faedit questModals verify page popups */}
                </div>
                <EditQuestModal
                    isModal={isEditNewQModal}
                    toggleModal={toggleModal}
                    formDataEdit={editQuest}
                    errors={errors}
                    updateQuestDetails={updateQuestDetails}
                />
                <EditverifyQModal
                    isModal={isEditverifyQModal}
                    toggleModal={toggleModal}
                    formDataEdit={verifyQuest}
                    updateQuestDetails={confirmQuest}
                    errorResponse={errors}
                    setErrorResponse={() => setErrors(ErrorState)}
                />
            </div>
        </>
    );
};

export default QuestslandingPage;
