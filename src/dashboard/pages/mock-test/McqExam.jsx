import { useState } from "react";

const McqExam = ({ examQuestion }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const handleOptionSelect = (optionId) => {
        console.log("Selected option ID:", optionId);
        setSelectedOption(optionId);
    }
    return (
        <div className="w-[50rem] m-auto">
            <h2>Bangla mcq test</h2>
            {
                examQuestion?.map((question, qIndex) => {
                    return (
                        <div
                            key={qIndex}
                            className={`${qIndex === examQuestion.length - 1 ? 'mb-[10rem]' : 'mb-2'} bg-white p-5 border rounded-lg `}
                        >
                            <h2 className="mb-4">{qIndex + 1}. {question.question}</h2>
                            <div className="grid grid-cols-2 gap-5 rounded-lg p-3">
                                {question.options?.map((option, oIndex) => (
                                    <span onClick={() => handleOptionSelect(option.id)} key={oIndex} className={`${selectedOption ? '' : ''} bg-gray-200 p-3 rounded-lg`}>
                                        {oIndex + 1}. {option.options}
                                    </span>
                                ))}
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default McqExam; 