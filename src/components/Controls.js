import React, { useState } from 'react';
import Hive from './Hive';

const Controls = ({ centerLetter, playerInput, setPlayerInput, inputElement, submitWord, ...rest }) => {
    const [otherLetters, setOtherLetters] = useState(rest.otherLetters);

    const shuffle = (letters) => {
        for (let i in letters) {
            const j = Math.floor(Math.random() * i)
            const temp = letters[i];
            letters[i] = letters[j];
            letters[j] = temp;
        }
        setOtherLetters([...letters]);
    };

    const addLetter = (letter) => {
        setPlayerInput(`${playerInput}${letter}`);
    };

    const filterInput = (e) => {
        let value = e.target.value.toUpperCase();
        value = value.split('').reduce((word, letter) => {
            if ([centerLetter, ...otherLetters].includes(letter)) {
                word += letter
            }
            return word;
        }, '');
        setPlayerInput(value);
    };

    const deleteLetter = () => {
        setPlayerInput(playerInput.substring(0, playerInput.length - 1));
    };

    return (
        <form className='controls' onSubmit={(e) => submitWord(e)}>
            <input type='text' value={playerInput} onChange={(e) => filterInput(e)} ref={inputElement} />
            <Hive
                centerLetter={centerLetter}
                otherLetters={otherLetters}
                addLetter={addLetter}
            />
            <div className='controls-buttonHolder'>
                <button className='controls-button'>
                    Enter
                </button>
                <button className='controls-button' onClick={() => shuffle(otherLetters)}>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100" className="controls-button--refresh">
                        <circle cx="50" cy="50" r="47" stroke="black" strokeWidth="6" fill="white" />
                        <line x1="0" y1="0" x2="100" y2="100" strokeWidth="20" stroke="white" />
                        <polygon points="18,0 18,20 38,20" fill="black" />
                        <polygon points="82,100 82,80 62,80" fill="black" />
                    </svg>
                </button>
                <button className='controls-button' onClick={() => deleteLetter(otherLetters)}>
                    Delete
                </button>
            </div>
        </form>
    );
}

export default Controls;