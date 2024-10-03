import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import PricingModal from "../../components/visitorComponents/PricingModal";
import useLogoutHandler from "../../hooks/useLogoutHandler.jsx";
import ContactQModal from "../../pages/userProfileDashboard/ContactQModal";
import ContactQModal2 from "../../pages/userProfileDashboard/ContactQModal2";
import ContactQModal3 from "../../pages/userProfileDashboard/ContactQModal3";
import ContactQModal4 from "../../pages/userProfileDashboard/ContactQModal4";
import ContactQModal5 from "../../pages/userProfileDashboard/ContactQModal5";
import ContactQModal6 from "../../pages/userProfileDashboard/ContactQModal6";
import ContactQModal7 from "../../pages/userProfileDashboard/ContactQModal7";
import ContactQModal8 from "../../pages/userProfileDashboard/ContactQModal8";
import UpgradePlan from "../../pages/userPages/UpgradeplanModal.jsx";
import AddNewShipAddressmodal from "../userProfileDashboard/AddNewShipAddressmodal.jsx";
import {
  FaSplotch,
  FaStar,
  FaStarHalfStroke,
  FaRankingStar,
  FaMeteor,
} from "react-icons/fa6";
import { Progress } from "flowbite-react";
import RankToggle from "../../components/RankToggle.jsx";

