'use client'
import React from 'react'
import CatelogHome from '@/components/catelog/CatelogHome'
import useAuth from '@/hook/useAuth'
import { useRouter } from 'next/navigation';
const page = () => {
    const router = useRouter()
    const { auth } = useAuth()
    const isLogin = auth.isLogin
    if (!isLogin) {
        router.push('/login')
    }
    return (
        <div>
            <CatelogHome />
        </div>
    )

}

export default page