import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cnkavLogo, twitterImage, linkedinImage } from "../../images";
import { FaFacebook } from "react-icons/fa";
import PricingModal from "./PricingModal";
import JoinUsModal from "./JoinUsModal";
import LoginModal from "./LoginModal";
import ForgotModal from "./ForgotModal";
import NewsLetterModal from "./NewsLetterModal";
import ContactModal from "./ContactModal";
import ContactModal2 from "./ContactModal2";
import ContactModal3 from "./ContactModal3";
import ContactModal4 from "./ContactModal4";
import ContactModal5 from "./ContactModal5";
import ContactModal6 from "./ContactModal6";
import ContactModal7 from "./ContactModal7";
import ContactModal8 from "./ContactModal8";
import { RxLinkedinLogo } from "react-icons/rx";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";

export default function Footer() {
  const [isCardVisible, setCardVisible] = useState(false);
  const [isModal, setModal] = useState(false);
  const [isNewsLetterModal, setisNewsLetterModal] = useState(false);
  const [isLoginModal, setisLoginModal] = useState(false);
  const [isForgotModal, setisForgotModal] = useState(false);
  const [isContactModal, setisContactModal] = useState(false);
  const [isContactModal2, setisContactModal2] = useState(false);
  const [isContactModal3, setisContactModal3] = useState(false);
  const [isContactModal4, setisContactModal4] = useState(false);
  const [isContactModal5, setisContactModal5] = useState(false);
  const [isContactModal6, setisContactModal6] = useState(false);
  const [isContactModal7, setisContactModal7] = useState(false);
  const [isContactModal8, setisContactModal8] = useState(false);

  const [isShowModal, setIsShowModal] = useState(false);

  const toggleModal = (type) => {
    if (type === "open-login") {
      setisLoginModal(true);
      setModal(false);
    }

    if (type === "open-signup") {
      setisLoginModal(false);
      setModal(true);
    }

    if (type === "open-forgot") {
      setisForgotModal(true);
      setisLoginModal(false);
      setModal(false);
    }

    if (type === "contact-modal") {
      setisContactModal(true);
      setModal(false);
    }
    if (type === "contact-modal2") {
      setisContactModal(false);
      setisContactModal2(true);
      setModal(false);
    }
    if (type === "contact-modal3") {
      setisContactModal2(false);
      setisContactModal3(true);
      setModal(false);
    }
    if (type === "contact-modal4") {
      setisContactModal3(false);
      setisContactModal4(true);
      setModal(false);
    }
    if (type === "contact-modal5") {
      setisContactModal4(false);
      setisContactModal5(true);
      setModal(false);
    }
    if (type === "contact-modal6") {
      setisContactModal5(false);
      setisContactModal6(true);
      setModal(false);
    }
    if (type === "contact-modal7") {
      setisContactModal6(false);
      setisContactModal7(true);
      setModal(false);
    }
    if (type === "contact-modal8") {
      setisContactModal7(false);
      setisContactModal8(true);
      setModal(false);
    }

    // NewsLetter modal //

    if (type === "news-letter") {
      setisNewsLetterModal(true);
      // setisLoginModal(false);
      setModal(false);
    }

    if (type === "closed") {
      setisLoginModal(false);
      setModal(false);
      setisForgotModal(false);
      setisContactModal(false);
      setisContactModal2(false);
      setisContactModal3(false);
      setisContactModal4(false);
      setisContactModal5(false);
      setisContactModal6(false);
      setisContactModal7(false);
      setisContactModal8(false);
      setisNewsLetterModal(false);
    }
  };

  return (
    <footer className="container md:px-10 py-6 px-10 mt-40 xl:mb-4 md:mb-4 lg:mb-4 sm:mb-20  ">
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <img src={cnkavLogo} alt="Logo" className="h-12 md:h-14 md:w-14" />
          <p className="mt-3 text-white opacity-60 text-[16px] font-regular">
            At CNKAV, we envision a world where anyone, regardless of their
            location, can tap into the potential of digital platforms to enrich
            their personal and professional experiences. As we continue to
            innovate, our commitment lies in creating digital landscapes where
            opportunities abound and growth is a shared journey.
          </p>
        </div>
        <div className="gap-4 md:hidden my-5 flex">
          <Link to="https://www.facebook.com" target="_blank">
            <FaYoutube className="h-6 w-6 transition-transform transform hover:scale-110 hover:rotate-6 text-white opacity-65" />
          </Link>
          <Link to="https://www.twitter.com" target="_blank">
            <FaTwitter className="h-6 w-6 transition-transform transform hover:scale-110 hover:rotate-6 text-white opacity-65" />
            {/* <img
              src={twitterImage}
              alt="Twitter"
              className="h-6 w-6 transition-transform transform hover:scale-110 hover:rotate-6"
            /> */}
          </Link>
          <Link to="https://www.linkedin.com" target="_blank">
            <RxLinkedinLogo className="h-6 w-6 transition-transform transform hover:scale-110 hover:rotate-6 text-white opacity-65" />
            {/* <img
              src={linkedinImage}
              alt="LinkedIn"
              className="h-6 w-6 transition-transform transform hover:scale-110 hover:rotate-6"
            /> */}
          </Link>
        </div>
        <div className="flex justify-end-1/3 gap-16 mr-24">
          <div className="">
            <h1 className="text-lg mb-4 font-bold">Product</h1>
            <div className="text-white opacity-65 text-[15px] flex flex-col">
              <Link
                to="/"
                className="hover:text-gray-400 hover:underline my-1"
                onClick={(e) => {
                  e.preventDefault();
                  setTimeout(() => {
                    document
                      .getElementById("subscriptions")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
              >
                Features
              </Link>
              <Link
                className="hover:text-gray-400 hover:underline  my-1"
                to="#/pricing"
                onClick={() => setCardVisible(true)}
              >
                Pricing
              </Link>
              <Link
                to="#/news/letter"
                onClick={() => {
                  toggleModal("news-letter");
                }}
              >
                <button
                  // onClick={() => setNewsLetterModal(!isNewsLetterModal)}
                  className="hover:text-gray-400 hover:underline my-1"
                >
                  <a>Newsletter</a>
                </button>
              </Link>
            </div>
          </div>
          <div>
            <h1 className="text-lg mb-4 font-bold">Company</h1>
            <div className="text-white flex flex-col opacity-65 text-[15px]">
              <Link
                to="aboutus"
                className="hover:text-gray-400 hover:underline my-1"
              >
                About us
              </Link>
              <Link
                to="#/contact-step1"
                // to="contact"
                onClick={() => {
                  toggleModal("contact-modal");
                  // closeSidebar();
                }}
                className="hover:text-gray-400 hover:underline my-1"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-slate-800 w-full p-0 m-0"></div>

      <div className="flex justify-between gap-3 mt-8">
        <div className="flex justify-between gap-8 text-white opacity-65 text-[13px] font-normal">
          © 2024 Cnkav. All right reserved.{" "}
          <Link
            to="/privacy-policy"
            className="hover:text-gray-400 hover:underline text-white text-[13px] font-normal"
          >
            {" "}
            Privacy Policy
          </Link>{" "}
          <Link
            to="/terms-of-services"
            className="hover:text-gray-400 hover:underline text-white text-[13px] font-normal"
          >
            {" "}
            Terms of Service
          </Link>
        </div>
        <div className=" gap-4 md:flex hidden">
          <Link to="https://www.facebook.com" target="_blank">
            <FaYoutube className="h-6 w-6 transition-transform transform hover:scale-110 hover:rotate-6 text-white opacity-65" />
          </Link>
          <Link to="https://www.twitter.com" target="_blank">
            <FaTwitter className="h-6 w-6 transition-transform transform hover:scale-110 hover:rotate-6 text-white opacity-65" />
            {/* <img
              src={twitterImage}
              alt="Twitter"
              className="h-6 w-6 transition-transform transform hover:scale-110 hover:rotate-6"
            /> */}
          </Link>
          <Link to="https://www.linkedin.com" target="_blank">
            <RxLinkedinLogo className="h-6 w-6 transition-transform transform hover:scale-110 hover:rotate-6 text-white opacity-65" />
            {/* <img
              src={linkedinImage}
              alt="LinkedIn"
              className="h-6 w-6 transition-transform transform hover:scale-110 hover:rotate-6"
            /> */}
          </Link>
        </div>
      </div>
      {isModal && (
        <JoinUsModal
          isModal={isModal}
          setModal={setModal}
          toggleModal={toggleModal}
        />
      )}
      <LoginModal
        isModal={isLoginModal}
        setModal={setModal}
        toggleModal={toggleModal}
      />
      <ForgotModal
        isModal={isForgotModal}
        setModal={setModal}
        toggleModal={toggleModal}
      />

      {/* contact modals */}

      <ContactModal isModal={isContactModal} toggleModal={toggleModal} />
      <ContactModal2 isModal={isContactModal2} toggleModal={toggleModal} />
      <ContactModal3 isModal={isContactModal3} toggleModal={toggleModal} />
      <ContactModal4 isModal={isContactModal4} toggleModal={toggleModal} />
      <ContactModal5 isModal={isContactModal5} toggleModal={toggleModal} />
      <ContactModal6 isModal={isContactModal6} toggleModal={toggleModal} />
      <ContactModal7 isModal={isContactModal7} toggleModal={toggleModal} />
      <ContactModal8 isModal={isContactModal8} toggleModal={toggleModal} />

      {/* contact modals */}

      {isCardVisible && <PricingModal setCardVisible={setCardVisible} />}

      <NewsLetterModal isModal={isNewsLetterModal} toggleModal={toggleModal} />
    </footer>
  );
}
