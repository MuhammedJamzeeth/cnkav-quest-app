import React from "react";
import {
  FaSplotch,
  FaStar,
  FaStarHalfStroke,
  FaRankingStar,
  FaMeteor,
} from "react-icons/fa6";
import { Progress } from "flowbite-react";

const iconMap = {
  Rookie: <FaSplotch />,
  SingleStar: <FaStar />,
  DoubleStar: <FaStarHalfStroke />,
  TrippleStar: <FaRankingStar />,
  SRank: <FaMeteor />,
};

const RankToggle = ({ iconName = "Rookie" }) => {
  const iconCom = iconMap[iconName] || <FaSplotch />;
  return (
    <>
      <div className="flex items-center gap-28 mt-[2.5px]">
        <p class="text-gray-500 text-xs  items-center gap-4 flex ">
          <p class="text-white z-20 text-[13px] font-medium  flex items-center ">
            {iconName}
          </p>
        </p>
        <div className="text-white text-[17px] z-20 bg-gray-500 py-2 px-2 rounded-lg">
          {iconCom}
        </div>
      </div>
    </>
  );
};

export default RankToggle;
