'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
const SellerAddressList = () => {
    const [data, setData] = useState([]);

    const [selectedAddress, setSelectedAddress] = useState([]);

    const onSelect = (event, data) => {
        const selectedValue = event;
        setSelectedAddress(selectedValue);

        for (let obj of data) {
            obj.isActive = false;
            if (obj._id == selectedValue) {
                obj.isActive = true;

            }


        }



    };
    console.log(selectedAddress);

    useEffect(() => {
        // Retrieve access token from local storage
        const access_token = localStorage.getItem("access_token");

        // Fetch seller address list using the access token
        fetch(
            "https://seller-info.onrender.com/v1/seller/get-seller-address-list",
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                setData(data.response);
                // console.log(data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleChange = async (event) => {
        event.preventDefault();
        try {
            const access_token = localStorage.getItem("access_token");
            const response = await fetch(
                `https://seller-info.onrender.com/v1/seller/select_seller_address/${selectedAddress}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            );

            const data = response.json();
            console.log(data);
            if (response.ok) {
                console.log("response :", response);
            }

        } catch (err) {

        }


    };


    return (
        <section>
            <div className="flex max-w-2xl flex-col p-5">
                <div className="flex flex-row items-center justify-between border-b border-solid border-[#D5D9D9] py-2">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Invoice Address
                    </h1>
                    <a className="text-xs text-teal-500">Account info</a>
                </div>
                <div className="border-b border-solid border-[#D5D9D9] py-2"></div>
                <div className="flex flex-row items-center justify-between py-2">
                    <h1 className="text-xl font-semibold text-gray-900 ">
                        Select An Address
                    </h1>
                    <Link
                        className="text-xs text-teal-500"
                        href="/profile/invoice"
                    >
                        Add a new address
                    </Link>
                </div>

                <form>
                    <div className="flex flex-col rounded border p-4">
                        <div className="flex flex-col">
                            {Array.isArray(data) &&
                                data.map((item, index) => (
                                    <div className="flex gap-3 border-b py-4" key={index}>
                                        <input
                                            className=""
                                            type="radio"
                                            value="" // Use index as the value, assuming it's unique for each option
                                            // checked={selectedAddress === index}
                                            checked={item.isActive} // Set the checked attribute based on item.isActive
                                            onChange={() => onSelect(item._id, data)}
                                            name={`address-${index}`} // Provide a unique name for each radio input group
                                        />
                                        <p className="text-sm font-bold">
                                            {`${item?.address_line1}, ${item?.address_line2}, ${item.city}, ${item.state}, ${item.country}, ${item.pincode}, ${item.phone}`}
                                        </p>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="flex  w-full justify-center gap-x-5 py-5">
                        <button
                            className="rounded-lg border border-solid border-[#D5D9D9] py-1 px-16 shadow-[0px_2px_5px_rgba(213,217,217,0.5)]"
                            type="button"
                        >
                            Cancel
                        </button>
                        <button
                            className="rounded-lg border border-solid border-[#FCD200] bg-[#FFD814] py-1 px-16 shadow-[0px_2px_5px_rgba(213,217,217,0.5)]"
                            type="submit"
                            onClick={handleChange}
                        >
                            Sumbit
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default SellerAddressList;