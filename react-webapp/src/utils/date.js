export const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0];
};

export const formatTime = (timeStr) => {
    if (!timeStr) return "";
    // const date = new Date(`1970-01-01T${timeStr}:00Z`);
    return timeStr;
};
