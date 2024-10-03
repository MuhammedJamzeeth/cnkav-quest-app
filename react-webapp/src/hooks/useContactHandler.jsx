import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";


const InitialContactInformation = {
    email: "",
    fullName: "",
    gender: "",
    maritalStatus: "",
    employed: ""
}

const ErrorInitial = {
    email: "",
    fullName: "",
    gender: "",
    maritalStatus: "",
    employed: ""
}

const useContactHandler = () => {
    const [formInputAll, setFormInputAll] = useState(InitialContactInformation);
    const navigate = useNavigate();
    const [error, setError] = useState(ErrorInitial)

    const setInput = (newState) => {
        setFormInputAll((prevState) => ({...prevState, ...newState}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const {email, fullName} = formInputAll;
        if (!email.trim()) setError((prev) => ({...prev, email: "Email is required"}))
        if (!fullName.trim()) setError((prev) => ({...prev, fullName: "Full name is required"}))

        const hasErrors = Object.values(error).some(errorMessage => errorMessage !== "");
        if (hasErrors) {
            return; // Prevent form submission
        }

        setInput(fromInput)
        console.log(formInputAll)
        // navigate("/contact-step2");
    }

    return {
        error,
        handleSubmit
    }
}
export default handleSubmitQ1;