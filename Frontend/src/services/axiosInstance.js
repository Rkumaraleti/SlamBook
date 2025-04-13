import axios from "axios";
import { toast } from "react-toastify";

let logoutFunction = null; // Placeholder for the logout function

// Function to set the logout function from authContext
export const setLogoutFunction = (logout) => {
    logoutFunction = logout;
};

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL, // Use environment variable for the server URL
    withCredentials: true, // Include cookies in requests
});

// Add a request interceptor to include the Authorization header
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("jwtToken"); // Retrieve the JWT token from localStorage
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response?.data?.message || error.message);

        // Check for specific error status codes
        if (error.response?.status === 401 || error.response?.status === 403) {
            // Call the logout function if it is set
            if (logoutFunction) {
                logoutFunction();
            } else {
                console.error("Logout function is not set.");
            }
        }

        // Show error message as a toast
        error.response?.data?.message && toast.error(error.response.data.message);

        return Promise.reject(error);
    }
);

export default axiosInstance;