import axios from 'axios';

const axiosPublic = axios.create({
    baseURL: "https://textile-academy-ed-2.onrender.com",
    //   baseURL: "https://dragon-server-17.onrender.com",
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