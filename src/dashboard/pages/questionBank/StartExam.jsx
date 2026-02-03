import { CiStopwatch } from 'react-icons/ci';
import { FaRegEdit } from 'react-icons/fa';
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { Link, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import useAxiosPublic from '../../../hooks/Axios';
import LeaderBoard from '../../learderboard/LeaderBoard';
const StartExam = () => {
    const [attempts, setAttempts] = useState([])
    const [leaderBoard, setLeaderBoard] = useState([])
    const { subjectId, yearId } = useParams()
    const axiosPublic = useAxiosPublic();
    console.log(subjectId);
    useEffect(() => {
        const fetchAttempts = async () => {
            try {
                const res = await axiosPublic.get(`/attempts-history/${subjectId}`)
                const leaderboard = await axiosPublic.get(`/leaderboard/${subjectId}`)
                setLeaderBoard(leaderboard?.data?.leaderboard);
                console.log(leaderboard?.data?.leaderboard);
                setAttempts(res.data.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchAttempts();
    }, [axiosPublic, subjectId])
    return (
        <div className='w-[50rem] m-auto'>
            <h2 className='mb-8'>Live Exam</h2>
            <div className='grid grid-cols-2 gap-6'>
                <div className=''>
                    {/* <div className=' mb-5'>
                        <div className='flex bg-white gap-6 border p-5 rounded-lg items-center w-full '>
                            <span className='flex gap-1 items-center'><span className='text-red-600 font-extrabold'><CiStopwatch /></span> 1 hrs 30 mins</span>
                            <span> |</span>
                            <span className='flex gap-1 items-center'> <span className='text-green-600 font-extrabold'>< FaRegEdit /></span> 15 Questions</span>
                        </div>
                    </div> */}
                    <div className='w-full grid bg-white'>
                        <Link className='rounded-lg border mb-2 flex justify-center p-4 shadow-md bg-green-900 text-white font-semibold' to={`/exam/mcq/${subjectId}/${yearId}`}><span >Start Exam</span></Link>
                        <button className='rounded-lg border p-4 border-green-900 text-green-900 shadow-md '>See Question Paper</button>
                    </div>
                    <div>
                        <h2 className='mt-6 mb-3'>Previous Attempts</h2>
                        <div>
                            {
                                attempts?.map((attempt, i) => {
                                    return (
                                        <div key={i} className='flex bg-white border p-5 rounded-lg items-center mb-1'>
                                            <div className='grid '>
                                                <span className=''> {i + 1}. Attempt</span>
                                                <small>12 January, 2026</small>

                                                <div className='flex gap-2 items-center'>
                                                    <span className="inline-flex items-center justify-center h-[1.6rem] w-[1.6rem] rounded-[1.6rem] bg-opacity-30 text-green-700 border-green-400 border bg-green-500">
                                                        {attempt?.correctAns}
                                                    </span>
                                                    <span className="inline-flex items-center justify-center h-[1.6rem] w-[1.6rem] rounded-[1.6rem] bg-opacity-30 text-red-700 border-red-400 border bg-red-500">
                                                        {attempt?.wrongAns}
                                                    </span>

                                                </div>
                                            </div>

                                            {/* push to right */}
                                            <span className='ml-auto'>#1</span>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                </div>
                <div>
                    <div className='flex justify-between mb-3'>
                        <h2 className='mb-3'>Leader Board</h2>
                        <button className='bg-green-900 p-2 rounded-lg text-white'><FaRegArrowAltCircleRight /></button>
                    </div>
                    <div>
                        <LeaderBoard leaderBoard={leaderBoard} />
                        {/* <div className='flex bg-white border p-5 rounded-lg items-center mb-1'>
                            <img
                                className='w-[3rem] h-[3rem] rounded-[3rem]'
                                src={profileImage}
                                alt="profileImage"
                            />
                            <span className='ml-2'>Riad Sarkar</span>

                            <span className='ml-auto'>#1</span>
                        </div> */}

                    </div>
                </div>

            </div>
        </div>
    );
};

export default StartExam;