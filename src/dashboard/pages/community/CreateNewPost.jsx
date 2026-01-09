import { BiBell } from 'react-icons/bi';
import profileImage from '../../../assets/Generated Image August 31, 2025 - 7_52PM.jpeg';
import { HiDotsVertical } from "react-icons/hi";
const CreateNewPost = () => {
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
                    <textarea name="" id="" placeholder='What do you want to know today?' className='p-2 w-full outline-none h-14 rounded-lg border'></textarea>
                </div>
            </div>

            {/* users posts will be shown here */}

            <div className='bg-white shadow p-3 rounded-md mt-8'>
                <div className='flex justify-between items-center gap-2 mb-5'>
                    <div className='flex gap-3 items-center'>
                        <h2 className='w-[2rem] rounded-[2rem] h-[2rem] p-2 bg-gray-100' >R</h2>
                        <div className='grid'>
                            <span className='text-md'>Riad Sarkar</span>
                            <span className='text-xs'>5 Days ago</span>
                        </div>
                    </div>
                    <span><HiDotsVertical /></span>
                </div>
                <h2 className='mb-4'>Something is going to happen</h2>
                <div className="w-full h-[20rem]">
                    <img
                        src={profileImage}
                        alt="profile"
                        className="w-full h-full object-contain"
                    />
                </div>



                <div className=''>
                    <div className='flex justify-between border-b mb-3 p-2'>
                        <span>2 Likes</span>
                        <span>2 Comments</span>
                    </div>
                    <div className='flex justify-between border p-2 rounded-md'>
                        <button className="block mx-auto">Like</button>
                        <span>|</span>
                        <button className="block mx-auto">Comment</button>
                    </div>
                    <div>
                        <div className='flex gap-3 mt-6'>
                            <div>
                                <img className='w-[3rem] h-[3rem] rounded-[3rem]' src={profileImage} alt="userProfile" />
                            </div>
                            <div>
                                <div className='bg-gray-200 p-2 rounded-md'>
                                    <h2>Riad Sarkar</h2>
                                    <h2>This is my first and last comment</h2>
                                </div>
                                <div className='flex gap-5 mt-2 text-sm text-gray-500'>
                                    <span>Like</span>
                                    <span>Report</span>
                                </div>
                            </div>


                        </div>
                        <div className='flex gap-3 mt-6'>
                            <div>
                                <img className='w-[3rem] h-[3rem] rounded-[3rem]' src={profileImage} alt="userProfile" />
                            </div>
                            <div>
                                <div className='bg-gray-200 p-2 rounded-md'>
                                    <h2>Riad Sarkar</h2>
                                    <h2>This is my first and last comment amar shonar bangla ami tomay ghrina kori</h2>
                                </div>
                                <div className='flex gap-5 mt-2 text-sm text-gray-500'>
                                    <span>Like</span>
                                    <span>Report</span>
                                </div>
                            </div>


                        </div>
                        <div className='flex gap-3 mt-6'>
                            <div>
                                <img className='w-[3rem] h-[3rem] rounded-[3rem]' src={profileImage} alt="userProfile" />
                            </div>
                            <div>
                                <div className='bg-gray-200 p-2 rounded-md'>
                                    <h2>Riad Sarkar</h2>
                                    <h2>This is my first and last comment</h2>
                                </div>
                                <div className='flex gap-5 mt-2 text-sm text-gray-500'>
                                    <span>Like</span>
                                    <span>Report</span>
                                </div>
                            </div>

                        </div>
                        <button className='p-2 mb-4'>See more comments...</button>

                        <div className='flex gap-3 items-center mt-5'>
                            <img className='w-[3rem] h-[3rem] rounded-[3rem]' src={profileImage} alt="userProfile" />
                            <textarea name="" id="" placeholder='Write your answer' className='p-2 w-full outline-none h-14 rounded-lg border'></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateNewPost;