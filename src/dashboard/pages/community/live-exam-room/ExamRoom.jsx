import { useEffect, useState } from "react";
import FixedBottomBar from "../../../../components/FixedBottomBar";
import { useSocketConnection } from "../../../../hooks/SocketContext";
import { useParams } from "react-router";
import LoggedInUser from "../../../../hooks/LoggedInUser";
import useAxiosPublic from "../../../../hooks/Axios";

const ExamRoom = () => {
    const [examQuestion, setExamQuestion] = useState()
    const [selectedOption, setSelectedOption] = useState({})
    const [fetchedResult, setFetchedResult] = useState({})
    const [participants, setParticipants] = useState()
    const [leaderboard, setLeaderboard] = useState([])
    const [isExamTaken, setExamTaken] = useState(false)
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
            } catch (err) {
                if (err.response.status === 403) {
                    setExamTaken(true);
                }
            }
        };

        fetchExamQuestions();

        if (!isConnected) return;

        socket.emit("join-exam-room", {
            roomId,
            username: user?.userName,
            userId: user?.userId
        });

        socket.on("user-joined", (data) => {
            console.log("User joined:uuu", data);

        })
        socket.on("leaderboard-update", (data) => {
            if (data.length === 0) return;
            console.log(data, 'lead data');
            setLeaderboard(data)
        })
        socket.on("room-user-count", (data) => {
            console.log("User joined:", data);
            setParticipants(data)
        })
    }, [roomId, isConnected, socket, user, axiosPublic]);
    console.log(participants, "perticipent");
    const handleOptionSelect = async (questionId, optionId, isCorrect) => {
        setSelectedOption(prev => ({
            ...prev,
            [questionId]: { questionId, optionId, isCorrect }
        }))
    }
    console.log(leaderboard);
    const handleSubmitAnswer = async () => {
        console.log("clicked");
        setSelectedOption({})
        const res = await axiosPublic.post(`/mcq/attempts`, selectedOption, {
            params: {
                roomId: roomId
            }
        })
        if (res.status === 201) {
            if (res.data.lastSubmittedOption.length !== 0) {
                console.log(res.data);
                setFetchedResult(res.data.lastSubmittedOption)
                socket.emit("leaderboard-update", {
                    roomId,
                    username: user?.userName,
                    userId: user?.userId
                })

                console.log("clicked");
            };
        }
    }
    return (
        <div className="w-[55rem] m-auto">
            <div className="border-b p-1 mb-3 flex justify-between items-center">
                <h2>Room</h2>
                <span>Total participants: {participants}</span>
            </div>
            {
            isExamTaken ? (
                <h2>Exam taken</h2>
            ):<div className="flex  justify-between gap-2">
                <div className="w-full">
                    <div className=" p-2 rounded-md">
                        {
                            examQuestion?.map((questions, i) => {
                                return (
                                    <div key={i} className={` ${i === examQuestion.length - 1 && "mb-[10rem]"} mb-5 bg-gray-50 p-2 shadow-sm rounded-md border-b`}>
                                        <h2 className="mb-3">{i + 1}. {questions.question}</h2>
                                        <div className="grid grid-cols-2 gap-2">
                                            {
                                                questions?.options.map((op, i) => {
                                                    const selectedOp = selectedOption[questions.id] || {};
                                                    const fetched = fetchedResult[questions.id]; // backend result for this question

                                                    const isUserSelected = op.id === fetched?.optionId;
                                                    const isCorrectOption = op.isCorrect;
                                                    let bgColor = 'bg-gray-200';


                                                    if (fetched) {
                                                        if (isUserSelected) {
                                                            bgColor = fetched.isCorrect ? 'bg-green-500' : 'bg-red-500';
                                                        } else if (!fetched.isCorrect && isCorrectOption) {
                                                            bgColor = 'bg-green-300'; // show correct answer if user got it wrong
                                                        }
                                                    } else if (isUserSelected) {
                                                        // optional: show instant selection before submit
                                                        bgColor = 'bg-yellow-200';
                                                    }
                                                    return (
                                                        <button
                                                            disabled={!!selectedOp.questionId}
                                                            onClick={() => handleOptionSelect(questions.id, op.id, op.isCorrect)} key={i} className={`
                                                            rounded-md bg-gray-100 p-2 text-gray-900
                                                            ${selectedOp.questionId && op.id === selectedOp.optionId && "bg-yellow-900"}
                                                            ${selectedOp.questionId === questions.id && "cursor-not-allowed"}
                                                            ${bgColor}
                                                        `}>{op.options}</button>

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
                        {
                            leaderboard?.map((leadBoard, i) => {
                                return (
                                    <div key={i} className='flex border-b bg-gray-50 p-5 rounded-lg items-center mb-1'>
                                        <h2 className="w-10 font-serif bg-red-300 h-10 rounded-full flex items-center justify-center">
                                            R
                                        </h2>
                                        <span className='ml-2'>{leadBoard.user.name}</span>

                                        {/* push to right */}
                                        <span className='ml-auto'>#1</span>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
        }
            <FixedBottomBar buttonName="Submit" buttonAction={handleSubmitAnswer} />
        </div>
    );
};

export default ExamRoom;