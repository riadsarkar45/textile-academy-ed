import axios from 'axios';

const axiosPublic = axios.create({
    // baseURL: "https://textile-academy-ed-7.onrender.com",
    baseURL: "http://127.0.0.1:5000",
    withCredentials: true,
});
axiosPublic.interceptors.response.use(
    response => response,
    error => {
        if (error?.response?.status === 401) {
            console.log("Unauthorized access! Logging out..");
        }
        return Promise.reject(error)
    }
)
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;