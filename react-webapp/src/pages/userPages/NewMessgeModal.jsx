import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'flowbite-react';

const NewPostModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
  
      <div className="fixed h-[100%] mt-11 inset-0 overflow-auto bg-black bg-opacity-50 flex items-center justify-center NewPostModal">
        <div className="bg-black text-white p-8 rounded-lg shadow-lg mt-60 flex flex-col max-w-md relative">
          <button
            onClick={onClose}
            className="absolute top-12 right-2 text-white mt-40 text-2xl hover:text-gray-400"
          >
            &times;
          </button>
          <h2 className="text-xl font-bold mb-4 mt-40">Users to sent message to</h2>
          <form className="space-y-4">
  
            <div>
              <input
                type="text"
                id="PostText"
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
                placeholder="Select"
              />
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
               confirm
              </button>
            </div>

          </form>
         
        </div>
      </div>
    );
  };
  
  export default NewPostModal;