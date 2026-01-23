import { CiStopwatch } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import FixedBottomBar from "../../../components/FixedBottomBar";
import { Link } from "react-router";
const McqQuestions = () => {
    return (
        <div className=" w-[50rem] m-auto">
            <h2 className="mb-8">Entrance Exam</h2>
            <div className="grid grid-cols-3 gap-3">
                <Link to="/live-exam/mcq">
                    <div className="border rounded-lg bg-white p-4">
                        <h2 className="mb-3 font-semibold">Physics Written Exam 2016</h2>
                        <div className="flex text-gray-600 gap-2 items-center">
                            <p className="flex gap-1 items-center"><CiStopwatch /> 4 hr</p>
                            <span>|</span>
                            <p className="flex gap-1 items-center">< FaRegEdit />15 Qs</p>
                        </div>
                    </div>
                </Link>
                <div className="border rounded-lg bg-white p-4">
                    <h2 className="font-semibold">Chemistry Written Exam 2016</h2>
                    <div className="flex text-gray-600 gap-2 items-center">
                        <p className="flex gap-1 items-center"><CiStopwatch /> 4 hr</p>
                        <span>|</span>
                        <p className="flex gap-1 items-center">< FaRegEdit />15 Qs</p>
                    </div>
                </div>
                <div className="border rounded-lg bg-white p-4">
                    <h2 className="font-semibold">Maths Written Exam 2016</h2>
                    <div className="flex text-gray-600 gap-2 items-center">
                        <p className="flex gap-1 items-center"><CiStopwatch /> 4 hr</p>
                        <span>|</span>
                        <p className="flex gap-1 items-center">< FaRegEdit />15 Qs</p>
                    </div>
                </div>
                <div className="border rounded-lg bg-white p-4">
                    <h2 className="font-semibold">English Written Exam 2016</h2>
                    <div className="flex text-gray-600 gap-2 items-center">
                        <p className="flex gap-1 items-center"><CiStopwatch /> 4 hr</p>
                        <span>|</span>
                        <p className="flex gap-1 items-center">< FaRegEdit />15 Qs</p>
                    </div>
                </div>
                <div className="border rounded-lg bg-white p-4">
                    <h2 className="font-semibold">Bangla Written Exam 2016</h2>
                    <div className="flex text-gray-600 gap-2 items-center">
                        <p className="flex gap-1 items-center"><CiStopwatch /> 4 hr</p>
                        <span>|</span>
                        <p className="flex gap-1 items-center">< FaRegEdit />15 Qs</p>
                    </div>
                </div>
                <div className="border rounded-lg bg-white p-4">
                    <h2 className="font-semibold">Biology Written Exam 2016</h2>
                    <div className="flex text-gray-600 gap-2 items-center">
                        <p className="flex gap-1 items-center"><CiStopwatch /> 4 hr</p>
                        <span>|</span>
                        <p className="flex gap-1 items-center">< FaRegEdit />15 Qs</p>
                    </div>
                </div>
                <div className="border rounded-lg bg-white p-4">
                    <h2 className="font-semibold">Quality Control Written Exam 2016</h2>
                    <div className="flex text-gray-600 gap-2 items-center">
                        <p className="flex gap-1 items-center"><CiStopwatch /> 4 hr</p>
                        <span>|</span>
                        <p className="flex gap-1 items-center">< FaRegEdit />15 Qs</p>
                    </div>
                </div>
            </div>
            <FixedBottomBar />

        </div>
    );
};

export default McqQuestions;