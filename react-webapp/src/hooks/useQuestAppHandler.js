import {useState} from "react";
import {questAppInitState} from "../utils/data.js";
import {isValidUrl} from "../utils/validation.js";
import axios from "axios";
import {useQuery} from "react-query";
import axiosInstance from "../api/axiosInstance.js";

const useQuestAppHandler = (formInput, closeModal) => {
    const [errors, setErrors] = useState(questAppInitState)
    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState("")
    const token = localStorage.getItem("access_token");


    const validateInput = (formInput) => {
        let hasError = false
        setErrors(questAppInitState)
        if (!formInput.title?.trim()) {
            setErrors((prev) => ({...prev, title: "Title is required"}))
            hasError = true
        }
        if (!formInput.details?.trim()) {
            setErrors((prev) => ({...prev, details: "Detail is required"}))
            hasError = true
        }
        if (!formInput.category?.trim()) {
            setErrors((prev) => ({...prev, category: "Category is required"}))
            hasError = true
        }
        if (!formInput.api_key?.trim()) {
            setErrors((prev) => ({...prev, api_key: "API key is required"}))
            hasError = true
        }
        if (!formInput.api_key_secret?.trim()) {
            setErrors((prev) => ({...prev, api_key_secret: "API key secret is required"}))
            hasError = true
        }
        if (!formInput.app_type?.trim()) {
            setErrors((prev) => ({...prev, app_type: "App type is required"}))
            hasError = true
        }
        if (!formInput.app_url?.trim()) {
            setErrors((prev) => ({...prev, app_url: "App url is required"}))
            hasError = true
        } else if (!isValidUrl(formInput.app_url)) {
            setErrors((prev) => ({...prev, app_url: "App url is not valid"}))
        }
        if (!formInput.app_url_redirect?.trim()) {
            setErrors((prev) => ({...prev, app_url_redirect: "App url redirect is required"}))
            hasError = true
        } else if (!isValidUrl(formInput.app_url_redirect)) {
            setErrors((prev) => ({...prev, app_url_redirect: "App url redirect is not valid"}))
            hasError = true
        }
        if (!formInput.quest_style?.trim()) {
            setErrors((prev) => ({...prev, quest_style: "Quest style is required"}))
            hasError = true
        }
        if (!formInput.price) {
            setErrors((prev) => ({...prev, price: "Price is required"}))
            hasError = true
        } else if (isNaN(formInput.price)) {
            setErrors((prev) => ({...prev, price: "Please enter a valid price"}));
            hasError = true;
        }

        if (hasError) {
            throw new Error("Invalid form input")
        }

    }

    const handleAddApp = async (e) => {
        e.preventDefault()
        try {
            setLoading(true);
            validateInput(formInput)
            console.log(formInput)
            const response = await axiosInstance.post(
                "/quest_app/create",
                formInput,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response);
            if (response.status === 201 || response.statusText === "Created") {
                alert("Quest App created successfully");
                closeModal();
            }
        } catch (e) {
            if (e.response && e.response.date) {
                setApiError(e.response.data.message || "Something went wrong, please try again.")
            } else {
                setApiError(e.message || "Something went wrong, please try again.")
            }
            console.log("Error creating questModals", e);
        } finally {
            setLoading(false);
        }
    }

    const getAllQuestApps = async () => {
        const response = await axiosInstance.get("/quest_app/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );

        return response.data;
    };

    const useQuestList = () => {
        return useQuery(
            ["quest-apps"],
            () => getAllQuestApps(),
            {
                keepPreviousData: true,
                staleTime: 5000,
            }
        );
    };
    return {
        errors,
        loading,
        handleAddApp,
        useQuestList
    }
};

export default useQuestAppHandler;