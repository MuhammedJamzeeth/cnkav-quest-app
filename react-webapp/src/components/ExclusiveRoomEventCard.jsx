import React, { useState } from "react";
import dayjs from "dayjs";
import api from "../lib/api";
import {
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";

const EventCard = ({ event, onClick, refetch }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const userToken = JSON.parse(localStorage.getItem("user"));
  const [isBuyingLoading, setIsBuyingLoading] = useState(false);
  const openMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleBuyTicket = async () => {
    try {
      setIsBuyingLoading(true);
      const token = localStorage.getItem("access_token");
      const response = await api.post(
        `/ticket/create-checkout-session`,
        {
          user_id: userToken.id,
          price: event.price,
          name: event.title,
          email: userToken.sub,
          event_id: event._id,
          customer_id: userToken.connected_account_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Change to JSON
          },
        }
      );
      setIsBuyingLoading(false);
      if (response.data.status) {
        window.open(response.data.hosted_url, "_blank");
      } else if (response.data.redirect_url) {
        window.open(response.data.redirect_url, "_blank");
      }
    } catch (error) {
      setIsBuyingLoading(false);
      alert("Error during ticket purchase");
    }
  };

  const handleEdit = () => {
    console.log("Edit event:", event.title);
    handleCloseMenu();
  };

  const handleDeleteRequest = () => {
    setOpenDialog(true);
    handleCloseMenu();
  };

  const handleConfirmDelete = async () => {
    const token = localStorage.getItem("access_token");

    try {
      await api.delete(`/event/delete/${event._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      setOpenDialog(false);
      refetch();
    } catch (error) {
      console.error("Error deleting event", error);
      setOpenDialog(false);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <div className="max-w-sm w-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img className="rounded-t-lg" src={event.ticket_photo} alt="" />
        </a>
        <div className="p-3 relative">
          <a href="#">
            <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {event?.title}
            </h5>
          </a>
          <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
            {event?.description}
          </p>

          <div className="flex text-gray-950 items-center">
            Start: {dayjs(event.start_datetime).format("ddd MMM DD, YYYY")}
          </div>
          <div className="flex text-gray-950 items-center">
            End: {dayjs(event.end_datetime).format("ddd MMM DD, YYYY")}
          </div>
          <div className="flex text-gray-950 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
              className="-mt-0.5 h-3.5 w-3.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              ></path>
            </svg>
            {event.location}
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={handleBuyTicket}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {isBuyingLoading ? "Loading..." : "Buy Ticket"}
            </button>
            {userToken.sub === event.createdBy || userToken.role === "admin" ? (
              <>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={openMenu ? "long-menu" : undefined}
                  aria-expanded={openMenu ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                  className="absolute bottom-2 right-2"
                >
                  <MoreVertIcon />
                </IconButton>

                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleCloseMenu}
                  PaperProps={{
                    style: {
                      maxHeight: 48 * 4.5, // Adjust max height if needed
                      width: "20ch",
                    },
                  }}
                >
                  <Link
                    to="#/publishnewquest"
                    state={{ event_type: "community", _id: event._id }}
                    onClick={onClick}
                    className="flex"
                  >
                    <MenuItem onClick={onClick}>Edit</MenuItem>
                  </Link>
                  <MenuItem onClick={handleDeleteRequest}>Delete</MenuItem>
                </Menu>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Event?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this event? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EventCard;
