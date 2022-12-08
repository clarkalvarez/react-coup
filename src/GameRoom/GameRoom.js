import Announcement from "./Announcement/Announcement";
import Enemies from "./Enemies/Enemies";
import Player from "./Player/Player";
import React from "react";

const GameRoom = ({match}) => {
    return (
        <>
            <div className="">
                <Enemies roomid={match.params.roomid}/>
            </div>
            <div className="">
                <Announcement />
            </div>
            <div className="absolute bottom-0">
                <Player roomid={match.params.roomid} />
            </div>
        </>
    )
}

export default GameRoom;