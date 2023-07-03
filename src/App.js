import React from "react";
import Die from "./components/Die";
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

function App() {

  const [dice, setDice] = React.useState(allNewDice())

  function generateNewDie(){
    return {value : (Math.ceil(Math.random() * 6)), 
      isheld: false, 
      id: nanoid()}
  }

  function allNewDice() {
    const newDIce = []
    for (let i=0; i<10; i++){
      newDIce.push(generateNewDie())
    }
    return newDIce
  }

  function rollDice(){
    if(!tenzies){
      setDice(oldDie => oldDie.map(
        die => {
        return die.isheld ? die : generateNewDie()
        }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
    
  }

  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allheld = dice.every(die => die.isheld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allheld && allSameValue){
      setTenzies(true)
    }
  }, [dice])

  function holdDice(id){
    setDice(prevDice => prevDice.map(die =>{
      return die.id === id ? {...die, isheld: !die.isheld} : die
    }))
  }

  const diceElements = dice.map(die => <Die 
                                                                            key={die.id} 
                                                                            value={die.value} 
                                                                            color={die.isheld} 
                                                                            holdDice={() => holdDice(die.id)}
                                                                        />)

  return (
    <main className="App">
      {tenzies && <Confetti />}
        <div>
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
        </div>
      <div className="box">
        {diceElements}
      </div>
      <button 
        className="roll--btn" 
        onClick={rollDice}>
          {tenzies ? "New Game" : "Roll"}
          </button>
    </main>
  )
}

export default App;
