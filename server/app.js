const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const fs = require('fs-extra');

const port = process.env.PORT || 4000;

const app = express();

const server = http.createServer(app);

const io = socketIo(server);

const savedInfo = fs.readJSONSync('save.json');

let wordList = savedInfo.wordList || [];
let foundWords = savedInfo.foundWords || [];
let letterList = savedInfo.letterList || [];
let centerLetter = savedInfo.centerLetter || '';

const checkLetters = (word) => {
    const letterArray = word.split('');
    const letterSet = new Set(letterArray);
    for (let letter of letterSet) {
        if (!letterList.includes(letter)) {
            return false;
        }
    }
    return true;
};

const updateFile = (updates) => {
    let contents = fs.readJSONSync('save.json');
    contents = { ...contents, ...updates };
    fs.writeJSON('save.json', contents);
}

io.on('connection', socket => {
    console.log('new client connected');

    socket.emit('setup', { letterList, centerLetter, foundWords, numOfAnswers: wordList.length });

    socket.on('submitWord', ({ word, name }) => {
        word = word.toLowerCase();
        if (foundWords.map((values) => values.word).includes(word)) {
            socket.emit('wordAlreadyFound', foundWords.find((value) => value.word === word));
        } else if (!checkLetters(word)) {
            socket.emit('incorrectLetters', word);
        } else if (!word.includes(centerLetter)) {
            socket.emit('noCenterLetter', word);
        } else if (!wordList.includes(word)) {
            socket.emit('notInWordList', word);
        } else {
            socket.emit('correctGuess', word);
            foundWords = [...foundWords, { word, name }];

            updateFile({ foundWords });

            io.sockets.emit('foundWords', foundWords);
        }
    });

    socket.on('disconnect', () => {
        console.log('client disconnected');
    });
});


app.get('/', (req, res) => { res.send({ response: 'Server is running...' }).status(200); });

app.get('/refresh', async (req, res) => {
    const fetch = require('node-fetch');
    const $ = require('cheerio');

    const r = await fetch('http://nytbee.com/');
    const html = await r.text();

    wordList = ((html) => {
        const rawList = $('#main-answer-list .column-list', html).text().split('\n');
        return rawList.map((value) => value.trim()).filter((value) => value.length);
    })(html);

    letterList = ((answers) => {
        let letterSet = new Set();
        for (let word of answers) {
            word = word.toLowerCase();
            let letterArray = word.split('');
            for (let letter of letterArray) {
                letterSet.add(letter);
            }
        }
        return Array.from(letterSet);
    })(wordList);

    centerLetter = ((answers, letters) => {
        for (let letter of letters) {
            let count = 0;
            for (let answer of answers) {
                answer.includes(letter) ? count++ : count;
            }
            if (count == answers.length) return letter;
        }
        return "no center letter";
    })(wordList, letterList);

    updateFile({ wordList, letterList, centerLetter });

    res.send({
        wordList,
        foundWords,
        letterList,
        centerLetter
    });
});

app.get('/status', (req, res) => {
    res.send({
        wordList,
        foundWords,
        letterList,
        centerLetter
    });
});

app.get('/reset', (req, res) => {
    foundWords = [];

    updateFile({ foundWords });

    res.send({
        wordList,
        foundWords,
        letterList,
        centerLetter
    });
});

server.listen(port, () => console.log(`listening on port http://localhost:${port}`));