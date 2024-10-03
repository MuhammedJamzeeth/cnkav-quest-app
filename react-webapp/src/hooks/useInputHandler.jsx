import {useState} from 'react';

const useInputHandler = (initialState) => {
    const [formInput, setFormInput] = useState(initialState)
    const handleChange = (e) => {
        setFormInput({...formInput, [e.target.name]: e.target.value})
    }
    return {
        formInput,
        handleChange
    }
};

export default useInputHandler;