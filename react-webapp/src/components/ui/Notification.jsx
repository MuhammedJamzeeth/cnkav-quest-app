import React, {useEffect, useState} from 'react';
import {FaCheckCircle, FaExclamationTriangle, FaTimesCircle} from "react-icons/fa";

const NotificationAlert = ({
                               type, message = "", duration = 3000, setErrorResponse = () => {
    }
                           }) => {
    let icon, bgColor;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false); // Hide the notification after the duration
                if (setErrorResponse) {
                    setTimeout(setErrorResponse, 500); // Allow time for the animation to finish before resetting
                }
            }, duration);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [duration, message, setErrorResponse]);

    const notificationClasses = visible
        ? "translate-x-0 opacity-100"
        : "translate-x-full opacity-0"; // Transition to hidden state

    switch (type) {
        case "success":
            icon = <FaCheckCircle className="text-green-600"/>;
            bgColor = "bg-green-100 border-none";
            break;
        case "warning":
            icon = <FaExclamationTriangle className="text-yellow-600"/>;
            bgColor = "bg-orange-500 border-none";
            break;
        case "error":
            icon = <FaTimesCircle className="text-red-700"/>;
            bgColor = "bg-red-500 border-none";
            break;
        default:
            bgColor = "bg-gray-100 border-gray-500";
    }

    return (
        <div
            className={`fixed flex top-4 right-4 items-center p-4 rounded-md shadow-md border ${bgColor} w-96 z-50 transition-all duration-500 ease-in-out ${notificationClasses}`}>
            <div className="text-2xl mr-3">{icon}</div>
            <div className="text-md font-medium">{message}</div>
        </div>
    );
};

export default NotificationAlert;
