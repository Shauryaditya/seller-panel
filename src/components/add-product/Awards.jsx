import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Loader from "../Loader";
const BASE_URL = "https://two1genx.onrender.com";
import LeftSide from "./LeftSide";

const ProductAwards = (props) => {
  const { setSelectedTab, draftedTabs, setDraftedTabs, setFormData } = props;
  // state for loading
  const [isLoading, setIsLoading] = useState(false)

  const [awards, setAwards] = useState([]);
  const [award, setAward] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [certificateResponse, setCertificateResponse] = useState([]);
  const [years, setYears] = useState([]);
  const [rowCount, setRowCount] = useState(1);
  const [selectedAwardId, setSelectedAwardId] = useState("");
  const awardIdRef = useRef(null);

  useEffect(() => {
    fetch(`${BASE_URL}/v1/award/all-awards`)
      .then((response) => response.json())
      .then((data) => setAwards(data.data))
      .catch((error) => console.error(error));
  }, []);

  const handleSelect = (e) => {
    if (awardIdRef.current) {
      const selectedOption = Array.from(awardIdRef.current.options).find(
        (option) => option.value === e.target.value
      );
      if (selectedOption && selectedOption.dataset) {
        const awardId = selectedOption.dataset.id;
        setSelectedAwardId(awardId);
      }
    }
  };

  const handleCertificateChange = (e) => {
    setCertificate(e.target.files[0]);
  };

  const handleCertificateSubmit = (e) => {
    setIsLoading(true)
    e.preventDefault();

    const file = certificate;

    const formData = new FormData();
    formData.append("award_cert", file);

    // Send the file to the API endpoint
    axios
      .post(
        `${BASE_URL}/v1/product-awards/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type header for file uploads
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setIsLoading(false)
        }
        setCertificateResponse((preValue) => {
          return [...preValue, response.data];
        });
        console.log(response.data);
      })
      .catch((error) => {
        setIsLoading(false)
        alert(error)
        // Handle any errors that occurred during the upload
        console.error(error);
      });
  };

  const handleSubmit = () => {
    const newAwards = [];

    // Collect data from additional rows if they are filled
    for (let i = 0; i < rowCount; i++) {
      const awardId = document.getElementById(`awardId${i}`).value;
      const selectedOption = Array.from(awardIdRef.current.options).find(
        (option) => option.value === awardId
      );
      const award = selectedOption ? selectedOption.dataset.id : "";

      const year = years[i]; // Retrieve year value from the years array

      const certificate = document.getElementById(`award_cert${i}`).files[0];

      if (award && year && certificate) {
        const newAward = {
          award_id: award,
          award_year: year,
          certificate_url: certificateResponse[i]?.cert_secure_url || "",
          certificate_public_id: certificateResponse[i]?.cert_public_id || "", // Placeholder, update with the actual certificate public ID
        };

        // Perform the necessary steps to upload the certificate and obtain the URL and public ID
        // Once you have the actual values, update the `newAward` object accordingly

        newAwards.push(newAward);
      }
    }

    console.log(newAwards);
    // TODO: Make the request to save the filled awards with the corresponding data
    setFormData((prevValue) => {
      return { ...prevValue, awards: newAwards };
    });
    // Reset form fields
    setSelectedAwardId("");
    setYears([]);
    setCertificate(null);
  };

  const handleAwardChange = (e) => {
    setAward(e.target.value);
  };

  const handleYearChange = (e, index) => {
    const { value } = e.target;
    const updatedYears = [...years];
    updatedYears[index] = value;
    setYears(updatedYears);
  };

  const handleAddRow = () => {
    setRowCount((prevRowCount) => prevRowCount + 1);
  };

  return (
    <div className="flex">
      <LeftSide />
      <div>
        {/* Render additional rows */}
        {[...Array(rowCount)].map((_, index) => (
          <div key={index} className="text-xs">
            <div className="max-w-7xl mx-auto flex gap-8 items-center px-6 pt-4">
              <div className="flex items-center gap-2">
                <p className="font-semibold">Awards:</p>
                <select
                  ref={awardIdRef}
                  id={`awardId${index}`}
                  name={`award_name${index}`}
                  autoComplete="off"
                  onChange={handleSelect}
                  placeholder="Choose Award"
                  className="h-6 my-5 px-2 outline-0 border border-gray-700 rounded-md"
                >
                  <option
                    selected
                    className="p-2 cursor-pointer hover:bg-gray-100"
                  >
                    --Select
                  </option>
                  {awards.map((list) => (
                    <option
                      key={list._id}
                      value={list.award_name}
                      data-id={list._id}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                    >
                      {list.award_name}
                    </option>
                  ))}
                </select>
              </div>{" "}
              <div className="flex items-center gap-3">
                <p className="font-semibold">Year of Award:</p>
                <input
                  className="h-6 border border-gray-700 rounded-md p-2"
                  type="number"
                  placeholder="YYYY"
                  min="1980"
                  max="2040"
                  id={`year${index}`}
                  name={`year${index}`}
                  value={years[index] || ""}
                  onChange={(e) => handleYearChange(e, index)}
                  required
                />
              </div>
              <div className="flex flex-row">
                <div className="flex flex-row gap-2 items-center">
                  <label className="italic text-blue-600 ">
                    Upload Certificate:
                  </label>
                  <input
                    className="border w-1/2 p-1 border-gray-400 rounded-md"
                    type="file"
                    id={`award_cert${index}`}
                    name={`award_cert${index}`}
                    accept=".pdf,.jpg"
                    onChange={(e) => handleCertificateChange(e, index)}
                    required
                  />
                </div>
                <button
                  onClick={handleCertificateSubmit}
                  className="px-8 rounded-md bg-[#e5f2f4]"
                >

                  {
                    isLoading ?
                      <Loader /> : 'Upload'
                  }
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="flex pl-8 text-xs">
          {/* Existing code */}

          <button
            type="button"
            className="btn btn-primary flex items-center text-[#002F36] font-semibold"
            onClick={handleAddRow}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            add more
          </button>
        </div>

        <div className="flex justify-between max-w-5xl mt-8  mx-5">
          <div>
            <p className="text-indigo-900 text-xs font-normal border border-solid border-[#E3ECED] shadow-[0px,1px,2px,#B5B5B5] rounded-sm py-2 px-6 bg-[#E3ECED] inline-block ">
              Cancel
            </p>
          </div>
          <div className="flex gap-x-2">
            <button
              className="text-indigo-900 text-xs font-normal border border-solid border-[#E3ECED] shadow-[0px,1px,2px,#B5B5B5] rounded-sm py-2 px-6 bg-[#E3ECED] inline-block"
              onClick={() => {
                handleSubmit();
                const arr = [...draftedTabs];
                if (arr.indexOf(1) === -1) {
                  arr.push(7);
                }
                setDraftedTabs([...arr]);
                setSelectedTab(8);
              }}
            >
              Save as Draft
            </button>
            <button
              className="text-white text-xs  font-normal border border-solid border-[#E3ECED] shadow-[0px,1px,2px,#B5B5B5] rounded-sm py-2 px-6 bg-[#008296] inline-block "
              onClick={() => {
                handleSubmit();
                setSelectedTab(8);
              }}
            >
              Save And Finish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAwards;