//<AComponent icon={stringVariable === "theIcon" ? Rookie || SingleStar ||DoubleStar || TrippleStar || SRank }/>
const Profile = ({ iconName }) => {
  const navigate = useNavigate();
  const [isCardVisible, setCardVisible] = useState(false);
  const [isUpgradeplan, setUpgradeplan] = useState(false);
  const [isRankChange, setRankChange] = useState(false);

  // const [isModal, setModal] = useState(false);
  const [isModal, setModal] = useState(false);
  const [isContactQModal, setisContactQModal] = useState(false);
  const [isContactQModal2, setisContactQModal2] = useState(false);
  const [isContactQModal3, setisContactQModal3] = useState(false);
  const [isContactQModal4, setisContactQModal4] = useState(false);
  const [isContactQModal5, setisContactQModal5] = useState(false);
  const [isContactQModal6, setisContactQModal6] = useState(false);
  const [isContactQModal7, setisContactQModal7] = useState(false);
  const [isContactQModal8, setisContactQModal8] = useState(false);
  const [isaddNewShipAddressmodal, setisaddNewShipAddressmodal] =
    useState(false);

  const toggleModal = (type) => {
    if (type === "closed") {
      setisContactQModal(false);
      // setisLoginModal(false);
      setisContactQModal2(false);
      setisContactQModal3(false);
      setisContactQModal4(false);
      setisContactQModal5(false);
      setisContactQModal6(false);
      setisContactQModal7(false);
      setisContactQModal8(false);
      setisaddNewShipAddressmodal(false);
      // setisLoginModal(false);
      // setisForgotModal(false);
      setModal(false);
      // setisForgotModal(false);
    }

    //
    if (type === "contactQ-modal") {
      setisContactQModal(true);
      setModal(false);
    }
    if (type === "contactQ-modal2") {
      setisContactQModal(false);
      setisContactQModal2(true);
      setModal(false);
    }
    if (type === "contactQ-modal3") {
      setisContactQModal2(false);
      setisContactQModal3(true);
      setModal(false);
    }
    if (type === "contactQ-modal4") {
      setisContactQModal3(false);
      setisContactQModal4(true);
      setModal(false);
    }
    if (type === "contactQ-modal5") {
      setisContactQModal4(false);
      setisContactQModal5(true);
      setModal(false);
    }
    if (type === "contactQ-modal6") {
      setisContactQModal5(false);
      setisContactQModal6(true);
      setModal(false);
    }
    if (type === "contactQ-modal7") {
      setisContactQModal6(false);
      setisContactQModal7(true);
      setModal(false);
    }
    if (type === "contactQ-modal8") {
      setisContactQModal7(false);
      setisContactQModal8(true);
      setModal(false);
    }
    if (type === "addship-address") {
      setisaddNewShipAddressmodal(true);
      setModal(false);
    }
  };

  const { LogOut } = useLogoutHandler();

  const availableIcons = {
    Rookie: <FaSplotch />,
    SingleStar: <FaStar />,
    DoubleStar: <FaStarHalfStroke />,
    TrippleStar: <FaRankingStar />,
    SRank: <FaMeteor />,
  };

  const toggleRank = ({ iconName }) => {
    if (iconName === "Rookie") {
      return (
        <>
          <p class="text-gray-500 text-xs mt-4 inline-flex ">
            <p class="text-gray-500 text-xs mt-4 inline-flex gap-y-4 ">
              Rookie
            </p>
            <FaSplotch />
          </p>
        </>
      );
    }
    if (iconName === "SingleStar") {
      return (
        <>
          <p class="text-white text-xs mt-4 inline-flex ">
            {" "}
            <p class="text-gray-500 text-xs mt-4 inline-flex gap-y-4 ">
              Single Star
            </p>
            {availableIcons.SingleStar}
          </p>
        </>
      );
    }
    if (iconName === "DoubleStar") {
      return (
        <>
          <p class="text-yellow text-xs mt-4 inline-flex ">
            {" "}
            <p class="text-gray-500 text-xs mt-4 inline-flex gap-y-4 ">
              Double Star
            </p>
            {availableIcons.DoubleStar}
          </p>
        </>
      );
    }
    if (iconName === "TrippleStar") {
      return (
        <>
          <p class="text-blue text-xs mt-4 inline-flex ">
            {" "}
            <p class="text-gray-500 text-xs mt-4 inline-flex gap-y-4 ">
              Tripple Star
            </p>
            {availableIcons.TrippleStar}
          </p>
        </>
      );
    }
    if (iconName === "SRank") {
      return (
        <>
          <p class="text-red text-xs mt-4 inline-flex ">
            {" "}
            <p class="text-gray-500 text-xs mt-4 inline-flex gap-y-4 ">
              S-Rank
            </p>
            {availableIcons.SRank}
          </p>
        </>
      );
    }
  };

  return (
    <>
      <section className="pt-10 w-full z-10 shadow-md px-2">
        <div className="mt-28">
          <main className="">
            <ul>
              <li className="text-white py-2 rounded-xl  shadow-md transition duration-300 ease-in-out transform">
                <div class="black border-2 shadow-md rounded-lg p-6 mb-8">
                  <div className="flex gap-4 pb-3 mt-2">
                    <div className="text-gray-300 pt-[10px] text-sm inline-flex gap-4 py-2">
                      <p class="">Rank :</p>
                    </div>
                    <div className="text-white text-sm pt-[.5px] px-4 bg-gray-800 opacity-90 rounded-full font-medium">
                      {/* <p
                        className=""
                        // onChange={toggleRank("Rookie")}
                      >
                        Rookie
                      </p> */}

                      <RankToggle iconName="Rookie" />

                      {/* use this component, instead of static value u can use state
                      variable */}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-full text-sm">
                      <Progress
                        progress={100}
                        className="w-[100%]"
                        textLabel="Quest Points "
                        size="lg"
                        labelProgress
                        labelText
                      />
                    </div>
                    {/* <div className="flex gap-2 bg-gray-800 text-white text-[15px] py-3 px-3 rounded-full"> */}
                    {/* {availableIcons.Rookie} */}
                    {/* </div> */}
                  </div>
                </div>
              </li>
              <li className="text-white py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                <Link
                  to="/dashboard/account-details"
                  className="text-xl font-semibold"
                >
                  Account Details
                </Link>
              </li>
              <hr />
              <li className="text-white py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                <Link
                  to="/dashboard/user-community-posts"
                  className="text-xl font-semibold"
                >
                  Community Posts
                </Link>
              </li>
              <hr />
              <li className="text-white py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                <Link
                  to="/dashboard/order-page"
                  className="text-xl font-semibold"
                >
                  Order
                </Link>
              </li>
              <hr />
              <li className="text-white py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                <Link
                  to="/dashboard/notifications-page"
                  className="text-xl font-semibold"
                >
                  Notifications
                </Link>
              </li>
              <hr />
              <li className="text-white py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                <Link
                  to="/dashboard/subscriptions"
                  className="text-xl font-semibold"
                >
                  Subscriptions
                </Link>
              </li>
              <hr />
              <li className="text-white py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                <Link
                  to="#/dashboard/upgrade-plan"
                  className="text-xl font-semibold"
                  onClick={() => setUpgradeplan(true)}
                >
                  Upgrade Plan
                </Link>
              </li>
              <hr />
              <li className="text-white py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                <Link
                  to="#/dashboard/address-page"
                  className="text-xl font-semibold"
                  onClick={() => setisaddNewShipAddressmodal(true)}
                >
                  Addresses
                </Link>
              </li>
              <hr /> <hr />
              <li className="text-white py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                <Link
                  to="/dashboard/quests-dashboard"
                  className="text-xl font-semibold"
                >
                  Quest Dashboard
                </Link>
              </li>
              <hr />
              <li className="text-white py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                <Link
                  to="/dashboard/quests-Apps"
                  className="text-xl font-semibold"
                >
                  Quest Apps
                </Link>
              </li>
              <hr />
              <li className="text-white py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                <Link
                  to="/dashboard/affiliatetools"
                  className="text-xl font-semibold"
                >
                  Affiliate Tools
                </Link>
              </li>
              <hr />
              <hr />
              <li className="text-white py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                <Link
                  to="/dashboard/purchased-events"
                  className="text-xl font-semibold"
                >
                  My Events and Purchased Events
                </Link>
              </li>
              <hr />
              <li className="text-white py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                <Link to="/dashboard/wallet" className="text-xl font-semibold">
                  Wallet
                </Link>
              </li>
              <hr />
              <li className="text-white py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                <Link
                  to="/dashboard/privacypolicy"
                  className="text-xl font-semibold"
                >
                  Privacy Policy
                </Link>
              </li>
              <hr />
              <li className="text-white py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                <Link
                  to="/dashboard/termsofservices"
                  className="text-xl font-semibold"
                >
                  Terms Of Services
                </Link>
              </li>
              <hr />
              <li className="text-white py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                <Link to="/dashboard/about" className="text-xl font-semibold">
                  About Us
                </Link>
              </li>
              <hr />
              <li className="text-white py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                <Link
                  className="text-xl font-semibold"
                  to="#/contactus/step1"
                  onClick={() => {
                    toggleModal("contactQ-modal");
                  }}
                >
                  Contact Us
                </Link>
              </li>
              <hr />
              <li className="text-white py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                <Link to="/logout" className="text-xl font-semibold">
                  Log Out
                </Link>
              </li>
            </ul>
          </main>
        </div>
      </section>

      {isCardVisible && <PricingModal setCardVisible={setCardVisible} />}
      {isUpgradeplan && <UpgradePlan setUpgradeplan={setUpgradeplan} />}

      <ContactQModal isModal={isContactQModal} toggleModal={toggleModal} />
      <ContactQModal2 isModal={isContactQModal2} toggleModal={toggleModal} />
      <ContactQModal3 isModal={isContactQModal3} toggleModal={toggleModal} />
      <ContactQModal4 isModal={isContactQModal4} toggleModal={toggleModal} />
      <ContactQModal5 isModal={isContactQModal5} toggleModal={toggleModal} />
      <ContactQModal6 isModal={isContactQModal6} toggleModal={toggleModal} />
      <ContactQModal7 isModal={isContactQModal7} toggleModal={toggleModal} />
      <ContactQModal8 isModal={isContactQModal8} toggleModal={toggleModal} />
      <AddNewShipAddressmodal
        isModal={isaddNewShipAddressmodal}
        toggleModal={toggleModal}
      />
    </>
  );
};

export default Profile;
