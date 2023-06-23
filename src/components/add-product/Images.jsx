import React, { useState } from "react";
import LeftSide from "./LeftSide";
import VariationImage from "./VariationImage.jsx";
const BASE_URL = "https://two1genx.onrender.com";
import "../css/images.css";
import MainImage from "./MainImage";
import { useRouter } from "next/navigation";
const Upload = ({ productId, variationResData, formData }) => {
  const router = useRouter()
  console.log(variationResData);
  console.log(productId)
  console.log(formData);
  return (
    <div className="flex">
      <LeftSide />

      <div className="flex flex-col mb-10">
        <section>
          <div className="max-w-6xl mx-auto flex text-xs items-center bg-[#E5F2F4]">
            <div className="p-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-900 font-bold">
                When multiple sellers sell the same product through a single
                detail page, we combine and present the best product data to
                ensure customers get the best experience.
              </p>
            </div>
          </div>
        </section>
        {
          (formData.has_variations === true && variationResData.length) ?
            variationResData.map((item) => (
              <VariationImage
                key={item._id}
                item={item} />

            )) : null
        }

        {
          (formData.has_variations === false || formData.has_variations === undefined) ?
            <MainImage
              id={productId}
            /> : null
        }

        <div className='flex justify-between max-w-5xl  mx-5'>
          <div>
            <p className='text-indigo-900 text-xs font-normal border border-solid border-[#E3ECED] shadow-[0px,1px,2px,#B5B5B5] rounded-sm py-2 px-6 bg-[#E3ECED] inline-block '>Cancel</p>
          </div>
          <div className='flex gap-x-2'>
            <button className='text-indigo-900 text-xs font-normal border border-solid border-[#E3ECED] shadow-[0px,1px,2px,#B5B5B5] rounded-sm py-2 px-6 bg-[#E3ECED] inline-block '
              onClick={() => {
                router.push('/catelog')
              }}>Save as Draft</button>
            <button className='text-white text-xs  font-normal border border-solid border-[#E3ECED] shadow-[0px,1px,2px,#B5B5B5] rounded-sm py-2 px-6 bg-[#008296] inline-block '
              onClick={() => {
                router.push('/catelog')
              }}>
              Save And Next
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Upload;
