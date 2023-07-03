import React, { useState } from 'react'

const LeftSide = (props) => {
    const { handleData } = props
    const [selectedValue, setSelectedValue] = useState('');

    const handleRadioChange = (event) => {
        setSelectedValue(event.target.value);
        handleData(event.target.value)
    };

    return (
        <div className='w-1/5 flex flex-col gap-y-5 p-10 bg-[#f4f9fb] min-h-screen'>
            <div>
                <h1 className='text-base text-indigo-900 font-medium'>Category</h1>
                <p className='text-xs text-teal-900'> {`.. > Parent Category > Sub Category > Child Category`} </p>
            </div>
            <form>
                <div className='flex flex-col gap-y-3'>
                    <h1 className='text-base text-indigo-900 font-medium'>Attributes</h1>
                    <div className='flex gap-x-2'>
                        <input
                            type='radio'
                            value='required'
                            checked={selectedValue === 'required'}
                            onChange={handleRadioChange}

                        />
                        <label className='text-sm text-indigo-900' >Required</label>
                    </div>
                    <div className='flex gap-x-2'>
                        <input
                            type='radio'
                            value='recommended'
                            checked={selectedValue === 'recommended'}
                            onChange={handleRadioChange}
                        />
                        <label className='text-sm text-indigo-900' >Recommended</label>
                    </div>
                    <div className='flex gap-x-2'>
                        <input
                            type='radio'
                            value='all'
                            checked={selectedValue === 'all'}
                            onChange={handleRadioChange}
                        />
                        <label className='text-sm text-indigo-900' >All Attributes</label>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LeftSide;
