import { useState } from 'react';
import './App.css'
import Dice from './Components/Dice.jsx';
import { nanoid } from 'nanoid';

function App() {
  const [dice, setDice] = useState(allNewDice());

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

  function checkDice(){
    let testValue = dice[0].value;
    return dice.every(die => die.value===testValue && die.isHeld);
  }

  function newGame(){
    setDice(allNewDice());
  }

  return (
    <div className='main-container'>
      <div className='game-container' >
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='dice-container'>
          {diceElements}
        </div>
        {checkDice() ? <button onClick={newGame}>New Game</button> : <button onClick={rollDice}>ROLL</button>}
      </div>
    </div>
  )
}

export default App
