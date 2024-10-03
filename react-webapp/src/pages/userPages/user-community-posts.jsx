import { PiArrowFatUp } from "react-icons/pi";
import { TbMessage } from "react-icons/tb";
import useUserCommunityPosts from "../../data/get-user-community-posts";
import { Dropdown } from "flowbite-react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import getFileById from "../../utils/get-file-by-id";
import { Link } from "react-router-dom";
import { useState } from "react";
import CommunityPostModal from "./CommunityPostModal";
import DeletePostModal from "./delete-post-modal";

const UserCommunityPostsPage = () => {
  const { posts, refetch } = useUserCommunityPosts();

  const [isPostPopup, setPostPopup] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [modal, setModal] = useState(false);

  const toggleModal = (type) => {
    if (type === "closed") {
      setPostPopup(false);
      setIsDeleteModalOpen(false);
      setModal(false);
    }

    if (type === "questModals/edit-community-post") {
      setPostPopup(true);
      setModal(false);
    }

    if (type === "questModals/delete-community-post") {
      setIsDeleteModalOpen(true);
      setModal(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center w-[90%] sm:w-[350px] mx-auto justify-center min-h-screen py-2  bg-black ">
        <div className="flex flex-col justify-center items-center mt-32">
          <div className="flex flex-col items-center sm:w-[350px] w-full border-b border-gray-500 p-2 rounded-sm">
            {posts.length > 0 &&
              posts.map((post) => (
                <div key={post?._id} className="w-full mb-8">
                  <div className="flex flex-col bg-[rgba(27,32,38,255)] p-4 rounded-3xl shadow-lg">
                    <span className="text-sm text-slate-100  mt-4">
                      {post?.creator_user?.name}
                    </span>
                    <h1 className="font-semibold text-2xl text-slate-300">
                      {post?.post_title}
                    </h1>
                    <h2>{post?.category}</h2>
                    {post?.image_id && (
                      <img
                        className="rounded-2xl mt-2 aspect-square object-cover object-center"
                        src={getFileById(post?.image_id)}
                        alt="image"
                      />
                    )}
                    {post?.video_id && (
                      <video
                        className="rounded-2xl mt-2 aspect-square object-cover object-center"
                        src={getFileById(post?.video_id)}
                        controls // Adds video controls like play, pause, etc.
                        autoPlay={false} // Set to true if you want it to play automatically
                      >
                        Your browser does not support the video tag.
                      </video>
                    )}
                    <div className="flex justify-between mt-4 items-center">
                      <PiArrowFatUp className="text-slate-400 text-2xl cursor-pointer" />
                      <span className="ml-[-19px] text-slate-400">
                        {post?.likes}
                      </span>
                      <TbMessage className="text-2xl text-slate-400 cursor-pointer" />
                      <span className="ml-[-19px] text-slate-400">
                        {post?.comments.length}
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
                        <Dropdown.Item>
                          <Link
                            to="#/dashboard/edit-community-post"
                            onClick={() => {
                              setSelectedPost(post);
                              toggleModal("questModals/edit-community-post");
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <CiEdit className="text-xl" />
                              <span className="font-semibold text-lg">
                                Edit
                              </span>
                            </div>
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link
                            to="#/dashboard/delete-community-post"
                            onClick={() => {
                              setSelectedPost(post);
                              toggleModal("questModals/delete-community-post");
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <MdDelete className="text-xl" />
                              <span className="font-semibold text-lg">
                                Delete
                              </span>
                            </div>
                          </Link>
                        </Dropdown.Item>
                      </Dropdown>
                    </div>
                  </div>
                </div>
              ))}
            {posts.length < 1 && (
              <div>
                <h2>No data found</h2>
              </div>
            )}
          </div>
        </div>
      </div>
      <CommunityPostModal
        isModal={isPostPopup}
        toggleModal={toggleModal}
        post={selectedPost}
        onSuccess={refetch}
        edit
      />
      <DeletePostModal
        isModal={isDeleteModalOpen}
        toggleModal={toggleModal}
        post={selectedPost}
        onSuccess={refetch}
      />
    </>
  );
};

export default UserCommunityPostsPage;
