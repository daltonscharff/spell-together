import React, { useState } from 'react';
import Controls from './components/Controls';
import WordList from './components/WordList';
import './App.css';

const json_data = {
  centerLetter: 'P',
  otherLetters: ['L', 'I', 'A', 'B', 'N', 'T'],
  answers: [
    "apian",
    "appall",
    "blip",
    "inapt",
    "pail",
    "pain",
    "paint",
    "paintball",
    "palatal",
    "palatial",
    "pall",
    "palp",
    "panini",
    "pant",
    "papa",
    "papal",
    "papilla",
    "patina",
    "pill",
    "pinata",
    "pinball",
    "pint",
    "pintail",
    "pipit",
    "pita",
    "pitapat",
    "plain",
    "plaint",
    "plait",
    "plan",
    "plant",
    "plantain",
    "plat",
    "pliant",
    "tapa",
    "tilapia"
  ]
};

function App() {
  const centerLetter = json_data.centerLetter;
  const otherLetters = json_data.otherLetters;
  const [playerInput, setPlayerInput] = useState('');
  const [foundWords, setFoundWords] = useState([]);
  const allWords = json_data.answers;
  const totalNumberOfWords = json_data.answers.length;
  let inputElement;

  const submitWord = (e) => {
    e.preventDefault();
    console.log(allWords.includes(playerInput.toLowerCase()))
    console.log(!foundWords.includes(playerInput))
    if (allWords.includes(playerInput.toLowerCase()) && !foundWords.includes(playerInput)) {
      setFoundWords([...foundWords, playerInput]);
    }
    setPlayerInput('');
  };

  return (
    <div className='app'>
      <Controls
        centerLetter={centerLetter}
        otherLetters={otherLetters}
        playerInput={playerInput}
        setPlayerInput={setPlayerInput}
        inputElement={inputElement}
        submitWord={submitWord}
      />
      <WordList
        foundWords={['abc', 'def', ...foundWords]}
        // foundWords={foundWords}
        totalNumber={totalNumberOfWords}
      />
    </div>
  );
}

export default App;
