import { useEffect, useState } from 'react';
import useAxiosPublic from './Axios';

const LoggedInUser = () => {
    const [user, setUser] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const axiosPublic = useAxiosPublic();
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axiosPublic.get('/logged-in-user');
                console.log(response?.data);
                setUser(response?.data.user)
                setIsLoading(false)
            } catch (err) {
                console.error('Fetch error:', err);
            }
        };

        fetchPosts();
    }, [axiosPublic]);
    return { user, isLoading };
};

export default LoggedInUser;