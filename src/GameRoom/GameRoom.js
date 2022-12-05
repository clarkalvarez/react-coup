import Announcement from "./Announcement/Announcement";
import Enemies from "./Enemies/Enemies";
import Player from "./Player/Player";
import React from "react";

const GameRoom = ({ history }) => {
    return (
        <>
            <div className="">
                <Enemies />
            </div>
            <div className="">
                <Announcement />
            </div>
            <div className="absolute bottom-0">
                <Player />
            </div>
        </>
    )
}

export default GameRoom;