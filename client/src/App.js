import React, { useState, useEffect } from 'react';

const App = ({ socket }) => {
  const [foundWords, setFoundWords] = useState([]);
  const [letterList, setLetterList] = useState([]);
  const [centerLetter, setCenterLetter] = useState(null);

  useEffect(() => {
    socket.on('setup', (data) => {
      setFoundWords(data.foundWords);
      setLetterList(data.letterList);
      setCenterLetter(data.centerLetter);
      console.log('setting up new connection');
    });
  }, []);

  return (
    <div className="App">
      Hello from App
      <p>{centerLetter}</p>
    </div>
  );
};

export default App;
