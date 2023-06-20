import React, { useState, useEffect } from 'react'
const BASE_URL = 'https://two1genx.onrender.com'
const Signup = () => {
    const [isOptSent, setIsOtpSent] = useState(false)
    const [timer, setTimer] = useState(0);
    const [error, setError] = useState('')

    // form state 
    const [formData, setFormData] = useState({
        phone: '',
        otp: ''
    })
    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData((preValue) => {
            return { ...preValue, [name]: value }
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            phone: "+91" + formData.phone,
            otp: formData.otp
        }
        console.log(data);
        const url = BASE_URL + '/v1/seller-auth/verify/phone-otp'
        verifyOtp(url, data)
    }
    const sendOtp = () => {
        console.log(formData);
        const url = BASE_URL + '/v1/seller-auth/sendOTPtoPhone'
        handleSendOtp(url, { phone: '+91' + formData.phone })
    }

    async function handleSendOtp(url, data) {
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
                setIsOtpSent(true)
                setTimer(60); // Set the initial timer value to 60 seconds
            }
            console.log(responseData);
            setError(responseData.message)
            return responseData;

        } catch (error) {
            console.error('Error:', error);
        }
    }
    async function verifyOtp(url, data) {
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
                localStorage.setItem("access_token", responseData.access_token);
                localStorage.setItem("refresh_token", responseData.refresh_token);
                localStorage.setItem("userId", responseData.userId);
                window.location.href = "/seller-panel/signup-form"
            }

            setError(responseData.message)
            return responseData;

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
                        <h1 className="text-2xl font-bold">Hello Again!</h1>
                        <h3 className="text-xl font-semibold pb-8 pt-3">Sign in</h3>
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

                    <div className={`mb-2 border-b border-solid border-[#262626]`}>
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
                                onClick={() => sendOtp()}
                                className={`text-xs text-[#0057FF] whitespace-nowrap ${timer !== 0 ? 'pointer-events-none' : 'pointer-events-auto'}`} type="button" >
                                {isOptSent ? `Resend OTP` : 'Send OTP'}
                                {timer !== 0 && ` (${timer})`}
                            </button>
                        </div>
                    </div>

                    {/* //login button */}
                    <div className="flex justify-center">
                        <button
                            className="w-fit bg-blue-500 hover:bg-blue-700 text-white  py-3 px-32 rounded-full focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Log In
                        </button>

                    </div>
                    {
                        error !== '' &&
                        <p className={`text-xs  text-center ${isOptSent ? 'text-green-500' : 'text-red-500'}`}>{error}</p>
                    }

                </form>
            </div>
        </div>
    )
}

export default Signup