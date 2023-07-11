"use client";
import React, { useState,useEffect, use } from "react";

const ProductStatus = () => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    // Replace this with your actual search logic
    alert("Performing search for: " + query);
  };

  const [data, setData] = useState([]);
  const access_token = localStorage.getItem("access_token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://bulk-upload-excel.onrender.com/v1/excel/get-upload-status',{
            headers:{
                Authorization:`Bearer ${access_token}`,
            }
          }
        );
        const jsonData = await response.json();
        setData(jsonData.response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  console.log("fetched data",data)

  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="flex flex-row p-2">
        <div className="flex mx-4">
          <h1 className="text-lg text-blue-600">Add Products Via Upload</h1>
        </div>
      </div>
      <div className="flex flex-row h-8 mx-4 bg-gray-200 gap-3 p-1">
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

      <div className="flex flex-col">
        <h1 className="text-3xl ">Spreadsheet Upload Status</h1>
      </div>
      <div className="flex flex-row gap-3">
        <div className="">
          <p>Filter by :</p>
        </div>
        <div className="">
          <select className="w-64 px-4 py-1 border" name="" id="">
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
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
      <table className="min-w-full bg-white border border-gray-300 my-6">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">File name/Submitted on</th>
            <th className="py-2 px-4 border-b">File type</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Batch ID</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">
                {item.file_name} 
               
              </td>
              <td className="py-2 px-4 border-b">{item.file_type}</td>
             
              <td className="py-2 px-4 border-b">{item.upload_status}</td>
              <td className="py-2 px-4 border-b">{item._id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    
    </div>
  );
};

export default ProductStatus;
