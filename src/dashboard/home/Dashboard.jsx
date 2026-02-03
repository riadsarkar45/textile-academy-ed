import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/Axios";

const Dashboard = () => {
    const [studentSummary, setStudentSummary] = useState({})
    const [leaderBoard, setLeaderBoard] = useState([])
    const axiosPublic = useAxiosPublic();
    useEffect(() => {
        const fetchAttempts = async () => {
            try {
                const res = await axiosPublic.get(`/summary`)
                const leaderBoard = await axiosPublic.get(`/leaderboard`)
                console.log(leaderBoard.data.leaderBoard);
                setLeaderBoard(leaderBoard?.data?.leaderboard);
                setStudentSummary(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchAttempts();
    }, [axiosPublic])
    console.log(studentSummary?.totalExamsAns?._sum?.correctAns, "checking");
    console.log(studentSummary?.totalExamsAns?._sum?.wrongAns, "checking");
    return (
        <div className="w-[50rem] m-auto">
            <h2>Student Dashboard</h2>
            <div className="grid gap-2 grid-cols-2 mb-4">
                <div className=" bg-gray-50 rounded-lg shadow-sm border-l-8 border-gray-500 h-[8rem]">
                    <h2 className="p-2 text-gray-600 border-b">Total MCQ Attempted</h2>
                    <div className="w-100 flex items-center justify-center">
                        <span className="text-[2rem] text-gray-600">{studentSummary?.totalExamsAttempt || 0}</span>
                    </div>
                </div>
                <div className=" bg-gray-50 rounded-lg shadow-sm border-l-8 border-green-500 h-[8rem]">
                    <h2 className="p-2 text-gray-600 border-b">Total Correct Answer</h2>
                    <div className="w-100 flex items-center justify-center">
                        <span className="text-[2rem] text-gray-600">{studentSummary?.totalExamsAns?._sum?.correctAns || 0}</span>
                    </div>
                </div>
                <div className=" bg-gray-50 rounded-lg shadow-sm border-l-8 border-red-500 h-[8rem]">
                    <h2 className="p-2 text-gray-600 border-b">Total Wrong Answer</h2>
                    <div className="w-100 flex items-center justify-center">
                        <span className="text-[2rem] text-gray-600">{studentSummary?.totalExamsAns?._sum?.wrongAns || 0}</span>
                    </div>
                </div>
                <div className=" bg-gray-50 rounded-lg shadow-sm border-l-8 border-gray-900 h-[8rem]">
                    <h2 className="p-2 text-gray-600 border-b">Total Accuracy</h2>
                    <div className="w-100 flex items-center justify-center">
                        <span className="text-[2rem] text-gray-600">{studentSummary?.accuracy?.toFixed(0) || 0}%</span>
                    </div>
                </div>

            </div>
            <div className="grid gap-2 grid-cols-2">
                <div className="bg-gray-50 shadow-sm text-gray-700 p-2 rounded-lg">
                    <h2 className="border-b mb-3 p-3">Leader Board</h2>
                    {
                        leaderBoard?.map((LD, i) => {
                            console.log(LD);
                            return (
                                <div key={i} className='flex border-b p-5 rounded-lg items-center mb-1'>
                                    <h2 className="w-10 font-serif bg-red-300 h-10 rounded-full flex items-center justify-center">
                                        {LD?.user?.name[0]}
                                    </h2>
                                    <span className='ml-2'>{LD?.user?.name}</span>

                                    {/* push to right */}
                                    <span className='ml-auto'>#1</span>
                                </div>
                            )
                        })
                    }
                    
                </div>
                <div className="">
                    <div className="bg-gray-50 shadow-sm text-gray-700 p-2 rounded-lg">
                        <h2 className="border-b p-3">Subject Wise Report</h2>
                        <div className='flex border-b p-5 rounded-lg items-center mb-1'>

                            <span className='ml-2'>Merchandising Introduction</span>

                            {/* push to right */}
                            <span className='ml-auto'>#1</span>
                        </div>
                        <div className='flex border-b p-5 rounded-lg items-center mb-1'>

                            <span className='ml-2'>Planning Introduction</span>

                            {/* push to right */}
                            <span className='ml-auto'>#1</span>
                        </div>
                        <div className='flex border-b p-5 rounded-lg items-center mb-1'>

                            <span className='ml-2'>T&A Introduction</span>

                            {/* push to right */}
                            <span className='ml-auto'>#1</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;