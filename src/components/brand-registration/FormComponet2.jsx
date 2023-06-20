import React, { useEffect, useState, useRef } from 'react'
const BASE_URL = "https://two1genx.onrender.com";
const FormComponet2 = (props) => {
    const { formData, setFormData, selectedTab, setSelectedTab } = props
    console.log(formData);
    const [categoryList, setCategoryList] = useState([])
    // fetching category list
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        const response = await fetch(`${BASE_URL}/v1/categories/get-populated`);
        const data = await response.json();
        setCategoryList(data.categoryList);
        console.log(data.categoryList);
    };
    // State for website url 
    const [inputValues, setInputValues] = useState(['']);
    const handleAddInput = () => {
        setInputValues([...inputValues, '']);

    };
    const handleInputUrl = (index, value) => {
        const updatedValues = [...inputValues];
        updatedValues[index] = value;
        setInputValues(updatedValues);
        setFormState((prevFormData) => ({
            ...prevFormData,
            url_brands_official_website: updatedValues
        }));
    };

    // selected category id state
    const selectedCategoryRef = useRef(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState([]);
    const handleSelect = (e) => {
        if (selectedCategoryRef.current) {
            const selectedOption = Array.from(selectedCategoryRef.current.options).find(
                (option) => option.value === e.target.value
            );
            if (selectedOption && selectedOption.dataset) {
                setSelectedCategoryId((preValue) => [...preValue, selectedOption.dataset.id]);
            }
        }

    }
    console.log(selectedCategoryId);
    // selected category state
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [formState, setFormState] = useState({})
    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormState((prevFormData) => ({
            ...prevFormData,
            [name]: newValue
        }));
    }
    const handleRemoveValue = (index) => {
        setSelectedCategoryId((prevSelectedValues) => {
            const updatedValues = [...prevSelectedValues];
            updatedValues.splice(index, 1);
            return updatedValues;
        });

        setSelectedCategory((prevSelectedValues) => {
            const updatedValues = [...prevSelectedValues];
            updatedValues.splice(index, 1);
            return updatedValues;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const obj = { ...formData, product_category_id: selectedCategoryId };
        for (const [key, value] of Object.entries(formState)) {
            obj[key] = value;
        }
        setFormData(obj)
        setSelectedTab(3)
    }
    console.log("formState", formState);
    console.log("formData", formData);
    return (
        <section>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className='max-w-2xl mx-auto flex flex-col'>
                        {/* // heading */}
                        <div>
                            <h1 className='text-lg text-[#002F36]  font-bold py-2'>Account Information</h1>
                            <p className='text-xs text-gray-700 font-normal py-1'>The following information will help us better understand your relation to the brand, soutrik.</p>
                            <p className='text-xs text-[#002F36] font-bold py-1'>Are you a seller or a vendor for the brand you're enrolling?</p>
                            <p className='text-xs text-gray-600  py-1'>To access <a className='text-teal-500'>selling benefits</a> , select all options that apply to your business relationship with Amazon</p>
                        </div>
                        {/* // seller checkbox */}
                        <div className='w-fit flex gap-x-2 py-2'>
                            <input

                                className='w-4 h-4 py-1 px-3 border border-solid border-gray-200 rounded-md'
                                type="checkbox"
                                name='is_seller'
                                onChange={handleInputChange}// Assign the same name to the second radio button group
                            />
                            <div>

                                <label className='block text-sm text-[#002F36] font-bold text-left  '>Seller</label>
                                <p className='text-xs text-gray-800 text-left py-2'>
                                    I use Amazon Seller Central to sell my products directly to customers.</p>
                            </div>
                        </div>
                        {/* if select seller checkboxx */}
                        {
                            formState.is_seller &&
                            <div >
                                <div>
                                    <p className='text-xs text-[#002F36] font-normal py-1'>Please select all the sellling accounts that manage the brand product </p>
                                    <p className='text-xs text-[#002F36] font-bold py-1'>Which selling accounts manage your brand product ?</p>

                                </div>

                                <div className='w-1/2 flex justify-between py-2'>
                                    <div className='w-fit flex  gap-x-2'>
                                        <input

                                            className='w-4 h-4 py-1 px-3 border border-solid border-gray-200 rounded-md'
                                            type="checkbox"
                                            name='trademark_status'
                                        // onChange={handleInputChange}
                                        // value='registered'
                                        // Assign a unique name to the radio button group
                                        />
                                        <label className='text-sm text-gray-800 text-left font-normal'>92384773824</label>
                                    </div>
                                    <p>soutrik</p>
                                </div>
                                <div className='w-fit flex gap-x-2 py-2'>
                                    <input

                                        className='w-4 h-4 py-1 px-3 border border-solid border-gray-200 rounded-md'
                                        type="checkbox"
                                        name='trademark_status'
                                    // value='pending'
                                    // onChange={handleInputChange}// Assign the same name to the second radio button group
                                    />
                                    <div>

                                        <label className='block text-sm text-[#002F36] font-medium text-left'>I don't see my selling account</label>
                                        <p className='text-xs text-gray-800 text-left py-2'>
                                            I use Amazon Seller Central to sell my products directly to customers.</p>
                                    </div>
                                </div>
                            </div>
                        }
                        {/* //vendor */}
                        <div className='w-fit flex gap-x-2 py-2'>
                            <input

                                className='w-4 h-4 py-1 px-3 border border-solid border-gray-200 rounded-md'
                                type="checkbox"
                                name='is_vendor'
                                onChange={handleInputChange}// Assign the same name to the second radio button group
                            />
                            <div>

                                <label className='block text-sm text-[#002F36] font-bold text-left  '>Vendor</label>
                                <p className='text-xs text-gray-800 text-left py-2'>
                                    I use Amazon Vendor Central to sell my products to Amazon as a third party.</p>
                            </div>
                        </div>
                        {/* // if select vendor */}
                        {
                            formState.is_vendor &&
                            <div className=' w-11/12 flex flex-col '>
                                <label className=' text-xs text-[#002F36] texl-left font-semibold py-1'>Please provide a vendor code associated with your brand</label>
                                <input
                                    required
                                    className='w-full py-1 px-3 border border-solid border-gray-200 '
                                    placeholder='ex-EXAZ6'
                                    type="text"
                                    name='vendor_code'
                                    value={formState?.vendor_code}
                                    onChange={handleInputChange}
                                />
                                <label className=' text-xs text-[#002F36] texl-left font-semibold py-1'>A vendor code is 5-digit Identifier that represent a vendor on Amazon </label>
                            </div>
                        }
                        {/* // Neither */}
                        <div className='w-fit flex gap-x-2 py-2'>
                            <input

                                className='w-4 h-4 py-1 px-3 border border-solid border-gray-200 rounded-md'
                                type="checkbox"
                                name='is_neither'
                                onChange={handleInputChange}
                            // Assign the same name to the second radio button group
                            />
                            <div>

                                <label className='block text-sm text-[#002F36] font-bold text-left  '>Neither</label>
                                <p className='text-xs text-gray-800 text-left py-2'>
                                    I do not have a business relationship with Amazon Seller Central or Amazon Vendor Central.</p>
                            </div>
                        </div>
                        {/* // select category that represent your brand */}
                        <div className=' w-11/12 flex flex-col '>
                            <label className=' text-xs text-[#002F36] texl-left font-bold py-1'>Select the product categories that represent your brand</label>
                            <select
                                ref={selectedCategoryRef}
                                id='categoryId'
                                className='w-full py-1 px-3 border border-solid border-gray-200 '
                                placeholder='ex-EXAZ6'
                                type="text"
                                // name='product_category'
                                // value={formState.product_category}
                                onChange={(event) => {
                                    handleSelect(event);
                                    const selectedValue = event.target.value;
                                    if (!selectedCategory.includes(selectedValue)) {
                                        setSelectedCategory((prevSelectedValues) => [...prevSelectedValues, selectedValue]);

                                    }
                                }}
                            >
                                {
                                    categoryList &&
                                    categoryList.map((item) => (
                                        <option
                                            key={item._id}
                                            data-id={item._id}
                                            value={item.category_name}>{item.category_name}</option>
                                    ))
                                }
                            </select>
                            {
                                selectedCategory.length !== 0 &&
                                <div className='flex gap-2 flex-wrap py-2'>
                                    {selectedCategory.map((value, index) => (
                                        <div key={index} className="text-xs text-[#002F36]  px-2 py-2 border border-solid border-[#008296]">
                                            <span>{value}</span>
                                            <button className='pl-4 ' type='button' onClick={() => handleRemoveValue(index)}>X</button>
                                        </div>
                                    ))}
                                </div>
                            }
                        </div>
                        {/* // Add Website Ulr */}
                        <div className=' w-11/12 flex flex-col py-2'>
                            <label className=' text-xs text-[#002F36] texl-left font-semibold py-1'>Enter the URL to your brand’s official website. <span className='text-[#879596] font-normal'>(optional)</span>  </label>
                            {inputValues.map((value, index) => (
                                <input
                                    className='w-full py-1 my-1 px-3 border border-solid border-gray-200 '
                                    key={index}
                                    value={value}
                                    onChange={(e) => handleInputUrl(index, e.target.value)}
                                />
                            ))}
                            <button
                                className='w-fit text-xs text-[#002F36] px-4 py-2 mt-2 bg-[#E3ECED] border border-solid border-[#E3ECED] shadow-[0px,1px,2px,#B5B5B5] rounded-sm'
                                type='button' onClick={handleAddInput}>Add More</button>
                        </div>
                        {/* // Form button */}
                        <div className='flex justify-between my-5'>
                            <div>
                                <button
                                    onClick={() => setSelectedTab(1)}
                                    type='button' className='text-xs text-[#002F36] px-12 py-2 bg-white border border-solid border-[#7FC2BB] shadow-[0px,1px,2px,#B5B5B5] rounded-sm'>
                                    Previous
                                </button>
                            </div>
                            <div className='flex gap-x-5'>

                                <button type='button' className='text-xs text-[#002F36] px-6 py-2 bg-[#E3ECED] border border-solid border-[#E3ECED] shadow-[0px,1px,2px,#B5B5B5] rounded-sm'>
                                    Cancel
                                </button>
                                <button type='submit' className='text-xs text-white px-12 py-2 bg-[#008296] border border-solid border-[#E3ECED] shadow-[0px,1px,2px,#B5B5B5] rounded-sm'>
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default FormComponet2