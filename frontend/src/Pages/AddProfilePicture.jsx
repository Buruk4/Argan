import axios from "axios";
import React, { useState } from "react";

const AddProfilePicture = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  const api_url = import.meta.env.VITE_API_URL;
  console.log(api_url);
  const handleFileChange = (e) => {
    const selectedfile = e.target.files[0];
    setFile(selectedfile);
    setPreview(URL.createObjectURL(selectedfile));
  };

  const handleSubmit = async (e) => {
    if (!file) {
      return setMessage("Please selcet a file first!");
    }

    const formData = new FormData();
    formData.append("profileImg", file);
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(`${api_url}/user/upload-picture`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("uploaded successfully");
    } catch (error) {
      console.error("Upload error:", err);
      setMessage("Upload failed");
    }
  };

  //   const handleProfilePictureSubmi
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Upload Profile Picture
        </h2>

        <div className="space-y-4">
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          {preview && (
            <div className="flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 rounded-full object-cover shadow-md border border-gray-300"
              />
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
          >
            Upload
          </button>
          <div className="mt-4">
            {/* <SkipButton businessUrl="/registerbusiness" userUrl="/home" /> */}
          </div>
          {message && (
            <p
              className={`text-center font-semibold ${
                message.includes("✅") ? "text-green-600" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default AddProfilePicture;
