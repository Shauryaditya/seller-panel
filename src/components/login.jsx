import React, { useState, useEffect } from "react";
const BASE_URL = 'https://two1genx.onrender.com'
export const Login = () => {

    const [isOptSent, setIsOtpSent] = useState(false)
    const [timer, setTimer] = useState(0);

    const [error, setError] = useState('')

    const [isClicked, setIsClicked] = useState(false)
    // handling form value
    const [formData, setFormData] = useState({
        phone: '',
        password: '',
        otp: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((preValue) => {
            return { ...preValue, [name]: value }
        })
    }

    // handling radion button 
    const [loginOption, setLoginOption] = useState('password');

    const handleOptionChange = (e) => {
        setLoginOption(e.target.value);
        setFormData((preValue) => {
            return { ...preValue, password: '' }
        })
    };

    const handleSendOtp = () => {
        console.log("otp", formData.phone);
        const url = BASE_URL + '/v1/seller-auth/sendLoginOtp';
        handleLogin(url, { phone: "+91" + formData.phone });

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // handle form submission here
        const data = {
            phone: "+91" + formData.phone,
            password: formData.password
        }
        console.log(data);

        const url = BASE_URL + (loginOption === 'password' ? '/v1/seller-auth/loginPhone' : '/v1/seller-auth/loginOtp');

        console.log(url);
        if (loginOption === 'password') {
            console.log('Password', data);

            handleLogin(url, data);
        } if (loginOption === 'otp') {
            handleLogin(url, { phone: "+91" + formData.phone, otp: formData.otp });
        }

    };
    async function handleLogin(url, data) {
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
                if (loginOption === 'otp' && url === 'https://two1genx.onrender.com/v1/seller-auth/sendLoginOtp') {
                    setIsOtpSent(true)
                    setTimer(60); // Set the initial timer value to 60 seconds
                }
                localStorage.setItem("access_token", responseData.access_token);
                localStorage.setItem("refresh_token", responseData.refresh_token);
                localStorage.setItem("userId", responseData.userId);
                // Redirect to another page
                window.location.href = '/catelog'

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
                    {
                        loginOption === 'password' &&
                        <div className={`${loginOption === 'password' ? 'transition-all duration-500' : 'transition-all duration-500'} mb-2 border-b border-solid border-[#262626]`}>
                            <div className="flex flex-row">
                                <input
                                    className="w-full p-2 text-black outline-0"
                                    id="password"
                                    type={`${isClicked ? 'text' : 'password'}`}
                                    placeholder="password"
                                    name="password"
                                    required
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
                    }
                    {
                        loginOption === 'otp' &&
                        <div className={`${loginOption === 'otp' ? 'transition-all duration-500' : 'transition-all duration-500'} mb-2 border-b border-solid border-[#262626]`}>
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
                    }
                    <div className="flex justify-center gap-2  flex-wrap py-2">
                        <div className="flex gap-x-1 items-center">
                            <input
                                type="radio"
                                name="login-option"
                                value="password"
                                checked={loginOption === 'password'}
                                onChange={handleOptionChange}
                            />
                            <label className="text-xs text-[#2C2C2E] font-normal">Login with password</label>
                        </div>
                        <div className="flex gap-x-1 items-center">
                            <input
                                type="radio"
                                name="login-option"
                                value="otp"
                                checked={loginOption === 'otp'}
                                onChange={handleOptionChange}
                            />
                            <label className="text-xs text-[#2C2C2E] font-normal">Login with OTP</label>
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
                    <div className="flex justify-center gap-5 py-2">
                        <a className="text-xs text-[#333333]">Forgot Password</a>
                        <a className="text-xs text-[#333333]">Create a new account</a>
                    </div>
                </form>
                {/* <Otp
          onSubmit={handleOtpVerification}
        /> */}
            </div>
        </div>
    );
};