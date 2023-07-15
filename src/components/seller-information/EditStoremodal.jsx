"use client";
import React, { useState, useEffect } from "react";
import Loader from "../Loader";

const BASE_URL = "https://two1genx.onrender.com/";

const EditStoremodal = ({ visible, onClose, value2, description }) => {
  //   console.log(value2);

  if (!visible) return null;

  const [store, setStore] = useState("");
  const [desc, setDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  console.log("value2>>>>", value2);

  useEffect(() => {
    setStore(value2);
    setDesc(description)
  }, [value2] ,[description]);

  

  const handleStoreValue = (event) => {
    setStore(event.target.value);
  };

  const handleDescriptionValue = (event) => {
    setDesc(event.target.value);
  };
  const handleStoreChange = async (event) => {
    event.preventDefault();
    const access_token = localStorage.getItem("access_token");

    const requestBody = {
      store_name: store,
      seller_description: desc,
    };
    // console.log("requestBody:", requestBody);

    try {
      const response = await fetch(`${BASE_URL}v1/seller/edit-store-dtl`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      if (data.success === true) {
        setIsLoading(false);
        onClose(); // Close the modal
      } else {
        setIsLoading(false);
        setErrorMessage("Request failed");
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage("Network error occurred");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="w-1/3 rounded bg-white p-8">
        <div className="flex flex-col gap-2  border-solid border-[#D0D0D0] py-4  ">
          <div className="flex flex-col">
            <p className=" text-lg font-semibold text-black">Edit Store Name</p>
          </div>
          <div className="flex flex-col">
            <label className="font-bold " htmlFor="">
              Store Name
            </label>
            <div className="flex justify-between">
              <input
                className="w-full rounded border border-solid 
          border-[#888C8C] px-2 py-1"
                type="text"
                id="store"
                value={store}
                onChange={handleStoreValue}
                placeholder={value2}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-bold " htmlFor="">
              Description
            </label>

            <div className="flex justify-between">
              <textarea
                className="w-full h-40 rounded border border-solid border-[#888C8C] px-2 py-1"
                id="desc"
                value={desc}
                onChange={handleDescriptionValue}
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              className="rounded border px-4 py-1"
              onClick={() => onClose()}
            >
              Cancel
            </button>
            <div className="flex">
              <button
                className="rounded border bg-[#007185] px-4 py-1 text-white"
                onClick={handleStoreChange}
                disabled={isLoading}
              >
                SAVE
                {isLoading && <Loader />}
              </button>
            </div>
            {errorMessage && <p>{errorMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStoremodal;
