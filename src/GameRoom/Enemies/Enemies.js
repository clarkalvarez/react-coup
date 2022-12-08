import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, doc } from "firebase/firestore";
import { db } from '../../firebase.js';

const Enemies = (props) => {
    const [enemiesCards, setEnemiesCards] = useState([]);
    const [cards, setCards] = useState({});

    const playerName = localStorage.getItem('playerName')

    const fetchEnemies = async () => {
        
        await getDocs(collection(db, "gameroom"))
        .then((querySnapshot)=>{              
            const newData = querySnapshot.docs.filter((result) => result.id === props.roomid).map((result) => ({...result.data() }))[0];
            let enemiesCards = [];
             Object.keys(newData.players).forEach(result => {
                if(result === playerName) {
                    return
                }
                const enemyCard = {
                    [result]: newData.players[result]
                }
                enemiesCards.push(enemyCard)
            })
            const getCards = newData.cards
            enemiesCards.map((result) => {
                console.log(result) 
                console.log(Object.keys(result)[0]) 
            })
            console.log(enemiesCards)
            setEnemiesCards(enemiesCards)
            setCards(getCards)
        })
    }

    useEffect(()=>{
        fetchEnemies();
    }, [db])

    return (
        <>
        {enemiesCards.length > 0 &&
            <div>
                {enemiesCards.map(res => {
                        <label>{Object.keys(res)[0]}</label>
                    })
                }
            </div>
            
        }
        {/* {enemiesCards.length !== 0 &&
            <div className="flex flex-row gap-6">
                { enemiesCards?.map((cards,name) => {
                    <div className="gap-2" key={name}>
                        <div className='text-center'>
                            <label className='text-2xl font-bold'>name</label>
                        </div>
                    <div className="flex flex-row gap-2">
                        {cards.card1}
                        {cards.card2}
                        <img className="w-20" src="/images/back.PNG" alt="back"/>
                        <img className="w-20" src="/images/back.PNG" alt="back"/>
                    </div>
                </div>
                })}
            </div>
        } */}
        </>
    )
}

export default Enemies;