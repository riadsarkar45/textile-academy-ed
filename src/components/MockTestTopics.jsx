
const MockTestTopics = ({ subjectTopics }) => {
    return (
        <>
            {
                subjectTopics?.map((subs, i) => {
                    console.log(subs);
                    return (

                        <div className="grid grid-cols-2 bg-gray-100 rounded-lg p-2" key={i}>
                            <h2>{subs.topicTitle} </h2>
                        </div>

                    )
                })
            }
        </>
    );
};

export default MockTestTopics;