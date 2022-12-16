import Announcement from "./Announcement/Announcement";
import Enemies from "./Enemies/Enemies";
import Player from "./Player/Player";
import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from '../firebase.js';

const GameRoom = ({match}) => {

    const [enemiesCards, setEnemiesCards] = useState([]);
    const [playerCards, setPlayerCards] = useState({});
    const [cards, setCards] = useState({});

    const playerName = localStorage.getItem('playerName')

    const fetchData = () => {
        onSnapshot(doc(db, "gameroom", match.params.roomid), (snapshot) => {
            let enemiesCards = [];
            let cards = [];
            const newData = { ...snapshot.data() }
            
            //get current player cards
            const getPlayerCards = newData.players[playerName]
            const getCards = newData.cards
            setPlayerCards(getPlayerCards)
            setCards(getCards)

            //get enemies cards
            Object.keys(newData.players).forEach(result => {
                if (result === playerName) {
                    return
                }
                const enemyCard = {
                    name: result,
                    cards: newData.players[result]
                }
                enemiesCards.push(enemyCard)
            })
            cards = newData.cards
            setEnemiesCards(enemiesCards)
            setCards(cards)


        })
    }

    useEffect(() => {
        fetchData();
    }, [db])

    return (
        <>
            <div>
                <Enemies roomid={match.params.roomid} enemiesCards={enemiesCards}/>
            </div>
            <div className="h-96">
                <Announcement />
            </div>
            <div className="absolute bottom-0">
                <Player roomid={match.params.roomid} playerName={playerName} playerCards={playerCards} />
            </div>
        </>
    )
}

export default GameRoom;