import React from 'react';
import { GiGears, GiMaterialsScience, GiOfficeChair, GiEmptyMetalBucket, GiSewingMachine, GiSpinningWheel, GiTestTubes, GiVintageRobot } from "react-icons/gi";
import { TbNeedleThread } from "react-icons/tb";
import { MdRollerShades } from "react-icons/md";
const FastTest = () => {
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
        <div className='w-[50rem] m-auto'>
            <h2 className='mb-7 text-xl'>Fast Practice</h2>
            <div>
                {
                    diplomaSubjects.map((subject,i) => 
                        <div key={i} className="border flex items-center gap-3 text-xl p-2 bg-white shadow rounded-lg hover:bg-gray-100 cursor-pointer mb-4">
                            <subject.icon /> {subject.name}
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default FastTest;