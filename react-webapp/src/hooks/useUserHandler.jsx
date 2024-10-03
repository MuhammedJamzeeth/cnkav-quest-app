import axiosInstance from "../api/axiosInstance.js";
import {useState} from "react";
import {userDetailsState} from "../utils/data.js";
import {useNavigate} from "react-router-dom";

const useUserHandler = () => {
    const [userDetails, setUserDetails] = useState(userDetailsState)
    const [errors, setErrors] = useState(userDetailsState)
    const [success, setSuccess] = useState("")
    const navigate = useNavigate()
    const getAllUsers = async () => {
        try {
            const response = await axiosInstance.get("/user");
            if (response.status === 200 || response.statusText === "OK") {
                return response.data;
            }
        } catch (e) {
            console.log(e);
        }
    };

    const getUserById = async (email) => {
        try {
            const response = await axiosInstance.get(`/user/${email}`)
            console.log(response)
            if (response.status === 200) {
                setUserDetails(response.data)
            }
        } catch (e) {
            console.error("Error getting user by email", e);
        }
    }

    const updateUserDetails = async (email, user_details = userDetailsState) => {
        let hasError = false
        console.log(user_details)
        setErrors(userDetailsState)
        setSuccess("")
        // Email Validation
        if (!user_details.email) {
            setErrors((prev) => ({
                ...prev,
                email: "Email is required",
            }));
            hasError = true;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user_details.email)) {
            setErrors((prev) => ({
                ...prev,
                email: "Invalid email format",
            }));
            hasError = true;
        }

        // Password Validation
        if (user_details.new_password || user_details.confirm_password) {
            if (!user_details.new_password) {
                setErrors((prev) => ({
                    ...prev,
                    new_password: "New password is required",
                }));
                hasError = true;
            } else if (user_details.new_password.length < 8) {
                setErrors((prev) => ({
                    ...prev,
                    new_password: "Password must be at least 8 characters",
                }));
                hasError = true;
            } else if (user_details.new_password !== user_details.confirm_password) {
                setErrors((prev) => ({
                    ...prev,
                    confirm_password: "Passwords do not match",
                }));
                hasError = true;
            }
        }

        // If any validation errors exist, stop the update process
        if (hasError) {
            return;
        }
        console.log("hl")

        try {
            const response = await axiosInstance.put(`/user/${email}`, user_details)
            console.log(response)
            if (response.status === 200) {
                if (response.data.user) {
                    localStorage.setItem("user", JSON.stringify(response.data.user))
                }
                setSuccess("Successfully updated")
                alert("Successfully updated")
                navigate("/dashboard/profile")
            }
        } catch (e) {
            console.error("Error updating user details", e);
        }
    }
    return {
        errors,
        getAllUsers,
        getUserById,
        userDetails,
        setUserDetails,
        updateUserDetails,
        success
    };
};

export default useUserHandler;
