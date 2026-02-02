import { CiStopwatch } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import FixedBottomBar from "../../../components/FixedBottomBar";
import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/Axios";
const McqQuestions = () => {
    const [questionBank, setQuestionBank] = useState([])
    const axiosPublic = useAxiosPublic();
    const { subjectId } = useParams()
    console.log(subjectId);
    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const res = await axiosPublic.get(`/topics/${subjectId}`)
                setQuestionBank(res.data.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchSubjects();
    }, [axiosPublic, subjectId])
    return (
        <div className=" w-[50rem] m-auto">
            <h2 className="mb-8">Entrance Exam</h2>
            <div className="grid grid-cols-3 gap-3">
                {
                    questionBank?.map((question, i) => {
                        return (
                            <Link key={i} to={`/live-exam/mcq/${question.subjectId}/${question.id}`}>
                                <div className="border rounded-lg bg-white p-4">
                                    <h2 className="mb-3 font-semibold">{question.examTitle} {question.year}</h2>
                                    <div className="flex text-gray-600 gap-2 items-center">
                                        <p className="flex gap-1 items-center"><CiStopwatch /> {question._count.mcqQuestions * 1 || 0} mins</p>
                                        <span>|</span>
                                        <p className="flex gap-1 items-center">< FaRegEdit />{question._count.mcqQuestions || 0} Questions</p>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }

            </div>
        </div>
    );
};

export default McqQuestions;