import { useEffect } from "react";
import FixedBottomBar from "../../../../components/FixedBottomBar";
import { useSocketConnection } from "../../../../hooks/SocketContext";
import { useParams } from "react-router";
import LoggedInUser from "../../../../hooks/LoggedInUser";

const ExamRoom = () => {
    const { socket, isConnected } = useSocketConnection();
    const {roomId} = useParams();
    const {user} = LoggedInUser();
    useEffect(() => {
        if(!isConnected) return;
        socket.emit("join-exam-room", {
            roomId: roomId,
            username: user?.userName,
            userId: user?.userId

        })
    })
    return (
        <div className="w-[55rem] m-auto">
            <h2>Room</h2>
            <div className="flex justify-between gap-2">
                <div className="border p-2 w-[80rem] rounded-md">
                    <div className="mb-5">
                        <h2>1. What is the main reason of international marketing?</h2>
                        <div className="grid grid-cols-2 gap-2">
                            <button className="rounded-md bg-gray-100 p-2 text-gray-900">1. I don't know</button>
                            <button className="rounded-md bg-gray-100 p-2 text-gray-900">2. We don't know</button>
                            <button className="rounded-md bg-gray-100 p-2 text-gray-900">3. I don't want to know</button>
                            <button className="rounded-md bg-gray-100 p-2 text-gray-900">4. He knows better</button>
                        </div>
                    </div>
                    <div>
                        <h2>1. What is the main reason of international marketing?</h2>
                        <div className="grid grid-cols-2 gap-2">
                            <button className="rounded-md bg-gray-100 p-2 text-gray-900">1. I don't know</button>
                            <button className="rounded-md bg-gray-100 p-2 text-gray-900">2. We don't know</button>
                            <button className="rounded-md bg-gray-100 p-2 text-gray-900">3. I don't want to know</button>
                            <button className="rounded-md bg-gray-100 p-2 text-gray-900">4. He knows better</button>
                        </div>
                    </div>
                </div>
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
            <FixedBottomBar buttonName="Submit" />
        </div>
    );
};

export default ExamRoom;