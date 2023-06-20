import React, { useEffect, useState } from 'react'
import LeftSide from './LeftSide'
const Description = (props, id) => {

    const { setSelectedTab, formData, setFormData, draftedTabs, setDraftedTabs } = props
    const isDrafted = draftedTabs.includes(5);
    // state variables for form inputs
    const [formState, setFormState] = useState(formData)
    // const id = '6458ab33a420590034e82efa'
    // update state variable for input field on change
    const handleChange = (event) => {
        const { name, value } = event.target
        setFormState((prevValues) => ({
            ...prevValues,
            [name]: value,
        }))
    }
    useEffect(() => {
        if (isDrafted) {
            setFormState(formData)
        }
    })
    const handleSubmit = (e) => {
        const obj = formData
        for (const [key, value] of Object.entries(formState)) {
            obj[`${key}`] = value
        }
        setFormData({ ...obj })
    }
    return (
        <main>
            <div className='flex'>
                <LeftSide />
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
                        <form>
                            <div className='max-w-6xl  mx-auto flex flex-col border border-solid border-[#DEDEDF] mb-10'>
                                <div className=' w-5/6 flex items-center gap-2 my-4'>
                                    <label className=' w-1/3 flex justify-end text-xs text-indigo-900 font-bold '>Product Description ?</label>
                                    <textarea
                                        name='product_description'
                                        value={formState.product_description}
                                        onChange={handleChange}
                                        className='grow py-2 px-3 border border-solid border-gray-300' type='text'
                                        min='0'
                                        autoComplete='off'
                                    />
                                </div>
                                <div className=' w-5/6 flex items-center gap-2 my-4'>
                                    <label className=' w-1/3 flex justify-end text-xs text-indigo-900 font-bold '>Bullet Point ?</label>
                                    <textarea
                                        name='bullet_point'
                                        value={formState.bullet_point}
                                        onChange={handleChange}
                                        className=' h-17 pt-3 w-full rounded-sm px-3 border border-gray-300' type='text'
                                        min='0'
                                        autoComplete='off'
                                    />
                                </div>

                            </div>

                            <div className='flex justify-between max-w-5xl  mx-5'>
                                <div>
                                    <p className='text-indigo-900 text-xs font-normal border border-solid border-[#E3ECED] shadow-[0px,1px,2px,#B5B5B5] rounded-sm py-2 px-6 bg-[#E3ECED] inline-block '>Cancel</p>
                                </div>
                                <div className='flex gap-x-2'>
                                    <button className='text-indigo-900 text-xs font-normal border border-solid border-[#E3ECED] shadow-[0px,1px,2px,#B5B5B5] rounded-sm py-2 px-6 bg-[#E3ECED] inline-block '
                                        onClick={() => {
                                            handleSubmit()
                                            const arr = [...draftedTabs]
                                            if (arr.indexOf(1) === -1) {
                                                arr.push(5)
                                            }
                                            setDraftedTabs([...arr])
                                            setSelectedTab(6)
                                        }}>Save as Draft</button>
                                    <button className='text-white text-xs  font-normal border border-solid border-[#E3ECED] shadow-[0px,1px,2px,#B5B5B5] rounded-sm py-2 px-6 bg-[#008296] inline-block '
                                        onClick={() => {
                                            handleSubmit()
                                            setSelectedTab(6)
                                        }}>
                                        Save And Next
                                    </button>
                                </div>
                            </div>

                        </form>
                    </section>
                </div>
            </div>
        </main>
    )
}

export default Description