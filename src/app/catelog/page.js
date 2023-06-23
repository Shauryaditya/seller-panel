'use client'
import React, { useEffect, useState } from 'react'
import CatelogHome from '@/components/catelog/CatelogHome'
import { redirect } from 'next/navigation'
import Footer from '@/components/Footer'
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
                <CatelogHome />
                {/* <Footer /> */}
            </div>
        )
    }

}

export default page