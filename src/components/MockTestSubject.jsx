
const MockTestSubject = ({ subject, setSubjectTopics }) => {
    const handleSubjectSelect = (topics) => {
        console.log(topics);
        setSubjectTopics(topics)
    }
    return (
        <div className="grid grid-cols-2 w-[50rem] gap-3 m-auto">
            {
                subject?.map((subs, i) => {
                    return (
                        <div key={i} className="border  items-center gap-3 text-xl p-2 bg-white shadow rounded-lg hover:bg-gray-100 cursor-pointer">
                            <button onClick={() => handleSubjectSelect(subs.topics)}>{subs.subjectName}</button>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default MockTestSubject;