import React, { useState, useEffect } from 'react';
import Hive from './components/Hive';
import Buttons from './components/Buttons';
import WordList from './components/WordList';

const containerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  minHeight: '100vh'
};

const halfContainerStyle = {
  flex: '1 1 0'
};

const App = ({ socket }) => {
  const [foundWords, setFoundWords] = useState([]);
  const [letterList, setLetterList] = useState([]);
  const [centerLetter, setCenterLetter] = useState('');
  const [numOfAnswers, setNumOfAnswers] = useState(0);
  const [playerInput, setPlayerInput] = useState('');

  useEffect(() => {
    socket.on('setup', (data) => {
      setFoundWords(data.foundWords);
      setLetterList(data.letterList);
      setCenterLetter(data.centerLetter);
      setNumOfAnswers(data.numOfAnswers);
      console.log('setting up new connection');
    });
  }, []);

  return (
    <div style={containerStyle}>
      <div style={halfContainerStyle}>
        <Hive
          centerLetter={centerLetter}
          otherLetters={letterList.filter((value) => value !== centerLetter)}
        />
        <Buttons
          playerInput={playerInput}
          setPlayerInput={setPlayerInput}
          letterList={letterList}
          setLetterList={setLetterList}
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
