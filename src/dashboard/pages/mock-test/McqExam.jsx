import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router";
const McqExam = ({ examQuestion, setSelectedOption, selectedOption, fetchedResult }) => {
    // const [selectedOption, setSelectedOption] = useState({});
    const handleOptionSelect = async (questionId, optionId, isCorrect) => {
        setSelectedOption(prev => ({
            ...prev,
            [questionId]: { optionId, isCorrect, questionId }
        }));

    };
    console.log(fetchedResult);



    return (
        <div className="w-[50rem] m-auto">
            <div className="flex justify-between gap-2 mb-2 ">
                <div>
                    <Link to="/live-exam/mcq"><button className="flex bg-green-500 text-green-600 bg-opacity-15 p-2 border rounded-lg items-center gap-2"><FaArrowAltCircleLeft /></button></Link>
                </div>
                <div className="flex gap-2">
                    <p className="flex bg-green-500 text-green-600 bg-opacity-15 p-2 border rounded-lg items-center gap-2"><TiTick /> </p>
                    <p className="flex bg-red-500 text-red-600 bg-opacity-15 p-2 border rounded-lg items-center gap-2"><ImCross /> </p>
                </div>

            </div>
            <h2>Bangla mcq test</h2>
            {
                examQuestion?.map((question, qIndex) => {
                    const selectedOpt = selectedOption[question.id] || {};
                    const results = fetchedResult[question.id] || {};
                    console.log(results, "fetched result");
                    return (
                        <div
                            key={qIndex}
                            className={
                                `${qIndex === examQuestion.length - 1 ? 'mb-[10rem]' : 'mb-2'}
                                 ${Number(question.id) === Number(selectedOpt.questionId) ? 'bg-gray-300 bg-opacity-20' : 'bg-white'} p-5 border rounded-lg `
                            }
                        >
                            <h2 className="mb-4">{qIndex + 1}. {question.question}</h2>
                            <div className="grid grid-cols-2 gap-5 rounded-lg p-3">
                                {question.options?.map((option, oIndex) => {
                                    const fetched = fetchedResult[question.id]; // backend result for this question
                                    const isUserSelected = option.id === fetched?.optionId;
                                    const isCorrectOption = option.isCorrect; // from backend or mcqOptions

                                    let bgColor = 'bg-gray-200';

                                    if (fetched) {
                                        if (isUserSelected) {
                                            bgColor = fetched.isCorrect ? 'bg-green-500' : 'bg-red-500';
                                        } else if (!fetched.isCorrect && isCorrectOption) {
                                            bgColor = 'bg-green-300'; // show correct answer if user got it wrong
                                        }
                                    } else if (isUserSelected) {
                                        // optional: show instant selection before submit
                                        bgColor = 'bg-yellow-200';
                                    }

                                    return (
                                        <button
                                            key={oIndex}
                                            disabled={!!fetched} // disable after result is fetched
                                            onClick={() => handleOptionSelect(question.id, option.id, option.isCorrect)}
                                            className={`${bgColor} p-3 flex items-start rounded-lg cursor-pointer`}
                                        >
                                            {oIndex + 1}. {option.options}
                                        </button>
                                    );
                                })}
                            </div>

                        </div>
                    );
                })
            }
        </div>
    );
};

export default McqExam; 