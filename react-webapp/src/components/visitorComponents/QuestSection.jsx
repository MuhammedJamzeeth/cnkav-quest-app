import React from "react";
import { checkImage, questImage } from "../../images";
export default function QuestSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8 mb-6 justify-center items-center">
      <img src={questImage} />

      <div className="z-0  space-y-3">
        <h1 className="text-[36px] md:text-[64px] font-black text-center md:text-left">
          The Quest System
        </h1>
        <h2 className="text-[18px] font-semibold pt-4 text-center md:text-left">
          Outsource and Accomplish
        </h2>
        <p className="mb-4 text-[16px] regular text-gray-200">
          Welcome to our innovative quest system, combining the flexibility of
          on-demand services with the assurance of video call verification.
        </p>
        <ul className="list-none  space-y-1">
          <li className="flex items-center space-x-2">
            <img
              src={checkImage}
              className="rounded-full bg-white h-3"
              alt="Checkmark"
            />
            <span className="text-[16px] regular text-gray-200">
              Post your tasks and connect.
            </span>
          </li>
          <li className="flex items-baseline space-x-2">
            <img
              src={checkImage}
              className="rounded-full bg-white h-3"
              alt="Checkmark"
            />
            <span className="text-[16px] regular text-gray-200">
              Our capable community members who are more than eager to lend a
              hand.
            </span>
          </li>
          <li className="flex items-baseline space-x-2">
            <img
              src={checkImage}
              className="rounded-full bg-white h-3"
              alt="Checkmark"
            />
            <span className="text-[16px] regular text-gray-200">
              No task is too big or small, you can discuss and navigate them
              virtually before any work commences.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
