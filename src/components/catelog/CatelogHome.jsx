import React from 'react'
import HeroSection from './HeroSection'
import HowToAddProduct from './HowToAddProduct'
import AboutAddingProduct from './AboutAddingProduct'
const CatelogHome = () => {
    return (
        <main>
            <div className='max-w-screen-2xl mx-auto bg-[#F5F9FA]'>
                <HeroSection />
                <HowToAddProduct />
                <AboutAddingProduct />
            </div>
        </main>
    )
}

export default CatelogHome