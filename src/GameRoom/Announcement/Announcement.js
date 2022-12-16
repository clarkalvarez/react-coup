import React from "react";

const Announcement = () => {
    return (
        <>
            <div className="flex flex-col h-full justify-center items-center	">
                {/* <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Start Game
                </button>                for start game */}

                <div className="mb-10">
                    <button class="bg-purple-700 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded-full mr-4 w-36">
                        Tax
                    </button>
                    <button class="bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full mr-4 w-36">
                        Steal
                    </button>
                    <button class="bg-slate-700 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-full mr-4 w-36">
                        Assassinate
                    </button>
                    <button class="bg-lime-500 hover:bg-lime-300 text-white font-bold py-2 px-4 rounded-full mr-4 w-36">
                        Exchange
                    </button>
                </div>

                <div>
                    <button class="bg-neutral-500 hover:bg-neutral-700 text-white font-bold py-2 px-4 rounded-full mr-4 w-36">
                        Income
                    </button>
                    <button class="bg-neutral-500 hover:bg-neutral-700 text-white font-bold py-2 px-4 rounded-full mr-4 w-36">
                        Foreign Aid
                    </button>
                    <button class="bg-neutral-500 hover:bg-neutral-700 text-white font-bold py-2 px-4 rounded-full mr-4 w-36">
                        Coup
                    </button>
                </div>
         
            </div>
        </>
    )
}

export default Announcement;