import { useState } from "react";
import Papa from "papaparse";
import validateMcq from "../../validations/ValidateMCQCsv";

const CreateNewMcq = () => {
    const [mcqs, setMcqs] = useState([]);
    const [error, setError] = useState("");

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
                setMcqs(results.data);
                setError("");
            },
        });
    };

    return (
        <div className=" bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Upload MCQs (CSV)
                    </h1>
                    <p className="text-sm text-gray-500">
                        Upload a CSV file to preview MCQs before publishing
                    </p>
                </div>

                {/* Upload Card */}
                <div className="bg-white rounded-xl shadow p-6 mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select CSV File
                    </label>

                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileUpload}
                        className="block w-full text-sm
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-black file:text-white
              hover:file:bg-gray-800"
                    />

                    {error && (
                        <p className="mt-3 text-sm text-red-500">{error}</p>
                    )}
                </div>

                {/* Preview Section */}
                {mcqs.length > 0 && (
                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                MCQ Preview
                            </h2>
                            <span className="text-sm text-gray-500">
                                Showing first 10 of {mcqs.length}
                            </span>
                        </div>

                        <div className="space-y-4 pr-2">
                            {mcqs.slice(0, 10).map((mcq, index) => {
                                const errors = validateMcq(mcq);
                                return (
                                    <div
                                        key={index}
                                        className={`border rounded-lg p-4 transition ${errors.length > 0 ? "bg-red-100 border-red-500" : "bg-gray-50 hover:shadow"
                                            }`}
                                    >
                                        <p className="font-medium text-gray-800">
                                            Q{index + 1}. {mcq.question || "⚠ Question missing"}
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-sm">
                                            <p>A. {mcq.optionA || "⚠ Missing"}</p>
                                            <p>B. {mcq.optionB || "⚠ Missing"}</p>
                                            <p>C. {mcq.optionC || "⚠ Missing"}</p>
                                            <p>D. {mcq.optionD || "⚠ Missing"}</p>
                                        </div>

                                        {errors.length > 0 && (
                                            <div className="mt-2 text-xs text-red-600">
                                                ⚠ {errors.join(", ")}
                                            </div>
                                        )}

                                        <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
                                            <span>Correct: {mcq.correctAnswer || "N/A"}</span>
                                            <span>{mcq.subject} → {mcq.topic}</span>
                                        </div>
                                    </div>
                                );
                            })}

                        </div>

                        {/* Action */}
                        <div className="mt-6 flex justify-end">
                            <button
                                className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
                                onClick={() =>
                                    alert(`Ready to upload ${mcqs.length} MCQs`)
                                }
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
