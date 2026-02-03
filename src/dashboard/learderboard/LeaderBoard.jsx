
const LeaderBoard = ({ leaderBoard }) => {
    console.log(leaderBoard, "leaderboard");
    return (
        <div>
            {
                leaderBoard?.map((board, i) => {
                    return (
                        <div key={i} className='flex bg-white border p-5 rounded-lg items-center mb-1'>
                            <h2 className="w-10 font-serif bg-gray-200 border h-10 rounded-full flex items-center justify-center">
                                {board.user.name[0] || "Unknown"}
                            </h2>
                            <span className='ml-2'>{board.user.name}</span>
                            <span className='ml-2'>{board.user.id}</span>

                            {/* push to right */}
                            <span className='ml-auto'>#1</span>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default LeaderBoard;