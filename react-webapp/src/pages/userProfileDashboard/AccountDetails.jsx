import React, {useEffect, useState} from "react";
import {FaChevronLeft} from "react-icons/fa6";
import {Link} from "react-router-dom";
import useUserHandler from "../../hooks/useUserHandler.jsx";
import axios from "axios";
import axiosInstance from "../../api/axiosInstance.js";
import NotificationAlert from "../../components/ui/Notification.jsx";

const AccountDetails = () => {
    const [userImage, setUserImage] = useState(null);
    const {success, errors, getUserById, userDetails, setUserDetails, updateUserDetails} = useUserHandler()
    const user = JSON.parse(localStorage.getItem("user"));
    const [uploadStatus, setUploadStatus] = useState(''); // 'success', 'error', or ''


    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setUserImage(URL.createObjectURL(file)); // Set local preview
            // Upload file
            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await axiosInstance.post("/user/upload-profile-image", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                setUploadStatus('success');
                if (response.data.image_url) {
                    setUserDetails((prev) => ({...prev, image: response.data.image_url}))
                }
                console.log("Upload Success:", response.data);
            } catch (err) {
                setUploadStatus('error');
                console.error("Upload Error:", err);
            }
        }
    };

    useEffect(() => {
        if (user.id) {
            getUserById(user.id);

        }
        console.log(userDetails)

    }, []);

    const handleInputChange = (e) => {
        const {value, name} = e.target
        setUserDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('clicked')
        if (user.id) {
            updateUserDetails(user.id, userDetails).then(() => {
                getUserById(user.id).then((res) => {
                    console.log(res)
                })
            })
        }

    };

    return (
        <div className="container mx-auto pt-8">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold mb-6 mt-40">
                    Account Details
                </h1>
                <section className="bg-black md:w-3/6 w-full  shadow-md rounded-lg py-6">
                    <Link to="/dashboard/profile">
                        <button
                            className={`flex gap-4 items-center px-2 py-2 rounded-lg font-semibold text-sm text-white text-[24px]`}>
                            <FaChevronLeft/>
                        </button>
                    </Link>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">
                                First Name
                            </label>
                            <input
                                type="text"
                                value={userDetails.first_name}
                                name="first_name"
                                onChange={handleInputChange}
                                className="w-full text-black p-3 border-2 border-gray-300 rounded-lg"
                                placeholder="John"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">
                                Last Name
                            </label>
                            <input
                                type="text"
                                value={userDetails.last_name}
                                name="last_name"
                                onChange={handleInputChange}
                                className="w-full text-black p-3 border-2 border-gray-300 rounded-lg"
                                placeholder="Doe"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Email {errors.email &&
                                <span className="text-red-500 text-xs font-normal"> *{errors.email}</span>}</label>
                            <input
                                type="email"
                                value={userDetails.email}
                                name="email"
                                onChange={handleInputChange}
                                className="w-full text-black p-3 border-2 border-gray-300 rounded-lg"
                                placeholder="john.doe@example.com"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Password
                                {errors.new_password &&
                                    <span
                                        className="text-red-500 text-xs font-normal"> *{errors.new_password}</span>}</label>
                            <input
                                type="password"
                                value={userDetails.new_password}
                                name="new_password"
                                onChange={handleInputChange}
                                className="w-full text-black p-3 border-2 border-gray-300 rounded-lg"
                                placeholder="********"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">
                                Confirm Password
                                {errors.confirm_password &&
                                    <span
                                        className="text-red-500 text-xs font-normal">*{errors.confirm_password}</span>}
                            </label>
                            <input
                                type="password"
                                value={userDetails.confirm_password}
                                name="confirm_password"
                                onChange={handleInputChange}
                                className="w-full text-black p-3 border-2 border-gray-300 rounded-lg"
                                placeholder="********"
                                required
                            />
                        </div>

                        <label className="block text-sm font-medium mb-2 w-1/4">
                            Profile Image {uploadStatus && (
                            <span className={`${uploadStatus === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                               *{uploadStatus === 'success' ? 'Uploaded' : `Error: ${uploadStatus}`}
                            </span>
                        )}
                        </label>
                        <div className="mb-4 flex items-center">

                            <input
                                type="file"
                                accept="image/jpeg, image/png, image/jpg"
                                onChange={handleImageChange}
                                className="w-full p-2 border-2 border-gray-300 rounded-lg"
                            />
                            {userImage && (
                                <img
                                    src={userImage}
                                    alt="User"
                                    className="w-12 h-12 object-cover rounded-full ml-4 border-2 border-gray-300"
                                />
                            )}
                        </div>
                    </form>
                </section>
                <div className="pt-6 flex justify-center items-center w-full md:w-[75%] ">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="rounded-3xl w-full md:w-2/3 bg-black text-white py-3 px-4 font-bold"
                        style={{
                            border: "2px solid transparent",
                            borderImage: "linear-gradient(120deg, red, yellow)",
                            borderImageSlice: 1,
                        }}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccountDetails;
