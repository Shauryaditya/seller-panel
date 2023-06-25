import Link from 'next/link'
import React from 'react'

const SignupSuccessful = () => {
    return (
        <div className="flex w-full max-w-screen-2xl mx-auto">
            {/* left part */}

            <div className="bg-gradient-to-b from-[#0573e3] to-[#031d7a]  w-7/12  h-screen flex justify-center items-center">
                <div className="">
                    <h1 className="text-white  text-5xl font-semibold ">
                        21 Genx Seller Portal
                    </h1>
                    <p className="text-white py-4 text-xl">
                        The most robust and functional seller panel
                    </p>
                </div>
            </div>

            {/* right part */}
            <div className="grow flex items-center justify-center ">
                <div className='max-w-sm mx-auto'>
                    <div className=' flex gap-5 items-center'>
                        <h1 className="text-2xl font-bold">Congratulations , Guest </h1>
                        <div className='flex justify-center items-center w-5 h-5 rounded-full bg-green-500 text-white'>&#x2713;</div>
                    </div>
                    <h3 className="text-base text-gray-700 font-semibold pb-8">Your account is being reviewed and confirmation will be sent to you within 24 hrs  </h3>

                </div>
            </div>
        </div>
    )
}

export default SignupSuccessful