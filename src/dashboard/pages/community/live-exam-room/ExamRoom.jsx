import { useEffect, useState } from "react";
import FixedBottomBar from "../../../../components/FixedBottomBar";
import { useSocketConnection } from "../../../../hooks/SocketContext";
import { useParams } from "react-router";
import LoggedInUser from "../../../../hooks/LoggedInUser";
import useAxiosPublic from "../../../../hooks/Axios";

const ExamRoom = () => {
    const [examQuestion, setExamQuestion] = useState()
    const { socket, isConnected } = useSocketConnection();
    const { roomId } = useParams();
    const { user } = LoggedInUser();
    const axiosPublic = useAxiosPublic();
    useEffect(() => {
        const fetchExamQuestions = async () => {
            if (!roomId || !isConnected) return;
            try {
                const res = await axiosPublic.get(`/mcq`, {
                    params: { roomId }
                });
                setExamQuestion(res.data.mcqs);
                console.log(res.data.mcqs);
            } catch (err) {
                console.log(err);
            }
        };

        fetchExamQuestions();

        if (!isConnected) return;

        socket.emit("join-exam-room", {
            roomId,
            username: user?.userName,
            userId: user?.userId
        });
    }, [roomId, isConnected, socket, user, axiosPublic]);

    return (
        <div className="w-[55rem] m-auto">
            <h2>Room</h2>
            <div className="flex  justify-between gap-2">
                <div className="w-full">
                    <div className="border p-2 rounded-md">
                        {
                            examQuestion?.map((questions, i) => {
                                return (
                                    <div key={i} className="mb-5">
                                        <h2 className="mb-3">{i + 1}. {questions.question}</h2>
                                        <div className="grid grid-cols-2 gap-2">
                                            {
                                                questions?.options.map((op, i) => {
                                                    return (
                                                        <button key={i} className="rounded-md bg-gray-100 p-2 text-gray-900">{op.options}</button>

                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
                <div className="w-full">
                    <div className="border rounded-lg p-2 w-full">
                        <div className='flex border-b bg-gray-50 p-5 rounded-lg items-center mb-1'>
                            <h2 className="w-10 font-serif bg-red-300 h-10 rounded-full flex items-center justify-center">
                                R
                            </h2>
                            <span className='ml-2'>Riad Sakar</span>

                            {/* push to right */}
                            <span className='ml-auto'>#1</span>
                        </div>
                        <div className='flex border-b bg-gray-50 p-5 rounded-lg items-center mb-1'>
                            <h2 className="w-10 font-serif bg-red-300 h-10 rounded-full flex items-center justify-center">
                                R
                            </h2>
                            <span className='ml-2'>Riad Sakar</span>

                            {/* push to right */}
                            <span className='ml-auto'>#1</span>
                        </div>
                        <div className='flex border-b bg-gray-50 p-5 rounded-lg items-center mb-1'>
                            <h2 className="w-10 font-serif bg-red-300 h-10 rounded-full flex items-center justify-center">
                                R
                            </h2>
                            <span className='ml-2'>Riad Sakar</span>

                            {/* push to right */}
                            <span className='ml-auto'>#1</span>
                        </div>
                    </div>
                </div>
            </div>
            <FixedBottomBar buttonName="Submit" />
        </div>
    );
};

export default ExamRoom;