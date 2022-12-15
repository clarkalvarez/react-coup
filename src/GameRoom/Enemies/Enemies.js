import React, { useState, useEffect } from 'react';
import { collection,  getDocs, doc,  onSnapshot, updateDoc } from "firebase/firestore";
import { db } from '../../firebase.js';

const Enemies = (props) => {
    const [enemiesCards, setEnemiesCards] = useState([]);
    const [cards, setCards] = useState({});

    const playerName = localStorage.getItem('playerName')

    const fetchEnemies = () => {
        onSnapshot(doc(db, "gameroom", props.roomid), (snapshot) => {
            let enemiesCards = [];
            let cards = [];
            const newData = { ...snapshot.data() }
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

    const showCard = async (e, name, card, status) => {
        e.preventDefault();
        
        await getDocs(collection(db, "gameroom"))
            .then(async (querySnapshot) => {
                const newData = querySnapshot.docs.filter((result) => result.id === props.roomid).map((result) => ({ ...result.data() }))[0];
                const currentCards = newData.players;
                currentCards[name][card]["status"] = status
                await updateDoc(doc(db, "gameroom", props.roomid), {
                    players: currentCards
                });
            })
    }
    useEffect(()=>{
        fetchEnemies();
    }, [db])

    
    return (
        <>
            <div className="flex flex-row gap-6">
                {enemiesCards.map((result, i) => {
                    return <div className="gap-2" key={[result.name]}>
                        <div className='text-center'>
                            <label className='text-2xl font-bold'>{result.name}</label>
                        </div>
                        <div className="flex flex-row gap-2">
                            {result.cards.card1.status === 'hidden' 
                                ?
                                <img className="w-20" src="/images/back.PNG" alt="back" onClick={(event) => showCard(event, result.name, "card1", "show")} /> 
                                :
                                <img className="w-20" src={`/images/${result.cards?.card1?.card}.PNG`} alt={result.cards?.card1?.card} 
                                    onClick={(event) => showCard(event, result.name, "card1", "hidden")}/>
                            }
                            {result.cards.card2.status === 'hidden'
                                ?
                                <img className="w-20" src="/images/back.PNG" alt="back" onClick={(event) => showCard(event, result.name, "card2", "show")} />
                                :
                                <img className="w-20" src={`/images/${result.cards?.card2?.card}.PNG`} alt={result.cards?.card1?.card}
                                    onClick={(event) => showCard(event, result.name, "card2", "hidden")} />
                            }
                        </div>
                    </div>
                })}
            </div>  
        </>
    )
}

export default Enemies;