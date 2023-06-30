import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
const SideBarModal = ({ isClicked, setIsClicked }) => {
    const modalRef = useRef(null);

    const handleClose = (e) => {
        if (e.target.id === 'container') {
            setIsClicked(false)
        }
    }

    return (
        <div
            id='container'
            onClick={(e) => handleClose(e)}
            className='fixed z-10 inset-0 overflow-x-hidden overflow-y-scroll bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center my-auto'>
            <div
                className={`absolute left-0 top-0  w-56 min-h-screen   shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] bg-white -translate-x-full ${isClicked && 'translate-x-0'}`}>
                <div
                    onClick={() => setIsClicked(false)}
                    className='py-2.5 px-4 flex gap-5 bg-[#002F36] text-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Menu
                </div>
                <ul className='py-2 text-sm'>
                    <li className='py-2 px-5  relative group hover:bg-gray-50'>
                        <Link href='/catelog' className='flex justify-between'>
                            Catalogue
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </Link>
                        <ul className='absolute top-3 left-[13.5rem]   bg-white shadow-lg rounded hidden group-hover:block'>
                            {/* <div className='absolute -left-2 top-3 w-3 h-3 -rotate-90 bg-white shadow-lg' /> */}
                            <li className=' hover:bg-gray-50 p-2'>
                                <Link href='/catelog' className=' whitespace-nowrap'>Add products</Link>
                            </li>
                            <li className=' hover:bg-gray-50 p-2'>
                                <Link href='/catelog' className=' whitespace-nowrap'>Add products via Upload</Link>
                            </li>
                            <li className=' hover:bg-gray-50 p-2'>
                                <Link href='/catelog' className=' whitespace-nowrap'>Complete your drafts</Link>
                            </li>
                            <li className=' hover:bg-gray-50 p-2'>
                                <Link href='/catelog' className=' whitespace-nowrap'>View selling applications</Link>
                            </li>
                            <li className=' hover:bg-gray-50 p-2'>
                                <Link href='/catelog' className=' whitespace-nowrap'>View selling applications</Link>
                            </li>
                            <li className=' hover:bg-gray-50 p-2'>
                                <Link href='/catelog' className=' whitespace-nowrap'>Upload & manage videos</Link>
                            </li>
                            <li className=' hover:bg-gray-50 p-2'>
                                <Link href='/catelog' className=' whitespace-nowrap'>Manage product documents</Link>
                            </li>
                            {/* Add more sub-menu items as needed */}
                        </ul>

                    </li>
                    <li className='py-2 px-5 relative group hover:bg-gray-50'>
                        <Link href='/inventory' className='flex justify-between'>
                            Inventory
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </Link>
                        <ul className=' absolute top-3 left-[13.5rem]   bg-white shadow-lg rounded hidden group-hover:block'>
                            {/* <div className='absolute -left-2 top-3 w-3 h-3 -rotate-90 bg-white shadow-lg' /> */}
                            <li className=' hover:bg-gray-50 p-2'>
                                <Link href='/inventory' className=' whitespace-nowrap'>Manage all inventory</Link>
                            </li>
                            <li className=' hover:bg-gray-50 p-2'>
                                <Link href='/inventory' className=' whitespace-nowrap'>Manage Genx Inventory</Link>
                            </li>
                            <li className=' hover:bg-gray-50 p-2'>
                                <Link href='/inverntory' className=' whitespace-nowrap'>Manage Genx Shipment</Link>
                            </li>


                            {/* Add more sub-menu items as needed */}
                        </ul>
                    </li>
                    <li className='py-2 px-5 relative group hover:bg-gray-50'>
                        <Link href='/' className='flex justify-between'>
                            Pricing
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </Link>
                        <ul className=' absolute top-3 left-[13.5rem]   bg-white shadow-lg rounded hidden group-hover:block'>
                            {/* <div className='absolute -left-2 top-3 w-3 h-3 -rotate-90 bg-white shadow-lg' /> */}
                            <li className=' hover:bg-gray-50 p-2'>
                                <Link href='/catelog' className=' whitespace-nowrap'>Manage Pricing</Link>
                            </li>
                            <li className=' hover:bg-gray-50 p-2'>
                                <Link href='/catelog' className=' whitespace-nowrap'>Pricing Health</Link>
                            </li>
                            <li className=' hover:bg-gray-50 p-2'>
                                <Link href='/catelog' className=' whitespace-nowrap'>Automate Pricing</Link>
                            </li>
                            <li className=' hover:bg-gray-50 p-2'>
                                <Link href='/catelog' className=' whitespace-nowrap'>Fee Discounts</Link>
                            </li>

                            {/* Add more sub-menu items as needed */}
                        </ul>
                    </li>
                    <li className='py-2 px-5 relative group hover:bg-gray-50'>
                        <Link href='/manage-orders' className='flex justify-between'>
                            Orders
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </Link>
                        <ul className=' absolute top-3 left-[13.5rem]   bg-white shadow-lg rounded hidden group-hover:block'>
                            {/* <div className='absolute -left-2 top-3 w-3 h-3 -rotate-90 bg-white shadow-lg' /> */}
                            <li className=' hover:bg-gray-50 p-2'>
                                <Link href='/manage-orders' className=' whitespace-nowrap'>Manage Orders</Link>
                            </li>
                            <li className=' hover:bg-gray-50 p-2'>
                                <Link href='/manage-orders' className=' whitespace-nowrap'>Order Reports</Link>
                            </li>
                            <li className=' hover:bg-gray-50 p-2'>
                                <Link href='/manage-orders' className=' whitespace-nowrap'>Upload Order Related Files</Link>
                            </li>
                            <li className=' hover:bg-gray-50 p-2'>
                                <Link href='/manage-orders' className=' whitespace-nowrap'>Manage Returns</Link>
                            </li>
                            <li className=' hover:bg-gray-50 p-2'>
                                <Link href='/manage-orders' className=' whitespace-nowrap'>Manage Returns Claims</Link>
                            </li>
                            {/* Add more sub-menu items as needed */}
                        </ul>
                    </li>
                    <li className='py-2 px-5 relative group hover:bg-gray-50'>
                        <Link href='/' className='flex justify-between'>
                            Reports
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </Link>
                        <ul className=' absolute top-3 left-[13.5rem]   bg-white shadow-lg rounded hidden group-hover:block'>
                            {/* <div className='absolute -left-2 top-3 w-3 h-3 -rotate-90 bg-white shadow-lg' /> */}
                            <li className=' hover:bg-gray-50 p-2'>
                                <Link href='/' className=' whitespace-nowrap'>Payments</Link>
                            </li>
                            <li className=' hover:bg-gray-50 p-2'>
                                <Link href='/' className=' whitespace-nowrap'>Business Reports</Link>
                            </li>
                            <li className=' hover:bg-gray-50 p-2'>
                                <Link href='/' className=' whitespace-nowrap'>Return Reports</Link>
                            </li>
                            <li className=' hover:bg-gray-50 p-2'>
                                <Link href='/' className=' whitespace-nowrap'>Custom Reports</Link>
                            </li>
                            <li className=' hover:bg-gray-50 p-2'>
                                <Link href='/' className=' whitespace-nowrap'>Inventory Reports</Link>
                            </li>
                            <li className=' hover:bg-gray-50 p-2'>
                                <Link href='/' className=' whitespace-nowrap'>Tax Reports</Link>
                            </li>
                            <li className=' hover:bg-gray-50 p-2'>
                                <Link href='/' className=' whitespace-nowrap'>tax Document Library</Link>
                            </li>
                            <li className=' hover:bg-gray-50 p-2'>
                                <Link href='/' className=' whitespace-nowrap'>Fulfillmenty</Link>
                            </li>
                            {/* Add more sub-menu items as needed */}
                        </ul>
                    </li>
                    <li className='py-2 px-5 relative group hover:bg-gray-50'>
                        <Link href='/' className='flex justify-between'>
                            B2B Settings
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </Link>
                        <ul className=' absolute top-3 left-[13.5rem]   bg-white shadow-lg rounded hidden group-hover:block'>
                            {/* <div className='absolute -left-2 top-3 w-3 h-3 -rotate-90 bg-white shadow-lg' /> */}
                            <li className=' hover:bg-gray-50 p-2'>
                                <Link href='/' className=' whitespace-nowrap'>B2B Central</Link>
                            </li>
                            <li className=' hover:bg-gray-50 p-2'>
                                <Link href='/' className=' whitespace-nowrap'>Product Opportunities</Link>
                            </li>
                            <li className=' hover:bg-gray-50 p-2'>
                                <Link href='/' className=' whitespace-nowrap'>Mange Quotes</Link>
                            </li>


                            {/* Add more sub-menu items as needed */}
                        </ul>
                    </li>

                    <li className='py-2 px-5 hover:bg-gray-50'>
                        <Link href='/brand-registration' className='flex justify-between'>
                            Build Your Brand
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </Link>

                    </li>


                </ul>
            </div>
        </div>
    )
}

export default SideBarModal