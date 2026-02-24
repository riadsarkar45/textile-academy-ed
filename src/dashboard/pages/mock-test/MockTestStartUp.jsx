
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/Axios";
import MockTestSubject from "../../../components/MockTestSubject";
import MockTestTopics from "../../../components/MockTestTopics";

const MockTest = () => {
    const [subjects, setMockSubjects] = useState([])
    const [subjectTopics, setSubjectTopics] = useState([])
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


    return (
        <div className="w-[50rem] m-auto">
            <h2 className="mb-8 text-xl">Select Topic</h2>
            <div className="grid grid-cols-2 gap-4 mb-10">
                {
                    subjectTopics.length == 0 && <MockTestSubject setSubjectTopics={setSubjectTopics} subject={subjects} />
                }
                {
                    subjectTopics.length > 0 && <MockTestTopics subjectTopics={subjectTopics} />
                }
            </div>
            <div className="mb-8">
                <h2 className="mb-4 text-xl">Preset Exam</h2>
                <div className="flex gap-2">
                    <h2 className="bg-white p-2 rounded-md">DUET Admission Preparation</h2>
                    <h2 className="bg-white p-2 rounded-md">BUTEX Admission Preparation</h2>
                    <h2 className="bg-white p-2 rounded-md">Government Job Preparation</h2>
                </div>
            </div>
        </div>
    );
};

export default MockTest;