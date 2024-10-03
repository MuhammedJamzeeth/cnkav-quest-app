import { gentalMan, sideMan, drinkMan, crowdImage } from '../../images';
import React from 'react';
export default function ImagesSection() {
  return (
    <div className='container py-6'>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-1">
        <div className="md:col-span-3 w-full lg:col-span-2  rounded-2xl relative" >
          <div className="absolute rounded-2xl bottom-0 left-0 p-5 z-10  bg-opacity-50">
            <h1 className="text-xl font-bold  text-white mb-3">Embrace the Experience</h1>
            <p className="text-[15px] text-white leading-6">
              Join us for intellectual conversations in our exclusive chat rooms
              and memorable annual events. Start your journey with Exclusive Room
              today and step into a world of glamour, intellect, and unforgettable
              experiences.
            </p>
          </div>
          <img src={gentalMan} className="rounded-lg  h-full w-full " />

        </div>
        <div className="md:col-span-3 lg:col-span-2">
          <div className="shadow-lg    relative mb-4">
            <div className="absolute rounded-2xl bottom-0 left-0  bg-opacity-75 p-2 z-10">
              <p className="p-2 font-sans text-[13px]">
                Our platform promises state-of-the-art security and an
                easy-to-navigate design. You can converse freely and fearlessly,
                assured that your information and privacy stay well-protected.
              </p>
            </div>
            <img src={sideMan} className="rounded-lg h-full w-full p-1" />
          </div>
          <div className="shadow-lg rounded-2xl relative">
            <div className="absolute rounded-2xl bottom-0 left-0 p-2 z-10">
              <p className="p-2 font-sans text-[13px]">
                We understand how important it is to stay connected and grow. Our
                platform allows you to meet with individuals from various
                backgrounds and industries, providing avenues for networking and
                knowledge sharing.
              </p>
            </div>
            <img
              src={drinkMan}
              className="object-cover filter grayscale w-full rounded-2xl p-1"
            />
          </div>
        </div>
        <div className="md:col-span-6 lg:col-span-2 shadow-lg p-2 relative">
          <div className="absolute rounded-2xl bottom-3 left-3 p-2 z-10">
            <h1 className="text-lg font-bold ml-2">
              The Grandeur of Our Annual Events
            </h1>
            <p className="p-2 font-sans text-[13px]">
              In this exclusive club, we don’t just stop at chats. Exclusive Room
              holds an annual event, giving you an opportunity to engage in a
              delightful blend of entertainment and learning with individuals from
              across the world.
            </p>
          </div>
          <img src={crowdImage} className="rounded-2xl object-fill h-full w-full" />
        </div>
      </div>
    </div>
  );
}
