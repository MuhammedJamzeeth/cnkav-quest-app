import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaStar, FaWandSparkles } from "react-icons/fa6";
import AiPostModal from "./AiPostModal";
import CommunityPostModal from "./CommunityPostModal.jsx";
import { PiArrowFatUp } from "react-icons/pi";
import { TbMessage } from "react-icons/tb";
import { TiArrowForwardOutline } from "react-icons/ti";
import dummy from "./dummy.js";
import { Dropdown } from "flowbite-react";
import { FaUserPlus, FaUserMinus, FaFlag, FaEdit } from "react-icons/fa";
import ContactQModal from "../../pages/userProfileDashboard/ContactQModal";
import ContactQModal2 from "../../pages/userProfileDashboard/ContactQModal2";
import ContactQModal3 from "../../pages/userProfileDashboard/ContactQModal3";
import ContactQModal4 from "../../pages/userProfileDashboard/ContactQModal4";
import ContactQModal5 from "../../pages/userProfileDashboard/ContactQModal5";
import ContactQModal6 from "../../pages/userProfileDashboard/ContactQModal6";
import ContactQModal7 from "../../pages/userProfileDashboard/ContactQModal7";
import ContactQModal8 from "../../pages/userProfileDashboard/ContactQModal8";
import useCommunityPosts from "../../data/get-community-posts.jsx";
import useUser from "../../hooks/use-user.jsx";
import axiosInstance from "../../api/axiosInstance.js";
import getFileById from "../../utils/get-file-by-id.js";

const formatDate = (date) => {
  const options = { minute: "numeric" };
  return new Date(date).toLocaleTimeString(undefined, options);
};

