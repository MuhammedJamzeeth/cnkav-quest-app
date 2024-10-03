import React, {useState} from 'react';
import axiosInstance from "../api/axiosInstance.js";

const useZoomHandler = () => {
    const [signature, setSignature] = useState("");

    // Fetch the signature from your FastAPI backend
    const fetchSignature = async () => {
        try {
            const response = await axiosInstance.post("http://localhost:8000/generate_signature/", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({meeting_number: "YOUR_MEETING_ID", role: 0}), // Role: 0 for participant, 1 for host
            });
            const data = await JSON.parse(response.data);
            setSignature(data.signature);
        } catch (error) {
            console.error("Error fetching signature:", error);
        }
    };

    return {
        signature,
        fetchSignature
    }
};

export default useZoomHandler;