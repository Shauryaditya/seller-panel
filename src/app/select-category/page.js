'use client'
import React from 'react'
import ProductCategories from '@/components/add-product/ProductCategories'
import useAuth from '@/hook/useAuth'
import { useRouter } from 'next/navigation';
const page = () => {
    const router = useRouter()
    const auth = useAuth()
    if (!auth.access_token) {
        router.push('/login')
    }
    return (
        <div>

            <ProductCategories />
        </div>
    )

}

export default page