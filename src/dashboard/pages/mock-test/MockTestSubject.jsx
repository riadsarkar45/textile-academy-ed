
const MockTestSubject = ({ subject, setSubjectTopics,setMcqQuestions }) => {
    const handleSubjectSelect = (topics, questions) => {
        console.log(topics);
        console.log(questions, "questions");
        setSubjectTopics(topics)
        setMcqQuestions(questions)
    }
    return (
        <div className="grid grid-cols-2 w-[50rem] gap-3 m-auto">
            {
                subject?.map((subs, i) => {
                    return (
                        <div key={i} className="border  items-center gap-3 text-xl p-2 bg-white shadow rounded-lg hover:bg-gray-100 cursor-pointer">
                            <button onClick={() => handleSubjectSelect(subs.topics, subs.mcqQuestions)}>{subs.subjectName}</button>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default MockTestSubject;