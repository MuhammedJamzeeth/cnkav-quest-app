import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Modal } from 'flowbite-react';

const ChatsNewModal = ({ isModal, toggleModal}) => {
  if (!isModal) return null;
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
          <div class="flex flex-row items-center justify-between text-xs">
            <span class="font-bold">New Chat</span>
            
          </div>

          <form className="space-y-4">

          <div class="flex flex-col mt-8">
          <div class="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
            <button
              class="flex flex-row items-center hover:bg-blue-900 rounded-xl p-2"
            >
              <div
                class="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
              >
                H
              </div>
              <div class="ml-2 text-sm font-semibold">Henry Boyd</div>
            </button>
            <button
              class="flex flex-row items-center hover:bg-blue-900 rounded-xl p-2"
            >
              <div
                class="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full"
              >
                M
              </div>
              <div class="ml-2 text-sm font-semibold">Marta Curtis</div>
              <div
                class="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none"
              >
                2
              </div>
            </button>
            <button
              class="flex flex-row items-center hover:bg-blue-900 rounded-xl p-2"
            >
              <div
                class="flex items-center justify-center h-8 w-8 bg-orange-200 rounded-full"
              >
                P
              </div>
              <div class="ml-2 text-sm font-semibold">Philip Tucker</div>
            </button>
            <button
              class="flex flex-row items-center hover:bg-blue-900 rounded-xl p-2"
            >
              <div
                class="flex items-center justify-center h-8 w-8 bg-pink-200 rounded-full"
              >
                C
              </div>
              <div class="ml-2 text-sm font-semibold">Christine Reid</div>
            </button>
            <button
              class="flex flex-row items-center hover:bg-blue-900 rounded-xl p-2"
            >
              <div
                class="flex items-center justify-center h-8 w-8 bg-purple-200 rounded-full"
              >
                J
              </div>
              <div class="ml-2 text-sm font-semibold">Jerry Guzman</div>
            </button>
          </div>
        </div>

          </form>
          <p className="mt-6 text-center text-sm text-white">
            By signing up, you agree to Cnkav <br />
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
  
  export default ChatsNewModal;