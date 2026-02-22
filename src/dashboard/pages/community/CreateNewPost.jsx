import { BiBell } from 'react-icons/bi';
import { FaFileImage } from "react-icons/fa6";
import profileImage from '../../../assets/Generated Image August 31, 2025 - 7_52PM.jpeg';
import { useEffect, useState } from 'react';
import { HiMiniPaperAirplane } from "react-icons/hi2";
import useAxiosPublic from '../../../hooks/Axios';
import Posts from './Posts';
import Alert from '../../../components/Alert';
const CreateNewPost = () => {
    const [postDescription, setPostDescription] = useState();
    const [posts, setPosts] = useState([]);
    const [images, setImages] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axiosPublic.get('/community/posts');
                setPosts(response?.data.posts);
                setIsLoading(false);
            } catch (err) {
                console.error('Fetch error:', err);
            }
        };

        fetchPosts();
    }, [axiosPublic]);

    const handleCreateCommunityPost = async () => {

        try {
            const urlArray = [];
            for (let i = 0; i < images.length; i++) {
                const formData = new FormData();
                formData.append("images", images[i].file);
                const res = await axiosPublic.post("/upload", formData);
                urlArray.push(res.data.files[0].secure_url);
            }
            (urlArray[0]);
            if (urlArray.length === 0) {
                console.log("image not uploaded");
            }
            const postData = {
                image: urlArray[0],
                content: postDescription,
            }
            console.log(postData);
            const res = await axiosPublic.post("/create/community/post", postData)
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleFile = (e) => {
        const files = e.target.files;

        if (!files) return;

        const fileArray = Array.from(files);

        const previews = fileArray.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setImages((prev) => [...prev, ...previews]);
    };

    console.log(images);


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

                        <div className="absolute bottom-2 right-2 flex gap-3">
                            <button
                                onClick={() => handleCreateCommunityPost()}
                                type="button"
                                className={`${!postDescription && 'hidden'} text-green-600 text-sm rounded-md hover:bg-blue-700 p-1`}
                            >
                                <HiMiniPaperAirplane />
                            </button>

                            <label className={`${!postDescription && 'hidden'} text-green-600 text-sm rounded-md hover:bg-blue-700 p-1 cursor-pointer`}>
                                <FaFileImage />
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => handleFile(e)}
                                />
                            </label>

                        </div>
                    </div>

                </div>
            </div>

            {/* users posts will be shown here */}

            {isLoading && <Alert message="Loading..." messageType="loading" />}
            {
                posts?.length === 0 ? <div className='flex justify-center items-center mt-[10rem] p-4 text-lg'>
                    <span className=''>No posts found</span>
                </div> : <Posts communityPosts={posts} />
            }
        </div>
    );
};

export default CreateNewPost;