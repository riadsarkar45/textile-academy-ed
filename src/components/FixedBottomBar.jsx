import React from 'react';

const FixedBottomBar = ({ buttonAction, buttonName }) => {
    return (
        <div>
            <div className="fixed bottom-0 left-64 w-[calc(100%-16rem)] bg-white border-t z-50">
                <div className="px-4 w-[50rem] m-auto py-10 flex gap-3">

                    {/* 
                    <div className="flex-1">
                        <button className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">
                            + Add Another Subject
                        </button>
                    </div> */}

                    <div className="flex-1">
                        <button onClick={() => buttonAction()} className="w-full bg-green-600 hover:bg-green-700 text-white rounded-md px-3 py-2 text-sm font-medium transition">
                            {buttonName}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FixedBottomBar;