const Community = () => {
  const { user } = useUser();
  const currentDate = formatDate(new Date());
  const [isPostPopup, setPostPopup] = useState(false);
  const [isAIPopup, setAIPopup] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);
  const [category, setCategory] = useState("All");
  const [isFollowing, setIsFollowing] = useState(false);

  const [isContactQModal, setisContactQModal] = useState(false);
  const [isContactQModal2, setisContactQModal2] = useState(false);
  const [isContactQModal3, setisContactQModal3] = useState(false);
  const [isContactQModal4, setisContactQModal4] = useState(false);
  const [isContactQModal5, setisContactQModal5] = useState(false);
  const [isContactQModal6, setisContactQModal6] = useState(false);
  const [isContactQModal7, setisContactQModal7] = useState(false);
  const [isContactQModal8, setisContactQModal8] = useState(false);
  const [modal, setModal] = useState(false);

  const toggleModal = (type) => {
    if (type === "closed") {
      setisContactQModal(false);
      setPostPopup(false);
      setAIPopup(false);
      // setisLoginModal(false);
      setisContactQModal2(false);
      setisContactQModal3(false);
      setisContactQModal4(false);
      setisContactQModal5(false);
      setisContactQModal6(false);
      setisContactQModal7(false);
      setisContactQModal8(false);
      setModal(false);
    }

    if (type === "questModals/community-post") {
      setPostPopup(true);
      setModal(false);
    }

    if (type === "questModals/community-ai") {
      setAIPopup(true);
      setModal(false);
    }

    if (type === "contactQ-modal") {
      setisContactQModal(true);
      setModal(false);
    }
    if (type === "contactQ-modal2") {
      setisContactQModal(false);
      setisContactQModal2(true);
      setModal(false);
    }
    if (type === "contactQ-modal3") {
      setisContactQModal2(false);
      setisContactQModal3(true);
      setModal(false);
    }
    if (type === "contactQ-modal4") {
      setisContactQModal3(false);
      setisContactQModal4(true);
      setModal(false);
    }
    if (type === "contactQ-modal5") {
      setisContactQModal4(false);
      setisContactQModal5(true);
      setModal(false);
    }
    if (type === "contactQ-modal6") {
      setisContactQModal5(false);
      setisContactQModal6(true);
      setModal(false);
    }
    if (type === "contactQ-modal7") {
      setisContactQModal6(false);
      setisContactQModal7(true);
      setModal(false);
    }
    if (type === "contactQ-modal8") {
      setisContactQModal7(false);
      setisContactQModal8(true);
      setModal(false);
    }
  };

  const categories = [
    "All",
    "One Time Tasks",
    "Necessity Tasks",
    "E-sports",
    "Digital Marketing",
    "Software Development",
    "Gaming",
    "Cooperate Task",
    "Monthly Recurring Task",
    "Looking for a product",
    "Philanthropy Task",
    "Collecting Task",
    "Trading",
    "Coaching",
    "Consulting",
    "AI",
  ];

  const handleInputClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionClick = (option) => {
    setCategory(option);
    setShowDropdown(false);
  };

  const { posts: AllPosts, refetch } = useCommunityPosts();

  const [posts, setPosts] = useState(AllPosts ?? []);
  const [searChText, setSearchText] = useState("");

  useEffect(() => {
    const lowerCaseSearchText = searChText?.toLowerCase();

    let filteredPosts = posts;

    if (searChText) {
      filteredPosts = posts.filter((post) =>
        post?.post_title?.toLowerCase()?.includes(lowerCaseSearchText)
      );
    } else if (category !== "All") {
      filteredPosts = posts.filter((post) => post.category === category);
    } else {
      filteredPosts = AllPosts;
    }

    setPosts(filteredPosts);
  }, [category, searChText, posts, AllPosts]);

  console.log(posts);

  return (
    <>
      <div className="flex flex-col items-center w-[90%] sm:w-[350px] mx-auto justify-center min-h-screen py-2  bg-black ">
        <div className="flex flex-col justify-center items-center mt-32">
          <div className="relative w-full mt-16 mb-4">
            <input
              type="text"
              id="questName"
              value={category}
              onClick={handleInputClick}
              readOnly
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Select Chat Communities"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg
                className=" h-5 w-5 text-gray-400"
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
              <ul className="absolute z-10 bg-black border text-white border-gray-300  mt-1 rounded-lg w-full">
                {categories.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className="cursor-pointer p-2 hover:bg-gray-200 hover:text-black"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* <div className="relative md:w-[70%] w-full mb-4">
            <input
              type="text"
              className="bg-white border border-gray-700 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 pr-10"
              placeholder="Write and Community Post"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <MdOutlineModeEdit className="h-5 w-5 text-gray-400 cursor-pointer" />
            </div>
          </div> */}

          <div className="relative w-full mb-4">
            <input
              type="text"
              className="bg-white border border-gray-700 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 pr-10"
              placeholder="Search"
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
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
          </div>

          <div className="flex flex-col justify-center items-center mt-30 mb-8">
            <div className="">
              <Link
                to="#/dashboard/community-post"
                onClick={() => {
                  toggleModal("questModals/community-post");
                }}
              >
                <button className=" text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
                  <FaPlus />
                </button>
              </Link>
              <Link
                to="#/dashboard/community-ai"
                onClick={() => {
                  toggleModal("questModals/community-ai");
                }}
              >
                <button
                  className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  style={{
                    border: "2px solid transparent",
                    borderImageSlice: 1,
                  }}
                >
                  <FaWandSparkles
                    style={{
                      border: "2px solid transparent",
                      borderImageSlice: 1,
                    }}
                  />
                </button>
              </Link>
            </div>
          </div>

          {/* zeeshan my code gose here */}
          <div className="flex flex-col items-center sm:w-[350px] w-full border-b border-gray-500 p-2 rounded-sm">
            {posts.length > 0 &&
              posts.map((post) => {
                const isFollowing = post.creator_user.followers.includes(
                  user?.id
                );

                console.log(post, user?.id);
                const handleFollowToggle = async () => {
                  await axiosInstance.post(
                    `/community/${isFollowing ? "unfollow" : "follow"}`,
                    {
                      postCreatorId: post.creator_user_id,
                      userId: user.id,
                    }
                  );
                  refetch();
                };
                return (
                  <div key={post._id} className="w-full mb-8">
                    <div className="flex flex-col bg-[rgba(27,32,38,255)] p-4 rounded-3xl shadow-lg">
                      <span className="text-sm text-slate-100 mt-4">
                        {post?.creator_user?.name}
                      </span>
                      <h1 className="font-semibold text-2xl text-slate-300">
                        {post.post_title}
                      </h1>
                      <h2>{post?.category}</h2>
                      {post.image_id && (
                        <img
                          className="rounded-2xl mt-2 aspect-square object-cover object-center"
                          src={getFileById(post.image_id)}
                          alt="image"
                        />
                      )}
                      {post.video_id && (
                        <video
                          className="rounded-2xl mt-2 aspect-square object-cover object-center"
                          src={getFileById(post.video_id)}
                          controls // Adds video controls like play, pause, etc.
                          autoPlay={false} // Set to true if you want it to play automatically
                        >
                          Your browser does not support the video tag.
                        </video>
                      )}
                      <div className="flex justify-between mt-4 items-center">
                        <PiArrowFatUp className="text-slate-400 text-2xl cursor-pointer" />
                        <span className="ml-[-19px] text-slate-400">
                          {post.likes}
                        </span>
                        <TbMessage className="text-2xl text-slate-400 cursor-pointer" />
                        <span className="ml-[-19px] text-slate-400">
                          {post.comments.length}
                        </span>
                        <Dropdown
                          className="w-[200px]"
                          label=""
                          placement="left-start"
                          size="sm"
                          dismissOnClick={false}
                          renderTrigger={() => (
                            <span className="cursor-pointer">
                              {/* <FaEllipsisVertical /> */}
                              <button
                                id="dropdownMenuIconButton"
                                data-dropdown-toggle="dropdownDots"
                                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                type="button"
                              >
                                <svg
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 4 15"
                                >
                                  <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                                </svg>
                              </button>
                            </span>
                          )}
                        >
                          <Dropdown.Item
                            className={
                              post.creator_user_id === user.id && "hidden"
                            }
                          >
                            {user ? (
                              <div
                                className="flex items-center cursor-pointer gap-3"
                                onClick={handleFollowToggle}
                              >
                                {isFollowing ? (
                                  <FaUserMinus className="text-xl" />
                                ) : (
                                  <FaUserPlus className="text-xl" />
                                )}
                                <span className="font-semibold text-lg">
                                  {isFollowing ? "Unfollow" : "Follow"}
                                </span>
                              </div>
                            ) : (
                              <Link
                                to="/#/login"
                                className="flex items-center cursor-pointer gap-3"
                              >
                                <FaUserPlus className="text-xl" />
                                <span className="font-semibold text-lg">
                                  Follow
                                </span>
                              </Link>
                            )}
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Link
                              to="#/contactus/step1"
                              onClick={() => {
                                toggleModal("contactQ-modal");
                              }}
                            >
                              <div className="flex items-center gap-3">
                                <FaFlag className="text-xl" />
                                <span className="font-semibold text-lg">
                                  Report
                                </span>
                              </div>
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <div className="flex items-center gap-3">
                              <span className="font-semibold text-lg">
                                Rank:
                              </span>
                              <FaStar className="text-xl" />
                            </div>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <div className="flex items-center gap-3">
                              <FaEdit className="text-xl" />
                              <span className="font-semibold text-lg">
                                Edit
                              </span>
                            </div>
                          </Dropdown.Item>
                        </Dropdown>

                        <div
                          id="dropdownDots"
                          className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                        >
                          <ul
                            className="py-2 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownMenuIconButton"
                          >
                            <li>
                              <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Follow
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Block
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Report
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Chat
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Rank
                              </a>
                            </li>
                          </ul>
                          <div className="py-2">
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                              Separated link
                            </a>
                          </div>
                        </div>

                        <TiArrowForwardOutline className="text-slate-400 text-2xl cursor-pointer" />
                      </div>
                    </div>
                  </div>
                );
              })}
            {posts.length < 1 && (
              <div>
                <h2>No data found</h2>
              </div>
            )}
          </div>

          {/* load more button */}
          {posts?.length > 0 && (
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
          )}
        </div>
      </div>

      <CommunityPostModal isModal={isPostPopup} toggleModal={toggleModal} />

      <AiPostModal isModal={isAIPopup} toggleModal={toggleModal} />

      <ContactQModal isModal={isContactQModal} toggleModal={toggleModal} />
      <ContactQModal2 isModal={isContactQModal2} toggleModal={toggleModal} />
      <ContactQModal3 isModal={isContactQModal3} toggleModal={toggleModal} />
      <ContactQModal4 isModal={isContactQModal4} toggleModal={toggleModal} />
      <ContactQModal5 isModal={isContactQModal5} toggleModal={toggleModal} />
      <ContactQModal6 isModal={isContactQModal6} toggleModal={toggleModal} />
      <ContactQModal7 isModal={isContactQModal7} toggleModal={toggleModal} />
      <ContactQModal8 isModal={isContactQModal8} toggleModal={toggleModal} />
    </>
  );
};

export default Community;
