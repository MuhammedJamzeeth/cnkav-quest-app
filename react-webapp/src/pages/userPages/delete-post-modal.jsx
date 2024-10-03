import React from "react";
import { Modal } from "flowbite-react";
import axiosInstance from "../../api/axiosInstance";

const DeletePostModal = ({ isModal, toggleModal, post, onSuccess }) => {
  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(
        `/community/delete-post/${post._id}`
      );

      if (response.status === 200) {
        toggleModal("closed");
        onSuccess?.();
        alert("Post deleted successfully");
      } else {
        console.error("Error:", response.status, response.statusText);
        alert("Failed to delete post");
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("An error occurred while deleting the post");
    }
  };

  return (
    <Modal show={isModal} onClose={() => toggleModal("closed")}>
      <div className="bg-black flex flex-col px-6 md:px-12 pb-8">
        <button
          onClick={() => toggleModal("closed")}
          className="w-full flex justify-end text-white mt-4 text-2xl hover:text-gray-400"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 mt-24">Delete Community Post</h2>
        <p className="text-white mb-6">
          Are you sure you want to delete this post? This action cannot be
          undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => toggleModal("closed")}
            className="text-sm text-white py-3 px-4 font-bold"
            style={{
              border: "2px solid transparent",
              borderImage: "linear-gradient(120deg, red, yellow)",
              borderImageSlice: 1,
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="text-sm text-white py-3 px-4 font-bold bg-red-600 hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeletePostModal;
