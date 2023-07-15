'use client'
import React, { useState, useEffect } from 'react'
const BASE_URL = 'https://two1genx.onrender.com/'
const VerifyEmailModal = ({ visible3, onClose3 }) => {
    if (!visible3) return null;

    const [Otp, setOtp] = useState("");
    const [message, setMessage] = useState("")
    const [verificationStatus, setVerificationStatus] = useState('');

    const handleValueChange = (event) => {
        setOtp(event.target.value);

    };
    // console.log(Otp);



    const handleOtpChange = async (event) => {

        event.preventDefault();
        const access_token = localStorage.getItem("access_token");

        console.log("access_token:", access_token);

        const email = localStorage.getItem("email");

        const requestBody = {
            email: email,
            otp: Otp
        };
        console.log("requestBody:", access_token);

        try {
            const response = await fetch(
                `${BASE_URL}/v1/seller/verify-email-otp`,
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


                const data = await response.json();

                console.log(data)
                if (data.success === true) {
                    // 
                    setMessage(data.message);
                    setVerificationStatus("success");

                }
            } else {
                // Request failed, handle the error
                setMessage("Email Verification Failed");
                setVerificationStatus("error");
            }
        } catch (error) {
            // Handle network errors
            setMessage("Network error occurred");
            setVerificationStatus("error");
        }

    };



    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
            <div className="w-1/3 rounded bg-white p-8">

                <div className="flex flex-col gap-2  border-solid border-[#D0D0D0] py-4  ">
                    <div className="flex flex-col">
                        <p className=" text-lg font-semibold text-black">Edit Email Id</p>
                        <p>OTP has been sent to Email</p>
                    </div>
                    <div className="flex flex-col">

                        <label htmlFor="">OTP</label>
                        <div className="flex justify-between">
                            <input
                                className="w-2/3 rounded border border-solid 
            border-[#888C8C] px-2 py-1"
                                type="text"
                                placeholder="ENTER OTP"
                                id='otp'
                                value={Otp}
                                onChange={handleValueChange}

                            />
                            <p>Resend OTP</p>
                        </div>
                        <div className="">
                            {/* <p className='text-sm text-green-600'>{data.message}</p> */}
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                        <button
                            onClick={() => onClose3()}
                            className="rounded border px-4 py-1"
                        >
                            Cancel
                        </button>
                        <button className="rounded border bg-[#007185] px-4 py-1 text-white" onClick={handleOtpChange}>
                            VERIFY
                        </button>
                    </div>
                    <p className={`text-${verificationStatus === "success" ? "green" : "red"}-500`}>{message}</p>
                </div>

            </div>
        </div>
    )
}

export default VerifyEmailModal