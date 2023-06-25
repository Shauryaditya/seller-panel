'use client'
import React, { useState, useEffect } from "react";
const BASE_URL = 'https://two1genx.onrender.com'
import useAuth from "@/hook/useAuth";
import { useRouter } from 'next/navigation';
import Link from "next/link";
export const ChangePassword = () => {
    const [passToken, setPassToken] = useState(null)
    useEffect(() => {
        const token = localStorage.getItem('passToken')
        setPassToken(token)
    }, [])

    const router = useRouter();

    // state for show password
    const [isClicked, setIsClicked] = useState(false)
    const [showPass, setShowPass] = useState(false)
    // importing context state
    const { setAuth } = useAuth();

    const [error, setError] = useState('')
    // handling form value
    const [formData, setFormData] = useState({
        password: '',
        re_password: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setError('')
        setFormData((preValue) => {
            return { ...preValue, [name]: value }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // handle form submission here
        if (formData.password === formData.re_password) {
            const url = BASE_URL + '/v1/seller-auth/reset-password'
            handleChangePassWord(url, { 'token': passToken, 'password': formData.password })
        } else {
            setError('Password Does Not Match')
        }
    };
    async function handleChangePassWord(url, data) {
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
                router.push('/auth/change-successful')
            }
            console.log(responseData);
            setError(responseData.message)
            return response;

        } catch (error) {
            console.error('Error:', error);
        }
    }


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
                        <h3 className="text-base text-gray-700 font-semibold pb-8">Don't Worry</h3>
                    </div>

                    <div className=" mb-2 border-b border-solid border-[#262626]">
                        <div className="flex flex-row">
                            <input
                                className="w-full p-2 text-black outline-0"
                                id="phone"
                                type={`${isClicked ? 'text' : 'password'}`}
                                required
                                placeholder="Enter Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <div
                                onClick={() => setIsClicked((preValue) => !preValue)}
                                className="flex items-center cursor-pointer">
                                {
                                    isClicked ?
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        :

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                }


                            </div>
                        </div>
                    </div>


                    <div className='mb-2 border-b border-solid border-[#262626]'>
                        <div className="flex flex-row">
                            <input
                                className="w-full p-2 text-black outline-0"
                                type={`${showPass ? 'text' : 'password'}`}
                                placeholder="Re Enter Password"
                                name="re_password"
                                value={formData.re_password}
                                onChange={handleChange}
                            />
                            <div
                                onClick={() => setShowPass((preValue) => !preValue)}
                                className="flex items-center cursor-pointer">
                                {
                                    showPass ?
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        :

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                }


                            </div>
                        </div>
                    </div>


                    {/* //login button */}
                    <div className="flex justify-center pt-5">
                        <button
                            className="w-fit bg-blue-500 hover:bg-blue-700 text-white  py-3 px-32 rounded-full focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Create Password
                        </button>

                    </div>
                    {
                        error !== '' &&
                        <p className='text-xs  text-center text-red-500'>{error}</p>
                    }

                </form>
                {/* <Otp
          onSubmit={handleOtpVerification}
        /> */}
            </div>
        </div>
    );
};