import React from 'react';
import { Link } from 'react-router-dom';
import {
    googleLogo,
    facebookLogo,
    appleLogo,
    cnkavLogo,
    signupbg,
} from '../../images';
import { helloHand } from '../../images';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'flowbite-react';

export default function Component({ isModal, toggleModal }) {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/contactus/step7");
    };

    return (
        <div className='w-full h-full flex justify-center items-center text-center'>
            <Modal show={isModal} onClose={() => toggleModal('closed')}>
                <div className=" bg-black flex flex-col justify-end items-end px-4 md:px-12">

                    <button
                        onClick={() => toggleModal('closed')}
                        className="text-white text-2xl font-bold mt-4"
                    >
                        &times;
                    </button>
                </div>
                <div className=" bg-black flex flex-col items-center justify-center py-4 pb-8">

                    <div>
                        <img src={cnkavLogo} alt="cnkav logo" className="h-36 img-fluid" />
                    </div>
                    <div className="bg-black text-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label
                                    htmlFor="location"
                                    className="block text-sm font-medium mb-2"
                                >
                                    Hardest part of using such an product ?
                                </label>
                                <input
                                    type="text"
                                    id="location"
                                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
                                    placeholder="Enter Text"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="religion"
                                    className="block text-sm font-medium mb-2"
                                >
                                    Last time you encountered the issue regarding mentioned products in the survey?
                                </label>
                                <input
                                    type="text"
                                    id="religion"
                                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
                                    placeholder="Enter Text"
                                />
                            </div>
                            <div className="pt-6">
                                <Link
                                    to="#/contactus/step7"
                                    // to="contact"
                                    onClick={() => {
                                        toggleModal('contactQ-modal7');
                                        // closeSidebar();
                                    }}
                                >
                                    <button
                                        type="submit"
                                        className="rounded-3xl w-full bg-black text-white py-3 px-4 font-bold"
                                        style={{
                                            border: "2px solid transparent",
                                            borderImage: "linear-gradient(120deg, red, yellow)",
                                            borderImageSlice: 1,
                                        }}
                                    >
                                        Confirm
                                    </button>
                                </Link>
                            </div>
                        </form>
                        <p className="mt-6 text-center text-sm text-white">
                            By signing up, you agree to Cnkav <br />
                            <a href="/terms-of-services" className="text-white underline">
                                Terms and Conditions
                            </a>
                            .
                        </p>
                    </div>
                </div>

            </Modal>
        </div>
    );
}
