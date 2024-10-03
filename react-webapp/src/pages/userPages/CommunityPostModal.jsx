import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import QuestsCategory from "./questsManipulations/QuestsCategory";
import QuestsRank from "./questsManipulations/QuestsRank";
import QuestsStyles from "./questsManipulations/QuestsStyles";
import { Button, Modal } from "flowbite-react";
import { RxImage } from "react-icons/rx";
import { BiSolidFileGif } from "react-icons/bi";
import { SiIconify } from "react-icons/si";
import { useForm } from "react-hook-form";
import axios from "axios";
import useUser from "../../hooks/use-user";
import axiosInstance from "../../api/axiosInstance";

const ALLOWED_IMAGES = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
const ALLOWED_VIDEOS = ["video/mp4", "video/mpeg", "video/quicktime"];

const CommunityPostModal = ({
  isModal,
  toggleModal,
  edit,
  post,
  onSuccess,
}) => {
  const { register, handleSubmit, watch, setValue } = useForm({});
  const { user } = useUser();

  useEffect(() => {
    if (edit) {
      setValue("title", post?.post_title);
      setValue("description", post?.post_description);
      setValue("category", post?.category);
    }
  }, [post, edit, setValue]);

  if (!isModal) return null;

  const onSubmit = async (data) => {
    const { title, description, asset, category } = data;

    if ((!asset || asset.length === 0) && !edit) {
      console.error("No file selected");
      return;
    }

    // Create a new FormData object
    const formData = new FormData();

    // Append form fields
    formData.append("post_title", title);
    formData.append("post_description", description);
    formData.append("category", category);
    formData.append("creator_user_id", user.id);
    formData.append("duration_days", "0");

    // Check if the file type is allowed and append it
    if (ALLOWED_VIDEOS.includes(asset?.[0]?.type)) {
      formData.append("video", asset[0]);
    } else if (ALLOWED_IMAGES.includes(asset?.[0]?.type)) {
      formData.append("image", asset[0]);
    } else if (!edit) {
      console.error("Invalid file type");
      return;
    }

    try {
      if (edit) {
        const response = await axiosInstance.put(
          `/community/edit-post/${post?._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.statusText === "OK" || response.status === 200) {
          toggleModal("closed");
          onSuccess?.();
          alert("Post updated successfully");
        } else {
          console.error("Error:", response.status, response.statusText);
        }

        return;
      }

      const response = await axiosInstance.post(
        "/community/create-post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.statusText === "Created" || response.status === 201) {
        toggleModal("closed");
        onSuccess?.();
        alert("Post created successfully");
      } else {
        console.error("Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  const asset = watch("asset")?.[0];

  return (
    <div className=" w-full h-full flex justify-center items-center text-center">
      <Modal show={isModal} onClose={() => toggleModal("closed")}>
        <div className=" bg-black flex flex-col px-6 md:px-12 pb-8">
          <button
            onClick={() => toggleModal("closed")}
            className=" w-full flex justify-end text-white mt-4 text-2xl hover:text-gray-400"
          >
            &times;
          </button>
          <h2 className="text-xl font-bold mb-4 mt-24">
            Publish New Community Post
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Post title
              </label>
              <input
                {...register("title")}
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
                placeholder="Enter What the task details"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-2"
              >
               Community post text
              </label>
              <textarea
                {...register("description")}
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
                placeholder="Enter What the task details"
              />
            </div>

            <div>
              <div className="flex gap-4 items-center justify-between">
                <div className="flex gap-2">
                  <label htmlFor="asset">
                    <div className="bg-white transition ease-in-out delay-100 cursor-pointer py-2 px-2 rounded-full flex hover:bg-blue-700 ">
                      <RxImage className="w-4 h-4 text-black " />
                    </div>
                    <input
                      id="asset"
                      {...register("asset")}
                      hidden
                      type="file"
                      accept="image/jpeg,image/png,image/jpg,image/gif,video/mp4,video/mpeg,video/quicktime"
                    />
                  </label>
                  {/* <div className="bg-white transition ease-in-out delay-100 cursor-pointer py-2 px-2 rounded-full flex hover:bg-blue-700 ">
                    <BiSolidFileGif className="w-4 h-4 text-black " />
                  </div>
                  <div className="bg-white transition ease-in-out delay-100 cursor-pointer py-2 px-2 rounded-full flex hover:bg-blue-700 ">
                    <SiIconify className="w-4 h-4 text-black " />
                  </div> */}
                </div>
                <div className="w-full">
                  <QuestsCategory register={register} />
                </div>
              </div>
            </div>
            {asset && (
              <p className="text-sm text-muted-foreground">
                Selected file: <span className="font-medium">{asset.name}</span>
              </p>
            )}

            <div className="pt-6 flex w-full justify-end">
              <button
                type="submit"
                className="text-sm  text-white py-3 px-4 font-bold"
                style={{
                  border: "2px solid transparent",
                  borderImage: "linear-gradient(120deg, red, yellow)",
                  borderImageSlice: 1,
                }}
              >
                Confirm Post
              </button>
            </div>
          </form>
          <p className="mt-6 text-center text-sm text-white">
            By signing up, you agree to Cnkav <br />
            <a href="/terms-of-services" className="text-white underline">
              Terms and Conditions
            </a>
            .
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default CommunityPostModal;
