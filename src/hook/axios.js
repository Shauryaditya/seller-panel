import axios from "axios";
const BASE_URL = "https://two1genx.onrender.com";
export default axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
});
export const axiosAuth = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
});