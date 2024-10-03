import React, {useEffect, useState} from "react";
import PublishNewQuestModal from "./PublishNewQuestModal";
import QuestsPluginModal from "./QuestsPluginModal";
import QuestMeeting from "./QuestMeeting";
import EditNewQModal from "./EditNewQModal";
import QuestStatusModal from "./QuestStatusModal";
import QuestBookingModal from "../../components/questModals/QuestBookingModal.jsx";
import PublishNewQModal from "../userPages/PublishNewQModal";
import {Link, useNavigate} from "react-router-dom";
import {
    FaChevronLeft,
    FaCalendarPlus,
    FaUserPen,
    FaPen,
    FaLink,
    FaVideo,
    FaCheck
} from "react-icons/fa6";
import {
    questsBox1,
    questsBox2,
    editq,
    deleteQuest,
    dashboardquestIcon,
} from "../../images";
import QuestStatus from "./questsManipulations/QuestsStatus";
import useQuestsHandler from "../../hooks/useQuestsHandler";
import EditQuestModal from "../../components/questModals/EditQuestModal.jsx";
import PublishQuestModal from "../../components/questModals/PublishQuestModal.jsx";
import {publishQuestState} from "../../utils/data.js";

const QuestsDashboard = () => {

    const [isModal, setModal] = useState(false);
    const [openPublishModal, setOpenPublishModal] = useState(false)
    const [isPublishNewQModal, setisPublishNewQModal] = useState(false);
    const [isQuestpluginModal, setisquestPluginModal] = useState(false);
    const [isQuestStatusModal, setQuestStatusModal] = useState(false);
    const [isQuestBookingModal, setQuestBookingModal] = useState(false);
    const [isQuestMeeting, setQuestMeeting] = useState(false);
    const [isEditNewQModal, setIsEditNewQModal] = useState(false);
    const [formData, setFormData] = useState(publishQuestState);
    const {
        useQuestList,
        updateQuestDetails,
        fetchQuestDetails,
        errors,
        handleSubmit,
        updateQuestStatus,
        deleteQuestHandler,
        updateDateAndTime,
        deleteMutation
    } = useQuestsHandler(formData, setFormData, () => setOpenPublishModal(false));
    const [quest, setQuest] = useState([]);
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const {data, isLoading, isError} = useQuestList(page, pageSize);
    const [updateQuest, setUpdateQuest] = useState();
    const [editQuest, setEditQuest] = useState();
    const user = JSON.parse(localStorage.getItem("user"));

    const toggleModalEdit = (id) => {
        setIsEditNewQModal(true);
        setModal(false);
        fetchQuestDetails(id).then((r) => setEditQuest(r));
    };

    const toggleModalStatus = (quest) => {
        setUpdateQuest(quest);
        setQuestStatusModal(true);
        setModal(false);
    };

    useEffect(() => {

        if (data && Array.isArray(data)) {

            console.log("QuestsDashboard -> data", data);
            if (data.length < quest.length) {
                setQuest(data);
            } else {
                setQuest((prev) =>
                    prev.filter((q) => !data.some((d) => d._id === q._id)).concat(data)
                );
            }

        }
    }, [data]);

    console.log(quest);

    //   const handlePublishNewQuestClick = () => {
    //     setIsPublishModalOpen(true);
    //   };

    //   const handlePublishNewQuestClose = () => {
    //     setIsPublishModalOpen(false);
    //   };

    //   const handleEditNewQuestClick = () => {
    //     setIsEditNewQModal(true);
    //   };

    //   const handleEditNewQuestClose = () => {
    //     setIsEditNewQModal(false);
    //   };

    const toggleModal = (type) => {
        if (type === "closed") {
            // setisLoginModal(false);
            setModal(false);
            setisquestPluginModal(false);
            setisPublishNewQModal(false);
            setIsEditNewQModal(false);
            setQuestStatusModal(false);
            setQuestBookingModal(false);
            //   setisQuestVerifyModal(false);
        }

        //
        if (type === "publish/NewQuest") {
            setisPublishNewQModal(true);
            setModal(false);
        }
        if (type === "questModals/plugin") {
            setisquestPluginModal(true);
            setModal(false);
        }
        if (type === "questModals/edit-questModals") {
            setIsEditNewQModal(true);
            setModal(false);
        }
        if (type === "questModals/quests-status") {
            setQuestStatusModal(true);
            setModal(false);
        }
        if (type === "questModals/quests-call-booking") {
            setQuestBookingModal(true);
            setModal(false);
        }
    };

    const handleUpdateQuestModal = () => {
        setIsEditNewQModal(true);
        setModal(false);
    };

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const filteredQuest = quest.filter((item) => {
        const matchesTitle = item.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesCategory =
            selectedCategory === "" || item.status === selectedCategory;

        return matchesTitle && matchesCategory;
    });

    return (
        <>
            <div className="flex flex-col items-center joinModal justify-center min-h-screen py-2 bg-black">
                <div className="flex flex-col justify-center mt-32">
                    <section>
                        <form className="flex items-center max-w-sm mx-auto">
                            <input
                                type="text"
                                id="search"
                                className="bg-white border border-gray-700 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 pr-10"
                                placeholder="Search Quest"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {/*<button*/}
                            {/*    type="submit"*/}
                            {/*    className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"*/}
                            {/*>*/}
                            {/*    <svg*/}
                            {/*        className="h-5 w-5 text-gray-500"*/}
                            {/*        fill="currentColor"*/}
                            {/*        viewBox="0 0 20 20"*/}
                            {/*    >*/}
                            {/*        <path*/}
                            {/*            fillRule="evenodd"*/}
                            {/*            d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z"*/}
                            {/*            clipRule="evenodd"*/}
                            {/*        />*/}
                            {/*    </svg>*/}
                            {/*    <span className="sr-only">Search</span>*/}
                            {/*</button>*/}
                        </form>
                    </section>
                    <div className="flex pt-4 w-full gap-2 rounded-md shadow-sm justify-center">
                        <QuestStatus
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        />

                        <button
                            type="button"
                            id="questName"
                            onClick={() => setOpenPublishModal(true)}
                            readOnly
                            className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            placeholder="Publish New Quest"
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

                    {filteredQuest?.filter(item => item.created_by === user?.sub).map((item, i) => (
                        <section key={i}>
                            {/* <div className="bg-white h-auto md:w-[600px] mt-20 text-black"> */}

                            <div
                                className="bg-sky-500/15 pt-2 gap-2 h-[100%] md:w-[600px] mt-20 text-white border border-blue-700 rounded-lg">
                                <div className="flex md:gap-2 gap-1 w-full md:px-4 px-2 py-2">
                                    <input
                                        type="text"
                                        value={item?.title}
                                        className="bg-black w-full rounded-xl h-[35px] text-[16px] bg-white-700 text-white "
                                    />
                                    <img
                                        src={dashboardquestIcon}
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                        fill="none"
                                        viewBox="0 0 14 10"
                                        stroke="currentColor"
                                        stroke-linecap="square"
                                        stroke-linejoin="square"
                                        stroke-width="2"
                                        d="M1 5h12m0 0L9 1m4 4L9 9"
                                    />
                                </div>
                                <div className="grid md:grid-cols-2 grid-cols-1 w-full gap-4 px-4 items-center pb-4 ">
                                    <div className="flex flex-col gap-2">
                                        <input
                                            type="text"
                                            value={item?.status}
                                            className="bg-black w-full rounded-lg h-[35px] text-[16px] bg-white-700 text-white "
                                        />

                                        <div>
                                            <ul className="bg-black-200 py-2 mx-2 rounded-xl h-[250px] p-2 mt-2 text-white">
                                            <li>Quest Provider: {item?.user?.name}</li>
                                                <li>Rank: {item?.rank}</li>
                                                <li>
                                                    Duration: {item?.duration_days}
                                                    <span className="text-sm">(days)</span>
                                                </li>
                                                <li>Price: {item?.price}</li>
                                                <li>Category: {item?.category}</li>
                                                <li>Style: {item?.style}</li>
                                                <li>Goal: {item?.task_details}</li>
                                                <li>
                                                    Booking Date and Time
                                                    {item.date_and_time
                                                        ?.map((slot, i) => (
                                                            <li key={i} style={{color: "#63E6BE"}}><FaCheck
                                                                className="w-2 h-2 inline-flex"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                stroke-width="2"
                                                            /> {slot?.date?.start_date} {slot?.time_slots?.map((data, j) => (
                                                                data?.status === "Confirmed" ?
                                                                    <span key={j}>| {data.startTime}</span> : null))

                                                            }
                                                            </li>))}

                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="inline-flex flex-col gap-8">
                                        <div className="inline-flex justify-center gap-12">
                                            <Link>
                                                <button
                                                    onClick={() => deleteQuestHandler(item._id)}
                                                    className="w-8 h-8 items-center text-[12px]"
                                                >
                                                    <img
                                                        src={deleteQuest}
                                                        className="w-8 h-8 justify-center"
                                                        aria-hidden="true"
                                                        fill="none"
                                                        viewBox="0 0 14 10"
                                                        stroke="currentColor"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M1 5h12m0 0L9 1m4 4L9 9"
                                                    />
                                                    Delete
                                                </button>
                                            </Link>

                                            <Link
                                                to="#"
                                                onClick={() => {
                                                    toggleModalEdit(item._id);
                                                }}
                                            >
                                                <button className="w-8 h-8 items-center text-[12px]">
                                                    <FaPen
                                                        className="w-8 h-8 justify-center"
                                                        style={{color: "#B197FC"}}
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                    />
                                                    Edit
                                                </button>
                                            </Link>
                                        </div>
                                        <div className="inline-flex flex-col gap-8">
                                            <div className="inline-flex justify-center gap-12">
                                                <Link
                                                    to="#"
                                                    onClick={() => toggleModalStatus(item)}
                                                    className="w-8 h-8 items-center"
                                                >
                                                    <button className="w-8 h-8 items-center text-[12px]">
                                                        <FaUserPen
                                                            className="w-8 h-8 justify-center"
                                                            style={{color: "#63E6BE"}}
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                        />
                                                        Status
                                                    </button>
                                                </Link>

                                                <button className="w-8 h-8 justify-center text-[12px]"
                                                        onClick={() => {
                                                            setEditQuest(item)
                                                            setQuestBookingModal(true)
                                                        }}>
                                                    <FaCalendarPlus
                                                        className="w-8 h-8 justify-center"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                    />
                                                    Book
                                                </button>

                                            </div>
                                            <div className="inline-flex flex-col gap-8">
                                                <div className="inline-flex justify-center gap-12">
                                                    <Link
                                                        to="#"
                                                        onClick={() => {
                                                            toggleModal("questModals/plugin");
                                                        }}
                                                    >
                                                        <button className="w-8 h-8 justify-center text-[12px]">
                                                            <FaLink
                                                                className="w-8 h-8 justify-center"
                                                                style={{color: "#74C0FC"}}
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                stroke-width="2"
                                                            />
                                                            Add App
                                                        </button>
                                                    </Link>

                                                    <Link to="/dashboard/quests-meeting">
                                                        <button className="w-8 h-8 justify-center text-[12px]">
                                                            <FaVideo
                                                                className="w-8 h-8 justify-center"
                                                                style={{color: "#74C0FC"}}
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                stroke-width="2"
                                                            />
                                                            Join Meeting
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
                <EditNewQModal isModal={isPublishNewQModal} toggleModal={toggleModal}/>
            </div>
            <PublishQuestModal
                openModal={openPublishModal}
                closeModal={() => setOpenPublishModal(false)}

            />
            <EditQuestModal
                isModal={isEditNewQModal}
                toggleModal={toggleModal}
                formDataEdit={editQuest}
                errors={errors}
                updateQuestDetails={updateQuestDetails}
            />
            <QuestsPluginModal
                isModal={isQuestpluginModal}
                toggleModal={toggleModal}
            />
            <QuestStatusModal
                quest={updateQuest}
                isModal={isQuestStatusModal}
                toggleModal={toggleModal}
                handleSubmit={updateQuestStatus}
            />
            <QuestBookingModal
                isModal={isQuestBookingModal}
                toggleModal={toggleModal}
                formDataEdit={editQuest}
                updateDateAndTime={updateDateAndTime}
                setFormDataEdit={setEditQuest}
                errors={errors}
            />
        </>
    );
};

export default QuestsDashboard;
