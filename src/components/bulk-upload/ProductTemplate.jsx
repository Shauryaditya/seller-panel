"use client";
import { data } from "autoprefixer";
import { Router } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import FileDownload from "react-file-download";
const BASE_URL = `https://two1genx.onrender.com`;

const ProductTemplate = () => {
  const [selectedParentId, setSelectedParentId] = useState("");
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState("");
  const parentListRef = useRef(null);
  const subCategoryListRef = useRef(null);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [childCategoryList, setChildCategoryList] = useState([]);
  const [parentList, setParentList] = useState([]);
  const [path, setPath] = useState("");
  const [childpath, setChildPath] = useState("");
  const [selectedChildId, setSelectedChildId] = useState("");
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedsubCategory, setSelectedSubCategory] = useState(null);
  const [selectedChildCategory, setSelectedChildCategory] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  const [showproducts, setShowProducts] = useState(false);
  // State for parentlist data

  useEffect(() => {
    fetch(
      `${BASE_URL}/v1/categories/get?filter[category_type][$eq]=parent&page=1&limit=500`
    )
      .then((res) => res.json())
      .then((data) => {
        setParentList(data.categoryList);
      });
  }, []);
  // console.log(parentList);

  const handleCategoryClick = (parentId, parentname) => {
    setSelectedParentId(parentId);
    setPath(parentname);
  };

  useEffect(() => {
    if (selectedParentId) {
      fetch(
        `https://two1genx.onrender.com/v1/categories/get?filter[parent_category_id][$eq]=${selectedParentId}&filter[category_type][$eq]=sub`
      )
        .then((res) => res.json())
        .then((data) => {
          setSubCategoryList(data.categoryList);
        });
    } else {
      setSubCategoryList([]);
    }
  }, [selectedParentId]);

  const handleSubcategoryClick = (SubcategoryId, subCategoryname) => {
    setSelectedSubcategoryId(SubcategoryId);
    const subPath = path + "/" + subCategoryname;
    setPath(subPath);
  };

  useEffect(() => {
    if (selectedSubcategoryId) {
      fetch(
        `https://two1genx.onrender.com/v1/categories/get?filter[sub_category_id][$eq]=${selectedSubcategoryId}&filter[category_type][$eq]=child&limit=500`
      )
        .then((res) => res.json())
        .then((data) => {
          setChildCategoryList(data.categoryList);
        });
    } else {
      setChildCategoryList([]);
    }
  }, [selectedSubcategoryId]);
  // console.log(childCategoryList);

  const handleChildCategoryClick = (childId, childCategoryname) => {
    setSelectedChildId(childId);
    const ChildPath = path + "/" + childCategoryname;
    setPath(ChildPath);
    setChildPath(childCategoryname);
  };
  const handleGenerateTemplate = async () => {
    const access_token = localStorage.getItem("access_token");
    try {
      const requestBody = {
        category_id: categoryId,
      };
      console.log(requestBody);
      const response = await fetch(
        " https://bulk-upload-excel.onrender.com/v1/excel/download-excel",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      const responseData = await response.json();

      if (response.ok && responseData.success) {
        const fileUrl = responseData.download_url;
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
      <div className="flex flex-row justify-between h-8 mx-4 hover:shadow-xl  p-1">
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
        <div className="">
          <p className="text-sm">Add a single product</p>
        </div>
      </div>
      <div className="max-w-6xl flex flex-col mx-4 gap-8">
        <div className="flex flex-col">
          <h1>Create your inventory file template</h1>
          <p className="text-sm">
            You can now generate customised inventory templates specific to the
            type of products you sell.
          </p>
        </div>
        <div className="flex flex-col">
          <h1>Key Benefits:</h1>
          <p className="text-sm">
            -List information for different types of products across multiple
            categories in one template
          </p>
        </div>
        <div className="">
          <p className="text-sm">
            You need to obtain approval from Amazon to list in certain product
            categories. To apply for approval for a particular category, click
            the corresponding link and follow the instructions to submit your
            application.
          </p>
        </div>
      </div>
      <div className="max-w-full flex flex-col mx-4 border  ">
        <div className="flex p-2 border bg-gray-100">
          <p className="font-bold ">
            Step 1: Select the types of products you want to sell
          </p>
        </div>
        <div className="mx-4">
          <p>Product Classifier</p>
        </div>

        <div className="w-auto flex border ">
          <div className="flex flex-col border-r">
            {parentList.map((category) => (
              <ul
                className={`w-80 p-2 border-r hover:bg-gray-100 ${
                  selectedCategory === category._id ? "bg-gray-100" : ""
                }`}
                key={category._id}
                onClick={() => {
                  handleCategoryClick(category._id, category.category_name);
                  setSelectedCategory(category._id);
                  setCategoryId(category._id);
                }}
              >
                <div className="flex justify-between">
                  <li>{category.category_name}</li>
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
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
              </ul>
            ))}
          </div>

          <div className="flex flex-col border-r  ">
            {subCategoryList.map((subCategory) => (
              <ul
                className={`w-80 p-2 border-r hover:bg-gray-100 ${
                  selectedsubCategory === subCategory._id ? "bg-gray-100" : ""
                }`}
                key={subCategory._id}
                onClick={() => {
                  handleSubcategoryClick(
                    subCategory._id,
                    subCategory.category_name
                  );
                  setSelectedSubCategory(subCategory._id);
                  setCategoryId(subCategory._id);
                }}
              >
                <div className="flex justify-between">
                  <li className="x">{subCategory.category_name}</li>
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
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
              </ul>
            ))}
          </div>
          <div className="  flex flex-col border-r ">
            {childCategoryList.map((childCategory) => (
              <ul
                className={`w-80 p-2 border-r hover:bg-gray-100 ${
                  selectedChildCategory === childCategory._id
                    ? "bg-gray-100"
                    : ""
                }`}
                key={childCategory._id}
                onClick={() => {
                  handleChildCategoryClick(
                    childCategory._id,
                    childCategory.category_name
                  );
                  setSelectedChildCategory(childCategory._id);
                  setCategoryId(childCategory._id);
                }}
              >
                <div className="flex justify-between">
                  <li>{childCategory.category_name}</li>
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
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
              </ul>
            ))}
          </div>
        </div>
        {selectedParentId && (
          <div>
            <div className="flex m-4">
              <p className="text-md font-bold">
                Summary of your selected products
              </p>
            </div>
            <div className="flex flex-col border shadow-md">
              <div className="flex gap-16 bg-gray-100 p-2">
                <p className="text-blue-400 text-sm">Remove all</p>
                <p className="text-sm">Selected Classifications</p>
                <p className="text-sm">Product Type</p>

                <p className="text-sm mx-16">Classifiaction Path</p>
              </div>

              <div className="flex gap-16 px-8 py-2 ">
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <p className="text-sm ml-8">{childpath}</p>
                <p className="text-sm ml-12">SERVICE CONTRACT</p>
                <p>{path}</p>
              </div>
            </div>

            <div className="flex justify-end rounded py-12 mx-4">
              <button
                className="px-6 py-2 bg-yellow-400 rounded "
                onClick={() => {
                  handleGenerateTemplate();
                }}
              >
                Generate Template
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTemplate;
