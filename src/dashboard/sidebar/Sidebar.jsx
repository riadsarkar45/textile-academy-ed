import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { FaBridge, FaCircleQuestion } from "react-icons/fa6";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { FaPenToSquare } from "react-icons/fa6";
import { HiOutlineUserGroup } from "react-icons/hi";
import { GrHistory } from "react-icons/gr";
import { MdOutlineLeaderboard } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import { Link } from "react-router";
import Logo from "../../assets/cropped-online-textile-academy-logo-favicon.webp"
import LoggedInUser from "../../hooks/LoggedInUser";
import { BsDiagram2 } from "react-icons/bs";
export default function Sidebar() {
    const [open, setOpen] = useState(false);
    const { user } = LoggedInUser();

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
                className={`fixed top-0 left-0 h-screen w-64 bg-white text-black flex flex-col transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
            >
                {/* Header (fixed) */}
                <div className="h-16  p-3 flex items-center border-b border-gray-700 shrink-0">
                    <img className="h-[3.6rem] w-[13rem] " src={Logo} alt="" />

                </div>

                {/* Scrollable Menu */}
                <nav className="flex-1 overflow-y-auto p-3 space-y-1">
                    <Link
                        to="/"
                        className=" flex items-center gap-2 text-sm px-4 py-2 rounded hover:bg-gray-700"
                    >
                        <FaHome /> Dashboard
                    </Link>
                    <Link
                        to="/question-bank"
                        className=" flex items-center gap-2 text-sm px-4 py-2 rounded hover:bg-gray-700"
                    >
                        <FaCircleQuestion /> Question Bank
                    </Link>
                    <Link
                        to="/practice-exam"
                        href="#"
                        className=" flex items-center gap-2 text-sm px-4 py-2 rounded hover:bg-gray-700"
                    >
                        <TbPlayerTrackNextFilled /> Fast Practice
                    </Link>
                    <Link
                        to="/mock-exam"
                        className=" flex items-center gap-2 text-sm px-4 py-2 rounded hover:bg-gray-700"
                    >
                        <FaPenToSquare /> Mock Exam
                    </Link>
                    <Link
                        to="/machines"
                        className=" flex items-center gap-2 text-sm px-4 py-2 rounded hover:bg-gray-700"
                    >
                        <BsDiagram2 /> Machine Diagrams
                    </Link>
                    <Link
                        to="/community"
                        className=" flex items-center gap-2 text-sm px-4 py-2 rounded hover:bg-gray-700"
                    >
                        <HiOutlineUserGroup /> Community
                    </Link>
                    <a
                        href="#"
                        className=" flex items-center gap-2 text-sm px-4 py-2 rounded hover:bg-gray-700"
                    >
                        <GrHistory /> History
                    </a>
                    <a
                        href="#"
                        className=" flex items-center gap-2 text-sm px-4 py-2 rounded hover:bg-gray-700"
                    >
                        <MdOutlineLeaderboard /> Leader Board
                    </a>
                    <a
                        href="#"
                        className=" flex items-center gap-2 text-sm px-4 py-2 rounded hover:bg-gray-700"
                    >
                        <GiProgression /> Progress
                    </a>
                    <Link
                        to="/create-mcq"
                        className=" flex items-center gap-2 text-sm px-4 py-2 rounded hover:bg-gray-700"
                    >
                        <GiProgression /> Create MCQ
                    </Link>
                    <Link
                        to="/competitive-exam"
                        className=" flex items-center gap-2 text-sm px-4 py-2 rounded hover:bg-gray-700"
                    >
                        <GiProgression />Live Competitive Exam
                    </Link>

                </nav>

                {/* User Profile (fixed bottom) */}
                <div className="h-16 border-t border-gray-700 flex items-center px-4 shrink-0">
                    <h2 className="w-10 font-serif bg-gray-200 border h-10 rounded-full flex items-center justify-center">
                        {user?.userName[0]}
                    </h2>
                    <div className="ml-3">
                        <p className="text-sm font-medium">{user?.userName}</p>
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
