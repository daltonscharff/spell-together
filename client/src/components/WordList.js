import React from 'react';

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #e6e6e6',
    borderRadius: '.5em',
    padding: '1em 1.5em',
    margin: '1em',
    flex: '1'
};
const wordListStyle = {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap'
};
const wordListItemStyle = {
    margin: '.25em 0',
    borderBottom: '1px solid #e6e6e6',
    maxWidth: '8em'
};

const WordList = ({ foundWords = [], numOfAnswers = 0 }) => (
    <div style={containerStyle} >
        <div style={{ margin: '0 0 1em' }}>
            You have found {foundWords.length} out of {numOfAnswers} words
        </div>
        <div style={wordListStyle}>
            {foundWords.map((word) => (
                <div style={wordListItemStyle} key={word}>
                    {`${word.charAt(0).toUpperCase()}${word.substring(1, word.length).toLowerCase()}`}
                </div>
            ))}
        </div>
    </div>
);

export default WordList;