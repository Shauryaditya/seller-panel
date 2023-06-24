import React, { useEffect, useState } from 'react'
import AddQuantityDiscount from './AddQuantityDiscount';
const BASE_URL = "https://two1genx.onrender.com";
const InventoryItem = ({ id, checkedItems, setCheckedItems, setSelectAll, data, dataLength }) => {
    // state for tokem
    const [accessToken, setAccessToken] = useState(null)
    useEffect(() => {
        const token = localStorage.getItem('access_token')
        setAccessToken(token)
    }, [])
    console.log(data)
    console.log(checkedItems);
    useEffect(() => {
        setShippingCost({
            list_price: data.list_price,
            max_retail_price: data.max_retail_price
        })
        setBussinessCost(data.business_price)
        setQty(data.qty_available)
    }, [])
    // state for popup modal
    const [isChecked, setIsClicked] = useState(false)
    const onClose = () => {

        setIsClicked(false);
    }
    // handling Checkbox 
    const handleCheckboxChange = (event, id) => {

        const itemId = id;
        const isChecked = event.target.checked;
        const updatedCheckedItems = isChecked
            ? [...checkedItems, itemId]
            : checkedItems.filter((item) => item !== itemId);

        setCheckedItems(updatedCheckedItems);
        setSelectAll(updatedCheckedItems.length === dataLength);

    };

    const [selectedOption, setSelectedOption] = useState('option');

    const [shippingCost, setShippingCost] = useState({
        list_price: '',
        max_retail_price: ''
    })

    const handleChangePrice = (event) => {
        const { name, value } = event.target;
        setShippingCost((preValue) => {
            return { ...preValue, [name]: value }
        })
        console.log(shippingCost);
    }

    // shipping cost state 
    const [business_price, setBussinessCost] = useState('')
    // bussiness cost state

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    }
    // Udating bussiness price to database
    const handleBussinessPrice = (e, id, accessToken) => {
        e.preventDefault();
        const data = {
            business_price: business_price // replace with the actual new price_shipping_cost
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
            body: JSON.stringify(data)
        };

        fetch(`${BASE_URL}/v1/inventory/edit/${id}`, requestOptions)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));

        console.log(business_price);

    }
    const handlePriceShippingCost = (e, id, accessToken) => {
        console.log(id);
        e.preventDefault();
        const data = {
            list_price: shippingCost.list_price,
            max_retail_price: shippingCost.max_retail_price // replace with the actual new price_shipping_cost
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
            body: JSON.stringify(data)
        };

        fetch(`${BASE_URL}/v1/inventory/edit/${id}`, requestOptions)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));

    }

    const [qty_available, setQty] = useState()
    const handleQuantity = (e, accessToken) => {
        setQty(e.target.value)
        console.log(e.target.value);
        const data = {
            qty_available: e.target.value
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(data)
        };

        fetch(`${BASE_URL}/v1/inventory/edit/${id}`, requestOptions)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));

    }

    // if (!data) {
    //     return null
    // }
    return (

        <tr
            className="border-b bg-white">
            <td className="w-4 p-4">
                <div className="flex items-center">
                    <input
                        checked={checkedItems.includes(id)}
                        onChange={(event) => handleCheckboxChange(event, id)}
                        id="checkbox-table-search-1" type="checkbox" className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 " />
                    <label className="sr-only">checkbox</label>
                </div>
            </td>
            <td>
            </td>
            <td scope="row" className="whitespace-nowrap px-2 py-4 font-medium text-gray-900">{data.status}</td>
            <td className="px-2 py-4 whitespace-nowrap">
                <div className=' min-w-[60px]'>
                    {data.product_images[0]?.main_img && <img className='w-20 aspect-square' src={data.product_images[0]?.main_img} />}
                </div>
            </td>
            <td className="px-2 py-4">
                <p className='text-teal-500 font-normal '>
                    {data.product[0]?.product_sku}
                </p>
                <p className='text-xs text-gray-600 font-normal uppercase'>New</p>
            </td>
            <td className="px-2 py-4">
                <div className='min-w-[150px]'>
                    <p className='text-teal-500 font-normal text-sm'>{data.product[0]?.item_name}</p>
                    <p className='text-xs text-gray-600 font-normal uppercase'>{data.product[0]?.product_external_id}</p>
                </div>
            </td>
            <td className="px-2 py-4">
                <div>
                    <p className='text-xs text-teal-500 font-normal'>{data?.createdAt}</p>
                    <p className='text-xs text-gray-600 font-normal uppercase'>{data?.updatedAt}</p>
                </div>
            </td>
            <td>
                <div className='flex justify-center '>
                    <input
                        onChange={(e) => handleQuantity(e, accessToken)}
                        type='number' min='0' value={qty_available} className='w-14  border rounded py-2  text-xs text-gray-900 text-center font-normal' />
                </div>
            </td>
            <td className="px-2 py-4"></td>
            <td className="px-2 ">
                <div className='my-1 px-2'>
                    <form onSubmit={(e) => handlePriceShippingCost(e, id, accessToken)}>
                        <div className='flex flex-col '>
                            <p className='text-teal-500 font-normal whitespace-nowrap block' >List Price</p>
                            <input
                                onChange={handleChangePrice}
                                value={shippingCost.list_price}

                                name='list_price'
                                autoComplete='off'
                                type='number' min='0' className=' px-2 py-1 outline-0 border border-solid border-gray-300 rounded-md shadow-[0px_1px_2px_rgba(15,17,17,0.15)]' />
                        </div>
                        <div className='flex flex-col '>
                            <p className='text-teal-500 font-normal whitespace-nowrap ' >Max Retail Price</p>
                            <input
                                onChange={handleChangePrice}
                                value={shippingCost.max_retail_price}

                                name='max_retail_price'
                                autoComplete='off'
                                type='number' min='0' className=' px-2 py-1 outline-0 border border-solid border-gray-300 rounded-md shadow-[0px_1px_2px_rgba(15,17,17,0.15)]'
                            />

                        </div>
                        <button type='submit' className='py-1 px-4 rounded my-1 bg-teal-500 text-white'>Update</button>
                    </form>
                </div>
            </td>
            <td className=''>

                <div
                    className='px-2'>
                    <form onSubmit={(e) => handleBussinessPrice(e, id, accessToken)}>
                        <input
                            onChange={(e) => setBussinessCost(e.target.value)}
                            value={business_price}
                            type='number' min='0' className='my-2 px-2 py-1 outline-0 border border-solid border-gray-300 rounded-md shadow-[0px_1px_2px_rgba(15,17,17,0.15)]' />

                    </form>
                    <div
                        onClick={() => {
                            setIsClicked(true)
                        }}
                        className='cursor-pointer relative'>
                        <p className='text-teal-500 text-end'>Add quantity</p>
                        <p className='text-teal-500 text-end'>discounts</p>


                    </div>
                    {isChecked &&
                        <AddQuantityDiscount
                            onClose={onClose}
                            bussinessPrice={data?.business_price}
                            id={id}
                            data={data}
                        />
                    }
                </div>
            </td>
            <td className='px-2 py-4'>
                <a href='/'>
                    <select
                        className='bg-white rounded-md shadow-[0px_2px_5px_rgba(15,17,17,0.15)] px-4 py-1 outline-none'
                        onChange={handleOptionChange}
                    >
                        <option value="option">Edit</option>
                        <option value="Orange">Orange</option>
                        <option value="Radish">Radish</option>
                        <option value="Cherry">Cherry</option>
                    </select>
                </a>
            </td>
        </tr>
    )
}

export default InventoryItem