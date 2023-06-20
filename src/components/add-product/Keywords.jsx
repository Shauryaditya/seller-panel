import React, { useState, useEffect } from 'react'
import LeftSide from './LeftSide'
const Keywords = (props) => {

    const { setSelectedTab, formData, setFormData, draftedTabs, setDraftedTabs } = props
    // state variables for form inputs
    const [formState, setFormState] = useState(formData)
    console.log(formData)
    const isDrafted = draftedTabs.includes(6);

    // state for category tag and utility tag
    const [tag, setTag] = useState({
        category_tags: '',
        utility_tags: ''
    })

    // for removing tags
    const handleRemoveCategoryTag = (id) => {
        const updatedEmails = parsedCategoryTag.filter((item) => item.id !== id);
        const updatedEmailList = updatedEmails
            .map((item) => item.category_tag)
            .join(", ");
        setTag((preValue) => {
            return { ...preValue, category_tags: updatedEmailList }
        });
    };
    const handleRemoveUtilityTag = (id) => {
        const updatedEmails = parsedUtilityTag.filter((item) => item.id !== id);
        const updatedEmailList = updatedEmails
            .map((item) => item.category_tag)
            .join(", ");
        setTag((preValue) => {
            return { ...preValue, utility_tags: updatedEmailList }
        });
    };
    // state for tags
    const parsedCategoryTag = tag.category_tags
        .split(/,|\s/)
        .filter((part) => part.trim() !== "")
        .map((item, index) => ({ id: index, category_tag: item.trim() })); // Assign unique id to each email
    const parsedUtilityTag = tag.utility_tags
        .split(/,|\s/)
        .filter((part) => part.trim() !== "")
        .map((item, index) => ({ id: index, utility_tag: item.trim() }));
    // preventin input enter behaviout
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    // update state variable for input field on change
    const handleChange = (event) => {
        const { name, value } = event.target
        setTag((preValue) => {
            return { ...preValue, [name]: value }
        })
        setFormState((prevValues) => ({
            ...prevValues,
            [name]: value.split(/,|\s/).filter((part) => part !== ''),
        }));
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
    console.log(formState);
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
                                    <label className=' w-1/3 flex justify-end text-xs text-indigo-900 font-bold '>Category Tags ?</label>
                                    <div className='w-2/3 grow flex items-center gap-2 flex-wrap rounded-sm px-3 py-1 border border-gray-300'>
                                        {parsedCategoryTag.map((item) => (
                                            <div key={item.id} className='h-6 text-sm flex items-center
                                             gap-1 shadow-md rounded-lg px-2  bg-[#F4F4F4]'>
                                                {item.category_tag}
                                                <button className='font-bold text-gray-700' type="button" onClick={() => handleRemoveCategoryTag(item.id)}>
                                                    x
                                                </button>
                                            </div>
                                        ))}
                                        <input
                                            name='category_tags'
                                            value={tag.category_tags}
                                            onChange={handleChange}
                                            onKeyDown={handleKeyDown}
                                            className='resize-none grow h-10 outline-0'
                                            autoComplete='off'
                                        />
                                    </div>

                                </div>

                                <div className=' w-5/6 flex items-center gap-2 my-4'>
                                    <label className=' w-1/3 flex justify-end text-xs text-indigo-900 font-bold '>Utility Tags ?</label>
                                    <div className='w-2/3 grow flex gap-2 flex-wrap items-center rounded-sm px-3 py-1 border border-gray-300'>
                                        {parsedUtilityTag.map((item) => (
                                            <div key={item.id} className='text-sm flex items-center h-6
                                             gap-1 shadow-md rounded-lg px-2  bg-[#F4F4F4]'>
                                                {item.utility_tag}
                                                <button className='font-bold text-gray-700' type="button" onClick={() => handleRemoveUtilityTag(item.id)}>
                                                    x
                                                </button>
                                            </div>
                                        ))}
                                        <input
                                            name='utility_tags'
                                            value={tag.utility_tags}
                                            onChange={handleChange}
                                            onKeyDown={handleKeyDown}
                                            className='resize-none grow h-10 outline-0'
                                            autoComplete='off'
                                        />
                                    </div>

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
                                                arr.push(6)
                                            }
                                            setDraftedTabs([...arr])
                                            setSelectedTab(7)
                                        }}>Save as Draft</button>
                                    <button className='text-white text-xs  font-normal border border-solid border-[#E3ECED] shadow-[0px,1px,2px,#B5B5B5] rounded-sm py-2 px-6 bg-[#008296] inline-block '
                                        onClick={() => {
                                            handleSubmit()
                                            setSelectedTab(7)
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

export default Keywords