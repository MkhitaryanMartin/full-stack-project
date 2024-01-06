import axios from "axios";
import { config } from "process";
import { AuthResponse } from "../models/respons/AuthResponse";


const $api = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL
});

$api.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config
});

$api.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${process.env.REACT_APP_API_URL}/auth/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accesToken);
            return $api.request(originalRequest);
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН')
        }
    }
    throw error;
})

export default $api