
import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "https://speedy-parcel-server-1.onrender.com",
    // baseURL: "http://localhost:3000",
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;