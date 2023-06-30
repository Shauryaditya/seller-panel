'use client'
import React, { useEffect, useState } from 'react'
import Inventory from '@/components/inventory/Inventory'
import Footer from '@/components/Footer'
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
                <Inventory />
                <Footer />
            </div>

        )
    }

}

export default page