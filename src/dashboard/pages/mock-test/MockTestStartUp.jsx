
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/Axios"
import MockTestTopics from "./MockTestTopics";
import MockTestSubject from "./MockTestSubject";
import MockQuestions from "./MockQuestions";
const MockTest = () => {
    const [subjects, setMockSubjects] = useState([])
    const [subjectTopics, setSubjectTopics] = useState([])
    const [mcqQuestions, setMcqQuestions] = useState([])
    const axiosPublic = useAxiosPublic()
    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const res = await axiosPublic.get(`/subjects/${'mockTest'}`)
                setMockSubjects(res.data.data);
                console.log(res.data.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchSubjects();
    }, [axiosPublic])
    // Diploma Textile Subjects
    console.log(mcqQuestions, "nono");

    return (
        <div className="w-[50rem] m-auto">
            <h2 className="mb-8 text-xl">Select Topic</h2>
            <div className="grid grid-cols-2 gap-4 mb-10">
                {
                    subjectTopics.length == 0 && <MockTestSubject
                        setSubjectTopics={setSubjectTopics}
                        subject={subjects}
                        setMcqQuestions={setMcqQuestions}
                    />
                }
                {
                    mcqQuestions > 0 && subjectTopics.length > 0 && <MockTestTopics
                        subjectTopics={subjectTopics} />
                }

                {
                    mcqQuestions.length > 0 && <MockQuestions
                        mcqQuestion={mcqQuestions}
                    />
                }
            </div>




            {/* <div className="mb-8">
                <h2 className="mb-4 text-xl">Preset Exam</h2>
                <div className="flex gap-2">
                    <h2 className="bg-white p-2 rounded-md">DUET Admission Preparation</h2>
                    <h2 className="bg-white p-2 rounded-md">BUTEX Admission Preparation</h2>
                    <h2 className="bg-white p-2 rounded-md">Government Job Preparation</h2>
                </div>
            </div> */}
        </div>
    );
};

export default MockTest;