'use client'
import React from 'react'
import CatelogHome from '@/components/catelog/CatelogHome'
import useAuth from '@/hook/useAuth'
const page = () => {
    const { auth } = useAuth();
    console.log('user info', auth);
    return (
        <div>
            <CatelogHome />
        </div>
    )
}

export default page