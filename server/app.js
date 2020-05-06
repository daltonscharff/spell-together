const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs-extra');
const { Client } = require('pg');
const moment = require('moment');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const port = process.env.PORT;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

let wordList = [];
let foundWords = [];
let letterList = [];
let centerLetter = '';

const initServer = async () => {
    try {
        await client.connect();
        let res = await client.query('SELECT * FROM days ORDER BY date DESC LIMIT 1;');

        if (res.rows.length > 0) {
            console.log(res.rows[0]);
            wordList = res.rows[0].valid_words;
            letterList = res.rows[0].all_letters;
            centerLetter = res.rows[0].center_letter;
        } else {
            const data = await scrapeData();
            wordList = data.wordList;
            letterList = data.letterList;
            centerLetter = data.centerLetter;
            res = await client.query('INSERT INTO days (date, valid_words, all_letters, center_letter) VALUES ($1, $2, $3, $4);', [new Date(), JSON.stringify(['a', 'b']), JSON.stringify(['c']), centerLetter]);
        }
    } catch (e) {
        console.log(e);
    }
    await client.end();
};

initServer();


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


// app.get('/', (req, res) => { res.send({ response: 'Server is running...' }).status(200); });

// app.get('/refresh', async (req, res) => {
//     scrapeData();

//     foundWords = [];

//     updateFile({ wordList, foundWords, letterList, centerLetter });

//     res.send({
//         wordList,
//         foundWords,
//         letterList,
//         centerLetter
//     });
// });

const scrapeData = async () => {
    const fetch = require('node-fetch');
    const $ = require('cheerio');

    const r = await fetch(process.env.BEE_URL);
    const html = await r.text();

    const wordList = ((html) => {
        const rawList = $('#main-answer-list .column-list', html).text().split('\n');
        return rawList.map((value) => value.trim()).filter((value) => value.length);
    })(html);

    const letterList = ((answers) => {
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

    const centerLetter = await (async () => {
        const matches = html.match(/"color":(\[.*\]),"plotX"/g);
        const match = matches[matches.length - 2];
        const array = JSON.parse(match.match(/"color":(\[.*\]),"plotX"/)[1]);
        const index = array.indexOf('firebrick');
        const aCharCode = 97
        return String.fromCharCode(aCharCode + index);
    })(wordList, letterList);
    return { wordList, letterList, centerLetter };
}

// app.get('/status', (req, res) => {
//     res.send({
//         wordList,
//         foundWords,
//         letterList,
//         centerLetter
//     });
// });

// server.listen(port, () => console.log(`listening on port http://localhost:${port}`));