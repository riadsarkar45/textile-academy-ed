import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/Axios";
import Alert from "../../components/Alert";

const Dashboard = () => {
    const [studentSummary, setStudentSummary] = useState({})
    const [leaderBoard, setLeaderBoard] = useState([])
    const [subjectWiseStats, setSubjectWiseStats] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
    useEffect(() => {
        const fetchAttempts = async () => {
            try {
                const res = await axiosPublic.get(`/summary`)
                const leaderBoard = await axiosPublic.get(`/leaderboard`)
                console.log(res.data.subjectWiseStats, "subject wise stats");
                setSubjectWiseStats(res.data.subjectWiseStats);
                setLeaderBoard(leaderBoard?.data?.leaderboard);
                setStudentSummary(res.data);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        fetchAttempts();
    }, [axiosPublic])
    if(isLoading){
        return <Alert message="Loading dashboard..." messageType="loading" />
    }
    return (
        <div className="w-[55rem] m-auto">
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
                        {
                            subjectWiseStats?.map((SUB_STATS, i) => {
                                return (
                                    <div key={i} className='flex border-b rounded-lg items-center mb-1'>

                                        <div className="grid p-5">

                                            <span>{SUB_STATS?.subjectName}</span>
                                            <div className="flex gap-2 text-sm">
                                                <small className="text-green-700 border-green-400 border bg-green-500 inline-flex items-center bg-opacity-30 justify-center p-[1px] w-[4.4rem] text-md rounded-md">Attempts: {SUB_STATS?.attempts} </small>
                                                <span className="inline-flex items-center justify-center h-[1.6rem] w-[6.4rem] rounded-[1.6rem] text-md bg-opacity-30 text-yellow-700 border-yellow-400 border bg-yellow-500">
                                                    Skipped:  {SUB_STATS?.totalSkipped}
                                                </span>
                                                <span className="inline-flex items-center justify-center h-[1.6rem] w-[5.1rem] rounded-[1.6rem] text-md bg-opacity-30 text-green-700 border-green-400 border bg-green-500">
                                                    Correct: {SUB_STATS?.totalCorrect}
                                                </span>
                                                <span className="inline-flex items-center justify-center h-[1.6rem] w-[4.9rem] rounded-[1.6rem] text-md bg-opacity-30 text-red-700 border-red-400 border bg-red-500">
                                                    Wrong: {SUB_STATS?.totalWrong}
                                                </span>

                                            </div>



                                        </div>

                                        {/* push to right */}
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;