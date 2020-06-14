import React from 'react';
import ChartistGraph from 'react-chartist';

const AnswerLengthGraph = ({ foundWords = [], answerLengths = {} }) => {
    const maxLength = Math.max(...Object.keys(answerLengths));
    let foundWordLengths = {};
    for (let value of foundWords) {
        let wordLength = value.word.length.toString();

        foundWordLengths[wordLength] = foundWordLengths[wordLength] ? foundWordLengths[wordLength] + 1 : 1;
    }
    let labels = [];
    for (let i = 4; i <= maxLength; i++) {
        labels.push(i);
    }
    let answerSeries = labels.map((value) => answerLengths[value] || 0);
    let foundWordSeries = labels.map((value) => foundWordLengths[value] || 0);
    let differenceSeries = answerSeries.map((value, i) => value - foundWordSeries[i]);

    let data = {
        labels,
        series: [
            foundWordSeries,
            differenceSeries
        ]
    };

    let options = {
        low: 0,
        stackBars: true,
        onlyInteger: true
    };

    let type = 'Bar'
    return (
        <div style={{
            textAlign: 'center',
            padding: '2em 1.5em 0em 0em'
        }}
        >
            <ChartistGraph data={data} options={options} type={type} />
        </div>
    );
};

export default AnswerLengthGraph;