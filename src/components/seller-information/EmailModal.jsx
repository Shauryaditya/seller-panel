'use client'
import React, { useState, useEffect } from "react";
const BASE_URL = 'https://two1genx.onrender.com/'

const EmailModal = ({ visible2, onClose2 }) => {
    if (!visible2) return null;
    const [Otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleErrorChange = (event) => {
        setError(event.target.value);
    };

    const handleValueChange = (event) => {
        setOtp(event.target.value);
    };



    const handleOTPSend = async () => {
        const access_token = localStorage.getItem("access_token");
        // Handle OTP send API call
        try {
            const requestBody = {
                email: email,
            };
            const response = await fetch(
                `${BASE_URL}v1/seller/send-email-update-otp`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${access_token}`,
                    },
                    body: JSON.stringify(requestBody),
                }
            );


            if (response.ok) {
                // OTP sent successfully, redirect to OTP page
                console.log("OTP sent successfully");
            } else {
                const errorData = await response.json();
                console.error(errorData);
                setError(errorData.message.toString());
            }
        } catch (error) {
            console.error(error);
            setError("Something went wrong.");
        }
    };

    const handleVerifyClick = async (event) => {
        event.preventDefault();

        const access_token = localStorage.getItem("access_token");
        try {
            const requestBody = {
                email: email,
                otp: Otp
            };
            const res = await fetch(
                `${BASE_URL}/v1/seller/verify-update-email`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${access_token}`,
                    },
                    body: JSON.stringify(requestBody),
                }
            );
            const data = res.json();
            console.log(data);

            if (res.ok) {
                // OTP sent successfully, redirect to OTP page
                console.log("Email verified succesfully");
            } else {
                const errorData = await res.json();
                console.error(errorData);
                setError(errorData.message.toString());
            }
        } catch (error) {
            console.error(error);
            setError("Something went wrong.");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
            <div className="w-1/3 rounded bg-white p-8">
                <div className="flex flex-col gap-6  border-solid border-[#D0D0D0] py-4  ">
                    <div className="flex flex-col">
                        <p className=" text-lg font-semibold text-black">Edit Email Id</p>
                        <p>OTP has been sent to Mobile</p>
                    </div>

                    <div className="flex">
                        <input
                            type="email"
                            className="w-full rounded border border-solid 
            border-[#888C8C] px-2 py-1"
                            placeholder="Enter Email-Id"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="flex flex-col">

                        <label htmlFor="">OTP</label>
                        <div className="flex justify-between w-full rounded border border-solid 
            border-[#888C8C] px-2 py-1">
                            <input
                                className="outline-0"
                                type="text"
                                placeholder="ENTER OTP"
                                id="otp"
                                value={Otp}
                                onChange={handleValueChange}
                            />
                            <p onClick={handleOTPSend}>Send OTP</p>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end gap-2">
                        <button
                            onClick={() => onClose2()}
                            className="rounded border px-4 py-1"
                        >
                            Cancel
                        </button>
                        <button className="rounded border bg-[#007185] px-4 py-1 text-white" onClick={handleVerifyClick}>
                            VERIFY
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailModal;