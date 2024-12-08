import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to include token in every request
api.interceptors.request.use(
    (config) => {
        // Retrieve token from localStorage
        const token = localStorage.getItem("superui-token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle errors during request creation
        return Promise.reject(error);
    }
);

export default api;
