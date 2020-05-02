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

const WordList = ({ foundWords = [], numOfAnswers = 0 }) => {
    foundWords = foundWords.sort((a, b) => a.word > b.word)
    return (
        <div style={containerStyle} >
            <div style={{ margin: '0 0 1em' }}>
                You have found {foundWords.length} out of {numOfAnswers} words
        </div>
            <div style={wordListStyle}>
                {foundWords.map((value) => (
                    <div style={wordListItemStyle} key={value.word}>
                        {`${value.word.charAt(0).toUpperCase()}${value.word.substring(1, value.word.length).toLowerCase()}`}
                        <span style={{
                            fontSize: '.8em',
                            color: 'rgba(0, 0, 0, 0.4)',
                            fontStyle: 'italic'
                        }}> by {value.name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default WordList;