import { FaLock } from "react-icons/fa";
import useAxiosPublic from "../../hooks/Axios";
import { useEffect, useState } from "react";
const CreatedRooms = () => {
    const [createdRooms, setCreatedRooms] = useState([])
    const axiosPublic = useAxiosPublic();
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
    return (
        <div className="w-[50rem] m-auto">
            <div className="mb-4">
                <h2>Created Rooms</h2>
            </div>
            {
                createdRooms?.map((room, i) => {
                    return (
                        <div key={i} className="border text-gray-900 flex gap-2 bg-gray-50 mb-2 justify-between items-center p-2 rounded-lg">
                            <div className="flex items-center gap-4">
                                <div className="">
                                    <span>{i+1} {')'}</span>
                                </div>
                                <div className="grid">
                                    <h2>{room.roomName}</h2>
                                    <small>Subject: {room.subjectName}</small>
                                    <small>Members can join: {room.totalParticipant}</small>
                                </div>
                            </div>
                            <div>
                                <FaLock />
                            </div>
                        </div>
                    )
                })
            }

            
        </div>
    );
};

export default CreatedRooms;