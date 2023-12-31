'use client'
import React, { useEffect, useState } from 'react'
import BrandRegistrationForm from '@/components/brand-registration/BrandRegistrationForm'
import Footer from '@/components/Footer'
import useAuth from '@/hook/useAuth'
import { redirect } from 'next/navigation'
const page = () => {
    const [token, setToken] = useState(null)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const accessToken = localStorage.getItem('access_token');
            console.log('add-product', accessToken);
            setToken(accessToken)
            if (!accessToken) {
                redirect('/');
            }
        }
    }, []);
    if (token !== null) {
        return (
            <div>
                <BrandRegistrationForm />
                <Footer />
            </div>
        )
    }
}


export default page