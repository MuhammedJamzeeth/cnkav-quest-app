export const publishQuestState = {
    title: "",
    taskDetails: "",
    durationDays: "",
    category: "",
    rank: "",
    style: "",
    price: "",
    dateAndTime: {
        date: {
            start_date: "",
            end_date: "",
        },
        time_slots: [
            {
                startTime: "",
                endTime: "",
                status: "Pending"
            },
            {
                startTime: "",
                endTime: "",
                status: "Pending"
            }
        ]
    },

}

export const questEdit = {
    title: '',
    task_details: '',
    duration_days: '',
    category: '',
    rank: '',
    style: '',
    price: '',
    date_and_time: [{
        date: {start_date: '', end_date: ''},
        time_slots: [{startTime: '', endTime: '', status: ""}]
    }]
}

export const updateDateAndTimeState = {
    date:
        {
            start_date: "",
            end_date: "",
        },
    time_slots: [
        {
            startTime: "",
            endTime: "",
            status: "Pending"
        }, {
            startTime: "",
            endTime: "",
            status: "Pending"
        }]
}

export const questAppInitState = {
    title: "",
    details: "",
    category: "",
    api_key: "",
    api_key_secret: "",
    app_type: "",
    app_url: "",
    app_url_redirect: "",
    quest_style: "",
    price: "",
    image: ""
}

export const userDetailsState = {
    email: "",
    first_name: "",
    last_name: "",
    new_password: "",
    confirm_password: "",
    image: "",
}