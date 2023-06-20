import React, { useState } from 'react'

const InventoryFilter = ({ handleFilter }) => {
    const [selectedOption, setSelectedOption] = useState('option');
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    }
    const [selectedValue, setSelectedValue] = useState('');

    const handleRadioChange = event => {

        setSelectedValue(event.target.value);
        handleFilter(event.target.value);

    };

    return (
        <section>
            <div className='flex flex-col'>
                <div className='flex flex-wrap items-center gap-5  px-4 py-2 mt-5 
            bg-[#E7E7E7] '>
                    <p>Filters:</p>
                    <div className='flex gap-x-2 py-3 items-center pr-5 border-r border-solid border-gray-300'>
                        <p>Listing Status:</p>
                        <form className='flex gap-x-2'>
                            <div className="flex items-center ">
                                <input
                                    id="disabled-radio-1"
                                    type="radio"
                                    name="radio"
                                    value="all"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                    onChange={(e) => handleRadioChange(e)}
                                    checked={selectedValue === 'all'}
                                />
                                <label className="ml-2 text-sm font-medium text-gray-900">All</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="disabled-radio-2"
                                    type="radio"
                                    name="radio"
                                    value="active"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                    onChange={(e) => handleRadioChange(e)}
                                    checked={selectedValue === 'active'}
                                />
                                <label className="ml-2 text-sm font-medium text-gray-900">Active</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="disabled-radio-3"
                                    type="radio"
                                    name="radio"
                                    value="inactive"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                    onChange={(e) => handleRadioChange(e)}
                                    checked={selectedValue === 'inactive'}
                                />
                                <label className="ml-2 text-sm font-medium text-gray-900">Inactive</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="disabled-radio-4"
                                    type="radio"
                                    name="radio"
                                    value="incomplete"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                    onChange={(e) => handleRadioChange(e)}
                                    checked={selectedValue === 'incomplete'}
                                />
                                <label className="ml-2 text-sm font-medium text-gray-900">Incomplete</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="disabled-radio-5"
                                    type="radio"
                                    name="radio"
                                    value="removed"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                    onChange={(e) => handleRadioChange(e)}
                                    checked={selectedValue === 'removed'}
                                />
                                <label className="ml-2 text-sm font-medium text-gray-900">Listing Removed</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="disabled-radio-6"
                                    type="radio"
                                    name="radio"
                                    value="suppressed"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                    onChange={(e) => handleRadioChange(e)}
                                    checked={selectedValue === 'suppressed'}
                                />
                                <label className="ml-2 text-sm font-medium text-gray-900">Search Suppressed</label>
                            </div>
                        </form>
                    </div>

                    <div className='flex gap-x-2'>
                        <p>Fulfilment Type:</p>
                        <form className='flex gap-x-2'>
                            <div className="flex items-center ">
                                <input id="disabled-radio-1" type="radio" name='radio' value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />
                                <label className="ml-2 text-sm font-medium text-gray-900">All</label>
                            </div>
                            <div className="flex items-center">
                                <input type="radio" name='radio' value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />
                                <label className="ml-2 text-sm font-medium text-gray-900 ">Amazon</label>
                            </div>
                            <div className="flex items-center">
                                <input type="radio" name='radio' value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />
                                <label className="ml-2 text-sm font-medium text-gray-900 ">Merchant</label>
                            </div>
                        </form>
                    </div>
                    <div className='flex'>
                        <select
                            value={selectedOption}
                            className='bg-[#F0F2F2] rounded-md shadow-[0px_2px_5px_rgba(15,17,17,0.15)] px-4 py-1 outline-none'
                            onChange={handleOptionChange}
                        >
                            <option value="option">Action Selected</option>
                            <option value="Orange">Orange</option>
                            <option value="Radish">Radish</option>
                            <option value="Cherry">Cherry</option>
                        </select>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default InventoryFilter