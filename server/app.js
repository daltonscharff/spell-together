const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4000;

const app = express();

const server = http.createServer(app);

const io = socketIo(server);

let wordList = [];
let foundWords = [];
let letterList = [];
let centerLetter = null

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

io.on('connection', socket => {
    console.log('new client connected');

    socket.emit('setup', { letterList, centerLetter, foundWords });

    socket.on('submitWord', (word) => {
        word = word.toLowerCase();
        if (foundWords.includes(word)) {
            socket.emit('wordAlreadyFound', word);
        } else if (!checkLetters(word)) {
            socket.emit('incorrectLetters', word);
        } else if (!word.includes(centerLetter)) {
            socket.emit('noCenterLetter', word);
        } else if (!wordList.includes(word)) {
            socket.emit('notInWordList', word);
        } else {
            socket.emit('correctGuess', word);
            foundWords = [...foundWords, word];
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

    const r = await fetch('http://nytbee.com/Bee_20200424.html');
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
    res.send({
        wordList,
        foundWords,
        letterList,
        centerLetter
    });
});

server.listen(port, () => console.log(`listening on port http://localhost:${port}`));