import React from 'react'

const InventoryTop = () => {
    return (
        <section className='flex flex-col '>

            <div className='flex flex-wrap justify-between flex-row py-3 items-center'>
                <div className='flex  gap-x-4 items-center'>
                    <h3 className='font-bold text-2xl text-gray-900'>Manage Inventory</h3>
                    <a href='' className='block border-r border-solid border-gray-300 text-sm text-teal-500 pr-4'>Learn More</a>
                    <a href='' className='bloc text-sm text-teal-500 pr-4'>Take a tour</a>
                </div>
                <div className='flex gap-x-2 items-center'>
                    <a href='' className='px-4 py-2 inline-block boder border-solid border-gray-300 bg-white text-sm font-normal rounded-lg shadow-[0px_2px_5px_rgba(213,217,217,0.5)]'>Add a Variation</a>
                    <a href='' className='px-4 py-2 inline-block boder border-solid border-gray-300 bg-white text-sm font-normal rounded-lg shadow-[0px_2px_5px_rgba(213,217,217,0.5)]'>Add a Product</a>
                    <a href='' className='px-4 py-2 inline-block boder border-solid border-gray-300 bg-white text-sm font-normal rounded-lg shadow-[0px_2px_5px_rgba(213,217,217,0.5)]'>Preferences: 11 columns hidden</a>
                    <a href='' className='px-2 bloc text-sm font-normal text-red-500'>New</a>
                </div>
            </div>
        </section>
    )
}

export default InventoryTop