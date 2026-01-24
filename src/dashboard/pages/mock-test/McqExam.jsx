import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/Axios";

const McqExam = ({ examQuestion }) => {
    const [selectedOption, setSelectedOption] = useState({});
    const [result, setResult] = useState({ correct: 0, incorrect: 0 });
    const axiosPublic = useAxiosPublic();
    const handleOptionSelect = async (questionId, optionId, isCorrect) => {
        setSelectedOption(prev => ({
            ...prev,
            [questionId]: { optionId, isCorrect, questionId }
        }));

        const dataToInsert = {
            questionId,
            optionId,
            isCorrect,
            userId: 1
        }

        const res = await axiosPublic.post("/mcq/attempts", dataToInsert)
        console.log(res.data);

    };
console.log(selectedOption);
    useEffect(() => {
        let correct = 0;
        let incorrect = 0;

        Object.values(selectedOption).forEach(ans => {
            if (ans.isCorrect) correct++;
            else incorrect++;
        });

        setResult({ correct, incorrect });
    }, [selectedOption]);



    return (
        <div className="w-[50rem] m-auto">
            <div className="flex gap-2 mb-5 items-center">
                <h2 className="text-lg font-medium">Result:</h2>
                <p className="">Correct Answers: {result.correct}</p>
                <p>Incorrect Answers: {result.incorrect}</p>
            </div>
            <h2>Bangla mcq test</h2>
            {
                examQuestion?.map((question, qIndex) => {
                    const selectedOpt = selectedOption[question.id] || {};
                    return (
                        <div
                            key={qIndex}
                            className={
                                `${qIndex === examQuestion.length - 1 ? 'mb-[10rem]' : 'mb-2'}
                                 ${question.id === selectedOpt.questionId ? 'bg-gray-300 bg-opacity-20' : 'bg-white'} p-5 border rounded-lg `
                            }
                        >
                            <h2 className="mb-4">{qIndex + 1}. {question.question}</h2>
                            <div className="grid grid-cols-2 gap-5 rounded-lg p-3">
                                {
                                    question.options?.map((option, oIndex) => (
                                        <span key={oIndex} onClick={() => handleOptionSelect(question.id, option.id, option.isCorrect)} className={
                                            `${selectedOpt.isCorrect && option.id === selectedOpt.optionId && 'bg-green-500'}
                                         ${option.id === selectedOpt.optionId && !selectedOpt.isCorrect && 'bg-red-500'} bg-gray-200 p-3 rounded-lg`}>
                                            {oIndex + 1}. {option.options}
                                        </span>
                                    ))
                                }
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default McqExam; 