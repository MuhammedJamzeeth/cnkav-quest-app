import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "flowbite-react";
import { MdOutlineCameraAlt } from "react-icons/md";
import { IoMdMic } from "react-icons/io";

const AiPostModal = ({ isModal, toggleModal }) => {
  if (!isModal) return null;

  // const [file, setFile] = useState();

  return (
    <div className="   w-full h-full flex justify-center items-center text-center">
      <Modal show={isModal} onClose={() => toggleModal("closed")}>
        <div className=" bg-black flex flex-col pb-16 justify-end px-4 md:px-12 items-center">
          <button
            onClick={() => toggleModal("closed")}
            className=" text-white flex w-full justify-end mt-4 text-2xl hover:text-gray-400"
          >
            {" "}
            &times;
          </button>
          <h2 className="text-xl font-bold mb-4 mt-24 ">
            Sugestion to edit content displayed
          </h2>
          <form className="space-y-4 w-full relative shadow-md">
            <div className="w-full py-1 px-4 bg-white flex items-center rounded-lg">
              <input
                type="text"
                id="PostText"
                className="px-8 w-full text-gray-800 font-medium text-sm outline-none border-none"
                placeholder="Enter  prompt here.."
              />
              <div className="absolute text-gray-800">
                <MdOutlineCameraAlt className="w-5 h-5" />
              </div>
              <div className="text-gray-800">
                <IoMdMic className="w-5 h-5" />
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="rounded-3xl w-full  text-white py-3 px-4 font-bold"
                style={{
                  border: "2px solid transparent",
                  borderImage: "linear-gradient(120deg, red, yellow)",
                  borderImageSlice: 1,
                }}
              >
                {/* New Post To Community */}
                Complete Filter
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AiPostModal;
