'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
const SellerInvoice = () => {
    const [formData, setFormData] = useState({
        name: "",
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        phone: ""
    });
    const countries = [
        { id: 1, name: 'USA', country_name: 'United States of America' },
        { id: 2, name: 'CHI', country_name: 'China' },
        { id: 3, name: 'IND', country_name: 'India' },
        // Add more countries as needed
    ];





    const handleSubmit = async (e) => {
        e.preventDefault();
        const access_token = localStorage.getItem("access_token");


        try {
            const response = await fetch(
                "https://seller-info.onrender.com/v1/seller/add-seller-address",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${access_token}`,
                    },
                    body: JSON.stringify(formData),
                }
            );
            const data = await response.json();
            console.log(data);

            if (response.ok) {
                // Handle success
                console.log("Data submitted successfully");
                // Reset the form
                setFormData({
                    name: "",
                    address_line1: "",
                    address_line2: "",
                    city: "",
                    state: "",
                    country: "",
                    pincode: "",
                    phone: ""
                });

            } else {
                // Handle error
                console.error("Failed to submit data");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    console.log(formData);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    //  console.log(Country);

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
                    <Link href='/profile/address'
                        className="text-xl font-semibold text-gray-900 ">
                        Add a new address
                    </Link>
                    <a className="text-xs text-teal-500">Select an address</a>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col rounded border p-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-900">
                                Name
                            </label>
                            <div className="flex w-full justify-between py-1"></div>

                            <div className="flex">
                                <input
                                    className="w-full rounded border border-solid border-[#888C8C]
                            px-2 py-1 shadow-[0px_1px_2px_1px_rgba(15,17,17,0.15)]
                            "
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-900">
                                Address Line 1 :
                            </label>
                            <div className="flex w-full justify-between py-1"></div>
                            <div className="flex">
                                <input
                                    className="w-full rounded border border-solid border-[#888C8C]
                            px-2 py-1 shadow-[0px_1px_2px_1px_rgba(15,17,17,0.15)]
                            "
                                    type="text"
                                    name="address_line1"
                                    required
                                    value={formData.address_line1}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-900">
                                Address Line 2:
                            </label>
                            <div className="flex w-full justify-between py-1"></div>
                            <div className="flex">
                                <input
                                    className="w-full rounded border border-solid border-[#888C8C]
                            px-2 py-1 shadow-[0px_1px_2px_1px_rgba(15,17,17,0.15)]
                            "
                                    type="text"
                                    name="address_line2"
                                    value={formData.address_line2}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex w-full flex-row gap-5 ">
                                <div className="w-1/2 flex flex-col">
                                    <label className="text-sm font-semibold text-gray-900">
                                        City/Town:{" "}
                                    </label>
                                    <div className="flex">
                                        <input
                                            className="w-full rounded border border-solid border-[#888C8C]
                            px-2 py-1 shadow-[0px_1px_2px_1px_rgba(15,17,17,0.15)]
                            "
                                            type="text"
                                            name="city"
                                            required
                                            value={formData.city}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="w-1/2 flex flex-col">
                                    <label className="text-sm font-semibold text-gray-900">
                                        Province/Region/State:{" "}
                                    </label>
                                    <div className="flex">
                                        <input
                                            className="w-full rounded border border-solid border-[#888C8C]
                            px-2 py-1 shadow-[0px_1px_2px_1px_rgba(15,17,17,0.15)]
                            "
                                            type="text"
                                            name="state"
                                            required
                                            value={formData.state}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row gap-5 ">
                                <div className="w-1/2 flex flex-col">
                                    <label className="text-sm font-semibold text-gray-900">
                                        Country:{" "}
                                    </label>
                                    <div className="flex">
                                        <select
                                            className="w-full rounded border border-solid border-[#888C8C] px-2 py-1 shadow-[0px_1px_2px_1px_rgba(15,17,17,0.15)]"
                                            name="country"
                                            required
                                            value={formData.country}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Country</option>
                                            {countries.map((country) => (
                                                <option key={country.id} value={country.name}>
                                                    {country.country_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="w-1/2 flex flex-col">
                                    <label className="text-sm font-semibold text-gray-900">
                                        Postcode/ZipCode:{" "}
                                    </label>
                                    <div className="flex">
                                        <input
                                            className="w-full rounded border border-solid border-[#888C8C]
                            px-2 py-1 shadow-[0px_1px_2px_1px_rgba(15,17,17,0.15)]
                            "
                                            type="text"
                                            name="pincode"
                                            required
                                            value={formData.pincode}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-900">
                                Primary Phone:
                            </label>
                            <div className="flex w-full py-1"></div>
                            <div className="flex">
                                <input
                                    className="w-full rounded border border-solid border-[#888C8C]
                            px-2 py-1 shadow-[0px_1px_2px_1px_rgba(15,17,17,0.15)]
                            "
                                    type="number"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
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

export default SellerInvoice;