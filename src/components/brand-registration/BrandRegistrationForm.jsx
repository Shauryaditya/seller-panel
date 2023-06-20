import React, { useState } from 'react'
import FormComponet1 from './FormComponet1';
import FormComponet2 from './FormComponet2';
import FormComponet3 from './FormComponet3';
const id = '6482b72059df0687b320464a'
const BrandRegistrationForm = () => {
    const [selectedTab, setSelectedTab] = useState(1)
    const [formData, setFormData] = useState({
        seller_id: id
    })
    // Define the setFormData function
    const handleSetFormData = (newFormData) => {
        setFormData(newFormData);
    };
    const handleSetSelectedTab = (value) => {
        setSelectedTab(value)
    }
    console.log("parent", formData);
    return (
        <main>
            <div className='max-w-2xl mx-auto flex flex-col my-5'>
                {/* Registration top section */}
                <section>
                    <h1 className='text-2xl text-[#002F36] font-normal text-center my-5'>Enrol your brand</h1>
                    <div>
                        <div className='w-3/4 mx-auto h-[2px] bg-[#002F36] ' />
                        <div className='flex flex-row justify-between'>
                            <div className='relative'>
                                <p className='text-sm text-[#002F36] text-center px-6 py-4'>Brand infor­mation</p>
                                <div className={`absolute z-50 left-1/2 -top-2  w-3 h-3 ${selectedTab >= 2 ? 'bg-[#002F36]' : 'bg-white'} border-2 border-solid border-[#002F36] rounded-full`} />
                            </div>
                            <div className='relative'>
                                <p className=' text-sm text-[#002F36] text-center px-6 py-4'>Accou­nt infor­mation</p>
                                <div className={`absolute z-50 left-1/2 -top-2  w-3 h-3 ${selectedTab >= 3 ? 'bg-[#002F36]' : 'bg-white'} bg-white border-2 border-solid border-[#002F36] rounded-full`} />
                            </div>
                            <div className='relative'>
                                <p className='w-48 whitespace-wrap text-sm text-[#002F36] text-center px-6 py-4'>Manuf­acturi­ng and
                                    <span className=' whitespace-nowrap' >distr­ibutio­n infor­mation</span>
                                </p>
                                <div className='absolute z-50 left-1/2 -top-2  w-3 h-3 bg-white border-2 border-solid border-[#002F36] rounded-full' />
                            </div>
                        </div>
                    </div>
                </section>
                {
                    selectedTab === 1 &&
                    <FormComponet1
                        formData={formData}
                        setFormData={handleSetFormData}
                        selectedTab={selectedTab}
                        setSelectedTab={handleSetSelectedTab}
                    />
                }
                {
                    selectedTab === 2 &&
                    <FormComponet2
                        formData={formData}
                        setFormData={handleSetFormData}
                        selectedTab={selectedTab}
                        setSelectedTab={handleSetSelectedTab}
                    />
                }
                {
                    selectedTab === 3 &&
                    <FormComponet3
                        formData={formData}
                        setFormData={handleSetFormData}
                        selectedTab={selectedTab}
                        setSelectedTab={handleSetSelectedTab}
                    />
                }
            </div>
        </main>
    )
}

export default BrandRegistrationForm