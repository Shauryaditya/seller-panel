'use client'
import React, { useState } from 'react'
import LogOutModal from './LogOutModal'
import Link from 'next/link'
import SideBarModal from './SideBarModal'
const Navbar = () => {
    const [isClicked, setIsClicked] = useState(false)
    const [showLogoutModal, setShowLogoutModal] = useState(false)
    const handleLogOut = () => {
        setShowLogoutModal(true)
    }
    const handleClose = () => {
        setShowLogoutModal(false)
    }

    return (
        <navbar>
            <div className='relative py-2 px-4 flex justify-between items-center bg-[#002F36]'>
                <div
                    onClick={() => setIsClicked(true)}
                    className='text-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                    </svg>

                </div>
                <div>
                    <div className='flex rounded'>
                        <input type='text' name='search' className=' outline-0 py-[2px] px-2 bg-[#00829699] text-white' />
                        <button type='' className='bg-[#008296] text-white py-[2px] px-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>

                        </button>
                    </div>
                </div>
                <div className='flex gap-5 items-center text-white'>
                    <div>
                        <Link href='/profile'>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </Link>

                    </div>
                    <div >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>

                    </div>
                    <div
                        onClick={() => handleLogOut()}
                        className='cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
                        </svg>

                    </div>
                    <div className='flex'>
                        <select className='bg-[#002F36] outline-0'>
                            <option value="En">EN</option>
                            <option value="Hi">HI</option>
                        </select>


                    </div>
                    <div>
                        <p className='text white text-sm'>Help</p>
                    </div>
                </div>
                {
                    showLogoutModal &&
                    <LogOutModal
                        visible={showLogoutModal}
                        onClose={handleClose}
                    />
                }
                {
                    isClicked && <SideBarModal
                        isClicked={isClicked}
                        setIsClicked={setIsClicked}
                    />
                }
            </div>
        </navbar>
    )
}

export default Navbar