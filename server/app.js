const express = require('express');
const http = require('http');
const SocketIo = require('socket.io');

const Db = require('./utils/db');
const Scraper = require('./utils/scraper');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const init = async (db, date) => {
    date = date || new Date;

    let rows = await db.readGame(date);

    let dayId;
    let answers;
    let letters;
    let centerLetter;

    if (rows.length === 0) {
        console.log('scraping')
        const scraper = new Scraper();
        const scrapedData = await scraper.scrape();

        answers = scrapedData.answers;
        letters = scrapedData.letters;
        centerLetter = scrapedData.centerLetter;

        dayId = await db.writeDay(date, letters, centerLetter);
        await db.writeAnswers(answers, dayId);
    } else {
        console.log('reading');
        dayId = rows[0].day_id;
        answers = rows.map((row) => row.word);
        letters = rows[0].letters;
        centerLetter = rows[0].center_letter;
    }

    return { dayId, answers, letters, centerLetter };
};

const getAnswerLengths = (answers) => {
    const answerLengths = [];
    answers.forEach((answer) => {
        let answerLength = answer.word.length;
        answerLengths[answerLength] = answerLengths[answerLength] + 1 || 1;
    });
    return answerLengths;
};

const checkIfFound = (word, foundWords) => {
    return foundWords.map((row) => row.word).includes(word);
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

(async () => {
    const db = new Db();
    ({ dayId, answers, letters, centerLetter } = await init(db));

    console.log({ dayId, answers, letters, centerLetter })

    const app = express();
    const server = http.createServer(app);
    const io = SocketIo(server);

    io.on('connection', (socket) => {
        socket.on('initRequest', (async (roomId) => {
            socket.emit('initResponse', {
                dayId,
                letters,
                centerLetter,
                foundWords: await readFoundWords(pool, roomId, dayId)
            });
        }));

        socket.on('submit', (async (word, name, dayId, roomId) => {
            word = word.toLowerCase();
            let foundWords = await readFoundWords(pool, roomId, dayId);
            if (checkIfFound(word, foundWords)) {
                socket.emit('alreadyFound', word);
            } else if (!checkForCorrectLetters(word, letters)) {
                socket.emit('incorrectLetters', word);
            } else if (!checkForCenterLetter(word, centerLetter)) {
                socket.emit('noCenterLetter', word);
            } else if (!checkInWordList(word, answers)) {
                socket.emit('notInList', word);
            } else {
                socket.emit('correct', word);
                writeFoundWord(word, name, pool, dayId, roomId);
                io.sockets.emit('updateFoundWords', {
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

    server.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`));

    await db.disconnect();
})();