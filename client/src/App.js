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
  const [letters, setLetters] = useState([]);
  const [centerLetter, setCenterLetter] = useState('');
  const [numOfAnswers, setNumOfAnswers] = useState(0);
  const [error, setError] = useState('.');
  const [playerInput, setPlayerInput] = useState('');
  const [playerName, setPlayerName] = useState(localStorage.getItem('playerName') || '');
  const [nameFieldValue, setNameFieldValue] = useState('');
  const [answerLengths, setAnswerLengths] = useState({});
  const roomId = 1;

  useEffect(() => {
    socket.emit("initRequest", { roomId });

    socket.on('initResponse', (data) => {
      console.log(data);
      setFoundWords(data.foundWords);
      setLetters(data.letters);
      setCenterLetter(data.centerLetter);
      setNumOfAnswers(data.numOfAnswers);
      setAnswerLengths(data.answerLengths);
    });

    socket.on('updateFoundWords', (data) => {
      console.log('someone found a word');
      console.log(data);
      setFoundWords(data.foundWords);
    });

    socket.on('alreadyFound', (data) => {
      console.log('already found ' + data);
      setError(`Already found by ${data.name}`);
      setTimeout(() => setError('.'), 3000);
    });

    socket.on('incorrectLetters', (data) => {
      console.log('incorrect letters: ' + data);
      setError('Incorrect letters');
      setTimeout(() => setError('.'), 3000);
    });

    socket.on('noCenterLetter', (data) => {
      console.log('no center letter: ' + data);
      setError('Missing middle letter');
      setTimeout(() => setError('.'), 3000);
    });

    socket.on('notInList', (data) => {
      console.log('not in list: ' + data);
      setError('Not in word list');
      setTimeout(() => setError('.'), 3000);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addLetter = (letter) => {
    setPlayerInput(playerInput + letter.toLowerCase());
  };

  const deleteLetter = () => {
    setPlayerInput(playerInput.substring(0, playerInput.length - 1));
  };

  const shuffleLetters = () => {
    let filteredLetters = letters.filter((value) => value !== centerLetter);
    for (let i in filteredLetters) {
      const j = Math.floor(Math.random() * i)
      const temp = filteredLetters[i];
      filteredLetters[i] = filteredLetters[j];
      filteredLetters[j] = temp;
    }
    setLetters([centerLetter, ...filteredLetters]);
  };

  const submitWord = () => {
    if (!playerInput) return;
    socket.emit('submit', { word: playerInput, name: playerName, roomId });
    console.log('submitting word: ' + playerInput);
    setPlayerInput('');
  };

  return (
    <>
      <form style={{ ...nameInputStyle, display: playerName ? 'none' : 'flex' }} onSubmit={(e) => {
        e.preventDefault();
        setPlayerName(nameFieldValue);
        localStorage.setItem('playerName', nameFieldValue);
      }}>
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
      <div style={{
        textAlign: 'center',
        display: letters.length ? 'none' : 'block'
      }}>
        <div>Loading...</div>
        <br />
        <p style={{ fontSize: '.75em' }}>...if you have the time to read this, there is probably something wrong.</p>
      </div>
      <div style={{ ...containerStyle, display: playerName && letters.length ? 'flex' : 'none' }}>
        <div style={halfContainerStyle}>
          <div style={{ ...errorStyle, visibility: error !== '.' ? 'visible' : 'hidden' }}>{error}</div>
          <InputField
            playerInput={playerInput}
            centerLetter={centerLetter}
            otherLetters={letters.filter((value) => value !== centerLetter)}
          />
          <Hive
            centerLetter={centerLetter}
            otherLetters={letters.filter((value) => value !== centerLetter)}
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
            answerLengths={answerLengths}
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
