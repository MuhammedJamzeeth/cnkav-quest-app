import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const SuccessIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="absolute inset-0 m-auto h-16 w-16 flex items-center justify-center"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="green" // Green border color
      strokeWidth="2" // Border thickness
      fill="none" // No fill color
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 13l4 4L19 7"
      stroke="green" // Match the border color
      strokeWidth="2"
    />
  </svg>
);

const ErrorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="absolute inset-0 m-auto h-16 w-16 flex items-center justify-center"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    {/* Background Circle with Red Border */}
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="red" // Red border color
      strokeWidth="2" // Border thickness
      fill="none" // No fill color
    />
    {/* X Icon */}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
      stroke="red" // Match the border color
      strokeWidth="2"
    />
  </svg>
);

const LoadingSpinner = () => (
  <svg
    className="animate-spin h-12 w-12 text-blue-500 absolute top-0 right-0"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 12a8 8 0 0116 0m-8 4v-8"
    />
  </svg>
);

const Dropzone = ({ setFormInput }) => {
  const [previewUrl, setPreviewUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [uploadStatus, setUploadStatus] = useState(""); // 'success', 'error', or ''
  const [uploadError, setUploadError] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/png, image/jpeg, image/webp",
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFileName(file.name);

      // Generate a preview URL
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);

      // Start loading
      setLoading(true);
      setUploadStatus("");
      setUploadError("");

      // Upload file
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "https://backend.cnkav.com/quest_app/upload-image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setUploadStatus("success");
        if (response.data.image_url) {
          setFormInput((prev) => ({ ...prev, image: response.data.image_url }));
        }
        console.log("Upload Success:", response.data);
      } catch (err) {
        setUploadStatus("error");
        setUploadError("Upload failed. Please try again.");
        console.error("Upload Error:", err);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="w-full px-3 mb-8">
      <label
        {...getRootProps()}
        className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center justify-center rounded-xl border-2 border-dashed border-green-400 bg-white p-6 text-center relative"
        htmlFor="dropzone-file"
      >
        {previewUrl ? (
          <>
            <img
              src={previewUrl}
              alt="Preview"
              className={`object-cover w-full h-full transition-all duration-300 ${
                uploadStatus ? "filter blur-sm" : ""
              }`}
            />
            {uploadStatus === "success" && <SuccessIcon />}
            {uploadStatus === "error" && <ErrorIcon />}
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-green-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>

            <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">
              Category image
            </h2>

            <p className="mt-2 text-gray-500 tracking-wide">
              Upload or drag & drop your file plugins.{" "}
            </p>
          </>
        )}

        <input {...getInputProps()} />
      </label>
    </div>
  );
};

export default Dropzone;
