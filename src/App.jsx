import { useState, useEffect } from 'react';
import './App.css'
import Dice from './Components/Dice.jsx';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    let initialValue = dice[0].value;
    const winningCondition = dice.every(die => die.value===initialValue && die.isHeld);

    if(winningCondition){
      setTenzies(true)
    }

  }, [dice])

  function allNewDice() {
    const numbersArray = [];
    for(let i=1; i<=10; i++){
      let die = {
        id: nanoid(),
        value: Math.floor(Math.random()*6)+1,
        isHeld: false
      }
      numbersArray.push(die);
    }
    return numbersArray;
  }

  const diceElements = dice.map(die => {
    const handleClick = () => {
      setDice(previousDice => {
        return previousDice.map(individualDie => {
          return individualDie.id === die.id ? {...individualDie, isHeld: !individualDie.isHeld} : individualDie
        })
      })
    }
    return (
      <Dice
      key={die.id} 
      value={die.value}
      status={die.isHeld}
      onClick={handleClick}
      />
    )
  })

  function rollDice(){
    setDice(previousDice => {
      return previousDice.map(individualDie => {
        let newDie = {
          ...individualDie,
          value: Math.floor(Math.random()*6)+1,
        }
        return individualDie.isHeld ? individualDie : newDie
      })
    })
  }



  function newGame(){
    setDice(allNewDice());
    setTenzies(false);
  }

  return (
    <div className='main-container'>
      <div className='game-container' >
        <h1>{tenzies ? "Congratulations" : "Tenzies"}</h1>
        <p>Roll until all numbers are the same. Click each tile to freeze it at its current value between rolls.</p>
        <div className='dice-container'>
          {diceElements}
        </div>
        {tenzies ?
        <>
          <button onClick={newGame}>New Game</button>
          <Confetti /> 
        </> 
        : <button onClick={rollDice}>ROLL</button>}
      </div>
    </div>
  )
}

export default App
