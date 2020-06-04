const express = require('express');
const http = require('http');
const SocketIo = require('socket.io');
const moment = require('moment');
const fetch = require('node-fetch');

const Db = require('./utils/db');
const Scraper = require('./utils/scraper');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


const db = new Db();
let answers = [];
let letters = [];
let centerLetter = '';

const gameRestartTime = new moment.utc('18:00 -0500', 'HH:mm Z'); // 6pm Central
let gameLoadTime = new moment.utc();

const init = async (db) => {
    const date = getGameDate(gameLoadTime, gameRestartTime);
    gameLoadTime = new moment.utc();
    let day = await db.readDay(date);

    if (!day) {
        console.log('scraping');
        const scraper = new Scraper();
        const scrapedData = await scraper.scrape();

        answers = scrapedData.answers;
        letters = scrapedData.letters;
        centerLetter = scrapedData.centerLetter;

        await db.clear();
        const writeDayPromise = db.writeDay(date, letters, centerLetter);
        const writeAnswerPromise = db.writeWords(answers);
        await Promise.all([writeDayPromise, writeAnswerPromise]);
    } else {
        console.log('reading');
        answers = await db.readWords();
        letters = day.letters;
        centerLetter = day.center_letter;
    }
};

const checkIfFound = (word, foundWords) => {
    return foundWords.find((row) => row.word === word);
};

const checkForCorrectLetters = (word, letters) => {
    const letterArray = word.split('');
    const letterSet = new Set(letterArray);
    for (let letter of letterSet) {
        if (!letters.includes(letter)) {
            return false;
        }
    }
    return true;
};

const checkForCenterLetter = (word, centerLetter) => {
    return word.includes(centerLetter);
};

const checkInWordList = (word, answers) => {
    return answers.includes(word);
};

const restartNeeded = (serverStartTime, gameRestartTime) => {
    let now = new moment.utc();
    return serverStartTime.isBefore(gameRestartTime) && now.isAfter(gameRestartTime);
};

const getGameDate = (serverStartTime, gameRestartTime) => {
    let now = new moment.utc();
    if (serverStartTime.isBefore(gameRestartTime)) {
        return new moment.utc().subtract(1, 'day')
    } else {
        return new moment.utc();
    }
}

(async () => {
    await init(db);

    const app = express();
    const server = http.createServer(app);
    const io = SocketIo(server);

    io.on('connection', (socket) => {
        socket.on('initRequest', (async ({ roomId }) => {
            if (restartNeeded(gameLoadTime, gameRestartTime)) {
                await init(db);
            }
            socket.join(roomId);
            socket.emit('initResponse', {
                letters,
                centerLetter,
                foundWords: await db.readFoundWords(roomId),
                numOfAnswers: answers.length
            });
        }));

        socket.on('submit', (async ({ word, name, roomId }) => {
            word = word.toLowerCase();
            let foundWords = await db.readFoundWords(roomId);
            let found;
            if (found = checkIfFound(word, foundWords)) {
                socket.emit('alreadyFound', { word: found.word, name: found.name });
            } else if (!checkForCorrectLetters(word, letters)) {
                socket.emit('incorrectLetters', { word });
            } else if (!checkForCenterLetter(word, centerLetter)) {
                socket.emit('noCenterLetter', { word });
            } else if (!checkInWordList(word, answers)) {
                socket.emit('notInList', { word });
            } else {
                await db.writeFoundWord(word, name, roomId);
                foundWords = await db.readFoundWords(roomId);
                io.in(roomId).emit('updateFoundWords', {
                    foundWords,
                    word,
                    name
                });
            }
        }));
    });

    app.get('/', (req, res) => {
        res.send('Server is running...');
    });

    app.get('/status', async (req, res) => {
        const found = await db.readFoundWords(req.query.roomId) || [];
        const foundWords = found.map(found => found.word);
        const remaining = answers.filter((answer) => !foundWords.includes(answer));
        res.send({
            answers,
            letters,
            centerLetter,
            found,
            remaining,
        });
    });

    server.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`));

})();