import { BiBell } from 'react-icons/bi';
import profileImage from '../../../assets/Generated Image August 31, 2025 - 7_52PM.jpeg';
import { HiDotsVertical } from "react-icons/hi";
import { useEffect, useState } from 'react';
import { HiMiniPaperAirplane } from "react-icons/hi2";
import useAxiosPublic from '../../../hooks/Axios';
import Posts from './Posts';
const CreateNewPost = () => {
    const [postDescription, setPostDescription] = useState();
    const [posts, setPosts] = useState([]);
    const axiosPublic = useAxiosPublic();
    console.log(postDescription);
    const handleCreateCommunityPost = async () => {
        const postData = {
            title: "No need title ((Static title for now))",
            authorId: 2,
            content: postDescription,
        }

        try {
            const res = await axiosPublic.post("/create/community/post", postData)
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axiosPublic.get('/community/posts');
                setPosts(response?.data.posts);
            } catch (err) {
                console.error('Fetch error:', err);
            }
        };

        fetchPosts();
    }, [axiosPublic]);
    return (
        <div className='w-[50rem] m-auto'>
            <div className='bg-white p-5 border rounded-md  shadow'>
                <div className='flex justify-between mb-[2rem]'>
                    <h2 className='text-md '>Write whatever you want to</h2>
                    <div className='flex gap-3 items-center'>
                        <img className='w-[2rem] h-[2rem] rounded-[3rem]' src={profileImage} alt="profileImage" />
                        <span className='text-[2rem]'><BiBell /></span>
                    </div>
                </div>
                <div className='flex gap-3 items-center'>
                    <img className='w-[3rem] h-[3rem] rounded-[3rem]' src={profileImage} alt="userProfile" />
                    <div className="relative w-full">
                        <textarea
                            onChange={(e) => setPostDescription(e.target.value)}
                            className="w-full p-2 h-15 border outline-none rounded-lg pr-20 resize-none"
                            placeholder="What do you want to know today?"
                        ></textarea>

                        <button
                            onClick={() => handleCreateCommunityPost()}
                            type="submit"
                            className={`${!postDescription && 'hidden'} absolute bottom-2 right-2 px-3 py-1 text-green-600 text-sm rounded-md hover:bg-blue-700`}
                        >
                            <HiMiniPaperAirplane />
                        </button>
                    </div>
                </div>
            </div>

            {/* users posts will be shown here */}

            <Posts communityPosts={posts} />
        </div>
    );
};

export default CreateNewPost;