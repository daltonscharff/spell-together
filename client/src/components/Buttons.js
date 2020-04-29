import React from 'react';

const containerStyle = {
    display: 'flex',
    justifyContent: 'center'
};
const buttonStyle = {
    border: '1px solid #e6e6e6',
    borderRadius: '2em',
    padding: '.5em 1em',
    color: 'black',
    margin: '1em',
    background: 'transparent',
    fontSize: '1em',
    cursor: 'pointer'
};
const refreshButtonStyle = {
    height: '1.5em',
    padding: '.5em 0em .25em',
}

const Buttons = ({ playerInput, setPlayerInput, letterList, setLetterList }) => {
    const shuffle = (letters) => {
        for (let i in letters) {
            const j = Math.floor(Math.random() * i)
            const temp = letters[i];
            letters[i] = letters[j];
            letters[j] = temp;
        }
        setLetterList([...letters]);
    };

    return (
        <div style={containerStyle}>
            <button style={buttonStyle}>
                Delete
            </button>
            <button style={buttonStyle} onClick={() => shuffle(letterList)}>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100" style={refreshButtonStyle}>
                    <circle cx="50" cy="50" r="47" stroke="black" strokeWidth="6" fill="white" />
                    <line x1="0" y1="0" x2="100" y2="100" strokeWidth="20" stroke="white" />
                    <polygon points="18,0 18,20 38,20" fill="black" />
                    <polygon points="82,100 82,80 62,80" fill="black" />
                </svg>
            </button>
            <button style={buttonStyle}>
                Enter
            </button>
        </div>
    );
};

export default Buttons;