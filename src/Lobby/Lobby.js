
import React from "react";

const Lobby = ({ history }) => {
    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div className="w-full max-w-sm">

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                Room ID:
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="inline-full-name" type="text" placeholder="12443" />
                        </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                Name:
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="inline-full-name" type="text" placeholder="Clark" />
                        </div>
                    </div>
                    
                    <div className="md:flex md:items-center mb-6">
                        <div className="w-full">
                            <button className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                                Join Room
                            </button>
                        </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                Room ID:
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="inline-full-name" type="text" placeholder="12443"/>
                        </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                # of Players:
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="inline-full-name" type="text" placeholder="4"/>
                        </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className="w-full">
                            <button class="block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full">
                                Create Room
                            </button>
                        </div>
                    </div>
                </div>
  
            </div>
        </>
    )
}

export default Lobby;