'use client'

import React, { useState, useEffect } from "react";
import PhoneModal from "./PhoneModal";
import EmailModal from "./EmailModal";
import VerifyEmailModal from "./VerifyEmailModal";

const EditSellerInfo = () => {
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [sellerInfo, setSellerInfo] = useState([]);


    const handleOnClose = () => setShowModal(false);

    const handleCloseModal2 = () => setShowModal2(false);


    const handleCloseModal3 = () => {
        setShowModal3(false); // Set the state to hide the verification modal
    };


    useEffect(() => {
        const access_token = localStorage.getItem("access_token");
        const fetchSellerInfo = async () => {
            try {
                const response = await fetch(
                    "https://seller-info.onrender.com/v1/seller/get-seller-info",
                    {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    }
                );
                const data = await response.json();
                setSellerInfo(data.response);

            } catch (error) {
                console.error("Error fetching seller info:", error);
            }
        };

        fetchSellerInfo();
    }, []);
    console.log(sellerInfo);
    localStorage.setItem("email", sellerInfo.email);


    const handleVerifyClick = async () => {
        const access_token = localStorage.getItem("access_token");

        setShowModal3(true);

        const email = sellerInfo.email; // Replace with the actual email value

        try {
            const response = await fetch('https://seller-info.onrender.com/v1/seller-auth/send-email-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`
                },
                body: JSON.stringify({ email })
            });

            console.log("response", response);
            const item = await response.json();
            console.log("#", item);

            if (response.ok) {
                // Email sent successfully, handle the response if needed
                console.log('Email sent successfully');
            } else {
                // Handle error response
                console.error('Failed to send email');
            }
        } catch (error) {
            // Handle network errors
            console.error('Network error', error);
        }

    };

    const handleEditEmail = async () => {
        const access_token = localStorage.getItem("access_token");
        // Replace with the actual email value
        const requestBody = {
            replyToEmail: replayToEmail,
        };
        console.log("requestBody:", requestBody);

        try {
            const response = await fetch('https://seller-info.onrender.com/v1/seller/edit-cus-service-dtl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`
                },
                body: JSON.stringify(requestBody)
            });

            console.log("response", response);
            const item = await response.json();
            console.log("#", item);

            if (response.ok) {
                // Email sent successfully, handle the response if needed
                console.log('Email sent successfully');
            } else {
                // Handle error response
                console.error('Failed to send email');
            }
        } catch (error) {
            // Handle network errors
            console.error('Network error', error);
        }

    };


    return (
        <section>
            <div className="flex max-w-2xl flex-col p-5">
                <div className="flex flex-row items-center justify-between border-b border-solid border-[#D5D9D9] py-2">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Seller Information
                    </h1>
                    <a className="text-xs text-teal-500">Account info</a>
                </div>
                <div className="flex flex-row items-center justify-between py-2">
                    <h1 className="text-xl font-semibold text-gray-900 ">
                        Edit customer service details
                    </h1>
                    <a className="text-xs text-teal-500">Back to seller profile</a>
                </div>
                <div className="flex flex-row items-center gap-x-5 py-2">
                    <img className="h-5 w-5" src="/svg/India.png" />
                    <p className="text-base font-semibold text-gray-900">Store Name</p>
                </div>
                <form>
                    <div className="flex flex-col">
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-900">
                                Business Email :
                            </label>
                            <div className="flex w-2/3 justify-between py-1">
                                <p className="text-xs text-[#565959] ">
                                    (Your customers' e-mails will go to this address.){" "}
                                </p>
                                <p className="text-sm" onClick={() => setShowModal2(true)}>
                                    Edit
                                </p>
                                <EmailModal
                                    onClose2={handleCloseModal2}
                                    visible2={showModal2}
                                />
                            </div>

                            <div className="flex gap-2">
                                <input
                                    className="w-2/3 rounded border border-solid border-[#888C8C]
                px-2 py-1 shadow-[0px_1px_2px_1px_rgba(15,17,17,0.15)]"
                                    disabled
                                    type="email"
                                    name="email"
                                    value={sellerInfo?.email || ""}
                                />

                                {sellerInfo?.email_verified === true ? (
                                    <p className="text-sm text-teal-500 ">Verified</p>
                                ) : (
                                    <p className="text-sm text-teal-500" onClick={handleVerifyClick}>Verify</p>

                                )}
                                <VerifyEmailModal
                                    onClose3={handleCloseModal3}
                                    visible3={showModal3}
                                />
                            </div>

                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-900">
                                Business Phone :
                            </label>
                            <div className="flex w-2/3 justify-between py-1">
                                <p className="text-xs text-[#565959] ">
                                    (This will be displayed to customers on 21genx.){" "}
                                </p>
                                <p className="text-sm" onClick={() => setShowModal(true)}>
                                    Edit
                                </p>
                                <PhoneModal onClose={handleOnClose} visible={showModal} />
                            </div>
                            <div className="flex gap-2">
                                <input
                                    className="w-2/3 rounded border border-solid border-[#888C8C]
                              px-2 py-1 shadow-[0px_1px_2px_1px_rgba(15,17,17,0.15)]
                              "
                                    disabled
                                    type="text"
                                    name="phone"
                                    value={sellerInfo?.phone || ""}
                                />
                                {sellerInfo?.phone_verified === false ? (
                                    <p className="text-sm text-teal-500 ">Verify</p>
                                ) : (
                                    <p className="text-sm text-teal-500">Verified</p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-900">
                                Customer Service Reply To Email:{" "}
                            </label>
                            <div className="flex w-2/3 justify-between py-1">
                                <p className="text-xs text-[#565959] ">
                                    (Your customers' replies to our order confirmation e- mails
                                    will go to this address.){" "}
                                </p>
                                <p className="text-sm">Edit</p>
                            </div>
                            <div className="flex">
                                <input
                                    className="w-2/3 rounded border border-solid border-[#888C8C]
                              px-2 py-1 shadow-[0px_1px_2px_1px_rgba(15,17,17,0.15)]
                              "
                                    type="email"
                                    name="reply-emial"
                                    value={sellerInfo?.replyToEmail || ""}
                                />

                            </div>
                        </div>
                        <div className="flex  w-2/3 justify-center gap-x-5 py-5">
                            <button
                                className="rounded-lg border border-solid border-[#D5D9D9] py-1 px-16 shadow-[0px_2px_5px_rgba(213,217,217,0.5)]"
                                type="button"
                            >
                                Cancel
                            </button>
                            <button
                                className="rounded-lg border border-solid border-[#FCD200] bg-[#FFD814] py-1 px-16 shadow-[0px_2px_5px_rgba(213,217,217,0.5)]"
                                type="submit"
                                onClick={handleEditEmail}
                            >
                                Sumbit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default EditSellerInfo;