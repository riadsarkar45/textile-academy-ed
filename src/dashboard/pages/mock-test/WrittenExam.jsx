import FixedBottomBar from "../../../components/FixedBottomBar";
import McqExam from "./McqExam";

const Exam = () => {
    return (
        <div className="w-[50rem] m-auto">
            <div className="flex flex-col mb-5 items-center justify-center bg-gray-100 border p-6 rounded-lg">
                <h2 className="text-2xl">45th Bcs Bangla Written Exam</h2>
                <small>Time: 1 Hours and 30 Mins</small>
            </div>
            <div className="bg-white p-5 border rounded-lg mb-4">
                <h2 className="mb-10">1. New arranged mangal join feeling who wrote the letter to know there feelings</h2>
                <div className="bg-gray-200 rounded-lg p-3">
                    <input type="file" />
                </div>
            </div>
            <div className="bg-white p-5 border rounded-lg mb-4">
                <h2 className="mb-10">2. New arranged mangal join feeling who wrote the letter to know there feelings</h2>
                <div className="bg-gray-200 rounded-lg p-3">
                    <input type="file" />
                </div>
            </div>
            <div className="bg-white p-5 border rounded-lg mb-4">
                <h2 className="mb-10">3. New arranged mangal join feeling who wrote the letter to know there feelings</h2>
                <div className="bg-gray-200 rounded-lg p-3">
                    <input type="file" />
                </div>
            </div>
            <div className="bg-white p-5 border rounded-lg mb-4">
                <h2 className="mb-10">4. New arranged mangal join feeling who wrote the letter to know there feelings</h2>
                <div className="bg-gray-200 rounded-lg p-3">
                    <input type="file" />
                </div>
            </div>
            <div className="bg-white p-5 border rounded-lg mb-4">
                <h2 className="mb-10">5. New arranged mangal join feeling who wrote the letter to know there feelings</h2>
                <div className="bg-gray-200 rounded-lg p-3">
                    <input type="file" />
                </div>
            </div>
            <div className="bg-white p-5 border rounded-lg mb-4">
                <h2 className="mb-10">6. New arranged mangal join feeling who wrote the letter to know there feelings</h2>
                <div className="bg-gray-200 rounded-lg p-3">
                    <input type="file" />
                </div>
            </div>
            <div className="bg-white p-5 border rounded-lg mb-[10rem]">
                <h2 className="mb-10">7. New arranged mangal join feeling who wrote the letter to know there feelings</h2>
                <div className="bg-gray-200 rounded-lg p-3">
                    <input type="file" />
                </div>
            </div>


            <McqExam />
            <FixedBottomBar />
        </div>
    );
};

export default Exam;