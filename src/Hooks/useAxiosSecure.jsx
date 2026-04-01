import axios from "axios";

const axiosSecure = axios.create({
    baseURL: "http://localhost:3000",
});

// request interceptor
axiosSecure.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access-token");
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// response interceptor (optional but useful)
axiosSecure.interceptors.response.use(
    (response) => response,
    (error) => {
        // example: logout user if 401/403
        if (error.response?.status === 401 || error.response?.status === 403) {
            console.log("Unauthorized access");
        }
        return Promise.reject(error);
    }
);

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;