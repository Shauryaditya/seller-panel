import React, { useEffect, useState, useRef } from 'react'
const BASE_URL = "https://two1genx.onrender.com";
const FormComponet3 = (props) => {
    const { formData, setFormData, selectedTab, setSelectedTab } = props
    // state for data 
    const [formState, setFormState] = useState({})

    const [distribution, setDistribution] = useState('')
    const [isDestSell, setIsDestSell] = useState('')
    const [isLicense, setIsLicense] = useState('')
    const [isLicenseeSell, setIsLIcenseeSell] = useState('')

    const handleClick = (e, value) => {
        const id = e.target.id
        if (id === 'distribution') {
            setDistribution(value)
            setFormState((preValue) => {
                return { ...preValue, sell_to_distributors: value }
            })
        } if (id === 'isDestSell') {
            setIsDestSell(value)
            setFormState((preValue) => {
                return { ...preValue, distributors_sell_on_amazone: value }
            })
        } if (id === 'isLicense') {
            setIsLicense(value)
            setFormState((preValue) => {
                return { ...preValue, license_information: value }
            })
        } if (id === 'isLicenseeSell') {
            setIsLIcenseeSell(value)
            setFormState((preValue) => {
                return { ...preValue, is_license_sell_on_amazon: value }
            })
        }
    }

    const countryIdRef = useRef(null);
    const handleSelect = (e) => {
        if (countryIdRef.current) {
            const selectedOption = Array.from(countryIdRef.current.options).find(
                (option) => option.value === e.target.value
            );
            if (selectedOption && selectedOption.dataset) {
                setFormState((preValue) => {
                    return { ...preValue, product_distributed_to_country_id: selectedOption.dataset.id }
                })
                console.log(selectedOption.dataset.id);
            }
        }

    }
    const [countryList, SetCountryList] = useState([])
    useEffect(() => {
        fetch(`${BASE_URL}/v1/country/all-country`)
            .then(res => res.json())
            .then(data => {
                SetCountryList(data.data)
                console.log(data.data)
            })
    }, [])

    const handleSubmit = () => {
        const obj = { ...formData };
        for (const [key, value] of Object.entries(formState)) {
            obj[key] = value;
        }
        // post request for adding registration
    }

    return (
        <section>
            <div className='max-w-2xl mx-auto flex flex-col'>
                <div>
                    <h1 className='text-lg text-[#002F36]  font-bold py-2'>Manufacturing and distribution information</h1>
                    <p className='text-xs text-gray-700 font-normal py-1'>The following information will help us identify protective features for which your brand soutrik may qualify</p>
                </div>
                {/* distribution */}
                <div className='py-2'>
                    <h3 className='text-sm text-[#002F36] font-bold'>Distribution information</h3>
                    <div className='py-2'>
                        <p className='text-xs text-[#002F36] font-normal'>Does your brand sell to distributors?</p>
                        <div className='flex py-1'>
                            <button
                                id='distribution'
                                onClick={(e) => handleClick(e, 'yes')}
                                className={`w-20 h-10 flex justify-center items-center text-xs  border-y border-l border-solid border-[#D5DBDB] ${distribution === 'yes' ? 'bg-[#008296] text-white' : 'text-[#002F36]'}`} type='button'>Yes</button>
                            <button
                                id='distribution'
                                onClick={(e) => handleClick(e, 'no')}
                                className={`w-20 h-10 flex justify-center items-center text-xs  border border-solid border-[#D5DBDB] ${distribution === 'no' ? 'bg-[#008296] text-white' : 'text-[#002F36]'}`} type='button'>No</button>
                        </div>
                        {/* // when click on yes */}
                        {
                            distribution === 'yes' &&
                            <div>
                                <p className='text-xs text-[#002F36] font-normal'>Does your distributors sell to Amazon?</p>
                                <div className='flex py-1'>
                                    <button
                                        id='isDestSell'
                                        onClick={(e) => handleClick(e, 'yes')}
                                        className={`w-20 h-10 flex justify-center items-center text-xs  border border-solid border-[#D5DBDB] ${isDestSell === 'yes' ? 'bg-[#008296] text-white' : 'text-[#002F36]'}`} type='button'>Yes</button>
                                    <button
                                        id='isDestSell'
                                        onClick={(e) => handleClick(e, 'no')}
                                        className={`w-20 h-10 flex justify-center items-center text-xs  border border-solid border-[#D5DBDB] ${isDestSell === 'no' ? 'bg-[#008296] text-white' : 'text-[#002F36]'}`} type='button'>No</button>
                                </div>
                            </div>
                        }
                        {
                            isDestSell === 'no' &&
                            <div className=' w-11/12 flex flex-col '>
                                <label className=' text-xs text-[#002F36] texl-left font-bold py-1'>Where are your brands products distributed ? <span className='text-gray-600 font-normal'>(optional)</span></label>
                                <select
                                    ref={countryIdRef}
                                    id="countryId"
                                    className='w-full py-1 px-3 border border-solid border-gray-200 '
                                    type="text"

                                    onChange={(e) => {
                                        handleSelect(e);
                                    }}
                                >
                                    <option selected>Select a country</option>
                                    {
                                        countryList &&
                                        countryList.map((item) => (
                                            <option
                                                key={item._id}
                                                data-id={item._id}
                                                value={item.country_name}
                                            >
                                                {item.country_name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        }
                    </div>
                </div>
                {/* // license Information */}
                <div className='py-2'>
                    <h3 className='text-sm text-[#002F36] font-bold'>Licensee information</h3>
                    <div className='py-2'>
                        <p className='text-xs text-[#002F36] font-normal'>Does your brand license trademarks to others who manufacture products associated with your intellectual
                            property?</p>
                        <div className='flex py-1'>
                            <button
                                id='isLicense'
                                onClick={(e) => handleClick(e, 'yes')}
                                className={`w-20 h-10 flex justify-center items-center text-xs  border border-solid border-[#D5DBDB] ${isLicense === 'yes' ? 'bg-[#008296] text-white' : 'text-[#002F36]'}`} type='button'>Yes</button>
                            <button
                                id='isLicense'
                                onClick={(e) => handleClick(e, 'no')}
                                className={`w-20 h-10 flex justify-center items-center text-xs  border border-solid border-[#D5DBDB] ${isLicense === 'no' ? 'bg-[#008296] text-white' : 'text-[#002F36]'}`} type='button'>No</button>
                        </div>
                        {/* // when click on yes */}

                        {
                            isLicense === 'yes' &&
                            <div>
                                <p className='text-xs text-[#002F36] font-normal'>Does this licensee sell on Amazon?</p>
                                <div className='flex py-1'>
                                    <button
                                        id='isLicenseeSell'
                                        onClick={(e) => handleClick(e, 'yes')}
                                        className={`w-20 h-10 flex justify-center items-center text-xs  border border-solid border-[#D5DBDB] ${isLicenseeSell === 'yes' ? 'bg-[#008296] text-white' : 'text-[#002F36]'}`} type='button'>Yes</button>
                                    <button
                                        id='isLicenseeSell'
                                        onClick={(e) => handleClick(e, 'no')}
                                        className={`w-20 h-10 flex justify-center items-center text-xs  border border-solid border-[#D5DBDB] ${isLicenseeSell === 'no' ? 'bg-[#008296] text-white' : 'text-[#002F36]'}`} type='button'>No</button>
                                </div>
                            </div>
                        }

                    </div>
                </div>
                <div className='flex justify-between my-5'>
                    <div>
                        <button
                            onClick={() => setSelectedTab(2)}
                            type='button' className='text-xs text-[#002F36] px-12 py-2 bg-white border border-solid border-[#7FC2BB] shadow-[0px,1px,2px,#B5B5B5] rounded-sm'>
                            Previous
                        </button>
                    </div>
                    <div className='flex gap-x-5'>

                        <button type='button' className='text-xs text-[#002F36] px-6 py-2 bg-[#E3ECED] border border-solid border-[#E3ECED] shadow-[0px,1px,2px,#B5B5B5] rounded-sm'>
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className='text-xs text-white px-12 py-2 bg-[#008296] border border-solid border-[#E3ECED] shadow-[0px,1px,2px,#B5B5B5] rounded-sm'>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FormComponet3