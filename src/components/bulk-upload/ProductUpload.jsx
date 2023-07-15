"use client";
import React, { useState } from "react";
import Link from "next/link";

const ProductUpload = () => {
  const [files, setFiles] = useState([]);
  const [successmessage, setSuccessMessage] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleFileChange = (event) => {
    setFiles(event.target.files[0]);
  };
  // console.log("Excel files", files);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("excelFile", files);

    // console.log("formData>>>", formData);

    try {
      const access_token = localStorage.getItem("access_token");
      const response = await fetch(
        "https://bulk-upload-excel.onrender.com/v1/excel/upload-excel",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok && data.success === true) {
        console.log("data>>>>>", data);
        setSuccessMessage(data.message);
        setVerificationStatus("success");
      } else {
        // Request failed, handle the error
        setSuccessMessage("File upload Failed");
        setVerificationStatus("error");
      }
    } catch (error) {
      // Handle network errors
      setSuccessMessage("Network error occurred");
      setVerificationStatus("error");
    }
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    setFiles(Array.from(droppedFiles));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleUpload = () => {
    setIsButtonClicked(true);
    setIsUploading(true);

    // Perform upload logic here

    // Example: Simulating upload delay
    setTimeout(() => {
      setIsUploading(false);
      // Handle upload completion or error
    }, 2000);
  };
  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="flex flex-row p-2">
        <div className="flex mx-4">
          <h1 className="text-lg text-blue-600">Add Products Via Upload</h1>
        </div>
        <div className="flex border-l text-sm p-2 text-blue-400">
          <a href="">Learn More </a>{" "}
        </div>
        <div className="flex border-l text-sm p-2 text-blue-400">
          <a href="">Seller University</a>
        </div>
        <div className="flex border-l text-sm p-2 text-blue-400">
          <a href="">Selling Application Status</a>
        </div>
        <div className="flex border-l text-sm p-2 text-blue-400">
          <a href="">Add a Single Product</a>
        </div>
      </div>
      <div className="flex flex-row h-8 mx-4 bg-gray-200 gap-3 p-1">
        <Link href="/bulk-upload" className="text-sm hover:text-[#007185]">
          Download spreadsheet
        </Link>
        <Link
          href="/bulk-upload/upload"
          className="text-sm hover:text-[#007185]"
        >
          Upload your spreadsheet
        </Link>
        <Link
          href="/bulk-upload/status"
          className="text-sm hover:text-[#007185]"
        >
          Spreadsheet upload status
        </Link>
      </div>
      <form action="" onSubmit={handleSubmit}>
        <div className="max-w-full border mx-4 mt-6">
          <div className="flex flex-row justify-between border-b p-2 ">
            <div className="">
              <h1>Upload Spreadsheet</h1>
            </div>
            <div className="flex flex-row">
              <svg
                width="11"
                height="12"
                viewBox="0 0 11 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.6504 0.873047V5.0293H6.68555L8.29883 3.38867C7.49674 2.58659 6.53971 2.17643 5.42773 2.1582C4.2793 2.1582 3.31315 2.55013 2.5293 3.33398C1.74544 4.11784 1.35352 5.06576 1.35352 6.17773C1.35352 7.28971 1.74544 8.23763 2.5293 9.02148C3.33138 9.82357 4.28841 10.2246 5.40039 10.2246C6.5306 10.2246 7.49674 9.82357 8.29883 9.02148C9.08268 8.23763 9.47461 7.28971 9.47461 6.17773H10.6504C10.6504 7.59961 10.14 8.82096 9.11914 9.8418C8.09831 10.8626 6.85872 11.373 5.40039 11.373C3.94206 11.373 2.70247 10.8626 1.68164 9.8418C0.660807 8.82096 0.150391 7.59961 0.150391 6.17773C0.150391 4.75586 0.660807 3.53451 1.68164 2.51367C2.70247 1.49284 3.93294 0.982422 5.37305 0.982422C6.81315 0.982422 8.04362 1.49284 9.06445 2.51367L10.6504 0.873047ZM4.82617 3.79883H5.70117V6.25977L7.72461 7.49023L7.31445 8.20117L4.82617 6.69727V3.79883Z"
                  fill="#002F36"
                />
              </svg>
              <p className="text-xs text-[#008296]">
                Purge and replace your inventory
              </p>
            </div>
          </div>
          <div
            className="max-w-4xl border  m-4 p-8 border-b"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="flex flex-col justify-center items-center gap-3">
              <svg
                width="24"
                height="29"
                viewBox="0 0 24 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.7207 22.0557H6.7207V12.0557H0.0800781L11.7207 0.415039L23.3613 12.0557H16.7207V22.0557ZM0.0800781 28.7744V25.415H23.3613V28.7744H0.0800781Z"
                  fill="#002F36"
                />
              </svg>
              <p>Drag and drop files</p>
              <div className="flex flex-row gap-1">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex gap-2">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.49316 2.43359C3.62337 1.30339 4.99056 0.738281 6.59473 0.738281C8.18066 0.738281 9.55697 1.30339 10.7236 2.43359C11.8538 3.60026 12.4189 4.97656 12.4189 6.5625C12.4189 8.16667 11.8538 9.53385 10.7236 10.6641C9.5752 11.8125 8.19889 12.3867 6.59473 12.3867C4.99056 12.3867 3.62337 11.8125 2.49316 10.6641C1.34473 9.53385 0.770508 8.16667 0.770508 6.5625C0.770508 4.95833 1.34473 3.58203 2.49316 2.43359ZM7.16895 7.13672H9.52051V5.98828H7.16895V3.63672H6.02051V5.98828H3.66895V7.13672H6.02051V9.48828H7.16895V7.13672Z"
                        fill="#008296"
                      />
                    </svg>
                    <p className="text-sm text-[#008296] font-semibold">
                      Browse Files
                    </p>
                  </div>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept=".xlsx"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              <p>Accepted File Format : Excel(.xlsx)</p>
              {files && (
                <div className=" flex">
                  <p>Uploaded file : &nbsp;</p>
                  <p>{files.name}</p>
                </div>
              )}
                <p
            className={`text-${
              verificationStatus === "success" ? "green" : "red"
            }-500`}
          >
            {successmessage}
          </p>
            </div>
          
          </div>


          <div className="flex justify-center items-center my-4 ml-52">
          <button
        className="px-6 py-2 bg-[#879596] text-white"
        type="submit"
       
        onClick={handleUpload}
      >
Upload File
      </button>
          </div>
       
        </div>
      </form>
    </div>
  );
};

export default ProductUpload;
