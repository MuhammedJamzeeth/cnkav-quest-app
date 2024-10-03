import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from "flowbite-react";
import api from "../../lib/api";
import { useQuery } from "react-query";

export default function Component({ isModal, toggleModal, refetch }) {
  const navigate = useNavigate();
  const location = useLocation();
  const event_type_link = location.state;
  const eventId = event_type_link?._id;
  console.log(eventId);
  const userToken = JSON.parse(localStorage.getItem("user"));
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [isAddLoading, setIsAddLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_datetime: "",
    end_datetime: "",
    location: "",
    event_code: "",
    ticket_quantity: "",
    price: "",
    ticket_photo: "",
    event_type: event_type_link?.event_type,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        ticket_photo: reader.result, // base64 encoded string
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    setIsAddLoading(true);
    const data = {
      title: formData.title,
      description: formData.description,
      start_datetime: formData.start_datetime,
      end_datetime: formData.end_datetime,
      location: formData.location,
      event_code: formData.event_code,
      ticket_quantity: parseInt(formData.ticket_quantity, 10),
      price: formData.price,
      ticket_photo: formData.ticket_photo,
      event_type: event_type_link?.event_type,
      createdBy: userToken?.sub,
    };

    try {
      const resp = await api.post("/event/create", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      refetch();
      toggleModal("closed");
      navigate("/dashboard/Events");
      console.log(resp);
      setIsAddLoading(false);
    } catch (error) {
      setIsAddLoading(false);

      console.error("Error submitting form:", error);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsEditLoading(true);
    const token = localStorage.getItem("access_token");

    const data = {
      title: formData.title,
      description: formData.description,
      start_datetime: formData.start_datetime,
      end_datetime: formData.end_datetime,
      location: formData.location,
      event_code: formData.event_code,
      ticket_quantity: parseInt(formData.ticket_quantity, 10),
      price: formData.price,
      ticket_photo: formData.ticket_photo,
      event_type: formData?.event_type,
      createdBy: formData?.createdBy,
    };

    try {
      const resp = await api.put(`/event/update/${eventId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      refetch();
      navigate("/dashboard/Events");
      setIsEditLoading(false);
      toggleModal("closed");
    } catch (error) {
      setIsEditLoading(false);

      console.error("Error submitting form:", error);
    }
  };
  useEffect(() => {
    if (eventId) {
      const fetchEventData = async () => {
        try {
          const response = await api.get(`/event/read/${eventId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          });
          const eventData = response.data;
          setFormData({
            title: eventData.title,
            description: eventData.description,
            start_datetime: eventData.start_datetime,
            end_datetime: eventData.end_datetime,
            location: eventData.location,
            event_code: eventData.event_code,
            ticket_quantity: eventData.ticket_quantity,
            price: eventData.price,
            ticket_photo: eventData.ticket_photo,
            event_type: eventData.event_type,
            createdBy: eventData.createdBy,
          });
          console.log(response);
        } catch (error) {
          console.error("Error fetching event data:", error);
        }
      };
      fetchEventData();
    } else if (!eventId) {
      setFormData({
        title: "",
        description: "",
        start_datetime: "",
        end_datetime: "",
        location: "",
        event_code: "",
        ticket_quantity: "",
        price: "",
        ticket_photo: "",
        event_type: "",
      });
    }
  }, [eventId]);
  return (
    <div className="w-full h-full flex justify-center items-center text-center">
      <Modal show={isModal} onClose={() => toggleModal("closed")}>
        <div className="bg-black flex flex-col justify-end items-end px-4 md:px-12">
          <button
            onClick={() => toggleModal("closed")}
            className="text-white text-2xl font-bold mt-4"
          >
            &times;
          </button>
        </div>
        <div className="bg-black flex flex-col items-center justify-center pb-8">
          <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="w-full max-w-lg mt-16">
              <form
                className="space-y-4 flex flex-col justify-center items-center px-2"
                onSubmit={eventId ? handleUpdate : handleSubmit}
              >
                <div className="relative w-full">
                  <label>Give Your Event Brief A Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="bg-white border border-gray-700 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 pr-10"
                    placeholder="Event Title"
                  />
                </div>
                <div className="relative w-full">
                  <label>Event Description</label>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="bg-white border border-gray-700 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 pr-10"
                    placeholder="Event Description"
                  />
                </div>
                <div className="relative w-full">
                  <label>Start Date and Time</label>
                  <input
                    type="datetime-local"
                    name="start_datetime"
                    value={formData.start_datetime}
                    onChange={handleChange}
                    className="bg-white border border-gray-700 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 pr-10"
                  />
                </div>
                <div className="relative w-full">
                  <label>End Date and Time</label>
                  <input
                    type="datetime-local"
                    name="end_datetime"
                    value={formData.end_datetime}
                    onChange={handleChange}
                    className="bg-white border border-gray-700 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 pr-10"
                  />
                </div>
                <div className="relative w-full">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="bg-white border border-gray-700 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 pr-10"
                    placeholder="Enter Location"
                  />
                </div>
                <div className="relative w-full">
                  <label>Event Code/Password</label>
                  <input
                    type="text"
                    name="event_code"
                    value={formData.event_code}
                    onChange={handleChange}
                    className="bg-white border border-gray-700 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 pr-10"
                    placeholder="Optional Event Code"
                  />
                </div>
                <div className="relative w-full">
                  <label>Price</label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="bg-white border border-gray-700 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 pr-10"
                    placeholder="Price"
                  />
                </div>
                <div className="relative w-full">
                  <label>Quantity</label>
                  <input
                    type="text"
                    name="ticket_quantity"
                    value={formData.ticket_quantity}
                    onChange={handleChange}
                    className="bg-white border border-gray-700 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 pr-10"
                    placeholder="Ticket Quantity"
                  />
                </div>
                <div className="relative w-full">
                  <label>Ticket Image</label>
                  <input
                    type="file"
                    name="ticket_photo"
                    onChange={handleFileChange}
                    className="bg-white border border-gray-700 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 pr-10"
                    accept="image/*"
                  />
                </div>

                <div className="flex justify-center ">
                  <button
                    type="submit"
                    className="rounded-3xl w-full text-white py-3 px-4 font-bold mt-8"
                    style={{
                      border: "2px solid transparent",
                      borderImage: "linear-gradient(120deg, red, yellow)",
                      borderImageSlice: 1,
                    }}
                  >
                    {isEditLoading || isAddLoading ? "Loading..." : "Confirm"}
                  </button>
                </div>
              </form>
              <p className="pt-4 text-[12px] flex justify-center items-center text-center">
                By signing up, you agree to Cnkav <br />
                Terms and Conditions.
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
