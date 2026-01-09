import { GiGears, GiMaterialsScience, GiOfficeChair, GiEmptyMetalBucket, GiSewingMachine, GiSpinningWheel, GiTestTubes, GiVintageRobot } from "react-icons/gi";
import { TbNeedleThread } from "react-icons/tb";
import { MdRollerShades } from "react-icons/md";

const MockTest = () => {
    // BSc Textile Engineering Subjects
    // const bscSubjects = [
    //   "Yarn Manufacturing / Spinning Technology",
    //   "Fabric Manufacturing / Weaving Technology",
    //   "Knitting Technology",
    //   "Dyeing & Finishing Technology",
    //   "Textile Chemistry",
    //   "Textile Testing & Quality Control",
    //   "Apparel Engineering / Garment Manufacturing",
    //   "Textile Physics / Mechanics",
    //   "Industrial Management in Textile",
    //   "Textile Fibers & Materials",
    //   "Computer-Aided Textile Design (CAD)",
    //   "Nonwovens & Technical Textiles"
    // ];

    // Diploma Textile Subjects
    const diplomaSubjects = [
        { name: "Introduction to Textile Fibers", icon: GiMaterialsScience },
        { name: "Basic Spinning Technology", icon: GiSpinningWheel },
        { name: "Weaving Basics", icon: MdRollerShades },
        { name: "Knitting Basics", icon: TbNeedleThread },
        { name: "Basic Dyeing & Finishing", icon: GiEmptyMetalBucket },
        { name: "Fabric Testing & Quality Assurance", icon: GiTestTubes },
        { name: "Garment Manufacturing Fundamentals", icon: GiSewingMachine },
        { name: "Textile Calculations (Yarn count, GSM, etc.)", icon: GiGears },
        { name: "Workshop Practice / Lab", icon: GiOfficeChair },
        { name: "Industrial Safety & Management", icon: GiVintageRobot }
    ];

    return (
        <div className="w-[50rem] m-auto">
            <h2 className="mb-8">Select Topic</h2>
            <div className="grid grid-cols-2 gap-4">
                {
                    diplomaSubjects.map((subject, index) => (
                        <div key={index} className="border flex items-center gap-3 text-xl p-2 bg-white shadow rounded-lg hover:bg-gray-100 cursor-pointer">
                            <subject.icon /> {subject.name}
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default MockTest;