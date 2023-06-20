import React, { useState } from 'react'
const BASE_URL = "https://two1genx.onrender.com";
const FormComponet1 = (props) => {
    const { formData, setFormData, selectedTab, setSelectedTab } = props
    console.log("formdata", formData);
    console.log("selectedTab", selectedTab);
    const [selectedFile, setSelectedFile] = useState(null);
    const [formState, setFormState] = useState(formData)

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormState((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }

    // image upload to cloudanary
    const uploadImage = async (base64EncodedImage) => {
        try {
            const response = await fetch(`${BASE_URL}/api/upload`, {
                method: 'POST',
                body: JSON.stringify({ data: base64EncodedImage }),
                headers: { 'Content-Type': 'application/json' },
            });

            const res = await response.json();
            console.log(res);

        } catch (err) {
            console.error(err);
        }
    };

    const handleFileChange = (event) => {
        const { name } = event.target
        const file = event.target.files[0];
        setSelectedFile(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            const binaryData = e.target.result;
            console.log(binaryData); // Log the binary data here

            uploadImage(file);
            // setFormState((prevFormData) => ({
            //     ...prevFormData,
            //     [name]: binaryData,
            // }));

        };
        reader.readAsBinaryString(file);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const obj = { ...formData };
        for (const [key, value] of Object.entries(formState)) {
            obj[key] = value;
        }
        setFormData(obj);
        setSelectedTab(2)
    };

    console.log(formData);
    return (
        <section>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className='max-w-2xl mx-auto flex flex-col'>
                        {/* //Brand Name */}
                        <div className='w-full flex flex-col   my-2'>
                            <label className=' text-sm text-gray-800 texl-left font-normal py-1'>What is your Brand name ?</label>
                            <input
                                required
                                className='w-full py-1 px-3 border border-solid border-gray-200 rounded-md'
                                type="text"
                                name='brand_name'
                                value={formState?.brand_name}
                                onChange={handleInputChange}
                            />
                        </div>
                        {/* // Brand Logo */}
                        <div className='w-full flex flex-col   my-2'>
                            <label className=' text-sm text-gray-800 texl-left font-normal py-1'>Brand Logo </label>
                            <input
                                className='w-full py-1 px-3 border border-solid border-gray-200 rounded-md'
                                type="file"
                                name='brand_logo'
                                onChange={handleFileChange}
                            />
                        </div>
                        {/* // Brand Description */}
                        <div className='w-full flex flex-col   my-2'>
                            <label className=' text-sm text-gray-800 texl-left font-normal py-1'>Description name ?</label>
                            <textarea
                                required
                                className='w-full py-1 px-3 border border-solid border-gray-200 rounded-md'
                                type="text"
                                name='brand_description'
                                value={formState?.brand_description}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className='w-full flex flex-col   my-2'>
                            <label className=' text-sm text-gray-800 texl-left font-normal py-1'>Select the trademark office associated with your brand</label>
                            <input
                                required
                                className='w-full py-1 px-3 border border-solid border-gray-200 rounded-md'
                                type="text"
                                name='trademark_office'
                                value={formState?.trademark_office}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className='w-full flex flex-col   my-2'>
                            <label className=' text-sm text-gray-800 texl-left font-normal py-1'>Enter the trademark registration number</label>
                            <input
                                required
                                minLength='10'
                                maxLength='10'
                                className='w-full py-1 px-3 border border-solid border-gray-200 rounded-md'
                                type="text"
                                name='trademark_reg_no'
                                value={formState?.trademark_reg_no}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='w-full flex flex-col my-2'>
                            <label className='text-sm text-gray-800 text-left font-normal py-1'>Select the status of your Trademark</label>
                            <div className='w-fit flex gap-x-2 py-2'>
                                <input

                                    className='w-4 h-4 py-1 px-3 border border-solid border-gray-200 rounded-md'
                                    type="radio"
                                    name='trademark_status'
                                    onChange={handleInputChange}
                                    value='registered'
                                // Assign a unique name to the radio button group
                                />
                                <label className='text-sm text-gray-800 text-left font-normal'>Register</label>
                            </div>
                            <div className='w-fit flex gap-x-2 py-2'>
                                <input

                                    className='w-9 h-4 py-1 px-3 border border-solid border-gray-200 rounded-md'
                                    type="radio"
                                    name='trademark_status'
                                    value='pending'
                                    onChange={handleInputChange}// Assign the same name to the second radio button group
                                />
                                <div>

                                    <label className='block text-sm text-gray-800 text-left font-normal'>Pending</label>
                                    <p className='text-xs text-gray-800 text-left'>
                                        The following statuses are acceptable for trademarks pending registration: Send to Vienna Codification, New
                                        Application, Formalities Check Pass, Marked for exam, Objected, Exam Reported Issue, Adv. Before accepted,
                                        Accepted and advertised and Opposed</p>
                                </div>
                            </div>
                        </div>
                        {
                            formState?.trademark_status === 'registered' &&
                            <div className='w-full flex flex-col my-2'>
                                <label className='text-sm text-gray-800 text-left font-normal py-1'>Select the status of your Trademark</label>
                                <div className='w-fit flex gap-x-2 py-2 items-center'>
                                    <input

                                        className='w-4 h-4 py-1 px-3 border border-solid border-gray-200 rounded-md'
                                        type="radio"
                                        name='trademark_type'
                                        value='word mark'
                                        onChange={handleInputChange}
                                    // Assign a unique name to the radio button group
                                    />
                                    <label className='text-sm text-gray-800 text-left font-normal'>Word Mark</label>
                                </div>
                                <div className='w-fit flex items-center gap-x-2 py-2'>
                                    <input

                                        className='w-4 h-4 py-1 px-3 border border-solid border-gray-200 rounded-md'
                                        type="radio"
                                        name='trademark_type'
                                        value='device mark'
                                        onChange={handleInputChange}// Assign the same name to the second radio button group
                                    />
                                    <label className='text-sm text-gray-800 text-left font-normal'>Device Mark</label>
                                </div>
                            </div>
                        }

                    </div>
                    <div className='max-w-2xl mx-auto'>
                        <div>
                            <h1 className='text-lg text-[#002F36]  font-bold py-2'>Product Infor­mation</h1>
                            <h3 className='text-sm text-[#002F36] font-semibold'>Product Images</h3>
                            <p className='text-xs text-gray-700 font-normal py-1'>Upload one or more images of your product or product packaging that clearly shows your trademark name<span className='text-teal-500'> permanently affixed</span> to the item.</p>
                            <p className='text-xs text-gray-700 font-normal py-1'>The images must show the product that you want to protect through Brand Registry. Do not upload images that are computer generated.
                            </p>
                        </div>
                        <div className='h-40 bg-[#FAFAFA] flex justify-center items-center cursor-pointer'>
                            <input
                                type="file"
                                name='product_images'
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className='flex justify-end gap-x-5 my-5'>
                            <button type='button' className='text-xs text-[#002F36] px-6 py-2 bg-[#E3ECED] border border-solid border-[#E3ECED] shadow-[0px,1px,2px,#B5B5B5] rounded-sm'>
                                Cancel
                            </button>
                            <button type='submit' className='text-xs text-white px-12 py-2 bg-[#008296] border border-solid border-[#E3ECED] shadow-[0px,1px,2px,#B5B5B5] rounded-sm'>
                                Next
                            </button>
                        </div>

                    </div>

                </form>
            </div>
        </section>
    )
}

export default FormComponet1