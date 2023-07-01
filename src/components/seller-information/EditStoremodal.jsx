'use client'
import React, { useState } from "react";

const EditStoremodal = ({ visible, onClose, value2 }) => {
    console.log(value2);

    if (!visible) return null;

    const [store, setStore] = useState("");

    const handleStoreValue = (event) => {
        setStore(event.target.value);
    };

    const handleStoreChange = async (event) => {
        event.preventDefault();
        const access_token = localStorage.getItem("access_token");

        const requestBody = {
            store_name: store,
        };
        console.log("requestBody:", requestBody);

        try {
            const response = await fetch(
                "https://seller-info.onrender.com/v1/seller/edit-store-dtl",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${access_token}`,
                    },
                    body: JSON.stringify(requestBody),
                }
            );
            console.log(response.json());

            if (response.ok) {
                const data = await response.json();

                console.log(">>>>>>", data);
                if (data.success === true) {
                    //
                    console.log("Store name changed");
                }
            } else {
                // Request failed, handle the error
                //   setMessage("Email Verification Failed");
                //   setVerificationStatus("error");
            }
        } catch (error) {
            // Handle network errors
            // setMessage("Network error occurred");
            // setVerificationStatus("error");
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
                        <label htmlFor="">Store Name</label>
                        <div className="flex justify-between">
                            <input
                                className="w-2/3 rounded border border-solid 
          border-[#888C8C] px-2 py-1"
                                type="text"
                                id="store"
                                value={store}
                                onChange={handleStoreValue}
                                placeholder={value2}
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
                        <button
                            className="rounded border bg-[#007185] px-4 py-1 text-white"
                            onClick={handleStoreChange}
                        >
                            SAVE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditStoremodal;