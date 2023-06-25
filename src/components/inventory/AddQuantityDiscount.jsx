import React, { useEffect, useState, useRef } from 'react'
const BASE_URL = "https://two1genx.onrender.com";
const AddQuantityDiscount = ({ onClose, bussinessPrice, id, data }) => {

    // state for tokem
    const [accessToken, setAccessToken] = useState(null)
    useEffect(() => {
        const token = localStorage.getItem('access_token')
        setAccessToken(token)
    }, [])

    const { min_qty1, max_qty1, min_qty2, max_qty2, min_qty3, max_qty3, fixed_price1, fixed_price2, fixed_price3, percent_off1, percent_off2, percent_off3, business_discount_type } = data

    // state for percentage discount
    const [minMaxQty, setMinMaxQty] = useState({
        min_qty1: '',
        max_qty1: '',
        min_qty2: '',
        max_qty2: '',
        min_qty3: '',
        max_qty3: '',
        percent_off1: '',
        percent_off2: '',
        percent_off3: '',
        fixed_price1: '',
        fixed_price2: '',
        fixed_price3: ''
    })

    const handleMinMax = (e) => {
        const { name, value } = e.target;
        setMinMaxQty((preValue) => {
            return { ...preValue, [name]: value }
        })

    }
    // handling percentage off form and posting to api
    const handlePercentOff = (e, accessToken) => {
        e.preventDefault();
        const data = {
            min_qty1: minMaxQty.min_qty1,
            max_qty1: minMaxQty.max_qty1,
            min_qty2: Number(minMaxQty.max_qty1) + 1,
            max_qty2: minMaxQty.max_qty2,
            min_qty3: Number(minMaxQty.max_qty2) + 1,
            max_qty3: minMaxQty.max_qty3,
            percent_off1: minMaxQty.percent_off1,
            percent_off2: minMaxQty.percent_off2,
            percent_off3: minMaxQty.percent_off3,
            business_discount_type: 'percent'
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
    const handleFixedPrice = (e, accessToken) => {
        e.preventDefault();
        const data = {
            min_qty1: minMaxQty.min_qty1,
            max_qty1: minMaxQty.max_qty1,
            min_qty2: Number(minMaxQty.max_qty1) + 1,
            max_qty2: minMaxQty.max_qty2,
            min_qty3: Number(minMaxQty.max_qty2) + 1,
            max_qty3: minMaxQty.max_qty3,
            fixed_price1: minMaxQty.fixed_price1,
            fixed_price2: minMaxQty.fixed_price2,
            fixed_price3: minMaxQty.fixed_price3,
            business_discount_type: 'fixed'
        };
        console.log(data);
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
    useEffect(() => {
        if (business_discount_type === 'fixed') {
            setSelectedValue('fixed')
        } else {
            setSelectedValue('percent')
        }
        setMinMaxQty({
            min_qty1: min_qty1,
            max_qty1: max_qty1,
            min_qty2: min_qty2,
            max_qty2: max_qty2,
            min_qty3: min_qty3,
            max_qty3: max_qty3,
            percent_off1: percent_off1,
            percent_off2: percent_off2,
            percent_off3: percent_off2,
            fixed_price1: fixed_price1,
            fixed_price2: fixed_price2,
            fixed_price3: fixed_price3
        })
    }, [])
    const [selectedValue, setSelectedValue] = useState('percentoff');
    function handleRadioChange(event) {
        setSelectedValue(event.target.value);
        console.log(`Selected value: ${event.target.value}`);
        // Do something with the selected value...
    }
    return (
        <div
            // ref={modalRef}
            className='absolute z-10 right-0 max-w-lg px-4 pt-4 rounded border border-solid border-gray-400 bg-white'>
            <div className='flex justify-between'>
                <h2 className='font-bold text-base text-gray-900'>Quantity Discounts</h2>
                <div
                    onClick={() => onClose(id)}
                    className='cursor-pointer'
                ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>
            <div className='flex gap-x-1 mt-5'>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
                    </svg>

                </div>
                <div className='max-w-sm text-sm text-gray-900 font-normal'>
                    Quantity discounts refer to your business price. Your
                    business price will be set to the same as your regular
                    price of <span className='font-bold'>{bussinessPrice}</span>
                </div>
            </div>
            <div className='mt-5  border border-solid border-[#D5D9D9] rounded-t-lg'>
                <div className={`flex items-center p-2 rounded-t-lg ${selectedValue !== 'percent' && 'bg-gray-200'}`}>
                    <input
                        id="radio-1"
                        type="radio"
                        name="percent"
                        value="percent"
                        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300"
                        onChange={handleRadioChange}
                        checked={selectedValue === 'percent'}
                    />
                    <label htmlFor="radio-1" className="ml-2 text-sm font-medium text-gray-900">Percent off business price</label>
                </div>
                <form
                    onSubmit={(e) => handlePercentOff(e, accessToken)}
                    className={`px-2 ${selectedValue === 'percent' ? 'block' : 'hidden'}`}>
                    <div className='flex py-2 justify-around border-b-2 border-solid border-gray-300'>
                        <div className='flex gap-1'>
                            <p className='w-10'>Min QTY</p>
                            <input
                                onChange={handleMinMax}
                                name='min_qty1'

                                value={minMaxQty.min_qty1}
                                className='w-14 h-8 my-auto border  outline-0 border-solid  border-gray-400 shadow-[0px_0.963636px_1.92727px_rgba(15,17,17,0.15)] rounded' type='number' min='1' />
                        </div>
                        <div className='flex gap-1'>
                            <p className='w-10'>Max QTY</p>
                            <input
                                onChange={handleMinMax}
                                name='max_qty1'

                                value={minMaxQty.max_qty1}
                                className='w-14 h-8 my-auto border  outline-0 border-solid  border-gray-400 shadow-[0px_0.963636px_1.92727px_rgba(15,17,17,0.15)] rounded' type='number' min={Number(minMaxQty.min_qty1) + 1} />
                        </div>
                        <div className='flex gap-1'>
                            <p className='flex items-center mr-1'>get</p>
                            <input
                                onChange={handleMinMax}
                                name='percent_off1'
                                value={minMaxQty.percent_off1}
                                className='w-14 h-8 my-auto border outline-0 border-solid  border-gray-400 shadow-[0px_0.963636px_1.92727px_rgba(15,17,17,0.15)] rounded' type='number' min='1' />
                            <p className='flex items-center'>% off</p>
                        </div>
                        <div className='flex items-center'>
                            ₹ {minMaxQty.percent_off1 && Math.floor((Number(bussinessPrice) / 100) * Number(minMaxQty.percent_off1))}
                        </div>
                    </div>
                    <div className='flex py-2 justify-around border-b-2 border-solid border-gray-300'>
                        <div className='flex gap-1'>
                            <p className='w-10'>Min QTY</p>
                            <input
                                disabled
                                placeholder={minMaxQty.max_qty1 && Number(minMaxQty.max_qty1) + 1}
                                className='w-14 h-8 my-auto border outline-0 border-solid  border-gray-400 shadow-[0px_0.963636px_1.92727px_rgba(15,17,17,0.15)] rounded' type='number' />
                        </div>
                        <div className='flex gap-1'>
                            <p className='w-10'>Max QTY</p>
                            <input
                                onChange={handleMinMax}
                                name='max_qty2'
                                value={minMaxQty.max_qty2}

                                className='w-14 h-8 my-auto border outline-0 border-solid  border-gray-400 shadow-[0px_0.963636px_1.92727px_rgba(15,17,17,0.15)] rounded' type='number' min={Number(minMaxQty.max_qty1) + 1} />
                        </div>
                        <div className='flex gap-1'>
                            <p className='flex items-center mr-1'>get</p>
                            <input
                                onChange={handleMinMax}
                                name='percent_off2'

                                value={minMaxQty.percent_off2}
                                className='w-14 h-8 my-auto border outline-0 border-solid  border-gray-400 shadow-[0px_0.963636px_1.92727px_rgba(15,17,17,0.15)] rounded' type='number' min='1' />
                            <p className='flex items-center'>% off</p>
                        </div>
                        <div className='flex items-center'>
                            ₹  {minMaxQty.percent_off2 && Math.floor((Number(bussinessPrice) / 100) * Number(minMaxQty.percent_off2))}
                        </div>
                    </div>
                    <div className='flex py-2 justify-around border-b-2 border-solid border-gray-300'>
                        <div className='flex gap-1'>
                            <p className='w-10'>Min QTY</p>
                            <input
                                disabled
                                placeholder={minMaxQty.max_qty2 && Number(minMaxQty.max_qty2) + 1}
                                className='w-14 h-8 my-auto border outline-0 border-solid  border-gray-400 shadow-[0px_0.963636px_1.92727px_rgba(15,17,17,0.15)] rounded' type='number' />
                        </div>
                        <div className='flex gap-1'>
                            <p className='w-10'>Max QTY</p>
                            <input
                                onChange={handleMinMax}
                                name='max_qty3'
                                value={minMaxQty.max_qty3}
                                className='w-14 h-8 my-auto border outline-0 border-solid  border-gray-400 shadow-[0px_0.963636px_1.92727px_rgba(15,17,17,0.15)] rounded' type='number' min={Number(minMaxQty.max_qty2) + 1} />
                        </div>
                        <div className='flex gap-1'>
                            <p className='flex items-center mr-1'>get</p>
                            <input
                                onChange={handleMinMax}
                                name='percent_off3'
                                value={minMaxQty.percent_off3}
                                className='w-14 h-8 my-auto border outline-0 border-solid  border-gray-400 shadow-[0px_0.963636px_1.92727px_rgba(15,17,17,0.15)] rounded' type='number' min='1' />
                            <p className='flex items-center'>% off</p>
                        </div>
                        <div className='flex items-center'>
                            ₹ {minMaxQty.percent_off3 && Math.floor((Number(bussinessPrice) / 100) * Number(minMaxQty.percent_off3))}
                        </div>
                    </div>

                    <div>
                        <button className='py-2 px-4 my-5 text-sm text-[#6F7373] rounded-lg bg-yellow-100' type='submit'>Set Prices</button>
                    </div>
                </form>
                <div>
                    <div className={`flex items-center ${selectedValue !== 'fixed' && 'bg-gray-200'} p-2 rounded-t-lg `}>
                        <input
                            id="radio-2"
                            type="radio"
                            name="fixed"
                            value="fixed"
                            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300"
                            onChange={handleRadioChange}
                            checked={selectedValue === 'fixed'}
                        />
                        <label htmlFor="radio-2" className="ml-2 text-sm font-medium text-gray-900">Fixed prices</label>
                    </div>
                    <form
                        onSubmit={(e) => handleFixedPrice(e, accessToken)}
                        className={`px-2  ${selectedValue === 'fixed' ? 'block' : 'hidden'}`} >
                        <div className='flex py-2 justify-around border-b-2 border-solid border-gray-300'>
                            <div className='flex gap-1'>
                                <p className='w-10'>Min QTY</p>
                                <input
                                    onChange={handleMinMax}
                                    name='min_qty1'

                                    value={minMaxQty.min_qty1}
                                    className='w-14 h-8 my-auto border  outline-0 border-solid border-gray-400  shadow-[0px_0.963636px_1.92727px_rgba(15,17,17,0.15)] rounded' type='number' min='1' />
                            </div>
                            <div className='flex gap-1'>
                                <p className='w-10'>Max QTY</p>
                                <input
                                    onChange={handleMinMax}
                                    name='max_qty1'

                                    value={minMaxQty.max_qty1}
                                    className='w-14 h-8 my-auto border  outline-0 border-solid  border-gray-400 shadow-[0px_0.963636px_1.92727px_rgba(15,17,17,0.15)] rounded' type='number' min={Number(minMaxQty.min_qty1) + 1} />
                            </div>
                            <div className='flex gap-1'>
                                <p className='flex items-center mr-1'>get</p>
                                <input
                                    onChange={handleMinMax}
                                    name='fixed_price1'
                                    value={minMaxQty.fixed_price1}
                                    className='w-14 h-8 my-auto border outline-0 border-solid  border-gray-400 shadow-[0px_0.963636px_1.92727px_rgba(15,17,17,0.15)] rounded' type='number' min='1' />

                            </div>
                            {/* {
                                minMaxQty.fixed_price1 &&
                                <div className='flex items-center'>
                                    {minMaxQty.fixed_price1 && Math.floor(Number(minMaxQty.fixed_price1) / (Number(bussinessPrice)) * 100)}
                                </div>
                            } */}
                        </div>
                        <div className='flex py-2 justify-around border-b-2 border-solid border-gray-300'>
                            <div className='flex gap-1'>
                                <p className='w-10'>Min QTY</p>
                                <input
                                    disabled
                                    placeholder={minMaxQty.max_qty1 && Number(minMaxQty.max_qty1) + 1}
                                    className='w-14 h-8 my-auto border outline-0 border-solid  border-gray-400 shadow-[0px_0.963636px_1.92727px_rgba(15,17,17,0.15)] rounded' type='number' />
                            </div>
                            <div className='flex gap-1'>
                                <p className='w-10'>Max QTY</p>
                                <input
                                    onChange={handleMinMax}
                                    name='max_qty2'

                                    value={minMaxQty.max_qty2}
                                    className='w-14 h-8 my-auto border outline-0 border-solid  border-gray-400 shadow-[0px_0.963636px_1.92727px_rgba(15,17,17,0.15)] rounded' type='number' min={Number(minMaxQty.max_qty1) + 1} />
                            </div>
                            <div className='flex gap-1'>
                                <p className='flex items-center mr-1'>get</p>
                                <input
                                    onChange={handleMinMax}
                                    name='fixed_price2'

                                    value={minMaxQty.fixed_price2}
                                    className='w-14 h-8 my-auto border outline-0 border-solid  border-gray-400 shadow-[0px_0.963636px_1.92727px_rgba(15,17,17,0.15)] rounded' type='number' min='1' />

                            </div>
                            {/* {
                                minMaxQty.fixed_price2 &&
                                <div className='flex items-center'>
                                    {minMaxQty.fixed_price2 && Math.floor(Number(minMaxQty.fixed_price2) / (Number(bussinessPrice)) * 100)}
                                </div>
                            } */}
                        </div>
                        <div className='flex py-2 justify-around border-b-2 border-solid border-gray-300'>
                            <div className='flex gap-1'>
                                <p className='w-10'>Min QTY</p>
                                <input
                                    disabled
                                    placeholder={minMaxQty.max_qty2 && Number(minMaxQty.max_qty2) + 1}
                                    className='w-14 h-8 my-auto border outline-0 border-solid  border-gray-400 shadow-[0px_0.963636px_1.92727px_rgba(15,17,17,0.15)] rounded' type='number' />
                            </div>
                            <div className='flex gap-1'>
                                <p className='w-10'>Max QTY</p>
                                <input
                                    onChange={handleMinMax}
                                    name='max_qty3'

                                    value={minMaxQty.max_qty3}
                                    className='w-14 h-8 my-auto border outline-0 border-solid border-gray-400  shadow-[0px_0.963636px_1.92727px_rgba(15,17,17,0.15)] rounded' type='number' min={Number(minMaxQty.max_qty2) + 1} />
                            </div>
                            <div className='flex gap-1'>
                                <p className='flex items-center mr-1'>get</p>
                                <input
                                    onChange={handleMinMax}
                                    name='fixed_price3'

                                    value={minMaxQty.fixed_price3}
                                    className='w-14 h-8 my-auto border outline-0 border-solid 
                                     border-gray-400 shadow-[0px_0.963636px_1.92727px_rgba(15,17,17,0.15)] rounded' type='number' min='1' />

                            </div>
                            {/* {
                                minMaxQty.fixed_price3 &&
                                <div className='flex items-center'>
                                    {minMaxQty.fixed_price3 && Math.floor(Number(minMaxQty.fixed_price3) / (Number(bussinessPrice)) * 100)}
                                </div>
                            } */}
                        </div>

                        <div>
                            <button className='py-2 px-4 my-5 text-sm text-[#6F7373] rounded-lg bg-yellow-100' type='submit'>Set Prices</button>
                        </div>
                    </form>
                </div>
            </div>

        </div >
    )
}

export default AddQuantityDiscount