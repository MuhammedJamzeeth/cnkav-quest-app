import React, {useState} from "react";
import {Button, Modal} from "flowbite-react";
import {Link, useNavigate} from "react-router-dom";
import QuestStatus from "./questsManipulations/QuestsStatus";
import QuestUser from "./questsManipulations/QuestUser";

const QuestStatusModal = ({quest, isModal, toggleModal, handleSubmit}) => {
    const [status, setStatus] = useState("");
    const [user, setUser] = useState();
    const [errors, setErrors] = useState({
        status: "",
        user: "",
    })

    if (!isModal) return null;

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(status)
        setErrors({
            status: "",
            user: "",
        })
        console.log(errors)
        if (!status) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                status: "Please select a status"
            }));
            return; // Return early to stop further execution
        }
        if (!user) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                user: "Please select a user"
            }));
            return; // Return early to stop further execution
        }

        handleSubmit(quest._id, status, user, () => toggleModal("closed"));

    };
    return (
        <div className=" w-full h-full flex">
            <Modal show={isModal} onClose={() => toggleModal("closed")}>
                <div className=" bg-black flex flex-col px-4 md:px-12 ">
                    <button
                        onClick={() => toggleModal("closed")}
                        className=" text-white flex justify-end pt-4 text-2xl hover:text-gray-400"
                    >
                        &times;
                    </button>
                    <h2 className="text-xl font-bold mb-4 mt-20">Update Quest Status</h2>
                    <form className="" onSubmit={onSubmit}>
                        {errors.status && <span className="text-red-500 text-sm font-normal">{errors.status}</span>}
                        <QuestStatus
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        />
                        <div className="pt-6">
                            {errors.user && <span className="text-red-500 text-sm font-normal">{errors.user}</span>}
                            <QuestUser
                                name="user_name"
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                                user={quest.confirm_quest}
                            />
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                className="rounded-3xl w-full  text-white py-3 px-4 font-bold"
                                style={{
                                    border: "2px solid transparent",
                                    borderImage: "linear-gradient(120deg, red, yellow)",
                                    borderImageSlice: 1,
                                }}
                            >
                                Confirm
                            </button>
                        </div>
                    </form>
                    <p className="mt-6 text-center text-sm text-white">
                        By signing up, you agree to Cnkav <br/>
                        <a href="/terms-of-services" className="text-white underline">
                            Terms and Conditions
                        </a>
                        .
                    </p>
                </div>
            </Modal>
        </div>
    );
};

export default QuestStatusModal;
