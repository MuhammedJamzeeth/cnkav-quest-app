import React from 'react';

export default function FlexibleSection() {
  return (
    <div >
      <div className="md:p-6 mx-auto text-center py-20">
        <div className="mx-auto  space-y-5">
          <h1 className="text-[38px] md:text-[64px] font-extrabold">
            Flexible Subscription Models
          </h1>
          <p className="text-[16px]  text-gray-200">
            Whether you’re a task doer or a community enthusiast, our
            diversified subscription models cater to your unique needs. As <br />a
            task doer, take advantage of our platform that connects you with
            individuals in need of your specialty, opening a window <br />for a
            profitable endeavor. As a community lover, access engaging specialty
            groups, affiliate marketing opportunities, and <br />
            exclusive events.
          </p>
        </div>

        <p className="my-10 text-[12.83px] regular text-center text-gray-400">
          * free tier has ads. Limited to one quest and quest post monthly.
        </p>
      </div>
    </div>
  );
}
