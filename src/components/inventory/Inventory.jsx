import React, { useState, useEffect } from 'react'
import Varition from './Variation'
import InventoryItem from './InventoryItem'
import axios from '@/api/axios'
import InventoryTop from './InventoryTop'
import InventoryFilter from './InventoryFilter'
const BASE_URL = "https://two1genx.onrender.com";
const Inventory = () => {
    const [selectedOption, setSelectedOption] = useState('option')
    // Api data state
    // state for tokem

    const [inventory, setInventory] = useState([])
    async function fetchInventoryData(apiUrl, accessToken) {
        try {
            const response = await axios.get(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            const data = response.data;
            console.log(data.inventoryList);
            setInventory(data.inventoryList);
        } catch (error) {
            console.log(error);
            // Handle the error appropriately
        }
    }
    useEffect(() => {
        const token = localStorage.getItem('access_token')
        const apiUrl = `${BASE_URL}/v1/inventory/get-page?page=1&limit=20&sort[createdAt]=1`;
        fetchInventoryData(apiUrl, token);
    }, [])
    // For checkbox    
    const [checkedItems, setCheckedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const handleCheckboxChange = (event, id) => {
        if (id === "heading") {

            const checked = event.target.checked;
            setSelectAll(checked);
            setCheckedItems(checked ? inventory.map((item) => item._id) : []);
        }
    };

    // For filtering data
    const handleFilter = (filter) => {
        const token = localStorage.getItem('access_token')
        if (filter === 'active') {
            const apiUrl = `${BASE_URL}/v1/inventory/get-page?filter[status][$eq]=active&page=1&limit=20&sort[createdAt]=1`;
            fetchInventoryData(apiUrl, token);
        } else if (filter === 'inactive') {
            const apiUrl = `${BASE_URL}/v1/inventory/get-page?filter[status][$eq]=inactive&page=1&limit=20&sort[createdAt]=1`;
            fetchInventoryData(apiUrl, token);
        } else if (filter === 'incomplete') {
            const apiUrl = `${BASE_URL}/v1/inventory/get-page?filter[status][$eq]=draft&page=1&limit=20&sort[createdAt]=1`;
            fetchInventoryData(apiUrl, accessToken);
        } else if (filter === 'removed') {
            const apiUrl = `${BASE_URL}/v1/inventory/get-page?filter[status][$eq]=unlisted&page=1&limit=20&sort[createdAt]=1`;
            fetchInventoryData(apiUrl, token);
        } else if (filter === 'suppressed') {
            const apiUrl = `${BASE_URL}/v1/inventory/get-page?filter[status][$eq]=suppressed&page=1&limit=20&sort[createdAt]=1`;
            fetchInventoryData(apiUrl, token);
        } else {
            const apiUrl = `${BASE_URL}/v1/inventory/get-page?page=1&limit=20&sort[createdAt]=1`;
            fetchInventoryData(apiUrl, token);
        }
        console.log(filter);
    }

    return (
        <main className='max-w-screen-2xl mx-auto'>
            <div className='px-5'>
                <InventoryTop />
                {/* Search section */}
                <section>
                    <div className='flex flex-col mt-5'>
                        <div className='flex gap-x-5 items-center'>
                            <select
                                onChange={(e) => setSelectedOption(e.target.value)}
                                value={selectedOption}

                                className='bg-[#F7FAFA] rounded-md  px-4 py-1 outline-none'

                            >
                                <option
                                    defaultValue='selected'>Action on {checkedItems.length} Selected</option>
                                <option value="Orange">Orange</option>
                                <option value="Radish">Radish</option>
                                <option value="Cherry">Cherry</option>
                            </select>
                            <form className='flex items-center'>
                                <label className='flex items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                    </svg>

                                    <input type='text' className='outline-0' placeholder="" />
                                </label>
                                <button type='submit' className='bg-gray-800 text-white px-3 py-1 rounded-full
                 shadow-[0px_2px_5px_rgba(213,217,217,0.5)]'>Search</button>
                            </form>
                        </div>

                    </div>
                </section>
                {/* Filter section */}
                <InventoryFilter
                    handleFilter={handleFilter}
                />
                {/* inventory section */}
                <section>
                    <div className="relative overflow-x-auto shadow-md mt-2">
                        <table className="w-full text-left text-sm ">
                            <thead className="bg-[#F0F2F2] text-xs">
                                <tr>
                                    <th scope="col" className="p-4">
                                        <div className="flex items-center">
                                            <input
                                                checked={selectAll}
                                                onChange={(event) => handleCheckboxChange(event, "heading")}
                                                type="checkbox" className="h-4 w-4 rounded border-gray-300 bg-gray-100" />
                                            <label className="sr-only">checkbox</label>
                                        </div>
                                    </th>
                                    <th>

                                    </th>
                                    <th scope="col" className="px-2 py-3 text-teal-500 font-bold">Status</th>
                                    <th scope="col" className="px-2 py-3">img</th>
                                    <th scope="col" className="px-2 py-3">
                                        <div>
                                            <p className='text-teal-500 font-bold'>Sku</p>
                                            <p className='text-xs text-gray-600 font-normal'>Condition</p>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-3"> <div>
                                        <p className='text-teal-500 font-bold'>Product Name</p>
                                        <p className='text-xs text-gray-600 font-normal uppercase'>Asin</p>
                                    </div>
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        <div className='min-w-[90px]'>
                                            <p className='text-[#E47911] font-bold'>Date Created</p>
                                            <p className='text-xs text-gray-600 font-normal '>Status Changed Date</p>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-3 font-bold text-teal-500">Available</th>
                                    <th scope="col" className="px-2 py-3 font-bold"><p className='min-w-[80px]'>Free Preview</p></th>
                                    <th scope="col" className="px-2 py-3 text-teal-500 font-bold ">Price And Shipping Cost</th>
                                    <th scope="col" className="px-2 py-3 ">Bussines Price</th>
                                    <th scope="col" className="px-2 py-3 "><a className="inline-block px-4 py-2  bg-yellow-100 rounded-full break-normal" href="/">Save all</a></th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    inventory &&
                                    inventory.map((item) => (
                                        <InventoryItem
                                            key={item._id}
                                            id={item._id}
                                            checkedItems={checkedItems}
                                            setCheckedItems={setCheckedItems}
                                            selectAll={selectAll}
                                            setSelectAll={setSelectAll}
                                            data={item}
                                            dataLength={inventory.length}
                                        />
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>

                </section>
            </div>
        </main>
    )
}

export default Inventory
