import React from "react";

const WaitingRoom = ({ history }) => {
    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div className="w-full max-w-sm">
                    <div className="md:flex md:items-center mb-6">
                        <div className="w-full text-center">
                            <label className="block font-bold py-2 px-4 w-full text-xl">
                                Waiting for other players...
                            </label>
                            <label className="block font-bold py-2 px-4 w-full">
                                Clark
                            </label>
                            <label className="block font-bold py-2 px-4 w-full">
                                Ron
                            </label>
                            <label className="block font-bold py-2 px-4 w-full">
                                Jolan
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WaitingRoom;