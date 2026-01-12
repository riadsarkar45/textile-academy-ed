import { CiStopwatch } from 'react-icons/ci';
import { FaRegEdit } from 'react-icons/fa';
import profileImage from '../../../assets/Generated Image August 31, 2025 - 7_52PM.jpeg';
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { Link } from 'react-router';
const StartExam = () => {
    return (
        <div className='w-[50rem] m-auto'>
            <h2 className='mb-8'>Live Exam</h2>
            <div className='grid grid-cols-2 gap-6'>
                <div className=''>
                    <div className=' mb-5'>
                        <div className='flex bg-white gap-6 border p-5 rounded-lg items-center w-full '>
                            <span className='flex gap-1 items-center'><span className='text-red-600 font-extrabold'><CiStopwatch /></span> 1 hrs 30 mins</span>
                            <span> |</span>
                            <span className='flex gap-1 items-center'> <span className='text-green-600 font-extrabold'>< FaRegEdit /></span> 15 Questions</span>
                        </div>
                    </div>
                    <div className='w-full grid bg-white'>
                        <Link className='rounded-lg border mb-2 p-4 shadow-md bg-green-900 text-white font-semibold' to="/exam"><span >Start Exam</span></Link>
                        <button className='rounded-lg border p-4 border-green-900 text-green-900 shadow-md '>See Question Paper</button>
                    </div>
                    <div>
                        <h2 className='mt-6 mb-3'>Previous Attempts</h2>
                        <div>
                            <div className='flex bg-white border p-5 rounded-lg items-center mb-1'>
                                <div className='grid '>
                                    <span className=''>Attempt 1</span>
                                    <small>12 January, 2026</small>
                                </div>

                                {/* push to right */}
                                <span className='ml-auto'>#1</span>
                            </div>
                            <div className='flex bg-white border p-5 rounded-lg items-center mb-1'>
                                <div className='grid '>
                                    <span className=''>Attempt 1</span>
                                    <small>12 January, 2026</small>
                                </div>

                                {/* push to right */}
                                <span className='ml-auto'>#1</span>
                            </div>
                            <div className='flex bg-white border p-5 rounded-lg items-center mb-1'>
                                <div className='grid '>
                                    <span className=''>Attempt 1</span>
                                    <small>12 January, 2026</small>
                                </div>

                                {/* push to right */}
                                <span className='ml-auto'>#1</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='flex justify-between mb-3'>
                        <h2 className='mb-3'>Leader Board</h2>
                        <button className='bg-green-900 p-2 rounded-lg text-white'><FaRegArrowAltCircleRight /></button>
                    </div>
                    <div>
                        <div className='flex bg-white border p-5 rounded-lg items-center mb-1'>
                            <img
                                className='w-[3rem] h-[3rem] rounded-[3rem]'
                                src={profileImage}
                                alt="profileImage"
                            />
                            <span className='ml-2'>Riad Sarkar</span>

                            {/* push to right */}
                            <span className='ml-auto'>#1</span>
                        </div>
                        <div className='flex bg-white border p-5 rounded-lg items-center mb-1'>
                            <img
                                className='w-[3rem] h-[3rem] rounded-[3rem]'
                                src={profileImage}
                                alt="profileImage"
                            />
                            <span className='ml-2'>Riad Sarkar</span>

                            {/* push to right */}
                            <span className='ml-auto'>#1</span>
                        </div>
                        <div className='flex bg-white border p-5 rounded-lg items-center mb-1'>
                            <img
                                className='w-[3rem] h-[3rem] rounded-[3rem]'
                                src={profileImage}
                                alt="profileImage"
                            />
                            <span className='ml-2'>Riad Sarkar</span>

                            {/* push to right */}
                            <span className='ml-auto'>#1</span>
                        </div>
                        <div className='flex bg-white border p-5 rounded-lg items-center mb-1'>
                            <img
                                className='w-[3rem] h-[3rem] rounded-[3rem]'
                                src={profileImage}
                                alt="profileImage"
                            />
                            <span className='ml-2'>Riad Sarkar</span>

                            {/* push to right */}
                            <span className='ml-auto'>#1</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StartExam;