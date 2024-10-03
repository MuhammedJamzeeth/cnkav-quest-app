import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Radio, { RadioGroup } from "./Radio";
import { IoLockClosedOutline } from "react-icons/io5";
import api from "../../lib/api";

const UpgradeplanModal = ({ setUpgradeplan }) => {
  const [plan, setPlan] = useState("");
  const [subscriptionList, setSubscriptionList] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  // State variables for price IDs
  const [exclusive_room_id, setExclusiveRoomId] = useState("");
  const [CNKAV_room_id, setCNKAVRoomId] = useState("");
  const [Influewave_id, setInfluewaveId] = useState("");
  const [FreeTier_id, setFreeTier_id] = useState("");

  const handleUpgrade = async () => {
    if (!plan) {
      alert("Please select a plan.");
      return;
    }

    try {
      const response = await api.post(
        "/user/action/change-plan",
        {
          new_price_id: plan, // Use the selected plan's ID
          payment_method_id: "pm_1Q2FTSCEMBb05tfoPTfwVMag", // Adjust as needed
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Subscription updated");
        navigate("/dashboard/");
      } else {
        console.error("Error upgrading subscription: ");
        alert("Failed to upgrade plan. Please try again.");
      }
    } catch (error) {
      console.error("Error making request: ", error);
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const resp = await api.get("/user/list/subscriptions", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log(resp);
        setSubscriptionList(resp.data.subscriptions);
        setFreeTier_id(resp.data.subscriptions[0]?.prices[0].id);

        setExclusiveRoomId(resp.data.subscriptions[1]?.prices[0].id);
        setCNKAVRoomId(resp.data.subscriptions[2]?.prices[0].id);
        setInfluewaveId(resp.data.subscriptions[3]?.prices[0].id);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSubscriptions();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 grid grid-cols-1 gap-2 w-screen pricemodal">
      <div className="pt-6 bg-black text-white p-8 rounded-lg shadow-lg relative md:w-[40%] w-[90%] mx-auto overflow-auto">
        <div className="mb-4">
          <h1 className="font-bold py-1">Upgrade your plan</h1>
          <h3 className="font-light">
            Choose the best plan for your business needs
          </h3>
        </div>
        <hr className="my-3 w-100% mb-8" />
        <Link to="/dashboard/profile">
          <button
            onClick={() => setUpgradeplan(false)}
            className="absolute top-4 right-6 text-white text-3xl pt-1"
          >
            &times;
          </button>
        </Link>

        <RadioGroup value={plan} onChange={(e) => setPlan(e.target.value)}>
          <div className="flex gap-4 justify-center flex-col">
            <Radio value={exclusive_room_id}>
              <Plan
                title="Exclusive Room Subscription"
                features={["Elevate Your Networking: Unlock Exclusivity!"]}
                price={499.99}
              />
            </Radio>
            <Radio value={CNKAV_room_id}>
              <Plan
                title="Cnkav Subscription"
                features={["Effortless become a Seller: Find, Resell, Earn!"]}
                price={199.99}
              />
            </Radio>
            <Radio value={Influewave_id}>
              <Plan
                title="Influewave Subscription"
                features={["Unleash Your Digital Potential!"]}
                price={49.99}
              />
            </Radio>
            <Radio value={FreeTier_id}>
              <Plan
                title="Free Tier"
                features={["Good Way to Try the Application!"]}
                price={0}
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

        <hr className="my-3 w-100% mb-8" />

        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <IoLockClosedOutline />
            <h3 className="font-light text-[12px] pt-1">
              Payment Secured by Stripe
            </h3>
          </div>
          <div className="flex justify-between items-center gap-2">
            <Link to="/dashboard/profile">
              <button
                className="py-2 bg-white px-4  text-[15px] font-semibold text-black"
                onClick={() => setUpgradeplan(false)}
              >
                Cancel
              </button>
            </Link>
            <button
              className={`flex gap-4 items-center px-4 py-2 rounded-lg font-semibold text-sm text-white text-[15px]`}
              style={{
                border: "2px solid transparent",
                borderImage: "linear-gradient(120deg, red, yellow)",
                borderImageSlice: 1,
              }}
              onClick={handleUpgrade}
            >
              Upgrade
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeplanModal;

function Plan({ title, features, price }) {
  return (
    <div className="flex gap-4 items-center">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm">{features.join(" · ")}</p>
      </div>
      <span className="ml-auto font-medium"> €{price}</span>
    </div>
  );
}
