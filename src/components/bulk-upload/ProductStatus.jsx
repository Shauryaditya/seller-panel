"use client";
import { headers } from "next/dist/client/components/headers";
import React, { useState, useEffect, use } from "react";
import FileDownload from "react-file-download";

const ProductStatus = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const handleSearch = () => {
    // Replace this with your actual search logic
    alert("Performing search for: " + query);
  };

  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const access_token = localStorage.getItem("access_token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://bulk-upload-excel.onrender.com/v1/excel/get-upload-status",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        const jsonData = await response.json();
        setData(jsonData.response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const fetchData2 = async (event) => {
    try {
        setStatus(event.target.value);
        
      const queryParams = {
        status: status,
      };

      console.log(">>>",queryParams);
  
      const queryString = new URLSearchParams(queryParams).toString();
      const access_token = localStorage.getItem("access_token");
      const url = `https://bulk-upload-excel.onrender.com/v1/excel/get-upload-status?${queryString}`;
      const response = await fetch(url ,
      {
      headers:{
        'Authorization':`Bearer ${access_token}`,
      }
    }
      );
     
      const data = await response.json();
  
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  // Call the fetchData function
  fetchData2();

  const handleDownload = async (id) => {
    const access_token = localStorage.getItem("access_token");
    try {
      const res = await fetch(
        `https://bulk-upload-excel.onrender.com/v1/excel/download-excel-report/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const responseData = await res.json();

      if (res.ok && responseData.success) {
        const fileUrl = responseData.downloadUrl;
        window.location.href = fileUrl;
      } else {
        // Handle error
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="flex flex-row p-2">
        <div className="flex mx-4">
          <h1 className="text-lg text-blue-600">Add Products Via Upload</h1>
        </div>
      </div>
      <div className="flex flex-row h-8 mx-4 bg-gray-100 shadow-md gap-3 p-1">
        <div className="flex gap-4 border-x">
          <a className="text-sm hover:text-[#007185]" href="">
            Download spreadsheet
          </a>
          <a className="text-sm hover:text-[#007185]" href="">
            Upload your spreadsheet
          </a>
          <a className="text-sm hover:text-[#007185]" href="">
            Spreadsheet upload status
          </a>
        </div>
      </div>

      <div className="flex flex-col mx-4">
        <h1 className="text-3xl ">Spreadsheet Upload Status</h1>
      </div>
      <div className="flex flex-row gap-3 mx-4">
        <div className="">
          <p>Filter by :</p>
        </div>
        <div className="">
         
   
              <select className="w-64 px-4 py-1 border"  name="" id="" onChange={fetchData2}>
                <option value="Done">Done</option>
                <option value="Processing" >Processing</option>
                <option value="Failed" >Failed</option>
              </select>
       
       
        </div>

        <div className="flex items-center">
          <input
            type="text"
            className="px-4 py-1 border border-gray-300  focus:outline-none focus:ring-2"
            placeholder="Enter your search query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="px-4 py-1  rounded-r-md border-gray-300 focus:outline-none focus:ring-2 "
            onClick={handleSearch}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="p-4">
        <table className="min-w-full bg-white border border-gray-300 my-6 ">
          <thead>
            <tr>
            <th className="py-2 px-4 border-b">Sl No</th>
              <th className="py-2 px-4 border-b">File name/Submitted on</th>
              <th className="py-2 px-4 border-b">File type</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Download</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                  <td className="py-2 px-4 border-b text-center">
                <p>1</p>
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {item.original_filename}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {item.file_type}
                </td>

                <td className="py-2 px-4 border-b text-center">
                  {item.upload_status === "Done" ? (
                    <button className="px-6 py-[0.1rem] rounded text-white bg-green-500 border">
                      {item.upload_status}
                    </button>
                  ) : item.upload_status === "Failed" ? (
                    <button className="px-6 py-1 rounded text-white bg-red-500 border">
                      {item.upload_status}
                    </button>
                  ) : item.upload_status === "Pending" ? (
                    <button className="px-6 py-1 rounded text-white bg-yellow-500 border">
                      {item.upload_status}
                    </button>
                  ) : item.upload_status === "Processing" ? (
                    <button className="px-6 py-1 rounded text-white bg-[#FFB302] border">
                      {item.upload_status}
                    </button>
                  ) : null}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {item.upload_status === "Done" ? (
                    <button
                      className="px-6 py-1  rounded text-white bg-green-400"
                      onClick={() => {
                        handleDownload(item._id);
                      }}
                    >
                      Download
                    </button>
                  ) : item.upload_status === "Failed" ? (
                    <button
                      className="px-6 py-1 rounded text-white bg-green-400"
                      onClick={handleDownload(item._id)}
                    >
                      Download
                    </button>
                  ) : (
                    <button className="px-6 py-1 bg-gray-100" disabled>
                      Download
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductStatus;
