import { useState } from "react";
import useAxiosPublic from "../../hooks/Axios";
import { Link } from "react-router";

const CompetitiveExam = () => {
    const [roomName, setRoomName] = useState("")
    const [subjectName, setSubjectName] = useState("")
    const [roomPassword, setRoomPassword] = useState("")
    const [totalParticipant, setTotalParticipant] = useState("")
    const axiosPublic = useAxiosPublic();
    const handleCreateRoom = async () => {
        console.log({ message: "Creating..." });
        const roomData = {
            roomName: roomName,
            subjectName: subjectName,
            roomPassword: roomPassword,
            totalParticipant: Number(totalParticipant)
        }
        const createRoom = await axiosPublic.post("/create-room", roomData)
        console.log(createRoom.data);
    }
    return (
        <div className='w-[50rem] m-auto'>
            <div className="flex justify-between mb-4">
                <h2 className=''>Competitive Exam</h2>
                <Link to="/created-rooms">
                    <small className='bg-green-500 bg-opacity-30 rounded-md text-green-700 border-green-500 border p-1'>See Created Rooms</small>
                </Link>
            </div>
            <div className='mb-3 grid grid-cols-2 w-full gap-5 items-center'>
                <div>
                    <span>Room Name:</span>
                </div>
                <div className='flex-1 items-center justify-center'>
                    <input onChange={(e) => setRoomName(e.target.value)} className='w-full border p-1 rounded-md outline-none' placeholder='Room Name' type="text" />
                </div>
            </div>
            <div className='mb-3 grid grid-cols-2 w-full gap-5 items-center'>
                <div>
                    <span>Subject Name:</span>
                </div>
                <div className='flex-1 items-center justify-center'>
                    <input onChange={(e) => setSubjectName(e.target.value)} className='w-full border p-1 rounded-md outline-none' placeholder='Subject Name' type="text" />
                </div>
            </div>
            <div className='mb-3 grid grid-cols-2 w-full gap-5 items-center'>
                <div>
                    <span>Room Password:</span>
                </div>
                <div className='flex-1 items-center justify-center'>
                    <input onChange={(e) => setRoomPassword(e.target.value)} className='w-full border p-1 rounded-md outline-none' placeholder='Room Password' type="text" />
                </div>
            </div>
            <div className='mb-3 grid grid-cols-2 w-full gap-5 items-center'>
                <div>
                    <span>Total participants :</span>
                </div>
                <div className='flex-1 items-center justify-center'>
                    <input onChange={(e) => setTotalParticipant(e.target.value)} className='w-full border p-1 rounded-md outline-none' placeholder='Total participants number' type="number" />
                </div>
            </div>

            <button onClick={() => handleCreateRoom()} className='bg-green-900 p-3 text-white rounded-lg shadow-lg'>Create Room</button>

        </div>
    );
};

export default CompetitiveExam;