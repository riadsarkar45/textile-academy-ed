import { GiGears, GiMaterialsScience, GiOfficeChair, GiEmptyMetalBucket, GiSewingMachine, GiSpinningWheel, GiTestTubes, GiVintageRobot } from "react-icons/gi";
import { TbNeedleThread } from "react-icons/tb";
import { MdRollerShades } from "react-icons/md";
import { Link } from "react-router";
const QuestionBank = () => {
const diplomaSubjects = [
        { name: "Introduction", icon: GiMaterialsScience },
        { name: "Basic Spinning", icon: GiSpinningWheel },
        { name: "Weaving Basics", icon: MdRollerShades },
        { name: "Knitting Basics", icon: TbNeedleThread },
        { name: "Basic Dyeing", icon: GiEmptyMetalBucket },
        { name: "Fabric Testing", icon: GiTestTubes },
        { name: "Garment Manu", icon: GiSewingMachine },
        { name: "Tex Calculations", icon: GiGears },
        { name: "Practice / Lab", icon: GiOfficeChair },
        { name: "Industrial Safety", icon: GiVintageRobot }
    ];    return (
        <div className="w-[50rem] m-auto">
            <h2 className="mb-8">Question Bank</h2>
            <div className="grid grid-cols-3 gap-4">
                {
                    diplomaSubjects.map((exams, i) =>
                        <Link to="/question-bank/mcq-questions" key={i}>
                            <h2 key={i} className="bg-gray-100 p-5 h-[8rem] font-serif rounded-lg flex items-center justify-center text-2xl border border-gray-200 cursor-pointer hover:bg-white">{<exams.icon/>}  {exams.name}</h2>
                        </Link>
                    )
                }
            </div>
        </div>
    );
};

export default QuestionBank;