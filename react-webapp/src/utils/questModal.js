import {useCallback} from "react";

export const handleAdd = useCallback((e) => {
    e.preventDefault();

    setFormData((prev) => ({
        ...prev,
        available_time_list: [
            ...prev.available_time_list,
            {startTime: "", endTime: ""},
        ],
    }));
}, []);