'use client'
import React from 'react'
import Inventory from '@/components/inventory/Inventory'
import useAuth from '@/hook/useAuth'
import { useRouter } from 'next/navigation';
const page = () => {
    const router = useRouter()
    const { auth } = useAuth()
    const isLogin = auth.isLogin
    if (!isLogin) {
        router.push('/login')
    } else {
        return (
            <Inventory />
        )
    }
}

export default page