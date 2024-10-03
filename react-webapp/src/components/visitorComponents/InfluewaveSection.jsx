import React, { useState } from "react";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";
import { videoImage } from "../../images";
import { FaPlay } from "react-icons/fa";
import VideoPlayingModal from "./VideoPlayingModal";
import { MdSlowMotionVideo } from "react-icons/md";

export default function InfluewaveSection() {
  const [isVideoVisible, setVideoVisible] = useState(false);
  return (
    <section className=" md:py-10">
      <div className=" md:pt-[13rem] lg:pt-]13rem] md:mb-0 flex items-center justify-center flex-col  text-center">
        <div className="w-[100%]  space-y-4 ">
          <h1
            className="lg:text-[64px] md:text-[64px] text-[38px] font-extrabold "
            data-scroll
          >
            Influewave
          </h1>
          <h2 className="text-[18px] md:text-[22px] font-semibold" data-scroll>
            Harness the Power of Community and Collaboration
          </h2>
          <p className="lg:text-[16px] md:px-16 md:text-[16px] text-[15px] md:leading-relaxed text-gray-200 font-regular pb-8">
            Welcome to Influewave, a space where you meet, interact, and grow
            with a thriving community of innovative minds. But we <br /> are
            more than just a virtual meeting place, we are a launching pad to
            elevate your ideas and projects through seamless
            <br /> collaboration and enriched connections.
          </p>
        </div>
      </div>

      <Link onClick={() => setVideoVisible(true)}>
        <img src={videoImage} class="w-full md:p-12 rounded-lg" />
      </Link>
      {isVideoVisible && (
        <VideoPlayingModal setVideoVisible={setVideoVisible} />
      )}
    </section>
  );
}

document.addEventListener("scroll", () => {
  const elements = document.querySelectorAll("[data-scroll]");
  elements.forEach((element) => {
    if (element.getBoundingClientRect().top < window.innerHeight) {
      element.classList.add("opacity-100", "translate-y-0");
    }
  });
});
