import React, { useState, useEffect } from 'react'
import LeftSide from './LeftSide'
const BASE_URL = "https://two1genx.onrender.com";
const VitalInfo = (props) => {
    const { setSelectedTab, formData, setFormData, draftedTabs, setDraftedTabs, id } = props
    console.log(formData)
    const isDrafted = draftedTabs.includes(2);
    console.log(7, draftedTabs)


    // fetching  field from backend
    const [filter, setFilter] = useState('')
    const [vitalInfo, setVitalInfo] = useState(null)
    useEffect(() => {
        if (isDrafted) {
            setFormState(formData)
        }
        async function fetchData() {
            try {
                const response = await fetch(`${BASE_URL}/v1/category-attributes/get-populated?page=1&limit=500&filter[category_id][$eq]=${id}`);
                const data = await response.json();
                if (data.categoryList) {
                    const VitalInfo = data.categoryList
                        .filter(item => item.attribute_id.attribute_group_slug === 'vital_info')
                        .flatMap(item => {
                            if (filter === 'required' && item.required) {
                                return item.attribute_id;
                            } else if (filter === 'recommended' && item.recommended) {
                                return item.attribute_id;
                            } else if (filter === 'all') {
                                return item.attribute_id;
                            } else if (filter !== 'required' && filter !== 'recommended' && filter !== 'all') {
                                return item.attribute_id;
                            }
                            else {
                                return [];
                            }
                        });
                    setVitalInfo(VitalInfo);

                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [id, filter])

    // state variables for form inputs
    const [formState, setFormState] = useState(formData)


    // update state variable for input field on change
    const handleChange = (event) => {
        const { name, value } = event.target
        const obj = formData
        obj[`${name}`] = value
        setFormData({ ...obj })
        setFormState((prevValues) => ({
            ...prevValues,
            [name]: value,
        }))
    }

    const handleSubmit = (event) => {
        const obj = formData
        for (const [key, value] of Object.entries(formState)) {
            obj[`${key}`] = value
        }
        setFormData({ ...obj })
    }
    console.log(vitalInfo);

    const handleData = (data) => {
        setFilter(data)
        console.log(data);
    }
    return (
        <main>
            <div className='flex'>
                <LeftSide
                    handleData={handleData}
                />
                <div className='flex flex-col'>
                    <section>
                        <div className='max-w-6xl mx-auto flex items-center bg-[#E5F2F4]'>
                            <div className='p-5'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                </svg>

                            </div>
                            <div>
                                <p className='text-xs text-gray-900 font-bold'>When multiple sellers sell the same product through a single detail page, we combine and present the best product data to ensure customers get the best experience.</p>
                            </div>
                        </div>
                    </section>
                    <section className='mb-10'>
                        <form >
                            <div className='max-w-6xl  mx-auto flex flex-col border border-solid border-[#DEDEDF] mb-10'>
                                {
                                    vitalInfo &&
                                    vitalInfo.map((item) => (
                                        <div key={item._id} className=' w-5/6 flex items-center gap-2 my-4'>
                                            <label className=' w-1/3 flex justify-end text-xs text-indigo-900 font-bold '>{item.attribute_name} </label>
                                            <input
                                                className='grow py-2 h-8 px-3 border border-solid border-gray-300'
                                                type={item.input_type}
                                                name={item.attribute_slug}
                                                value={formState[item.attribute_slug] || ''}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                            {vitalInfo?.length !== 0 &&
                                <div className='flex justify-between max-w-5xl  mx-5'>
                                    <div>
                                        <p className='text-indigo-900 text-xs font-normal border border-solid border-[#E3ECED] shadow-[0px,1px,2px,#B5B5B5] rounded-sm py-2 px-6 bg-[#E3ECED] inline-block '>Cancel</p>
                                    </div>
                                    <div className='flex gap-x-2'>
                                        <button className='text-indigo-900 text-xs font-normal border border-solid border-[#E3ECED] shadow-[0px,1px,2px,#B5B5B5] rounded-sm py-2 px-6 bg-[#E3ECED] inline-block '
                                            onClick={() => {
                                                handleSubmit()
                                                const arr = [...draftedTabs]
                                                console.log(107, draftedTabs)
                                                if (arr.indexOf(1) === -1) {
                                                    arr.push(2)
                                                }
                                                setDraftedTabs([...arr])
                                                setSelectedTab(3)
                                            }}>Save as Draft</button>
                                        <button className='text-white text-xs  font-normal border border-solid border-[#E3ECED] shadow-[0px,1px,2px,#B5B5B5] rounded-sm py-2 px-6 bg-[#008296] inline-block '
                                            type='submit' onClick={() => {
                                                handleSubmit()
                                                setSelectedTab(3)
                                            }}>
                                            Save And Next
                                        </button>
                                    </div>
                                </div>
                            }
                        </form>
                    </section>
                </div>
            </div>

        </main>
    )
}

export default VitalInfo