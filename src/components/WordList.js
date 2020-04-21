import React from 'react';

const WordList = ({ foundWords = [], totalNumber = 0 }) => (
    <div className='wordList'>
        <div className='wordList-container'>
            <div className='wordList-heading'>
                You have found {foundWords.length} out of {totalNumber} words
            </div>
            <div className='wordList-list'>
                {foundWords.map((word) => (
                    <div className='wordList-listItem' key={word}>
                        {`${word.charAt(0).toUpperCase()}${word.substring(1, word.length).toLowerCase()}`}
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default WordList;