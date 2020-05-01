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

const nameInputStyle = {
  justifyContent: 'center',
  maxWidth: '300px',
  padding: '1em',
  margin: '1em auto',
  flexWrap: 'wrap'
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
  const [playerName, setPlayerName] = useState('');
  const [nameFieldValue, setNameFieldValue] = useState('');

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

    socket.on('wordAlreadyFound', (value) => {
      console.log('already found ' + value);
      setError(`Already found by ${value.name}`);
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
    socket.emit('submitWord', { word: playerInput, name: playerName });
    console.log('submitting word: ' + playerInput);
    setPlayerInput('');
  };

  return (
    <>
      <form style={{ ...nameInputStyle, display: playerName ? 'none' : 'flex' }} onSubmit={(e) => { e.preventDefault(); setPlayerName(nameFieldValue) }}>
        <input
          type='text'
          placeholder='Enter your name...'
          value={nameFieldValue}
          onChange={(e) => setNameFieldValue(e.target.value)}
          style={{
            flex: '1 0 100%',
            margin: '.5em',
            border: 'none',
            borderBottom: '1px solid black'
          }}
        />
        <button style={{
          flex: '1 0 100%',
          margin: '.5em'

        }}>Enter</button>
      </form>
      <div style={{ ...containerStyle, display: playerName ? 'flex' : 'none' }}>
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
          <p
            onClick={() => setPlayerName()}
            style={{
              textAlign: 'right',
              color: 'rgba(0,0,0,.4)',
              margin: '0 1em .25em',
              textDecoration: 'underline',
              fontStyle: 'italic',
              cursor: 'pointer'
            }}
          >not {playerName}?</p>
        </div>
      </div>
    </>
  );
};

export default App;
