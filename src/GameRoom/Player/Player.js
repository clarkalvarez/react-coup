import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, doc } from "firebase/firestore";
import { db } from '../../firebase.js';

const Player = (props) => {
    const [playerCards, setPlayerCards] = useState({});
    const [cards, setCards] = useState({});

    const playerName = localStorage.getItem('playerName')
    
    const fetchPlayer = async () => {
        await getDocs(collection(db, "gameroom"))
        .then((querySnapshot)=>{              
            const newData = querySnapshot.docs.filter((result) => result.id === props.roomid).map((result) => ({...result.data() }))[0];
            const getPlayerCards = newData.players[playerName]
            const getCards = newData.cards
            setPlayerCards(getPlayerCards)
            setCards(getCards)
        })
    }

    useEffect(()=>{
        fetchPlayer();
    }, [db])

    return (
        <>
            <div className='text-center'>
                <label className='text-2xl font-bold'>{playerName}</label>
            </div>
            {playerCards.length !== 0 && 
            
               <div className="flex flex-row">
                  <img className="w-60 p-5" src={`/images/${playerCards?.card1}.PNG`} alt="assasin"/>
                  <img className="w-60 p-5" src={`/images/${playerCards?.card2}.PNG`} alt="captain" />
                </div>  
    
            }
        </>
    )
}

export default Player;