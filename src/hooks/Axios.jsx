import axios from 'axios';

const axiosPublic = axios.create({
    baseURL: "http://localhost:5000",
    //   baseURL: "https://dragon-server-17.onrender.com",
    // withCredentials: true,
});
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;