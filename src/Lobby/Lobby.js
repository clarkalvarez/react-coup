
import React, { useState } from "react";
import { collection, addDoc, getDocs, setDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase.js';
import { useHistory } from "react-router-dom";

const Lobby = () => {
const [playerCount, setPlayerCount] = useState(0);
const [playerName, setPlayerName] = useState("");
const [joinRoomId, setJoinRoomId] = useState("");
const [joinPlayerName, setJoinPlayerName] = useState("");
let history = useHistory(); 

    const createRoom = async (e) => {
        e.preventDefault();
        try {
            let cards = []
            if(!playerCount || playerCount === 0 || playerCount > 8) {
                alert("Players should only have 2 to 8 counts")
                return
            }
            if(playerCount <= 4) {
                for(let i = 0; i < 3; i++) {
                    cards.push("contessa", "assassin", "ambassador", "duke", "captain")
                }
                shuffleArray(cards)
            }
            if(playerCount >=5 && playerCount <=8) {
                for(let i = 0; i < 6; i++) {
                    cards.push("contessa", "assassin", "ambassador", "duke", "captain")
                }
            }

            const {updatedCards, card1, card2} = initializeCards(cards);
            cards = updatedCards;

            const player = {
                [playerName]: {
                    card1,
                    card2
                }
            }

            const gameroomRef = await addDoc(collection(db, "gameroom"), {
                gameStatus: 'Waiting',
                playerCount: parseInt(playerCount),
                cards,
                players: player,
                playerArray: [playerName]
            });
            localStorage.setItem('playerName', playerName);
            
            history.push(`/gameroom/${gameroomRef.id}`)
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const joinRoom = async (e) => {
        e.preventDefault();

        if(!joinRoomId) {
            alert("Please input Room ID")
            return
        }

        if(!joinPlayerName) {
            alert("Please input Name")
            return
        }

        const { cards, players, playerCount, gameStatus, playerArray } = await getDocs(collection(db, "gameroom"))
        .then((querySnapshot)=>{              
            const newData = querySnapshot.docs.filter((result) => result.id === joinRoomId).map((result) => ({...result.data() }))[0];
            return { cards: newData.cards, players: newData.players, playerCount: newData.playerCount, gameStatus: newData.gameStatus, playerArray: newData.playerArray }
        }).catch(error => {
            alert("Room not found")
        })

        if(gameStatus !== "Waiting") {
            alert("Game already started")
            return
        }

        if(playerArray.includes(joinPlayerName)) {
            alert("Player name already exists")
            return
        }

        if(playerArray.length >= playerCount) {
            alert("Room is full already")
            return
        }

        if(!cards || !players || !playerCount) {
            return
        }

        const {updatedCards, card1, card2} = initializeCards(cards)

        const updatePlayers = {...players,
            [joinPlayerName]: {
                card1,
                card2
            }
        }

        playerArray.push(joinPlayerName);
        
        await updateDoc(doc(db, "gameroom", joinRoomId), {
            cards: updatedCards,
            players: updatePlayers,
            playerArray
        });

        localStorage.setItem('playerName', joinPlayerName);
            
        history.push(`/gameroom/${joinRoomId}`)
    }

    const initializeCards = (cards) => {
        const card1Index = (Math.random() * cards.length).toFixed(0);
        const card1 =  cards[card1Index]
        cards.splice(card1Index, 1);
        const card2Index = (Math.random() * cards.length).toFixed(0);
        const card2 =  cards[card2Index]
        cards.splice(card2Index, 1);
        return { updatedCards: cards, card1: { status: "hidden", card: card1 }, card2: { status: "hidden", card: card2 } }
    }

    const shuffleArray = (array)  => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

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
                            <input
                            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="inline-full-name"
                            type="text"
                            placeholder="12443"
                            onChange={(e)=>setJoinRoomId(e.target.value)}/>
                        </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                Player Name:
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="inline-full-name"
                            type="text"
                            placeholder="Clark"
                            onChange={(e)=>setJoinPlayerName(e.target.value)}/>
                        </div>
                    </div>
                    
                    <div className="md:flex md:items-center mb-6">
                        <div className="w-full">
                            <button className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full" onClick={joinRoom}>
                                Join Room
                            </button>
                        </div>
                    </div>

                    {/* <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label 
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" 
                            for="inline-full-name">
                                Room ID:
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="inline-full-name"
                            type="text"
                            placeholder="12443"
                            onChange={(e)=>setRoomId(e.target.value)}/>
                        </div>
                    </div> */}

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                # of Players:
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input 
                            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                            id="inline-full-name" 
                            type="text" 
                            placeholder="4"
                            onChange={(e)=>setPlayerCount(e.target.value)}/>
                        </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label 
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" 
                            for="inline-full-name">
                                Player Name:
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input 
                            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="inline-full-name"
                            type="text"
                            placeholder="Feyn Germyas"
                            onChange={(e)=>setPlayerName(e.target.value)}/>
                        </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className="w-full">
                            <button 
                            className="block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
                            onClick={createRoom}>
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