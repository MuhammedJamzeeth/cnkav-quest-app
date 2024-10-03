import { useState } from "react";
import Radio, { RadioGroup } from "../userPages/Radio";
import { Link, NavLink } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";

const SubscriptionsPage = () => {
  const [plan, setPlan] = useState("");

  const [selectMonthly, setSelectMonthly] = useState(false);

  const handleRestartSubscription = (subscriptionType) => {
    // Logic to restart the subscription
    alert(`Restarting ${subscriptionType} subscription`);
  };

  const handleEndSubscription = (subscriptionType) => {
    // Logic to end the subscription
    alert(`Ending ${subscriptionType} subscription`);
  };

  return (
    <div className="container mx-auto p-8  ">
      <section className="bg-black p-6 max-md:pb-[430px] pb-64">
        <h1 className="text-4xl font-black mt-40 mb-6 text-white">
          <Link to="/dashboard/profile">
            <button
              className={`flex gap-4 items-center px-2 py-2 rounded-lg font-semibold text-sm text-white text-[24px]`}
            >
              <FaChevronLeft />
            </button>
          </Link>
          Subscriptions Manager
        </h1>

        <div class="tabs">
          <div class="flex justify-center items-center bg-black rounded-full mb-4 p-1.5 max-w-sm mx-auto">
            <Link
              onClick={() => setSelectMonthly(true)}
              href="javascript:void(0)"
              // class="inline-block w-1/2 text-center transition-all duration-500 rounded-full text-gray-400 font-semibold py-3 px-3 lg:px-11 hover:text-indigo-600 tab-active:bg-indigo-600 tab-active:rounded-full tab-active:text-blue tablink whitespace-nowrap"
              className="inline-block w-1/2 text-gray-400 font-semibold hover:text-indigo-600 transition-all duration-500"
              data-tab="tabs-with-background-1"
              role="tab"
            >
              Bill Yearly
            </Link>
            <NavLink
              onClick={() => setSelectMonthly(false)}
              href="javascript:void(0)"
              className="text-gray-400 font-semibold hover:text-indigo-600 transition-all duration-500"
              data-tab="tabs-with-background-2"
              role="tab"
            >
              Bill Monthly
            </NavLink>
          </div>
        </div>

        <div class="h-64">
          <section>
            <RadioGroup value={plan} onChange={(e) => setPlan(e.target.value)}>
              {/* <RadioGroup
              value={plan}
              onChange={() => setSelectMonthly((prev) => !prev)}
            > */}
              <div className="flex gap-4 justify-center flex-col">
                <Radio value="Free Tier">
                  <Plan
                    title="Free Tier"
                    features={["Good Way to Try the Application!"]}
                    price={0}
                  />
                </Radio>
                <Radio value="Influewave Subscription">
                  <Plan
                    title="Influewave Subscription"
                    features={["Unleash Your Digital Potential!"]}
                    // price={12.99}
                    price={selectMonthly ? "600" : "49.99"}
                  />
                </Radio>
                <Radio value="Cnkav Subscription">
                  <Plan
                    title="Cnkav Subscription"
                    features={[
                      "Effortless become an Seller: Find, Resell, Earn!",
                    ]}
                    // price={12.99}
                    price={selectMonthly ? "2,400" : "199.99"}
                  />
                </Radio>
                <Radio value="Exclusive Room Subscription">
                  <Plan
                    title="Exclusive Room Subscription"
                    features={["Elevate Your Networking: Unlock Exclusivity!"]}
                    // price={12.99}
                    price={selectMonthly ? "6,000" : "499.99"}
                  />
                </Radio>
                <div className="flex justify-center items-center text-[13px] mt-4 mb-2">
                  <span>
                    By continuing, you agree to our{" "}
                    <Link
                      to="/dashboard/termsofservices"
                      className="underline font-bold"
                    >
                      Terms
                    </Link>
                  </span>
                </div>
              </div>
            </RadioGroup>

            <div className="flex justify-center items-center gap-2">
              <Link to="/choose-pay">
                <button
                  className={`
                                flex gap-4 items-center px-8 py-2.5 mt-2 rounded-lg
                                font-semibold text-md text-white text-[17px] 
                                `}
                  style={{
                    border: "2px solid transparent",
                    borderImage: "linear-gradient(120deg, red, yellow)",
                    borderImageSlice: 1,
                  }}
                >
                  Confirm {plan}
                </button>
              </Link>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default SubscriptionsPage;

function Plan({ icon, title, features, price }) {
  return (
    <div className="flex gap-4 items-center">
      {icon}
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm">{features.join(" · ")}</p>
      </div>
      <span className="ml-auto font-medium"> €{price}</span>
    </div>
  );
}
