import React from 'react';

import AnswerLengthGraph from './AnswerLengthGraph';

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
    flexDirection: 'row',
    flexWrap: 'wrap'
};
const wordListItemStyle = {
    margin: '.25em 0',
    borderBottom: '1px solid #e6e6e6',
    width: '50%',
    minWidth: '8em'
};

const WordList = ({ foundWords = [], numOfAnswers = 0, answerLengths }) => {
    foundWords = foundWords.sort((a, b) => a.word > b.word);
    return (
        <div style={containerStyle} >
            <div style={{ margin: '0 0 1em' }}>
                You have found {foundWords.length} out of {numOfAnswers} words
            </div>
            <div style={wordListStyle}>
                {foundWords.map((value) => (
                    <div style={wordListItemStyle} key={value.word}>
                        <span style={{
                            backgroundColor: (new Set(value.word.toLowerCase().split(''))).size === 7 ? '#facd04' : 'transparent'
                        }}>
                            {`${value.word.charAt(0).toUpperCase()}${value.word.substring(1, value.word.length).toLowerCase()}`}
                        </span>
                        <span style={{
                            fontSize: '.8em',
                            color: 'rgba(0, 0, 0, 0.4)',
                            fontStyle: 'italic'
                        }}> by {value.name}</span>
                    </div>
                ))}
            </div>
            <AnswerLengthGraph
                foundWords={foundWords}
                answerLengths={answerLengths}
            />
        </div>
    )
};

export default WordList;