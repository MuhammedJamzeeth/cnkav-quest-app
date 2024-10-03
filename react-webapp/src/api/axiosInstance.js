import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",
    // baseURL: "http://127.0.0.1:8000",
    // baseURL: "https://backend.cnkav.com",
});

axiosInstance.interceptors.request.use(
    (config) => {
        // If you need to add a token for authorization, you can add it here
        // Example: config.headers['Authorization'] = `Bearer ${yourToken}`;

        return config;
    },
    (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle errors globally
        if (error.response) {
            // The request was made and the server responded with a status code
            console.error(
                "Response error:",
                error.response.status,
                error.response.data
            );
        } else if (error.request) {
            // The request was made but no response was received
            console.error("No response received:", error.request);
        } else {
            // Something happened in setting up the request
            console.error("Error setting up request:", error.message);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
