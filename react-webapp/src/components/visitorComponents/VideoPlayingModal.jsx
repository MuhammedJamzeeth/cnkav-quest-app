import React from "react";
import { videoImage } from "../../images";

const VideoPlayingModal = ({ setVideoVisible }) => {
  return (
    <div className="fixed inset-0 bg-opacity-80 grid grid-cols-1 gap-2 w-screen pricemodal">
      <div className="bg-black p-8 rounded-lg shadow-lg relative w-screen overflow-auto h-screen flex items-center justify-center">
        {/* closing Button */}
        <button
          onClick={() => setVideoVisible(false)}
          className="absolute top-4 right-10 text-3xl text-white border px-4 py-2 rounded-full"
        >
          &times;
        </button>

        <div className="w-3/4  h-3/4 mt-40 m-auto my-10 ">
        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/C13OUyfIZW8?si=U1Iw6xN_fFRFz2VF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayingModal;
