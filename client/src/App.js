import React, { useState, useEffect } from 'react';
import Hive from './components/Hive';
import Buttons from './components/Buttons';
import WordList from './components/WordList';
import InputField from './components/InputField';

const containerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  minHeight: '100vh'
};

const halfContainerStyle = {
  flex: '1 1 0',
  minWidth: '300px'
};

const App = ({ socket }) => {
  const [foundWords, setFoundWords] = useState([]);
  const [letterList, setLetterList] = useState([]);
  const [centerLetter, setCenterLetter] = useState('');
  const [numOfAnswers, setNumOfAnswers] = useState(0);
  const [playerInput, setPlayerInput] = useState('maeiouy');

  useEffect(() => {
    socket.on('setup', (data) => {
      setFoundWords(data.foundWords);
      setLetterList(data.letterList);
      setCenterLetter(data.centerLetter);
      setNumOfAnswers(data.numOfAnswers);
      console.log('setting up new connection');
    });
  }, []);

  const addLetter = (letter) => {
    setPlayerInput(playerInput + letter.toLowerCase());
  };

  const deleteLetter = () => {
    setPlayerInput(playerInput.substring(0, playerInput.length - 1));
  };

  const shuffleLetters = () => {
    let letters = letterList.filter((value) => value !== centerLetter);
    for (let i in letters) {
      const j = Math.floor(Math.random() * i)
      const temp = letters[i];
      letters[i] = letters[j];
      letters[j] = temp;
    }
    setLetterList([centerLetter, ...letters]);
  };

  return (
    <div style={containerStyle}>
      <div style={halfContainerStyle}>
        <InputField
          playerInput={playerInput}
          centerLetter={centerLetter}
          otherLetters={letterList.filter((value) => value !== centerLetter)}
        />
        <Hive
          centerLetter={centerLetter}
          otherLetters={letterList.filter((value) => value !== centerLetter)}
          addLetter={addLetter}
        />
        <Buttons
          shuffleLetters={shuffleLetters}
          deleteLetter={deleteLetter}
        />
      </div>
      <div style={halfContainerStyle}>
        <WordList
          foundWords={foundWords}
          numOfAnswers={numOfAnswers}
        />
      </div>
    </div>
  );
};

export default App;
