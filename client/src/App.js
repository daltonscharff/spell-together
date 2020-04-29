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
  minWidth: '300px',
  display: 'flex',
  flexDirection: 'column',
};

const errorStyle = {
  color: 'salmon',
  padding: '.25em',
  textAlign: 'center',
  margin: '.5em',
  borderTop: '1px solid salmon',
  fontWeight: 'bold'
};

const App = ({ socket }) => {
  const [foundWords, setFoundWords] = useState([]);
  const [letterList, setLetterList] = useState([]);
  const [centerLetter, setCenterLetter] = useState('');
  const [numOfAnswers, setNumOfAnswers] = useState(0);
  const [error, setError] = useState('.');
  const [playerInput, setPlayerInput] = useState('');

  useEffect(() => {
    socket.on('setup', (data) => {
      setFoundWords(data.foundWords);
      setLetterList(data.letterList);
      setCenterLetter(data.centerLetter);
      setNumOfAnswers(data.numOfAnswers);
      console.log('setting up new connection');
    });

    socket.on('foundWords', (data) => {
      console.log('someone found a word');
      setFoundWords(data);
    });

    socket.on('wordAlreadyFound', (word) => {
      console.log('already found ' + word);
      setError('Already found');
      setTimeout(() => setError('.'), 3000);
    });

    socket.on('incorrectLetters', (word) => {
      console.log('incorrect letters: ' + word);
      setError('Incorrect letters');
      setTimeout(() => setError('.'), 3000);
    });

    socket.on('noCenterLetter', (word) => {
      console.log('no center letter: ' + word);
      setError('Missing middle letter');
      setTimeout(() => setError('.'), 3000);
    });

    socket.on('notInWordList', (word) => {
      console.log('not in word list: ' + word);
      setError('Not in word list');
      setTimeout(() => setError('.'), 3000);
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

  const submitWord = () => {
    if (!playerInput) return;
    socket.emit('submitWord', playerInput);
    console.log('submitting word: ' + playerInput);
    setPlayerInput('');
  };

  return (
    <div style={containerStyle}>
      <div style={halfContainerStyle}>
        <div style={{ ...errorStyle, visibility: error !== '.' ? 'visible' : 'hidden' }}>{error}</div>
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
          submitWord={submitWord}
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
