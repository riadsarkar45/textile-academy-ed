
import { Link } from "react-router";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/Axios";
import Alert from "../../../components/Alert";
const QuestionBank = () => {
    const [subjects, setSubjects] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const axiosPublic = useAxiosPublic();
    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const res = await axiosPublic.get("/subjects")
                setSubjects(res.data.data);
                console.log(res.data.data);
                setIsLoading(false)
            } catch (err) {
                console.log(err);
            }
        }
        fetchSubjects();
    }, [axiosPublic])

    return (
        <div className="w-[55rem] m-auto">
            <h2 className="mb-8">Question Bank</h2>
            {
                isLoading && <Alert message={"Loading Question Bank..."} messageType={"loading"} />
            }
            <div className="grid grid-cols-3 gap-4">
                {
                    subjects?.map((sub, i) => {
                        return (
                            <Link to={`/question-bank/exam/${sub.id}`} key={i}>
                                <h2 key={i} className="bg-gray-100 p-2 h-[8rem] font-serif rounded-lg flex items-center justify-center text-2xl border border-gray-200 cursor-pointer hover:bg-white">{sub.subjectName}</h2>
                            </Link>
                        )
                    })
                }
                {/* {
                    subjects?.map((exams, i) =>
                        <Link to="/question-bank/mcq-questions" key={i}>
                            <h2 key={i} className="bg-gray-100 p-5 h-[8rem] font-serif rounded-lg flex items-center justify-center text-2xl border border-gray-200 cursor-pointer hover:bg-white">{<exams.icon />}</h2>
                        </Link>
                    )
                } */}
            </div>
        </div>
    );
};

export default QuestionBank;