import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {cnkavLogo} from '../../images';
import {Modal} from 'flowbite-react';

export default function Component({isModal, toggleModal}) {
    const navigate = useNavigate();
    const location = useLocation();

    // State for error messages
    const [hardestPartError, setHardestPartError] = useState("");
    const [lastEncounterError, setLastEncounterError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        let isValid = true;
        setHardestPartError("");
        setLastEncounterError("");

        const hardestPart = e.target.hardestPart.value;
        const lastEncounter = e.target.lastEncounter.value;

        if (!hardestPart) {
            setHardestPartError("Please enter the hardest part of using the product.");
            isValid = false;
        }

        if (!lastEncounter) {
            setLastEncounterError("Please enter the last time you encountered the issue.");
            isValid = false;
        }

        if (isValid) {
            const formData = {
                ...location.state,
                hardestPart,
                lastEncounter,
            };

            navigate("#/contact-step7", {state: formData});
            toggleModal("contact-modal7");
        }
    };

    return (
        <div className='w-full h-full flex justify-center items-center text-center'>
            <Modal show={isModal} onClose={() => toggleModal('closed')}>
                <div className="bg-black flex flex-col justify-end items-end px-4 md:px-12">
                    <button onClick={() => toggleModal('closed')}
                            className="text-white text-2xl font-bold mt-4">&times;</button>
                </div>
                <div className="bg-black flex flex-col items-center justify-center py-4 pb-8">
                    <img src={cnkavLogo} alt="cnkav logo" className="h-36 img-fluid"/>
                    <div className="bg-black text-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="hardestPart" className="block text-sm font-medium mb-2">Hardest part of
                                    using such a product? {hardestPartError && (
                                        <span className="text-red-500 text-sm"> *{hardestPartError}</span>
                                    )}</label>
                                <input
                                    type="text"
                                    id="hardestPart"
                                    name="hardestPart"
                                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
                                    placeholder="Enter Text"
                                />

                            </div>
                            <div>
                                <label htmlFor="lastEncounter" className="block text-sm font-medium mb-2">Last time you
                                    encountered the issue regarding mentioned products in the
                                    survey? {lastEncounterError && (
                                        <span className="text-red-500 text-sm"> *{lastEncounterError}</span>
                                    )}</label>
                                <input
                                    type="text"
                                    id="lastEncounter"
                                    name="lastEncounter"
                                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
                                    placeholder="Enter Text"
                                />

                            </div>
                            <div className="pt-6">
                                <button
                                    type="submit"
                                    className="rounded-3xl w-full bg-black text-white py-3 px-4 font-bold"
                                    style={{
                                        border: "2px solid transparent",
                                        borderImage: "linear-gradient(120deg, red, yellow)",
                                        borderImageSlice: 1,
                                    }}>
                                    Confirm
                                </button>
                            </div>
                        </form>
                        <p className="mt-6 text-center text-sm text-white">
                            By signing up, you agree to Cnkav <br/>
                            <a href="/terms-of-services" className="text-white underline">Terms and Conditions</a>.
                        </p>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
