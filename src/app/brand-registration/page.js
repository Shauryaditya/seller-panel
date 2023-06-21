'use client'
import React from 'react'
import BrandRegistrationForm from '@/components/brand-registration/BrandRegistrationForm'
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
            <div>
                <BrandRegistrationForm />
            </div>
        )
    }
}

export default page