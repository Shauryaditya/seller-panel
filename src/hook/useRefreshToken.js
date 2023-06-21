'use client'
import useAuth from "./useAuth";
const BASE_URL = 'https://two1genx.onrender.com'
const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();
    const refreshToken = auth.refresh_token;
    const refresh = async () => {
        const response = await fetch(`${BASE_URL}/v1/seller-auth/refresh-token`, {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            }
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.access_token);
            return { ...prev, access_token: response.access_token }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;