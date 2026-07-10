import { Link } from "react-router";

const Machines = () => {
    const machines = [
        {
            item: "Swing Machine",
            link: "/swing-machine",
        },
        {
            item: "Knitting Machine",
            link: "/knitting-machine",
        },
        {
            item: "Dyeing Machine",
            link: "/dyeing-machine",
        },
        {
            item: "Washing Machine",
            link: "/washing-machine",
        },
        
    ]
    return (
        <div>
            <h2 className="mb-8 border-b p-2">Machine Diagrams</h2>
            <div className="grid grid-cols-2 gap-3">
                {machines.map((m, i) => (
                    <div key={i} className="bg-gray-900 bg-opacity-15 p-3 border border-gray-600 rounded">
                        <Link to={m.link}>
                            <span>{m.item}</span>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Machines;