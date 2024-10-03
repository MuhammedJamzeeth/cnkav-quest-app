import React, {useEffect, useState} from "react";

import {
    dropDownIcon,
    cnkavLogo,
    humburger,
    userName,
    questicon,
    profile,
    chat,
    community,
} from "../../images";
import {Link, NavLink, useLocation} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import PricingModal from "../visitorComponents/PricingModal";
import {FaArrowRight} from "react-icons/fa";
import {IoLogoVue} from "react-icons/io5";
import {HiMiniChatBubbleLeftRight} from "react-icons/hi2";
import {LuFileKey2} from "react-icons/lu";

import {HiOutlineViewGrid} from "react-icons/hi";
import {HiMiniUser} from "react-icons/hi2";
import useLogoutHandler from "../../hooks/useLogoutHandler.jsx";

import ContactQModal from "../../pages/userProfileDashboard/ContactQModal";
import ContactQModal2 from "../../pages/userProfileDashboard/ContactQModal2";
import ContactQModal3 from "../../pages/userProfileDashboard/ContactQModal3";
import ContactQModal4 from "../../pages/userProfileDashboard/ContactQModal4";
import ContactQModal5 from "../../pages/userProfileDashboard/ContactQModal5";
import ContactQModal6 from "../../pages/userProfileDashboard/ContactQModal6";
import ContactQModal7 from "../../pages/userProfileDashboard/ContactQModal7";
import ContactQModal8 from "../../pages/userProfileDashboard/ContactQModal8";

