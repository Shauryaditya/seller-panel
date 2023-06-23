import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
// import { useRouter } from 'next/navigation'
const BASE_URL = "https://two1genx.onrender.com";
const ProductCategories = () => {
  const router = useRouter()
  // State for selected parentlistid
  const [selectedParentId, setSelectedParentId] = useState("");
  // State for selected parentlistid
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState("");
  // state for selected childlist
  const [selectedChildId, setSelectedChildId] = useState("");
  const parentListRef = useRef(null);
  const subCategoryListRef = useRef(null);
  const childListRef = useRef(null);
  const handleSelect = (e) => {
    if (parentListRef.current) {
      const selectedOption = Array.from(parentListRef.current.options).find(
        (option) => option.value === e.target.value
      );
      if (selectedOption && selectedOption.dataset) {
        setSelectedParentId(selectedOption.dataset.id);
      }
    }
    if (subCategoryListRef.current) {
      const selectedOption = Array.from(
        subCategoryListRef.current.options
      ).find((option) => option.value === e.target.value);
      if (selectedOption && selectedOption.dataset) {
        setSelectedSubCategoryId(selectedOption.dataset.id);
      }
    }
    if (childListRef.current) {
      console.log("hii");
      const selectedOption = Array.from(childListRef.current.options).find(
        (option) => option.value === e.target.value
      ); setFormData
      if (
        selectedOption &&
        selectedOption.dataset &&
        selectedOption.dataset.id
      ) {
        setSelectedChildId(selectedOption.dataset.id);
      }
    }
  };

  // State for parentlist data
  const [parentList, SetParentList] = useState([]);
  useEffect(() => {
    fetch(
      `${BASE_URL}/v1/categories/get?filter[category_type][$eq]=parent&limit=500`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        SetParentList(data.categoryList);
      });
  }, []);

  // State for Sub Category list
  const [subCategoryList, setSubCategoryList] = useState([]);

  useEffect(() => {
    if (selectedParentId) {
      fetch(
        `${BASE_URL}/v1/categories/get?filter[parent_category_id][$eq]=${selectedParentId}&filter[category_type][$eq]=sub`
      )
        .then((res) => res.json())
        .then((data) => {
          setSubCategoryList(data.categoryList);
          console.log(data.categoryList);
        });
    } else {
      setSubCategoryList([]);
    }
  }, [selectedParentId]);
  // State for Child Category list
  const [childCategoryList, setChildList] = useState([]);
  useEffect(() => {
    if (selectedSubCategoryId) {
      fetch(
        `${BASE_URL}/v1/categories/get?filter[sub_category_id][$eq]=${selectedSubCategoryId}&[category_type]=child`
      )
        .then((res) => res.json())
        .then((data) => {
          setChildList(data.categoryList);
          console.log(data.categoryList);
        });
    } else {
      setSubCategoryList([]);
    }
  }, [selectedSubCategoryId]);

  // state for form data
  const [formData, setFormData] = useState({
    parent_category: "",
    sub_category: "",
    child_category: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((preValue) => {
      return { ...preValue, [name]: value };
    });
  };
  // handling form data
  const handleSubmit = (e) => {
    e.preventDefault();
    {
      const attributeData = {
        id: selectedChildId
      };

      const queryString = new URLSearchParams(attributeData).toString();
      // Redirect to the next page with the data in the query string
      router.push(`/add-product?${queryString}`)
    }

  }
  console.log(formData);
  console.log("parent", selectedParentId);
  console.log("sub", selectedSubCategoryId);
  console.log("child", selectedChildId);

  return (
    <div className="max-w-2xl mx-auto text-xs px-10">
      {/* // select product category */}
      <div class="flex justify-center pt-10">
        <div class="flex flex-col ">
          <h1 class="text-3xl text-[#002F36]">Select a product category.</h1>
          <p class="text-[#002F36] pt-6">
            Choosing the best product type ensures that you see the most
            appropriate data fields for your product. Browse the product types
            directly or use search.
            <a href="" class="text-[#008296]">
              See if your product already exists on our site.
            </a>
          </p>
        </div>
      </div>

      <div class="flex flex-col justify-center mx-auto pt-6">
        <label for="" class="text-l text-[#002F36] font-bold pb-1.5">
          Favourites
        </label>
        <input
          id=""
          disabled
          class="border-2 rounded-md p-2"
          type="text"
          name=""
          placeholder="You haven't added any favourite categories yet."
        />
      </div>
      {/* // search section */}
      <div class="flex flex-col mx-auto justify-center pt-4 ">
        <div class="flex flex-row place-content-between">
          <label for="" class="font-bold text-[#002F36] ">
            Search
          </label>
          <a href="" class="text-[#008296]">
            What is a Product Type?
          </a>
        </div>
        <div class="flex flex-row justify-center">
          <input
            id=""
            v-model="searchCategoryText"
            class="border-2 rounded-l-md p-2 w-full"
            type="text"
            name=""
            placeholder="Search to select category"
            input=""
          />

          <button class="bg-[#FAFAFA] w-14 flex justify-center items-center border-r-2 border-y-2 rounded-r-md">
            <svg
              class="hover:scale-150 active:scale-100 duration-700"
              width="22px"
              height="22px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10 5C7.23858 5 5 7.23858 5 10C5 12.7614 7.23858 15 10 15C11.381 15 12.6296 14.4415 13.5355 13.5355C14.4415 12.6296 15 11.381 15 10C15 7.23858 12.7614 5 10 5ZM3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 11.5719 16.481 13.0239 15.6063 14.1921L20.7071 19.2929C21.0976 19.6834 21.0976 20.3166 20.7071 20.7071C20.3166 21.0976 19.6834 21.0976 19.2929 20.7071L14.1921 15.6063C13.0239 16.481 11.5719 17 10 17C6.13401 17 3 13.866 3 10Z"
                  fill="#002F36"
                ></path>
              </g>
            </svg>
          </button>
        </div>
      </div>
      {/* Search data */}
      <div class="flex flex-col mx-auto justify-center pt-4 ">
        <div class="flex flex-row place-content-between">
          <label for="" class="font-bold text-[#002F36] text-l">
            Browse
          </label>
          <a href="" class="text-[#008296]">
            What is a Product Type?
          </a>
        </div>
        <div class="text-l font-bold text-[#008493] border-2 p-2">
          Select a category
        </div>
        <div className="flex flex-col">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex flex-wrap gap-5 my-5">
              <div className="flex items-center justify-center">
                <p className="pt-3">Category:</p>
              </div>
              <div className="w-1/5  flex flex-col">
                <p className="w-fit text-xs text-gray-900  py-1 uppercase">
                  Selected Parent Categories
                </p>
                <input
                  onChange={(e) => {
                    handleSelect(e);
                    handleChange(e);
                  }}
                  name="parent_category"
                  value={formData.parent_category}
                  autoComplete="off"
                  list="parentList"
                  className="h-8 my-5 px-4 outline-0 border border-solid border-gray-200 rounded-md"
                  type="text"
                />
                <datalist
                  ref={parentListRef}
                  id="parentList"
                  className="bg-white mt-2 absolute z-10"
                >
                  {parentList.map((list) => (
                    <option
                      key={list._id}
                      value={list.category_name}
                      data-id={list._id}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                    >
                      {list.category_name}
                    </option>
                  ))}
                </datalist>
              </div>
              <div className="w-1/5  flex flex-col">
                <p className="w-fit text-xs text-gray-900  py-1 uppercase ">
                  Select Sub-Categories
                </p>
                <input
                  onChange={(e) => {
                    handleSelect(e);
                    handleChange(e);
                  }}
                  list="sub-category-list"
                  name="sub_category"
                  value={formData.sub_category}
                  disabled={subCategoryList.length === 0}
                  autoComplete="off"
                  className=" h-8 my-5 px-4 outline-0 border border-solid border-gray-200 rounded-md"
                  type="text"
                />
                <datalist
                  ref={subCategoryListRef}
                  id="sub-category-list"
                  className="bg-white mt-2 absolute z-10"
                >
                  {subCategoryList &&
                    subCategoryList.map((list) => (
                      <option
                        key={list._id}
                        value={list.category_name}
                        data-id={list._id}
                        class="p-2 cursor-pointer hover:bg-gray-100"
                      ></option>
                    ))}
                </datalist>
              </div>
              <div className="w-1/5  flex flex-col">
                <p className="w-fit text-xs text-gray-900  py-1 uppercase">
                  Select Child Categories
                </p>
                <input
                  onChange={(e) => {
                    handleSelect(e);
                    handleChange(e);
                  }}
                  name="child_category"
                  value={formData.child_category}
                  disabled={subCategoryList.length === 0}
                  autoComplete="off"
                  list="childList"
                  className="h-8 my-5 px-4 outline-0 border border-solid border-gray-200 rounded-md"
                  type="text"
                />
                <datalist
                  ref={childListRef}
                  id="childList"
                  className="bg-white mt-2 absolute z-10"
                >
                  {childCategoryList.map((list) => (
                    <option
                      key={list._id}
                      value={list.category_name}
                      data-id={list._id}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                    >
                      {list.category_name}
                    </option>
                  ))}
                </datalist>
              </div>
            </div>
            <div className="flex justify-between max-w-5xl  mx-5 py-5">
              <div>
                <p className="text-indigo-900 text-xs font-normal border border-solid border-[#E3ECED] shadow-[0px,1px,2px,#B5B5B5] rounded-sm py-2 px-6 bg-[#E3ECED] inline-block ">
                  Cancel
                </p>
              </div>
              <div className="flex gap-x-2">
                <button
                  className={`text-white text-xs  font-normal border border-solid border-[#E3ECED] shadow-[0px,1px,2px,#B5B5B5] rounded-sm py-2 px-6 bg-[#008296] inline-block ${selectedChildId ? 'pointer-events-auto' : 'pointer-events-none'}`}
                  type="submit"
                >
                  Next
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;
