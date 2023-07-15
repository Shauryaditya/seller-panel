"use client";
import React, { useState, useEffect } from "react";
import EditStoremodal from "./EditStoremodal";
import Link from "next/link";
import EditPhotoModal from "./EditPhotoModal";
const BASE_URL = "https://two1genx.onrender.com/";
const SellerInfo = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showmodal2, setShowModal2] = useState(false);
  const handleOnClose = () => setShowModal(false);
  const handleOnClose2 = () => setShowModal2(false);

  useEffect(() => {
    // Retrieve access token from local storage
    const access_token = localStorage.getItem("access_token");

    // Fetch seller address list using the access token
    fetch(`${BASE_URL}v1/seller/get-seller-info`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.response);
        // console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(data);

  return (
    <section>
      <div className="max-w-4xl flex flex-col p-5">
        <div className="flex justify-between flex-row py-2 border-b border-solid border-[#D5D9D9]">
          <h1 className="text-2xl text-gray-900 ">Seller Information</h1>
          <a className="text-xs text-teal-500">Account info</a>
        </div>
        <div className="flex flex-row border border-solid border-[#D5D9D9] rounded-lg py-2 mt-2">
          <div className="basis-1/3 flex flex-col p-2">
            <div className="border-b border-solid border-[#D5D9D9]">
              <h4 className="text-xs text-[#565959] font-medium">
                Profile Photo
              </h4>
            </div>
            <div className="flex gap-x-2 flex-row justify-start items-center py-2">
              <div className="flex flex-col justify-center items-center">
                <div className="w-16 h-16 border rounded-full overflow-hidden">
                  {data?.avatar === undefined ? (
                    <img src="/assets/Seller.png" alt="" />
                  ) : (
                    <img src={data?.avatar} alt="" />
                  )}
                </div>
                <p
                  className="w-fit text-xs text-teal-500 py-1 "
                  onClick={() => setShowModal2(true)}
                >
                  Edit
                  <EditPhotoModal
                    onClose2={handleOnClose2}
                    visible2={showmodal2}
                    value3={data?._id}
                    item = {data?.avatar}
                  />
                </p>
              </div>
            </div>
          </div>
          {/* 2nd box */}
          <div className="basis-1/3 flex flex-col p-2 pb-8">
            <div className="flex justify-between border-b border-solid border-[#D5D9D9]">
              <h4 className="text-xs text-[#565959] font-medium">
                Seller Name
              </h4>
            </div>
            <div className="flex flex-col">
              <div className="py-2">{data?.fullname}</div>
            </div>
          </div>
          {/* // 3rd box */}
          <div className="basis-1/3 flex flex-col p-2">
            <div className="flex justify-between border-b border-solid border-[#D5D9D9]">
              <h4 className="text-xs text-[#565959] font-medium">
                Store Details
              </h4>
              <p
                className="text-xs text-teal-500 "
                onClick={() => setShowModal(true)}
              >
                Edit
              </p>
            </div>
            <div className="flex flex-col">
              <div className="py-2">
                <h4 className="text-xs text-[#565959] font-medium">
                  Display Name
                </h4>
                <p className="text-xs text-[#0F1111] ">{data?.store_name}</p>
                <EditStoremodal
                  onClose={handleOnClose}
                  visible={showModal}
                  value2={data?.store_name}
                  description = {data?.seller_description}
                />
              </div>
              <div className="py-2">
                <h4 className="text-xs text-[#565959] font-medium">
                  Description
                </h4>
                <p className="text-xs text-[#0F1111] ">
                  {data?.seller_description}
                </p>
              </div>
            </div>
          </div>
          {/* // 3rd Box */}
          <div className="basis-1/3 flex flex-col p-2">
            <div className="flex justify-between border-b border-solid border-[#D5D9D9]">
              <h4 className="text-xs text-[#565959] font-medium ">
                Customer service details
              </h4>
              <Link href="/profile/edit" className="text-xs text-teal-500 ">
                Edit
              </Link>
            </div>
            <div className="flex flex-col gap-1">
              <div className="">
                <h4 className="text-xs text-[#565959] font-medium capitalize">
                  Email
                </h4>
                <p className="text-xs text-[#0F1111] ">{data?.email}</p>
              </div>
              <div className="">
                <h4 className="text-xs text-[#565959] font-medium capitalize">
                  Phone
                </h4>
                <p className="text-xs text-[#0F1111] ">{data?.phone}</p>
              </div>
              <div className="">
                <h4 className="text-xs text-[#565959] font-medium capitalize">
                  Reply to email
                </h4>
                <p className="text-xs text-[#0F1111] ">{data?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellerInfo;
