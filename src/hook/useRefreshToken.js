'use client'
import useAuth from './useAuth';
import axios from './axios';
import { useEffect } from 'react';
const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();
    useEffect(() => {
        // Retrieve data from local storage
        const refreshToken = localStorage.getItem('refresh_token');

        // Do something with the retrieved data
        console.log('refresh ', refreshToken);
        refresh(refreshToken);
    }, [auth]);
    const refresh = async (token) => {
        const response = await axios.get('https://two1genx.onrender.com/v1/seller-auth/refresh-token', {
            body: JSON.stringify({ 'refresh_token': token })
        });
        const responseData = await response.Json()
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.access_token);
            return { ...prev, accessToken: response.data.access_token, refreshToken: response.refresh_token }
        });
        localStorage.setItem("access_token", responseData.access_token);
        localStorage.setItem("refresh_token", responseData.refresh_token);
        localStorage.setItem("userId", responseData.userId);
        console.log(responseData);
        console.log(responseData);
        return responseData;
    }

};

export default useRefreshToken;