'use client'
import React from 'react'
import AddProduct from '@/components/add-product/AddProduct'
import useAuth from '@/hook/useAuth'
import { useRouter } from 'next/navigation';
const page = () => {
    const router = useRouter()
    const { auth } = useAuth()
    console.log('add product', auth);
    const isLogin = auth.isLogin
    if (!isLogin) {
        router.push('/login')
    } else {
        return (
            <div>
                <AddProduct />
            </div>
        )
    }
}

export default page