export default function QuestsNavBar() {
    const [isCardVisible, setCardVisible] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    // const user = true;

    const [isModal, setModal] = useState(false);
    const [isContactQModal, setisContactQModal] = useState(false);
    const [isContactQModal2, setisContactQModal2] = useState(false);
    const [isContactQModal3, setisContactQModal3] = useState(false);
    const [isContactQModal4, setisContactQModal4] = useState(false);
    const [isContactQModal5, setisContactQModal5] = useState(false);
    const [isContactQModal6, setisContactQModal6] = useState(false);
    const [isContactQModal7, setisContactQModal7] = useState(false);
    const [isContactQModal8, setisContactQModal8] = useState(false);

    const handleButtonClick = () => {
        navigate("/dashboard/profile");
    };
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

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
    };

    const [windowDimension, setWindowDimension] = useState(null);

    useEffect(() => {
        setWindowDimension(window.innerWidth);
    }, []);

    useEffect(() => {
        function handleResize() {
            setWindowDimension(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isMobile = windowDimension <= 640;

    const [style, setStyle] = useState("blue");

    const changeStyle = () => {
        console.log("you just clicked");
        if (style !== "blue") setStyle("blue");
        else setStyle("white");
    };

    const Sidebar = (
        <div
            className={`fixed sidebar right-0 h-full w-64 bg-black text-white transform ${
                isSidebarOpen ? " top-0  -translate-x-0 " : "translate-x-full"
            } transition-transform duration-300 ease-in-out z-50 rounded-tl-xl`}
        >
            <div className="flex justify-between items-center p-4">
                <h2 className="text-xl font-bold"></h2>
                <button onClick={closeSidebar} className="text-white">
                    &times;
                </button>
            </div>
            <nav className="flex flex-col p-4 space-y-2">
                <Link
                    to="/dashboard/account-details"
                    className="hover:text-gray-400 items-center gap-4 rounded-lg bg-[#141414] p-2 flex"
                    onClick={closeSidebar}
                >
                    <img
                        className="w-8 h-8 rounded-full"
                        src={
                            "data:image/jpeg;base64,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"
                        }
                    />
                    Username
                </Link>
                <Link
                    to="/dashboard"
                    className="hover:text-gray-400  rounded-lg bg-[#141414] p-2 flex items-center justify-between"
                    onClick={closeSidebar}
                >
                    Home{" "}
                    <span className="ml-2">
            <FaArrowRight/>
          </span>
                </Link>
                <Link
                    to="/"
                    className="hover:text-gray-400  rounded-lg bg-[#141414] p-2 flex items-center justify-between"
                    onClick={() => {
                        document
                            .getElementById("exclusive-section")
                            .scrollIntoView({behavior: "smooth"});
                        closeSidebar();
                    }}
                >
                    Featurs{" "}
                    <span className="ml-2">
            <FaArrowRight/>
          </span>
                </Link>
                <Link
                    to="/"
                    className="hover:text-gray-400  rounded-lg bg-[#141414] p-2 flex items-center justify-between"
                    onClick={() => {
                        document
                            .getElementById("exclusive-section")
                            .scrollIntoView({behavior: "smooth"});
                        closeSidebar();
                    }}
                >
                    Pricing{" "}
                    <span className="ml-2">
            <FaArrowRight/>
          </span>
                </Link>
                <Link
                    to="/contact"
                    className="hover:text-gray-400  rounded-lg bg-[#141414] p-2 flex items-center justify-between"
                    onClick={closeSidebar}
                >
                    Contact Us{" "}
                    <span className="ml-2">
            <FaArrowRight/>
          </span>
                </Link>

                <Link
                    to="/"
                    className="hover:text-gray-400  rounded-lg bg-[#141414] p-2 flex items-center justify-between"
                >
                    Logout{" "}
                    <span className="ml-2">
            <FaArrowRight/>
          </span>
                </Link>
            </nav>
        </div>
    );

    return (
        <>
            {/* mobile menu section */}
            {isMobile ? (
                <>
                    {/* Mobile section bottom bar */}

                    <div
                        className="fixed bg-black bottom-0 right-0 lg:top-0 md:h-[13%]  left-0 w-[100vw] shadow-md bottombar z-20 flex justify-between py-4 px-6">
                        {/* <nav className=""> */}
                        <ul className="w-full flex gap-2 justify-between top-0 left-0 right-0 bottom-0">
                            <li>
                                <NavLink
                                    to="/dashboard"
                                    activeClassName="active"
                                    className="flex flex-col w-full text-gray-300 justify-center items-center text-[11px] gap-2"
                                >
                                    <HiOutlineViewGrid className="w-5 h-5"/>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/Events"
                                    activeClassName="active"
                                    className="flex flex-col w-full text-gray-300 justify-center items-center text-[11px] gap-2"
                                >
                                    <IoLogoVue className="w-5 h-5"/>
                                    Events
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/community"
                                    activeClassName="active"
                                    className="flex flex-col w-full text-gray-300 justify-center items-center text-[11px] gap-2"
                                >
                                    <LuFileKey2 className="w-5 h-5"/>
                                    Community
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/Chats"
                                    activeClassName="active"
                                    className="flex flex-col w-full text-gray-300 justify-center items-center text-[11px] gap-2"
                                >
                                    <HiMiniChatBubbleLeftRight className="w-5 h-5"/>
                                    Chat
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/profile"
                                    activeClassName="active"
                                    className="flex flex-col w-full text-gray-300 justify-center items-center text-[11px] gap-2"
                                >
                                    <HiMiniUser className="w-5 h-5"/>
                                    Profile
                                </NavLink>
                            </li>
                        </ul>
                        {/* </nav> */}

                        {/* <NavLink to="/questModals">
              <div className=" flex flex-col items-center gap-1">
                <HiOutlineViewGrid className="w-5 h-5" />
                <span className="text-[11px]">Home</span>
              </div>
            </NavLink>
            <NavLink to="/questModals/Events">
              <div className=" flex flex-col items-center gap-1">
                <img src={questicon} alt="questicon" className="w-5 h-5" />
                <span className="text-[11px]">Events</span>
              </div>
            </NavLink>
            <Link to="/questModals/community">
              <div className=" flex flex-col items-center gap-1">
                <img src={community} alt="questicon" className="w-5 h-5" />

                <span className="text-[11px]">Community</span>
              </div>
            </Link>
            <Link to="/questModals/community-chat">
              <div className=" flex flex-col items-center gap-1">
                <img src={chat} alt="questicon" className="w-5 h-5" />

                <span className="text-[11px]">Chat</span>
              </div>
            </Link>
            <Link to="/questModals/profile">
              <div className=" flex flex-col items-center gap-1">
                <HiMiniUser className="w-5 h-5" />
                <span className="text-[11px]">Profile</span>
              </div>
            </Link> */}
                    </div>

                    {/* mobile section bottom bar */}
                </>
            ) : (
                <>
                    <div className="fixed bg-black bottom-0 md:top-0 md:h-[13%]  left-0 w-[100vw] shadow-md p-4 navbar">
                        <div className="container  mx-auto flex  items-center justify-between">
                            <div className="flex gap-10 items-center  md:w-auto justify-center md:justify-start">
                                <img
                                    src={cnkavLogo}
                                    alt="Logo"
                                    className="md:h-16 md:w-16 w-12 h-12"
                                />
                                <nav
                                    className="hidden lg:flex text-sm cursor-pointer space-x-10 text-[17px] ml-20 items-baseline">
                                    <div className="relative group flex items-center">
                                        <NavLink
                                            to="/dashboard"
                                            activeClassName="active"
                                            className="text-gray-400"
                                        >
                                            Home
                                        </NavLink>
                                        <img
                                            src={dropDownIcon}
                                            className="h-6 rounded-full ml-2"
                                            alt="Dropdown Icon"
                                        />
                                        <div
                                            className="absolute hidden group-hover:block w-[200px] bg-white text-black mt-[90px] shadow-lg">
                                            <Link
                                                to="/dashboard/quests-dashboard"
                                                className="block px-4 py-2 hover:bg-black hover:text-white"
                                            >
                                                Quest Dashboard
                                            </Link>
                                            <Link
                                                to="/dashboard/quests-Apps"
                                                className="block px-4 py-2 hover:bg-black hover:text-white"
                                            >
                                                Quest Apps
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="relative group flex items-center">
                                        <NavLink
                                            activeClassName="active"
                                            className="hover:text-white text-gray-400"
                                            to="/dashboard/Events"
                                            id="influewave-link"
                                        >
                                            Events
                                        </NavLink>
                                    </div>
                                    <div className="relative group flex items-center">
                                        <NavLink
                                            activeClassName="active"
                                            className="hover:text-white text-gray-400"
                                            to="/dashboard/community"
                                            id="influewave-link"
                                        >
                                            Community
                                        </NavLink>
                                    </div>
                                    <div className="relative group flex items-center ">
                    <span
                        className="hover:text-white text-gray-400"
                        id="influewave-link"
                    >
                      <NavLink activeClassName="active" to="/dashboard/Chats">
                        Chat
                      </NavLink>
                    </span>
                                    </div>
                                    <div className="relative group flex items-center">
                                        <NavLink
                                            activeClassName="active"
                                            className="hover:text-white text-gray-400"
                                            to="/dashboard/affiliatetools"
                                            id="influewave-link"
                                        >
                                            Affiliate tools
                                        </NavLink>
                                        <img
                                            src={dropDownIcon}
                                            className="h-6 rounded-full ml-2"
                                            alt="Dropdown Icon"
                                        />
                                    </div>
                                    <Link
                                        className="hover:text-white text-gray-400"
                                        to="#"
                                        onClick={() => setCardVisible(true)}
                                    >
                                        Pricing
                                    </Link>
                                    <Link
                                        className="hover:text-white text-gray-400"
                                        to="#/contactus/step1"
                                        onClick={() => {
                                            toggleModal("contactQ-modal");
                                        }}
                                    >
                                        Contact Us
                                    </Link>
                                </nav>
                            </div>

                            <button
                                className="hidden cursor-pointer lg:flex items-center border border-white px-4 py-2 rounded-md text-white transition-transform duration-300 ease-in-out transform hover:scale-105"
                                onClick={handleButtonClick}
                            >
                                <img
                                    src={`https://backend.cnkav.com${user?.image}`}
                                    // src={`http://localhost:8000${user?.image}`}
                                    className="bg-white rounded-full h-6 mr-4"
                                    alt=""
                                />
                                <span>{user?.name}</span>

                                <img
                                    src={dropDownIcon}
                                    className="h-6 rounded-full ml-2 transition-transform duration-300 ease-in-out transform hover:translate-x-1"
                                    alt="Dropdown Icon"
                                />
                            </button>
                            <img
                                onClick={toggleSidebar}
                                className="block lg:hidden w-8 cursor-pointer"
                                src={humburger}
                                alt="Menu"
                            />
                        </div>
                    </div>
                    {Sidebar}
                    {isCardVisible && <PricingModal setCardVisible={setCardVisible}/>}

                    <ContactQModal isModal={isContactQModal} toggleModal={toggleModal}/>
                    <ContactQModal2
                        isModal={isContactQModal2}
                        toggleModal={toggleModal}
                    />
                    <ContactQModal3
                        isModal={isContactQModal3}
                        toggleModal={toggleModal}
                    />
                    <ContactQModal4
                        isModal={isContactQModal4}
                        toggleModal={toggleModal}
                    />
                    <ContactQModal5
                        isModal={isContactQModal5}
                        toggleModal={toggleModal}
                    />
                    <ContactQModal6
                        isModal={isContactQModal6}
                        toggleModal={toggleModal}
                    />
                    <ContactQModal7
                        isModal={isContactQModal7}
                        toggleModal={toggleModal}
                    />
                    <ContactQModal8
                        isModal={isContactQModal8}
                        toggleModal={toggleModal}
                    />
                    {/* <ContactModal isModal={isContactModal} toggleModal={toggleModal} />
                        <ContactModal2 isModal={isContactModal2} toggleModal={toggleModal} />
                        <ContactModal3 isModal={isContactModal3} toggleModal={toggleModal} />
                        <ContactModal4 isModal={isContactModal4} toggleModal={toggleModal} />
                        <ContactModal5 isModal={isContactModal5} toggleModal={toggleModal} />
                        <ContactModal6 isModal={isContactModal6} toggleModal={toggleModal} />
                        <ContactModal7 isModal={isContactModal7} toggleModal={toggleModal} />
                        <ContactModal8 isModal={isContactModal8} toggleModal={toggleModal} /> */}
                </>
            )}
        </>
    );
}

{
    /* <div className="fixed bg-black top-0 left-0 w-full shadow-md p-4 navbar">
        <div className="container  mx-auto flex  items-center justify-between">
          <div className="flex gap-10 items-center  md:w-auto justify-center md:justify-start">
            <Link to="/">
              <img src={cnkavLogo} alt="Logo" className="h-16 w-16" />
            </Link>
            <nav className="hidden text-lg md:text-md md:flex space-x-12 text-[17px]  items-baseline">
              <Link className="text-white font-bold" to="/">
                Home
              </Link>
              <div className="relative group flex items-center dropdown">
                <Link
                  className="hover:text-white text-[##7A7A7A] cursor-pointer"
                  to="/"
                  onClick={(e) => {
                    if (window.location.pathname !== '/') {
                      e.preventDefault();
                      window.location.href = '/';
                    }
                    setTimeout(() => {
                      document
                        .getElementById('subscriptions')
                        .scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                >
                  Featurs
                </Link>

                <div className="absolute hidden group-hover:block w-[220px] bg-white text-black mt-[100px] leading-2 shadow-lg"></div>
              </div>

              <Link
                className="hover:text-white text-[##7A7A7A]"
                to="#"
                onClick={() => setCardVisible(true)}
              >
                Pricing
              </Link>
              <Link
                className="hover:text-white text-[##7A7A7A]"
                to="contact-step1"
              >
                Contact Us
              </Link>
            </nav>
          </div>
          <img
            onClick={toggleSidebar}
            className="block md:hidden w-8 cursor-pointer"
            src={humburger}
            alt="Menu"
          />

          <button
            onClick={() => setModal(!isModal)}
            className="hidden group font-bold cursor-pointer md:flex items-center border border-white lg:px-7 py-3 rounded-md text-white transition-transform duration-300 ease-in-out transform hover:scale-105"
          >
            <span className="text-white">Join Us</span>
            <FaArrowUp className="h-6 ml-2 transition-transform duration-300 ease-in-out transform hover:translate-x-1 hover:scale-110 group-hover:rotate-90 rotate-45" />
          </button>
        </div>
        </div> */
}
