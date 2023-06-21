import React, { useState, useEffect, useRef } from "react";
import LeftSide from "./LeftSide";
const BASE_URL = "https://two1genx.onrender.com";
const seller_id = "6468bcda3183f9f88c0e1ca8";
const ProductIdentity = (props) => {

  const { setSelectedTab, formData, setFormData, draftedTabs, setDraftedTabs, id, } = props;
  let accessToken = ''
  useEffect(() => {
    // Perform localStorage action
    let accessToken = localStorage.getItem("access_token");
    console.log(accessToken);
  }, [])
  console.log(formData);
  const [option, setOption] = useState("");
  const [variants, setVariants] = useState(null);
  const isDrafted = draftedTabs.includes(1);
  // state variables for form inputs
  const [formState, setFormState] = useState(formData);
  const [country, SetCountry] = useState([]);
  useEffect(() => {
    fetch(`${BASE_URL}/v1/country/all-country`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        SetCountry(data.data);
      });

    if (formData.has_variations) {
      setOption("yes");
    }
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const idToPass = searchParams.get("id");

    if (isDrafted) {
      setFormState(formData);
    }

    fetch(
      `${BASE_URL}/v1/category-attributes/get-populated?page=1&limit=500&filter[category_id][$eq]=${id}`
    )
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        const products = data.categoryList.flatMap((e) => {
          if (e.attribute_id.attribute_group_slug === "variant_attributes") {
            return e.attribute_id;
          } else {
            return [];
          }
        });
        setVariants(products);
        console.log(products);
      })
      .catch((err) => console.error(err));
  }, [option]);

  const handleOptionChange = (event) => {
    if (event.target.value === "yes") {
      setFormData((prevValues) => {
        return { ...prevValues, has_variations: true };
      });
    } else {
      setFormData((prevValues) => {
        return { ...prevValues, has_variations: false };
      });
    }

    setOption(event.target.value);
  };

  const countryIdRef = useRef(null);
  const brandIdRef = useRef(null);
  const [brandId, setBrandId] = useState('')
  const handleSelect = (e) => {
    if (countryIdRef.current) {
      const selectedOption = Array.from(countryIdRef.current.options).find(
        (option) => option.value === e.target.value
      );
      if (selectedOption && selectedOption.dataset) {
        setFormData((preValue) => {
          console.log(selectedOption.dataset.id);
          return { ...preValue, country_id: selectedOption.dataset.id };
        });
      }
    }

    if (brandIdRef.current) {
      const selectedOption = Array.from(brandIdRef.current.options).find(
        (option) => option.value === e.target.value
      );
      if (selectedOption && selectedOption.dataset) {
        setFormData((preValue) => {
          console.log(selectedOption.dataset.id);
          setBrandId(selectedOption.dataset.id);
          return { ...preValue, brand_id: selectedOption.dataset.id };
        });
      }
    }
  };
  // update state variable for input field on change
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      // Check if there are already two checkboxes selected
      if (
        checked &&
        Object.values(formState).filter((value) => value === true).length >= 2
      ) {
        return; // Ignore the checkbox selection
      }

      setFormState((prevValues) => ({
        ...prevValues,
        [name]: checked,
      }));
    } else {
      setFormState((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };
  const handleCancel = () => {
    window.location.href = '/seller-panel/catelog';
  }

  const handleSubmit = () => {
    const obj = formData;
    for (const [key, value] of Object.entries(formState)) {
      obj[`${key}`] = value;
    }
    setFormData({ ...obj });
  };

  // getting brand list
  const [brandList, setBrandList] = useState([]);
  useEffect(() => {
    fetch(`${BASE_URL}/v1/brand-registration/get_brand_by_seller_id_using_auth`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // Other headers if needed
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setBrandList(data);
        console.log("BrandList", data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  const [hasBrand, setHasBrand] = useState(true);

  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      setFormData((prevValues) => ({
        ...prevValues,
        has_brand: false,
        brand_id: ''
      }));
    } else {
      setFormData((prevValues) => ({
        ...prevValues,
        has_brand: true,
        brand_id: brandId
      }));
    }
    setHasBrand(!event.target.checked);
  };
  console.log(brandList);
  return (
    <main>
      <div className="flex">
        <LeftSide />
        <div className=" max-w-7xl mx-auto text-xs">
          <form>
            <div className="max-w-6xl mx-auto flex items-center bg-[#E5F2F4]">
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
            <div class="flex flex-col pl-8 py-5">
              <div className="flex flex-row gap-2">
                <h1 className="inline-flex h-auto items-center text-xs font-[700] text-[#002F36]">
                  Variations : &nbsp;{" "}
                </h1>

                <div className="flex flex-col">
                  <div className="flex flex-row  gap-4">
                    <p>Does this product have variants?</p>

                    <label>
                      <input
                        type="radio"
                        name="option"
                        value="yes"
                        checked={option === "yes"}
                        onChange={handleOptionChange}
                      />
                      Yes
                    </label>

                    <label>
                      <input
                        type="radio"
                        name="option"
                        value="no"
                        checked={option === "no"}
                        onChange={handleOptionChange}
                      />
                      No
                    </label>
                  </div>
                  {option === "yes" && (
                    <div className="flex flex-col pt-2">
                      <p>
                        Which of the variants is different across the product
                        variants?
                      </p>
                      <div className="flex flex-row flex-wrap gap-4 pt-2">
                        {variants?.map((item) => {
                          return (
                            <>
                              <input
                                type="checkbox"
                                checked={formState[item.attribute_slug] || ""}
                                name={item.attribute_slug}
                                onChange={handleChange}
                              />
                              <label htmlFor="">{item.attribute_name}</label>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {option === "no" && (
                    <div className="flex flex-row justify-around"></div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-left my-3 pl-8 ">
              <p className="inline-flex items-center text-xs font-[700] text-[#002F36]">
                Product sku :
              </p>

              <input
                id="name"
                placeholder="Product Sku"
                className=" ml-3 p-2 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-[#002F36] focus:bg-white "
                type="text"
                name="product_sku"
                value={formState.product_sku}
                onChange={handleChange}
              />
            </div>

            <div className="flex pt-4 pl-8">
              <div className="">
                <label class="inline-flex items-center text-xs font-[700] text-[#002F36]">
                  Product Id : &nbsp;{" "}
                  <abbr class="cursor-pointer" title="Item Name (aka Title)">
                    <img src="/img/svg/questionmark.svg" alt="" />
                  </abbr>
                </label>
                <input
                  type="text"
                  id="name"
                  name="product_external_id"
                  class="w-1/2 ml-3 bg-gray-100 bg-opacity-50 rounded border border-gray-300 p-2"
                  placeholder="product id"
                  value={formState.product_external_id}
                  onChange={handleChange}
                />
              </div>
              <div class="flex flex-row gap-1 w-1/4">
                <label className="flex items-center justify-center text-xs font-[700] text-[#002F36]">
                  Id type : &nbsp;{" "}
                </label>

                <select
                  name="product_external_id_type"
                  value={formState.product_external_id_type}
                  onChange={handleChange}
                  class="w-1/2 ml-3 bg-gray-100 bg-opacity-50 rounded border border-gray-300 p-2"
                >
                  <option
                    selected
                    className="p-2 cursor-pointer hover:bg-gray-100"
                  >
                    --Select
                  </option>
                  <option value="EAN">EAN</option>
                  <option value="GCID">GCID</option>
                  <option value="GTIN">GTIN</option>
                  <option value="UPC">UPC</option>
                  <option value="ASIN">ASIN</option>
                </select>
              </div>
            </div>

            <div class="flex flex-col pl-8">
              <div class="flex flex-row pt-6 gap-x-8">
                <label
                  class="inline-flex items-center text-xs font-[700] text-[#002F36]"
                  for="countryId"
                >
                  Country of origin : &nbsp;{" "}
                  <abbr class="cursor-pointer" title="">
                    <img src="/img/svg/questionmark.svg" alt="" />
                  </abbr>
                </label>
                <select
                  ref={countryIdRef}
                  id="countryId"
                  placeholder="Country Name"
                  name="country_name"
                  autoComplete="off"
                  className="ml-3 bg-gray-100 bg-opacity-50 rounded border border-gray-300 p-2"
                  onChange={(e) => {
                    handleSelect(e);
                  }}
                >
                  <option
                    selected
                    className="p-2 cursor-pointer hover:bg-gray-100"
                  >
                    --Select
                  </option>
                  {country.map((list) => (
                    <option
                      key={list.country_id} // Added a unique key prop for each option
                      data-id={list._id}
                      value={list.country_name} // Set the value to the corresponding country ID
                      className="p-2 cursor-pointer hover:bg-gray-100"
                    >
                      {list.country_name}
                    </option>
                  ))}
                </select>
              </div>
              <div class="flex flex-col xl:flex-row pt-6 gap-x-8">
                <label className="inline-flex items-center text-xs font-[700] text-[#002F36]">
                  Item Name (aka Title) : &nbsp;{" "}
                  <abbr class="cursor-pointer" title="Item Name (aka Title)">
                    <img src="/img/svg/questionmark.svg" alt="" />
                  </abbr>
                </label>
                <input
                  type="text"
                  id="name"
                  name="item_name"
                  class="ml-3 w-1/2 bg-gray-100 bg-opacity-50 rounded border border-gray-300 p-2"
                  placeholder="Item Name"
                  value={formState.item_name}
                  onChange={handleChange}
                />
              </div>
              <div class="flex flex-col pt-6 gap-x-2">


                <div className="flex flex-row">
                  <label class="inline-flex text-xs items-center font-[700] text-[#002F36]">
                    Brand Name : &nbsp;{" "}
                    <abbr
                      class="cursor-pointer"
                      title="Item Name (aka Title)"
                    ></abbr>
                  </label>
                  <select
                    disabled={!hasBrand}
                    ref={brandIdRef}
                    id="brandId"
                    onChange={(e) => {
                      handleSelect(e);
                    }}
                    name="brand_name"
                    class="ml-3 h-8 w-1/2 bg-gray-100 bg-opacity-50 rounded border border-gray-300 p-2"
                    placeholder="Brand Name"
                  >
                    <option
                      selected
                      className="p-2 cursor-pointer hover:bg-gray-100"
                    >
                      --Select
                    </option>
                    {
                      Array.isArray(brandList) &&
                      brandList.map((list) => (
                        <option
                          key={list._id} // Added a unique key prop for each option
                          data-id={list._id}
                          value={list.brand_name} // Set the value to the corresponding country ID
                          className="p-2 cursor-pointer hover:bg-gray-100"
                        >
                          {list.brand_name}
                        </option>
                      ))}
                  </select>
                </div>
                <div class="flex flex-col gap-x-8  pt-4">
                  <label class="text-[#002F36]" for="">
                    <input
                      className="check-box"
                      type="checkbox"
                      id="brand-checkbox"
                      checked={!hasBrand}
                      onChange={handleCheckboxChange}
                    />{" "}
                    &nbsp; This product does not have a brand name
                  </label>
                  <a class="text-[#008296]" href="">
                    Learn more about brand name policy
                  </a>
                </div>
              </div>

              <p class="text-[#002F36] font-[400] text-justify 2xl:px-48 py-4">
                To list your products after your brand is enrolled, enter the
                brand name exactly as you submitted it for brand approval, and
                specify a unique value for the Key Attribute that you selected
                in the brand registry application. You can always edit the
                product details later in Manage Inventory.
              </p>
            </div>

            <div className="flex justify-between max-w-5xl  mx-5 pl-8">
              <div>
                <p onClick={handleCancel}
                  className="text-indigo-900 text-xs font-normal border border-solid border-[#E3ECED] shadow-[0px,1px,2px,#B5B5B5] rounded-sm py-2 px-6 bg-[#E3ECED] inline-block ">
                  Cancel
                </p>
              </div>
              <div className="flex gap-x-2">
                <button
                  className="text-indigo-900 text-xs font-normal border border-solid border-[#E3ECED] shadow-[0px,1px,2px,#B5B5B5] rounded-sm py-2 px-6 bg-[#E3ECED] inline-block "
                  onClick={() => {
                    handleSubmit();
                    const arr = [...draftedTabs];
                    if (arr.indexOf(1) === -1) {
                      arr.push(1);
                    }
                    setDraftedTabs([...arr]);
                    setSelectedTab(2);
                  }}
                >
                  Save as Draft
                </button>
                <button
                  className="text-white text-xs  font-normal border border-solid border-[#E3ECED] shadow-[0px,1px,2px,#B5B5B5] rounded-sm py-2 px-6 bg-[#008296] inline-block "
                  onClick={() => {
                    handleSubmit();
                    setSelectedTab(2);
                  }}
                >
                  Save And Next
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ProductIdentity;
