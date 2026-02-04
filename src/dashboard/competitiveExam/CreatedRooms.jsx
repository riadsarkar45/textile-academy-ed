import { FaLock } from "react-icons/fa";
import useAxiosPublic from "../../hooks/Axios";
import { useEffect, useState } from "react";
import { MdMeetingRoom } from "react-icons/md";
import { useNavigate } from "react-router";
const CreatedRooms = () => {
    const [createdRooms, setCreatedRooms] = useState([])
    const [selectedRoomId, setSelectedRoomId] = useState("")
    const [roomPassword, setRoomPassword] = useState("")
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate()
    useEffect(() => {
        const fetchAttempts = async () => {
            try {
                const res = await axiosPublic.get(`/created-rooms`)
                setCreatedRooms(res.data.rooms)
                console.log(res.data.rooms)
            } catch (err) {
                console.log(err);
            }
        }
        fetchAttempts();
    }, [axiosPublic])

    const handleSelectedRoom = (roomId) => {
        setSelectedRoomId(roomId)
    }

    const handleSelectedJoin = async (roomId) => {
        console.log({ status: "Joining..." });
        const roomDetail = {
            roomId: roomId,
            roomPassword: roomPassword
        }
        console.log(roomDetail);
        const joinRoom = await axiosPublic.post("/join-room", roomDetail)
        console.log(joinRoom.status);
        if(joinRoom.status === 201){
            navigate(`/exam-room/${joinRoom.data.roomId}`)
        }
    }
    return (
        <div className="w-[50rem] m-auto">
            <div className="mb-4">
                <h2>Created Rooms</h2>
            </div>
            {
                createdRooms?.map((room, i) => {
                    return (
                        <div key={i} className="border text-gray-900 flex gap-2 bg-gray-50 mb-2 justify-between items-center p-2 rounded-lg">
                            {
                                selectedRoomId === room.id ? (
                                    <input onChange={(e) => setRoomPassword(e.target.value)} placeholder="Password" className="w-full p-1 border rounded-md outline-none" type="text" />

                                ) : <div className="flex items-center gap-4">
                                    <div className="">
                                        <span>{i + 1} {')'}</span>
                                    </div>
                                    <div className="grid">
                                        <h2>{room.roomName}</h2>
                                        <small>Subject: {room.subjectName}</small>
                                        <small>Members can join: {room.totalParticipant}</small>
                                    </div>
                                </div>

                            }
                            <div className="grid items-center grid-cols-2 gap-2">
                                {
                                    selectedRoomId === room.id && <div className="relative flex items-center group">
                                        <MdMeetingRoom onClick={() => handleSelectedJoin(room.id)} size={22} className=" cursor-pointer" />
                                        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                            Join
                                        </span>
                                    </div>
                                }

                                {
                                    room.isLocked && <div className="relative flex items-center group">
                                        <FaLock onClick={() => handleSelectedRoom(room.id)} size={17} className=" cursor-pointer" />
                                        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                            Un Lock
                                        </span>
                                    </div>
                                }
                            </div>
                        </div>
                    )
                })
            }


        </div>
    );
};

export default CreatedRooms;