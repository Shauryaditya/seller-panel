'use client'
import React, { useEffect, useState } from 'react'
import EditSellerInfo from '@/components/seller-information/EditSellerInfo'
import SellerInvoice from '@/components/seller-information/SellerInvoice'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
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
                <Navbar />
                <SellerInvoice />
                {/* <Footer /> */}
            </div>
        )
    }

}

export default page