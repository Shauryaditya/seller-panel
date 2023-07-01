import Link from 'next/link'
import React from 'react'

const Profile = () => {
    return (

        <div className='max-w-screen-2xl mx-auto'>
            <p className="my-3 font-bold text-[#c55400] pl-3 text-sm">
                Seller Account Information
            </p>

            <div className="px-3 text-sm flex">
                {/* first div */}
                <div className="pr-2">
                    <div className="flex justify-between  border-2 py-2 px-2 font-semibold">
                        <p>
                            Welcome HOVERPEN <span className="text-[#017085]"><Link href='/profile/seller-info'>(Edit)</Link></span>
                        </p>
                        <Link href='/profile/seller-info' className="text-[#017085]">Your Seller Profile</Link>
                    </div>
                    <div className="border-2 rounded-md my-5">
                        <div className="flex justify-between bg-[#f1f3f2] py-4 px-3 font-semibold">
                            <p className="">Listings Status</p>
                            <p className="text-[#017085]">Going on holidays?</p>
                        </div>
                        <div className="flex justify-between py-3 px-3">
                            <p className="w-1/2 font-semibold">Current Status of</p>
                            <p className="w-1/2">
                                Active (Listings available for sale on Amazon)
                            </p>
                        </div>
                    </div>
                    <div className=" border-2 rounded-md my-6">
                        <div className="flex justify-between bg-[#f1f3f2] py-3 px-3 font-semibold">
                            <p>Your Services</p>
                            <p className="text-[#017085]">Manage</p>
                        </div>
                        <div className="flex justify-between border-b-2 py-3 px-3">
                            <p className="font-semibold">Sell On Amazon</p>
                            <p>Professional</p>
                        </div>
                        <div className="flex justify-between border-b-2 py-3 px-3">
                            <p className="font-semibold">Amazon Business</p>
                            <p>Registered</p>
                        </div>
                        <div className="flex justify-between border-b-2 py-3 px-3">
                            <p className="font-semibold">Fulfilment by Amazon</p>
                            <p>Registered</p>
                        </div>
                        <div className="flex justify-between border-b-2 py-3 px-3">
                            <p className="font-semibold">Runway</p>
                            <p>Registered</p>
                        </div>
                        <div className="flex justify-between border-b-2 py-3 px-3">
                            <p className="font-semibold">MFN Gold</p>
                            <p>Registered</p>
                        </div>
                        <div className="flex justify-between py-3 px-3">
                            <p className="font-semibold">Sponsored Products</p>
                            <p>Sponsored Products</p>
                        </div>
                    </div>
                    <button className="w-20 h-10 bg-[#018396] rounded-md uppercase text-white">feedback</button>
                </div>

                {/* second div  */}
                <div className="w-2/4">
                    <div className="border text-semibold rounded-md mb-3">
                        <p className="py-2 px-2 bg-[#f1f3f2] font-semibold">Payment Information</p>
                        <p className="px-6 py-4 text-[#018396]">Bank Account Information</p>
                    </div>
                    <div className="border text-semibold rounded-md my-3">
                        <p className="py-2 px-2 bg-[#f1f3f2] font-semibold">Business Information</p>
                        <div className="flex justify-between">
                            <p className="px-6 py-2 text-[#018396]">Bank Account Information</p>
                            <Link href='/profile/address' className="pr-10 py-2 text-[#018396]">Invoice Address</Link>
                        </div>
                        <p className="px-6 py-2 text-[#018396]">Your Merchant Token</p>
                    </div>
                    <div className="border text-semibold rounded-md my-3">
                        <p className="py-2 px-2 bg-[#f1f3f2] font-semibold">Shipping and Returns Information</p>
                        <div className="flex justify-between">
                            <p className="px-6 py-2 text-[#018396]">Return Information</p>
                            <p className="pr-10 py-2 text-[#018396]">Shipping Settings</p>
                        </div><div className="flex justify-between">
                            <p className="px-6 py-2 text-[#018396]">Easy Ship Settings</p>
                            <p className="pr-10 py-2 text-[#018396]">Buy Shipping References</p>
                        </div>
                    </div>
                    <div className="border text-semibold rounded-md">
                        <p className="py-2 px-2 bg-[#f1f3f2] font-semibold">Tax Information</p>
                        <div className="flex justify-between">
                            <p className="px-6 py-2 text-[#018396]">Manage GST Details</p>
                            <p className="pr-10 py-2 text-[#018396]">Place Of Establishment</p>
                        </div>
                        <p className="px-6 py-2 text-[#018396]">RFC ID</p>
                    </div>
                </div>

                {/* third div  */}
                <div className="pl-2 w-1/3">
                    <div className="border text-semibold rounded-md mb-3">
                        <p className="py-2 px-2 bg-[#f1f3f2] font-semibold uppercase">faq</p>
                        <p className="px-6 py-4 text-[#018396] underline font-semibold">I signed up for an account by mistake or I don’t need it anymore. How do I close the account?</p>
                        <p className="px-6 py-4 text-[#018396] underline font-semibold">I signed up for an account by mistake or I don’t need it anymore. How do I close the account?</p>
                        <p className="px-6 py-4 text-[#018396] underline font-semibold">I signed up for an account by mistake or I don’t need it anymore. How do I close the account?</p>
                    </div>

                    <div className="border text-semibold  rounded-md mb-3">
                        <p className="py-2 px-2 bg-[#f1f3f2] font-semibold uppercase">Account management</p>
                        <p className=" text-[#018396] text-left pl-6 py-1 font-semibold">Notification Preferences</p>
                        <p className=" text-[#018396] text-left pl-6 py-1 font-semibold">Login settings</p>
                        <p className=" text-[#018396] text-left pl-6 py-1 font-semibold">Downgrade Account</p>
                        <p className=" text-[#018396] text-left pl-6 py-1 font-semibold">Close Account</p>
                    </div>


                </div>

            </div>
        </div>
    )
}

export default Profile