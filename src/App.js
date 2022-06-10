import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  { "src": "/img/a.png" ,match:false},
  { "src": "/img/b.png" ,match:false},
  { "src": "/img/c.png" ,match:false},
  { "src": "/img/d.png" ,match:false},
  { "src": "/img/e.png" ,match:false},
  { "src": "/img/f.png" ,match:false},
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
      
    setCards(shuffledCards)
    setTurns(0)
  }
  
  const handleChoice=(card)=>{
    choiceOne ? setChoiceTwo(card):setChoiceOne(card);
  }
  const reset=()=>{
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns=>prevTurns+1);
  }
  useEffect(()=>{
    if(choiceOne&& choiceTwo){
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards=>{
          return prevCards.map(card=>{
            if(card.src === choiceOne.src){
              return {...card,match:true}
            }
            else{
              return card
            }
          })
        })
        reset();
      }
      else{
        setTimeout(()=> reset(),500);
      }
    }
  },[choiceOne,choiceTwo])
  return (
    <div className="App">
      <h1>Lets go!</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'> 
        {cards.map((card)=>
          (<SingleCard key={card.id} card={card} handleChoice={handleChoice} flipped={card === choiceOne || card === choiceTwo || card.match}></SingleCard>)

        )}
      </div>
      <p>Turns:{turns}</p>
    </div>
  );
}

export default App