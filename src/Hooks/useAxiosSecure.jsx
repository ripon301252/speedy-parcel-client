import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
    baseURL: "https://speedy-parcel-server-1.onrender.com",
});



const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        // request interceptor
        const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${user.accessToken}`
            return config
        })

        // response interceptor
        const resInterceptor = axiosSecure.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            console.log(error);

            const statusCode = error.status;
            if (statusCode === 401) {
                logOut().then(() => {
                    navigate('/login')
                })
            }

            return Promise.reject(error)
        })


        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        }
    }, [user, logOut, navigate])

    return axiosSecure;
};

export default useAxiosSecure;
