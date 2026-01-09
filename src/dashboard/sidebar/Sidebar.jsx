import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { FaCircleQuestion } from "react-icons/fa6";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { FaPenToSquare } from "react-icons/fa6";
import { HiOutlineUserGroup } from "react-icons/hi";
import { GrHistory } from "react-icons/gr";
import { MdOutlineLeaderboard } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
export default function Sidebar() {
    const [open, setOpen] = useState(false);

    return (
        <div>
            {/* Mobile toggle */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white px-3 py-2 rounded"
                onClick={() => setOpen(!open)}
            >
                ☰
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white flex flex-col transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
            >
                {/* Header (fixed) */}
                <div className="h-16  p-3 flex items-center border-b border-gray-700 shrink-0">
                    <h1 className="text-xl font-bold font-serif">Textile Academy</h1>
                </div>

                {/* Scrollable Menu */}
                <nav className="flex-1 overflow-y-auto p-3 space-y-5">
                    <a
                        href="#"
                        className="block flex items-center gap-2 text-sm px-4 py-2 rounded hover:bg-gray-700"
                    >
                        <FaHome /> Dashboard
                    </a>
                    <a
                        href="#"
                        className="block flex items-center gap-2 text-sm px-4 py-2 rounded hover:bg-gray-700"
                    >
                        <FaCircleQuestion /> Question Bank
                    </a>
                    <a
                        href="#"
                        className="block flex items-center gap-2 text-sm px-4 py-2 rounded hover:bg-gray-700"
                    >
                        <TbPlayerTrackNextFilled /> Fast Practice
                    </a>
                    <a
                        href="#"
                        className="block flex items-center gap-2 text-sm px-4 py-2 rounded hover:bg-gray-700"
                    >
                        <FaPenToSquare /> Mock Exam
                    </a>
                    <a
                        href="#"
                        className="block flex items-center gap-2 text-sm px-4 py-2 rounded hover:bg-gray-700"
                    >
                        <HiOutlineUserGroup /> Community
                    </a>
                    <a
                        href="#"
                        className="block flex items-center gap-2 text-sm px-4 py-2 rounded hover:bg-gray-700"
                    >
                        <GrHistory /> History
                    </a>
                    <a
                        href="#"
                        className="block flex items-center gap-2 text-sm px-4 py-2 rounded hover:bg-gray-700"
                    >
                        <MdOutlineLeaderboard /> Leader Board
                    </a>
                    <a
                        href="#"
                        className="block flex items-center gap-2 text-sm px-4 py-2 rounded hover:bg-gray-700"
                    >
                        <GiProgression /> Progress
                    </a>

                </nav>

                {/* User Profile (fixed bottom) */}
                <div className="h-16 border-t border-gray-700 flex items-center px-4 shrink-0">
                    <img
                        src="https://i.pravatar.cc/40"
                        alt="user"
                        className="w-10 h-10 rounded-full"
                    />
                    <div className="ml-3">
                        <p className="text-sm font-medium">Riad Sarkar</p>
                        <p className="text-xs text-gray-400">Admin</p>
                    </div>
                </div>
            </aside>

            {/* Overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/50 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}
        </div>
    );
}
