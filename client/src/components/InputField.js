import React from 'react';

const containerStyle = {
    display: 'flex',
    fontSize: '2.25em',
    fontWeight: 'bold',
    justifyContent: 'center',
    margin: '.5em',
    minHeight: '1em'
};

const InputField = ({ centerLetter = '', otherLetters = '', playerInput = '' }) => {
    return (
        <div style={containerStyle}>
            {playerInput.split('').map((letter) => (
                <span key={Math.random()} style={
                    letter === centerLetter ? { color: '#facd04' } : otherLetters.includes(letter) ? { color: 'black' } : { color: '#e6e6e6' }
                }>
                    {letter.toUpperCase()}
                </span>
            ))}
            <span style={{ color: '#facd04', fontWeight: 'normal', visibility: 'hidden' }}>|</span>
        </div>
    );
};

export default InputField;