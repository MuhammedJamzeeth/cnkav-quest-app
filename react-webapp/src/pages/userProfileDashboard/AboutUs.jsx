import React, { useState } from "react";
import { cnkavLogo, userLogedIn } from "../../images";
import PricingModal from "../../components/visitorComponents/PricingModal";

const AboutUs = () => {
  const [isCardVisible, setCardVisible] = useState(false);

  return (
   <> <div className="container mx-auto py-10 px-4 ">
      <h1 className="text-4xl font-black  mb-8 mt-40">Who We Are?</h1>
      <p className="text-lg leading-relaxed  mb-8">
        In a realm of fragmented connections and vast opportunities, we are the
        architects of collaborative success. Influewave ,cnkav, and Exclusive
        Room subscriptions stand as beacons of empowerment in the digital world.
        From revolutionising digital platforms and affiliate marketing. As well
        as, changing the landscape of gig to climate it to our social and
        current age and even exclusive business networks, we pioneer innovation
        and connection. Welcome to a world where potential knows no bounds.
        Welcome to our ecosystem  consider us an futuristic social guild.
      </p>
      <div className="pt-6 flex justify-center">
        <button
          onClick={() => setCardVisible(true)}
          className="rounded-3xl w-3/12 bg-black text-white py-3 px-4 font-bold"
          style={{
            border: "2px solid transparent",
            borderImage: "linear-gradient(120deg, red, yellow)",
            borderImageSlice: 1,
          }}
        >
          Get Started
        </button>
      </div>

      <section className="mb-12">
        <h2 className="text-4xl font-black  my-10">
          Our <span className="text-red-700 ">Brand</span> Story!
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          In a world where opportunities abound but connections are fragmented,
          CNKAV emerged as the beacon of collaborative success. Born from the
          desire to bridge the gap between average individual and companies.
          Thought,  Influewave’s Affiliate marketing tool we revolutionised the
          affiliate marketing landscape. With its innovative tool, Influewave
          does not only empowers affiliate marketers or enthusiast  to monetise
          their efforts but also enables companies to tap into a vast network of
          motivated promoters while providing an community and even More. As
          Influewave’s subscription Affiliate tool thrived, a new need arose to
          expand Influewave –Answering to the required call of the modern day
          for an futuristic digital style-guild, that caters to the individuals
          and brands seeking digital prominence, cnkav subscription emerges as a
          visionary force. With an unparalleled passion for creativity and
          strategic prowess, Influewave crafts new style of gigs that are
          bespoke, that we called quests that captivate audiences and propel
          brands to new heights. From unique quest requests and exclusive seller
          opportunities to accomplishing tasks on the platform and engaging with
          the social media networks like community for enthusiasts, Influewave
          and cnkav embodies the essence of a familiar but new landscape of a
          digital guild. However, our journey doesn’t halt there.
        </p>
        <p className="text-lg leading-relaxed mt-12">
          Recognising the power in empowering individuals trough the quest’s on
          the platform and where our members are called the quest doers,
          Influewave introduces a groundbreaking concept. Through subscriptions
          and commissions, individuals gain access to premium quest
          opportunities that are based on the users rank and tools, transforming
          their homes into centre’s of entrepreneurial triumph and local and
          international tasks hub
        </p>
        <p className="text-lg leading-relaxed my-12">
          Amidst this whirlwind of innovation and collaboration, Exclusive Room
          emerged as the pinnacle of exclusivity and connection. Through its
          subscription-based model, Exclusive Room provided members with access
          to potential business opportunity with an exclusive chat, annual
          events, and  fostering a community of like-minded individuals driven
          by ambition and opportunity. Together Influewave, and Exclusive Room
          form an ecosystem of empowerment, where individuals and brands alike
          can thrive in the digital age. As the journey continues, the
          possibilities are endless, and the connections forged are bound to
          shape the future of digital platforms and entrepreneurship
        </p>
        <div className="flex flex-col md:flex-row  my-12">
          <div className="w-full md:w-7/10 mr-4 h-[400px] bg-indigo-900 rounded-xl overflow-hidden flex justify-center">
            <img
              src={cnkavLogo}
              alt="Our Journey"
              className="p-20 object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="w-full md:w-3/10 md:ml-4 pr-20">
            <h3 className="text-4xl font-semibold mb-2">
              Ready to turn your <span className="text-red-700">passion</span>{" "}
              into profit?
            </h3>
            <ul className="text-lg leading-[50px] space-y-4">
              <li>
                Exclusive Room Subscription: Elevate Your Networking: Unlock
                Exclusivity!
              </li>
              <li>Influewave Subscription: Unleash Your Digital Potential!</li>
              <li>
                Cnkav Subscription: Effortless become a Seller: Find, Resell,
                Earn!
              </li>
            </ul>

            <div className="pt-6 flex justify-center">
              <button
                type="submit"
                onClick={() => setCardVisible(true)}
                className="rounded-3xl  bg-black text-white py-3 px-4 font-bold"
                style={{
                  border: "2px solid transparent",
                  borderImage: "linear-gradient(120deg, red, yellow)",
                  borderImageSlice: 1,
                }}
              >
                Check Out Pricing
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12 mx-10">
        <h2 className="text-4xl font-black mb-8">Community Love</h2>
        <p className="mb-10">
          See what the community is saying about CNKAV. Share the love!
        </p>
        {/* Cards  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className="bg-slate-800 text-white shadow-2xl rounded-lg p-4 relative"
            >
              <div className="flex items-center mb-4">
                <img
                  src={userLogedIn}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div className="my-2">
                  <h3 className="text-lg font-semibold">User Name</h3>
                  <p className="text-sm text-gray-500">@username</p>
                </div>
              </div>
              <p className="text-md  mb-4 leading-relaxed">
                There’s no other program that walks you through exactly what you
                need to know to start an online store fast, written by someone
                who has built several 7-figure ecommerce businesses from
                scratch. What’s more, everything has been broken down in
                step-by-step detail with real action plans including finding
                your niche.
              </p>
              <div className="flex justify-between items-center text-gray-500 text-sm">
                <span>Original</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6 flex justify-center ">
          <button
            type="submit"
            className="rounded-3xl w-4/12 bg-black text-white py-3 px-4 font-bold"
            style={{
              border: "2px solid transparent",
              borderImage: "linear-gradient(120deg, red, yellow)",
              borderImageSlice: 1,
            }}
          >
            Load More
          </button>
        </div>
      </section>
    </div>
    
    {isCardVisible && <PricingModal setCardVisible={setCardVisible} />}</>
  );
};

export default AboutUs;
