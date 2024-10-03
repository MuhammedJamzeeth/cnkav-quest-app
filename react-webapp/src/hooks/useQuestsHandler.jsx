import {useCallback, useState} from "react";
import axios from "axios";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {publishQuestState, updateDateAndTimeState} from "../utils/data.js";
import axiosInstance from "../api/axiosInstance.js";

export const ErrorState = {
    title: "",
    taskDetails: "",
    durationDays: "",
    category: "",
    rank: "",
    style: "",
    price: "",
    bookAvailabilityDate: "",
    bookAvailabilityTime: "",
    isConfirmed: "",
};

const useQuestsHandler = (formInput, setFormData, closeModal) => {
    const [errors, setErrors] = useState(ErrorState);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("access_token");
    const queryClient = useQueryClient();

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        console.log(formInput)
        setErrors(ErrorState);
        const newError = {...ErrorState};

        if (!formInput.title.trim()) newError.title = "Title is required";
        if (!formInput.taskDetails.trim())
            newError.taskDetails = "Task details are required";
        if (!formInput.durationDays.trim()) {
            newError.durationDays = "Duration days are required";
        } else if (!/^\d+$/.test(formInput.durationDays)) {
            newError.durationDays = "Duration days must be a whole number";
        }
        if (!formInput.category.trim()) newError.category = "Category is required";
        if (!formInput.rank.trim()) newError.rank = "Rank is required";
        if (!formInput.style.trim()) newError.style = "Style is required";
        if (!formInput.price.trim()) {
            newError.price = "Price is required";
        } else if (isNaN(formInput.price)) {
            newError.price = "Price must be a number";
        }
        if (!formInput.dateAndTime.date.start_date.trim() || !formInput.dateAndTime.date.end_date.trim()) {
            newError.bookAvailabilityDate = "Date is required";
        }
        if (!formInput.dateAndTime.time_slots[0].startTime.trim() || !formInput.dateAndTime.time_slots[0].endTime.trim()) {
            newError.bookAvailabilityTime = "Time is required";
        }

        setErrors(newError);

        // Check if there are any errors
        const hasErrors = Object.values(newError).some(
            (errorMessage) => errorMessage !== ""
        );

        if (hasErrors) {
            return; // Prevent form submission
        }

        const setData = {
            title: formInput.title,
            task_details: formInput.taskDetails,
            duration_days: formInput.durationDays,
            category: formInput.category,
            rank: formInput.rank,
            style: formInput.style,
            price: formInput.price,
            date_and_time: [
                formInput.dateAndTime
            ],
        };
        console.log(setData);
        try {
            setLoading(true);
            const response = await axiosInstance.post(
                "/quest/create",
                setData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response);
            if (response.status === 201 || response.statusText === "Created") {
                alert("Quest created successfully");
                setFormData(publishQuestState);
                closeModal();
            }
        } catch (e) {
            console.log("Error creating questModals", e);
        } finally {
            setLoading(false);
        }
    }, [formInput, token, setFormData, closeModal]);

    const fetchQuestList = async (page = 1, pageSize = 2) => {
        const response = await axiosInstance.get(
            `/quest/all?page=${page}&page_size=${pageSize}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    };

    const useQuestList = (page, pageSize) => {
        return useQuery(
            ["quests", page, pageSize],
            () => fetchQuestList(page, pageSize),
            {
                keepPreviousData: true,
                staleTime: 5000,
            }
        );
    };

    const fetchQuestDetails = async (id) => {
        try {
            const response = await axiosInstance.get(`/quest/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                console.log(response.data);
                return response.data;
            }
        } catch (e) {
            console.log(e);
        }
    };

    const updateQuestStatus = async (id, status, userEmail, closeModal) => {
        console.log(id);
        try {
            const result = await axiosInstance.put(
                `/quest/update/${id}?status=${status}&userEmail=${userEmail}`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (result.status === 200) {
                alert("Quest updated successfully");
                closeModal();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteQuestHandler = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this questModals?"
        );
        if (confirmed) {
            try {
                const result = await axiosInstance.delete(
                    `/quest/delete/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (result.status === 200) {
                    alert("Quest deleted successfully");
                    await queryClient.invalidateQueries('quests');
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const deleteMutation = useMutation(deleteQuestHandler, {
        onMutate: async (deletedItemId) => {
            // Cancel any outgoing re-fetches to avoid conflicts with the optimistic update
            await queryClient.cancelQueries('quests');

            // Get the current items from the cache before mutation
            const previousItems = queryClient.getQueryData('quests');

            // Optimistically update the cache to include the new quest
            queryClient.setQueryData('quests', (oldData = []) => {
                return oldData.filter(item => item._id !== deletedItemId);
            });


            // Return the context containing the previous data in case of rollback
            return {previousItems};
        },
        onError: (err, deletedItemId, context) => {
            // Rollback to the previous items if mutation fails
            queryClient.setQueryData('quests', context.previousItems);
        },
        onSettled: () => {
            // Re-fetch items after the mutation is completed
            queryClient.invalidateQueries('quests');
        },
    })


    const updateQuestDetails = async (id, formData, closeModal) => {
        setErrors(ErrorState);
        const newError = {...ErrorState};

        console.log(formData);

        if (!formData.title.trim()) newError.title = "Title is required";
        if (!formData.task_details.trim())
            newError.taskDetails = "Task details are required";
        if (!formData.duration_days.trim()) {
            newError.durationDays = "Duration days are required";
        } else if (!/^\d+$/.test(formData.duration_days)) {
            newError.durationDays = "Duration days must be a whole number";
        }
        if (!formData.category.trim()) newError.category = "Category is required";
        if (!formData.rank.trim()) newError.rank = "Rank is required";
        if (!formData.style.trim()) newError.style = "Style is required";
        if (!formData.price) {
            newError.price = "Price is required";
        } else if (isNaN(formData.price)) {
            newError.price = "Price must be a number";
        }
        if (!formData.date_and_time?.[0].date.start_date.trim() || !formData.date_and_time?.[0].date.end_date.trim()) {
            newError.bookAvailabilityDate = "Date is required";
        }
        if (!formData.date_and_time?.[0].time_slots?.[0].startTime.trim() || !formData.date_and_time?.[0].time_slots?.[0].endTime.trim()) {
            newError.bookAvailabilityTime = "Time is required";
        }
        setErrors(newError);
        // Check if there are any errors
        const hasErrors = Object.values(newError).some(
            (errorMessage) => errorMessage !== ""
        );

        if (hasErrors) {
            console.log(errors);
            return; // Prevent form submission
        }
        console.log(formData);

        try {
            const response = await axiosInstance.put(
                `/quest/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                alert("Quest updated successfully");
                closeModal();
            }
        } catch (error) {
            console.error("Quest update error", error);
        }
    };

    const confirmQuest = async (id, time, closeModal) => {
        console.log(id)
        try {
            const response = await axiosInstance.put(
                `/quest/confirm/${id}?time=${time}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                alert("Meeting Confirmed successfully");
                closeModal();
            }
        } catch (error) {
            if (error.response.status === 409) {
                setErrors((prev) => ({...prev, isConfirmed: "Meeting already confirmed"}))
            }
            console.error("Meeting confirmed error", error);
        }
    }

    const updateDateAndTime = async (id, index, date_time = updateDateAndTimeState, closeModal) => {
        console.log(id, index, date_time)
        setErrors(ErrorState);
        const newError = {...ErrorState};
        let hasError = false;
        if (index === "" || index === undefined) {
            newError.bookAvailabilityDate = "Select time";
            hasError = true;
        }

        date_time.time_slots.forEach((time_slot) => {
            time_slot.status = "Confirmed";
        })

        // Safely check if time_slots[0], startTime, and endTime exist before calling .trim()
        // if (!date_time?.time_slots?.[0]?.startTime?.trim() || !date_time?.time_slots?.[0]?.endTime?.trim()) {
        //     newError.bookAvailabilityTime = "Time is required";
        //     hasError = true;
        // }
        if (hasError) {
            setErrors(newError)
            console.log(newError)
            throw new Error("Invalid information")
        }

        try {
            const response = await axiosInstance.put(
                `/quest/book/${id}?index=${index}`,
                date_time
                ,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                alert("Date and Time updated successfully");
                closeModal();
            }
        } catch (error) {
            console.error("Date and Time update error", error);
        }
    }
    return {
        handleSubmit,
        errors,
        setErrors,
        loading,
        useQuestList,
        fetchQuestDetails,
        updateQuestDetails,
        updateQuestStatus,
        deleteQuestHandler,
        confirmQuest,
        deleteMutation,
        updateDateAndTime
    };
};

export default useQuestsHandler;
