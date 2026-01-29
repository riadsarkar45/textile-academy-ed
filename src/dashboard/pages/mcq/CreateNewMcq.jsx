import { useState } from "react";
import Papa from "papaparse";
import validateMcq from "../../validations/ValidateMCQCsv";
import useAxiosPublic from "../../../hooks/Axios";

const CreateNewMcq = () => {
    const [mcqs, setMcqs] = useState([]);
    const [error, setError] = useState("");
    const axiosPublic = useAxiosPublic();
    // CSV upload
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                if (!results.data.length) {
                    setError("CSV file is empty or invalid");
                    return;
                }
                const normalized = results.data.map((mcq) => ({
                    ...mcq,
                    correctAnswer: mcq.correctAnswer
                        ? mcq.correctAnswer.trim().toUpperCase()
                        : "",
                    subject: mcq.subject
                }));

                setMcqs(normalized);
                setError("");
            },
            error: () => setError("Failed to parse CSV"),
        });
    };
    // option click (question-wise, safe)
   console.log(mcqs);

    const handleMcqUpload = async () => {
        console.log({message: "creating..."});
        const upload = await axiosPublic.post("/new-mcq", mcqs)
        console.log(upload.data);
    }
    console.log(mcqs);
    return (
        <div className="bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <h1 className="text-2xl font-bold text-gray-800">
                    Upload MCQs (CSV)
                </h1>
                <p className="text-sm text-gray-500 mb-4">
                    Upload a CSV file to preview MCQs
                </p>

                {/* Upload */}
                <div className="bg-white rounded-xl shadow p-6 mb-6">
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileUpload}
                        className="block w-full text-sm
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-lg file:border-0
                        file:bg-black file:text-white
                        hover:file:bg-gray-800"
                    />
                    {error && (
                        <p className="mt-2 text-sm text-red-500">{error}</p>
                    )}
                </div>

                {/* Preview */}
                {mcqs.length > 0 && (
                    <div className="bg-white rounded-xl shadow p-6">
                        {mcqs.slice(0, 10).map((mcq, index) => {
                            const errors = validateMcq(mcq);

                            return (
                                <div
                                    key={index}
                                    className={`border rounded-lg p-4 mb-4 ${errors.length
                                        ? "bg-red-50 border-red-400"
                                        : "bg-gray-50"
                                        }`}
                                >
                                    <p className="font-medium mb-3">
                                        Q{index + 1}. {mcq.question || "⚠ Missing"}
                                    </p>

                                    {/* OPTIONS */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {["A", "B", "C", "D"].map((label) => {
                                            const optionText = mcq[`option${label}`];
                                            let bg = "bg-gray-200";

                                            

                                            return (
                                                <button
                                                    key={label}
                                                    
                                                    className={`${bg} p-2 rounded-md text-left transition`}
                                                >
                                                    <b>{label}.</b>{" "}
                                                    {optionText || "⚠ Missing"}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {errors.length > 0 && (
                                        <div className="mt-2 text-xs text-red-600">
                                            ⚠ {errors.join(", ")}
                                        </div>
                                    )}

                                    <div className="mt-2 text-xs text-gray-500">
                                        Correct: {mcq.correctAnswer || "N/A"}
                                    </div>
                                </div>
                            );
                        })}

                        <div className="flex justify-end">
                            <button
                                onClick={() => handleMcqUpload()}
                                className="bg-black text-white px-6 py-2 rounded-lg"
                            >
                                Confirm Upload ({mcqs.length})
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateNewMcq;
