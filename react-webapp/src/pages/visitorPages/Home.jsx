import React from "react";
import ImagesSection from "../../components/visitorComponents/ImagesSection";
import ExclusiveRoomSection from "../../components/visitorComponents/ExclusiveRoomSection";
import PricingSection from "../../components/visitorComponents/PricingSection";
import FlexibleSection from "../../components/visitorComponents/FlexibleSection";
import InfluewaveSection from "../../components/visitorComponents/InfluewaveSection";
import EngagnmentSection from "../../components/visitorComponents/EngagnmentSection";
import VideoChat from "../../components/visitorComponents/VideoChat";
import QuestSection from "../../components/visitorComponents/QuestSection";
import HeroSection from "../../components/visitorComponents/HeroSection";

export default function Home() {
  return (
    <>
      <div className="container">
        <HeroSection />
        <div id="influewave-section">
          <InfluewaveSection />
        </div>
        <QuestSection />
        <VideoChat />
        <FlexibleSection />
        <div id="subscriptions">
          <PricingSection />
        </div>
        <EngagnmentSection />
        <div id="exclusive-section">
          <ExclusiveRoomSection />
        </div>
        <ImagesSection />
      </div>
    </>
  );
}
