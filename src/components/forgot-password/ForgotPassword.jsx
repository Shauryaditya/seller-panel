'use client'
import React, { useState, useEffect } from "react";
const BASE_URL = 'https://two1genx.onrender.com'
import useAuth from "@/hook/useAuth";
import { useRouter } from 'next/navigation';
import Link from "next/link";
export const ForgotPassword = () => {
    const router = useRouter();
    // importing context state
    const { setAuth } = useAuth();
    const [isOptSent, setIsOtpSent] = useState(false)
    const [timer, setTimer] = useState(0);

    const [error, setError] = useState('')

    const [isClicked, setIsClicked] = useState(false)
    // handling form value
    const [formData, setFormData] = useState({
        phone: '',
        email: '',
        otp: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((preValue) => {
            return { ...preValue, [name]: value }
        })
    }


    const handleSendOtp = () => {
        console.log("otp", formData.phone);
        const url = BASE_URL + '/v1/seller-auth/forgot-password';
        handleLogin(url, { phone: "+91" + formData.phone }, 'otp');

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // handle form submission here
        const data = {
            phone: "+91" + formData.phone,
            otp: formData.otp
        }
        console.log(data);

        const url = BASE_URL + '/v1/seller-auth/forgot-password/verify-otp';

        handleLogin(url, data, 'verify')
    };
    async function handleLogin(url, data, type) {
        console.log(url);
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();
            if (response.ok) {
                if (type === 'otp') {

                    setIsOtpSent(true)
                    setTimer(60); // Set the initial timer value to 60 seconds
                } else {
                    localStorage.setItem('passToken', responseData.token)
                    router.push('/auth/change-password')
                }

            }
            console.log(responseData);
            setError(responseData.message)
            return response;

        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Function to update the timer every second
    useEffect(() => {
        let intervalId;
        if (timer > 0 && isOptSent) {
            intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [timer, isOptSent]);
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

                <form className="w-full px-5" onSubmit={handleSubmit} autoComplete="off">
                    <div>
                        <h1 className="text-2xl font-bold">Forgot Password !</h1>
                        <h3 className="text-base text-gray-700 font-semibold pb-8 ">Don't Worry</h3>
                    </div>

                    <div className="mb-2 border-b border-solid border-[#262626]">
                        <input
                            className="w-full p-2 text-black outline-0"
                            id="phone"
                            type="tel"
                            required
                            placeholder="Enter Mobile Number"
                            name="phone"
                            pattern="[0-9]{10}"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>


                    <div className='mb-2 border-b border-solid border-[#262626]'>
                        <div className="flex flex-row">
                            <input
                                className="w-full p-2 text-black outline-0"
                                id="otp"
                                type='text'
                                placeholder="Enter Otp"
                                name="otp"
                                maxLength={6}
                                minLength={6}
                                value={formData.otp}
                                onChange={handleChange}
                            />
                            <button
                                onClick={() => handleSendOtp()}
                                className={`text-xs text-[#0057FF] whitespace-nowrap ${timer !== 0 ? 'pointer-events-none' : 'pointer-events-auto'}`} type="button" >
                                {isOptSent ? `Resend OTP` : 'Send OTP'}
                                {timer !== 0 && ` (${timer})`}
                            </button>
                        </div>
                    </div>


                    {/* //login button */}
                    <div className="flex justify-center pt-5">
                        <button
                            className="w-fit bg-blue-500 hover:bg-blue-700 text-white  py-3 px-32 rounded-full focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Next
                        </button>

                    </div>
                    {
                        error !== '' &&
                        <p className={`text-xs  text-center ${isOptSent ? 'text-green-500' : 'text-red-500'}`}>{error}</p>
                    }

                </form>
                {/* <Otp
          onSubmit={handleOtpVerification}
        /> */}
            </div>
        </div>
    );
};