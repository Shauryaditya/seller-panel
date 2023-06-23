import React, { useEffect, useState } from "react";
import LeftSide from "./LeftSide";
import TableRow from "./TableRow";
const BASE_URL = "https://two1genx.onrender.com";
import generateArray from "./generateArray";
const Variations = (props) => {
  const {
    setSelectedTab,
    formData,
    setFormData,
    draftedTabs,
    setDraftedTabs,
    id,
    productId,
    variationsResponse
  } = props;

  const [selectedVariation, setSelectedVariation] = useState([]);
  console.log(selectedVariation);
  useEffect(() => {
    function trimTrueVariantAttributes(obj) {
      const trueKeys = [];

      for (let key in obj) {
        if (
          obj.hasOwnProperty(key) &&
          key.endsWith("_variant_attributes") &&
          obj[key] === true
        ) {
          const trimKey = key;
          trueKeys.push(trimKey);
        }
      }

      return trueKeys;
    }
    const selectValue = trimTrueVariantAttributes(formData);
    setSelectedVariation(selectValue);
  }, []);

  // state for varition attribute
  const [variation, setVariation] = useState([]);
  useEffect(() => {
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
        setVariation(products);
        console.log(products);
      })
      .catch((err) => console.error(err));
  }, [selectedVariation]);

  // state for sale price
  const [isSaleClicked, setSaleClicked] = useState(false);
  // state for offer condition note
  const [isOfferClicked, setOfferClicked] = useState(false);

  // Initialize state variables for the color and style inputs
  const [colorInput, setColorInput] = useState("");
  const [styleInput, setStyleInput] = useState("");

  // Initialize state variables for the color and style arrays
  const [colorArray, setColorArray] = useState([]);
  const [styleArray, setStyleArray] = useState([]);

  /// Event handler for adding a color
  const addColor = () => {
    if (colorInput !== "") {
      if (!colorArray.includes(colorInput)) {
        setColorArray([...colorArray, colorInput]);
      }
    }

    setColorInput("");
  };
  const removeColor = (index) => {
    const newColorArray = [...colorArray];
    newColorArray.splice(index, 1);
    setColorArray(newColorArray);
  };

  // Event handler for adding a style
  const addStyle = () => {
    if (styleInput !== "") {
      if (!styleArray.includes(styleInput)) {
        setStyleArray([...styleArray, styleInput]);
      }
    }

    setStyleInput("");
  };
  const removeStyle = (index) => {
    const newArray = [...styleArray];
    newArray.splice(index, 1);
    setStyleArray(newArray);
  };

  const [isChecked, setIsChecked] = useState(false);
  // Handling tableheadcheckbox
  const handleTableHeadCheckbox = (e) => {
    setIsChecked(e.target.checked);
  };

  // combination data
  const [data, setData] = useState([]);
  // handling change of table row component
  const handleChange = (e, index) => {
    const { name, value, checked, type } = e.target;
    const name1 = selectedVariation[0]?.slice(0, -19)
    const name2 = selectedVariation[1]?.slice(0, -19)
    setData((prevData) => {
      const newData = [...prevData];
      if (type === "checkbox") {
        newData[index] = { ...newData[index], [name]: checked };
      } else {
        newData[index] = {
          ...newData[index],
          [name]: value,
          variation_name1: name1,
          variation_name2: name2,
        };
      }
      return newData;
    });
  };
  console.log(data);

  const handleAddVariation = async (variationData) => {
    const url = `${BASE_URL}/v1/products/add-variation`;
    const requestData = {
      parent_id: productId,
      variation_data: variationData,
    };
    console.log('variation', requestData);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      if (response.ok) {
        const responseData = await response.json();
        variationsResponse(responseData.added_products)
        console.log(responseData.added_products);
        setSelectedTab(10)
      }
      console.log(response);
      // Assuming the response contains a "message" field
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    let combination = generateArray(colorArray, styleArray);
    if (isChecked) {
      for (let obj of combination) {
        obj.isSelect = true;
      }
      setData(combination);
    }
    if (!isChecked) {
      for (let obj of combination) {
        obj.isSelect = false;
      }
      setData(combination);
    } else {
      setData(combination);
    }
  }, [colorArray, styleArray, isChecked]);
  // handling delete function
  const handleDelete = () => {
    const newData = [...data];
    for (let obj of newData) {
      if (obj.isSelect) {
        obj.style = "pointer-events-none opacity-50";
      }
    }
    setData(newData);
  };
  // handling unselect
  const handleUnselect = () => {
    const newData = [...data];
    for (let obj of newData) {
      if (obj.isSelect) {
        obj.style = "";
      }
    }
    setData(newData);
  };
  console.log(data);
  return (
    <main>
      <div className="flex text-xs">
        <LeftSide />
        <div className="w-9/12 flex flex-col">
          <section>
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
          </section>
          <section>
            <div>
              <div className="flex flex-row gap-4 border-b py-6 px-4">
                <p>Choose variation type : </p>

                {variation?.map((item) => {
                  return (
                    <>
                      <input
                        type="checkbox"
                        checked={selectedVariation?.includes(
                          item.attribute_slug
                        )}
                        disabled={
                          !selectedVariation?.includes(item.attribute_slug)
                        }
                      />
                      <label
                        className="flex items-center text-xs text-gray-900 font-normal"
                        htmlFor=""
                      >
                        {item.attribute_name}
                      </label>
                    </>
                  );
                })}
              </div>
            </div>
          </section>
          <section>
            <div className="flex flex-col">
              <div className="p-5">
                <h1 className="text-base text-blue-900 font-semibold">
                  List all of your variation types below
                </h1>
                <p className="text-sm font-normal mt-5">
                  For the fields below, list the variations that exist for your
                  products. For example, if you are selling Pirate Shirts in the
                  sizes Small, Medium and Large, and in the colours White and
                  Black, list all those terms. This is necessary even if you do
                  not carry every combination or are temporarily out of stock on
                  some. You can delete any invalid variations on the{" "}
                  <a href="" className="text-blue-400">
                    Manage Your Inventory (MYI)
                  </a>{" "}
                  page. See an example and{" "}
                  <a href="" className="text-blue-400">
                    Learn more
                  </a>{" "}
                </p>
              </div>
            </div>
          </section>
          {/* // add color and style section */}
          <section>
            <div>
              <div className={`flex flex-row px-2 py-3   ${selectedVariation[0] !== undefined && 'border border-solid border-gray-300'}`}>
                {
                  selectedVariation[0] !== undefined &&

                  <div className="w-1/2 flex gap-x-4 justify-center items-center">
                    <label className=" text-blue-900 capitalize">
                      {selectedVariation[0]?.slice(0, -19)} ?
                    </label>
                    <input
                      type="text"
                      className="px-2 py-2 border border-solid border-gray-300 rounded-sm shadow-[0px,1px,2px,#E6E6E6]"
                      value={colorInput}
                      onChange={(e) => setColorInput(e.target.value)}
                    />
                    <div
                      className=" text-blue-900 bg-[#E3ECED] rounded-sm py-2 px-6 shadow-[0px,1px,2px,#B5B5B5]"
                      onClick={addColor}
                    >
                      Add
                    </div>
                  </div>
                }
                <div className="w-1/2 flex justify-center gap-x-5">
                  {colorArray.map((color, index) => (
                    <div
                      className="flex justify-center items-center px-3 py-1 rounded-sm border border-solid border-gray-300  "
                      key={index}
                    >
                      <p className="text-base text-blue-900">{color}</p>

                      <svg
                        onClick={() => removeColor(index)}
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  ))}
                </div>

              </div>

              <div className={`flex flex-row px-2 py-3   ${selectedVariation[1] !== undefined && 'border border-solid border-gray-300'}`}>
                {
                  selectedVariation[1] !== undefined &&

                  <div className="w-1/2 flex gap-x-4 justify-center items-center">
                    <label className="text-base text-blue-900 capitalize">
                      {selectedVariation[1]?.slice(0, -19)} ?
                    </label>
                    <input
                      type="text"
                      className="px-2 py-2 border border-solid border-gray-300 rounded-sm shadow-[0px,1px,2px,#E6E6E6]"
                      value={styleInput}
                      onChange={(e) => setStyleInput(e.target.value)}
                    />
                    <div
                      className=" text-blue-900 bg-[#E3ECED] rounded-sm py-2 px-6 shadow-[0px,1px,2px,#B5B5B5]"
                      onClick={addStyle}
                    >
                      Add
                    </div>
                  </div>
                }
                <div className="w-1/2 flex justify-center gap-x-5">
                  {styleArray.map((style, index) => (
                    <div
                      className="flex justify-end items-center px-3 py-1 rounded-sm border border-solid border-gray-300 text-blue-900"
                      key={index}
                    >
                      <p className=" text-blue-900">{style}</p>
                      <svg
                        onClick={() => removeStyle(index)}
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          {/* //  */}
          <section>
            <div className="flex flex-col">
              <div className="p-5">
                <p className="text-sm">
                  Your variation child ASINs have been created. To complete your
                  listings, find the variation child listings in your inventory
                  and select ‘Edit’ to add an image for each and every variation
                  of child. Please note that each variation child listing
                  requires an image to be active on the Amazon website.
                </p>
              </div>
              <div className="flex justify-between bg-gray-100">
                <div className="flex gap-2 px-5 py-2">
                  <button
                    onClick={() => handleAddVariation(data)}
                    className="px-6 py-2 bg-blue-50 text-sm text-blue-900 shadow-[0px,1px,2px,#B5B5B5] rounded border border-solid border-blue-50 cursor-pointer"
                  >
                    Apply Changes
                  </button>
                  <button
                    onClick={() => handleDelete()}
                    className="px-6 py-2 bg-blue-50 text-sm text-blue-900 shadow-[0px,1px,2px,#B5B5B5] rounded border border-solid border-blue-50"
                  >
                    Delete Selected
                  </button>
                  <button
                    onClick={() => handleUnselect()}
                    className="px-6 py-2 bg-blue-50 text-sm text-blue-900 shadow-[0px,1px,2px,#B5B5B5] rounded border border-solid border-blue-50"
                  >
                    Unselected Selected
                  </button>
                </div>
                <div className="flex gap-2 px-5 py-2">
                  <button
                    onClick={() => setOfferClicked((preValue) => !preValue)}
                    className="px-6 py-2 bg-blue-50 text-sm text-blue-900 shadow-[0px,1px,2px,#B5B5B5] rounded border border-solid border-blue-50"
                  >
                    Offer Conditional Note
                  </button>
                  <button
                    onClick={() => setSaleClicked((preValue) => !preValue)}
                    className={`px - 6 py-2 bg-blue-50 text-sm text-blue-900 shadow-[0px,1px,2px,#B5B5B5] rounded border border-solid border-blue-50`}
                  >
                    Sale Price
                  </button>
                </div>
              </div>
            </div>
          </section>
          {/* Table  section */}
          <section>
            <div class="relative  shadow-md sm:rounded-lg">
              <div className="overflow-x-auto">
                {data.length !== 0 && (
                  <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                    <thead class="bg-gray-100 text-xs uppercase text-gray-700">
                      <tr>
                        <th scope="col" class="px-4 py-2">
                          <div class="flex items-center">
                            <input
                              checked={isChecked}
                              onChange={handleTableHeadCheckbox}
                              id="checkbox-all-search"
                              type="checkbox"
                              class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500"
                            />
                          </div>
                        </th>
                        <th scope="col" class="px-6 py-2 text-xs text-blue-900">
                          {selectedVariation[0]?.slice(0, -19)}
                        </th>
                        <th scope="col" class="px-6 py-2 text-xs text-blue-900">
                          {selectedVariation[1]?.slice(0, -19)}
                        </th>
                        <th scope="col" class="px-6 py-2 text-xs text-blue-900">
                          Seller Sku
                        </th>
                        <th scope="col" class="px-6 py-2 text-xs text-blue-900">
                          Product Id
                        </th>
                        <th scope="col" class="px-6 py-2 text-xs text-blue-900">
                          Product Id type
                        </th>
                        <th scope="col" class="px-6 py-2 text-xs text-blue-900">
                          Item Condition
                        </th>
                        <th scope="col" class="px-6 py-2 text-xs text-blue-900">
                          Your Price
                        </th>
                        <th scope="col" class="px-6 py-2 text-xs text-blue-900">
                          Quantity
                        </th>
                        <th scope="col" class="px-6 py-2 text-xs text-blue-900">
                          <div
                            className={`${isOfferClicked ? "block" : "hidden"}`}
                          >
                            Offer Condition Note
                          </div>
                        </th>
                        <th scope="col" class="px-6 py-2 text-xs text-blue-900">
                          <div
                            className={`${isSaleClicked ? "block" : "hidden"}`}
                          >
                            Sale Price
                          </div>
                        </th>
                        <th scope="col" class="px-6 py-2 text-xs text-blue-900">
                          <div
                            className={`${isSaleClicked ? "block" : "hidden"}`}
                          >
                            Offer Start Date
                          </div>
                        </th>
                        <th scope="col" class="px-6 py-2 text-xs text-blue-900">
                          <div
                            className={`${isSaleClicked ? "block" : "hidden"}`}
                          >
                            Offer End Date
                          </div>
                        </th>
                        <th scope="col" class="px-6 py-2 text-xs text-blue-900">
                          Image Upload
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <TableRow
                          key={index}
                          data={item}
                          index={index}
                          handleChange={handleChange}
                          isSaleClicked={isSaleClicked}
                          isOfferClicked={isOfferClicked}
                        />
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
            {/* // next tab */}

          </section>

        </div>
      </div>
    </main>
  );
};

export default Variations;
