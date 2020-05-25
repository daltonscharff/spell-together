const express = require('express');
const http = require('http');
const SocketIo = require('socket.io');

const Db = require('./utils/db');
const Scraper = require('./utils/scraper');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const init = async (db) => {
    let date = new Date;
    let day = await db.readDay(date);

    let answers;
    let letters;
    let centerLetter;

    if (!day) {
        console.log('scraping');
        const scraper = new Scraper();
        const scrapedData = await scraper.scrape();

        answers = scrapedData.answers;
        letters = scrapedData.letters;
        centerLetter = scrapedData.centerLetter;

        await db.clear();
        let writeDayPromise = db.writeDay(date, letters, centerLetter);
        let writeAnswerPromise = db.writeAnswers(answers);
        await Promise.all([writeDayPromise, writeAnswerPromise]);
    } else {
        console.log('reading');
        letters = day.letters;
        centerLetter = day.center_letter;
        answers = await db.readAnswers();
    }

    return { answers, letters, centerLetter };
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
    return answers.find((answer => answer.word === word));
};

(async () => {
    const db = new Db();
    ({ answers, letters, centerLetter } = await init(db));

    const app = express();
    const server = http.createServer(app);
    const io = SocketIo(server);

    io.on('connection', (socket) => {
        socket.on('initRequest', (async ({ roomId }) => {
            socket.join(roomId);
            socket.emit('initResponse', {
                letters,
                centerLetter,
                foundWords: await db.readFoundWords(roomId)
            });
        }));

        socket.on('submit', (async ({ word, name, roomId }) => {
            word = word.toLowerCase();
            let foundWords = await db.readFoundWords(roomId);
            let found;
            if (found = checkIfFound(word, foundWords)) {
                socket.emit('alreadyFound', { word: found.word, name: found.player_name });
            } else if (!checkForCorrectLetters(word, letters)) {
                socket.emit('incorrectLetters', word);
            } else if (!checkForCenterLetter(word, centerLetter)) {
                socket.emit('noCenterLetter', { word });
            } else if (!checkInWordList(word, answers)) {
                socket.emit('notInList', { word });
            } else {
                db.writeFoundWord(word, name, roomId);
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

    app.get('/test', (req, res) => {
        let path = require('path');
        res.sendFile(path.join(__dirname + '/test.html'));
    });

    server.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`));

})();