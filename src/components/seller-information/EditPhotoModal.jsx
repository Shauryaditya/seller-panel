"use client";
import React, { useState } from "react";

const BASE_URL = "https://two1genx.onrender.com/";

const EditPhotoModal = ({ visible2, onClose2, value3 }) => {
  if (!visible2) return null;

  const [isClicked, setIsClicked] = useState(false);

  const [main_img, setMain_img] = useState("");
  const [main_img_preview, setMain_img_preview] = useState(null);

  const handleInputChange = (event) => {
    const { name, files } = event.target;
    const file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      switch (name) {
        case "main_img":
          setMain_img(reader.result);
          setMain_img_preview(URL.createObjectURL(file));
          break;

        default:
          break;
      }
    };
  };
  const handleSubmit = async (event) => {
    console.log("hii");
    event.preventDefault();

    const access_token = localStorage.getItem("access_token");
    try {
      const requestBody = {
        image: main_img,
      };
      console.log(requestBody);
      const res = await fetch(`${BASE_URL}v1/seller/upload-avtar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(requestBody),
      });
      const data = res.json();
      console.log(data);

      if (res.ok) {
        // OTP sent successfully, redirect to OTP page
        console.log("Photo uploaded succesfully");
        window.location.href = "/profile/seller-info"
      } else {
        const errorData = await res.json();
        console.error(errorData);
        
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="w-1/3 rounded bg-white p-8">
        <div className="flex flex-col gap-2  border-solid border-[#D0D0D0] py-4  ">
          <div className="flex flex-col">
            <p className=" text-lg font-semibold text-black">
              Edit Profile Photo
            </p>
          </div>
          {/* <form onSubmit={(e) => handleSubmit(e, item._id)} className=""> */}
          <div className="flex flex-col">
            <div className="relative">
              <input
                type="file"
                name="main_img"
                id="main_img"
                onChange={handleInputChange}
                className="border bg-[#e2eced] border-gray-400 h-8 w-32 rounded-md px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <div className="w-32 h-32 bg-[#e2eced] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-12 h-12 text-center"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>

                {main_img_preview && (
                  <img
                    src={main_img_preview}
                    alt="Main Image Preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button
              className="rounded border px-4 py-1"
              onClick={() => onClose2()}
            >
              Cancel
            </button>
            <button
              className="rounded border bg-[#007185] px-4 py-1 text-white"
              onClick={(e) => handleSubmit(e, value3)}
            >
              SAVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPhotoModal;
