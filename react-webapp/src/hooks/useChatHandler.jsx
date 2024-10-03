import axios from "axios";
import {useQuery} from "react-query";
import axiosInstance from "../api/axiosInstance.js";

const useChatHandler = () => {
    const token = localStorage.getItem("access_token");
    const fetchMessagesBySenderAndReceiver = async (receiverEmail) => {
        const response = await axiosInstance.get(
            `/messages/${receiverEmail}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    };

    const useChatList = (page, pageSize, email) => {
        return useQuery(
            ["messages", page, pageSize, email],
            () => fetchMessagesBySenderAndReceiver(email),
            {
                enabled: !!email, // Run the query only if email is provided
                keepPreviousData: false, // Keep previous data while fetching new data
                onError: (error) => {
                    console.error("Error fetching messages:", error);
                },
            }
        );
    };
    return {
        useChatList,
    };
};

export default useChatHandler;
