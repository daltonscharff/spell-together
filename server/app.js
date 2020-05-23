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

(async () => {
    const db = new Db();
    ({ dayId, answers, letters, centerLetter } = await init(db));

    const app = express();
    const server = http.createServer(app);
    const io = SocketIo(server);

    io.on('connection', (socket) => {
        socket.on('initRequest', (async ({ roomId }) => {
            socket.join(roomId);
            socket.emit('initResponse', {
                dayId,
                letters,
                centerLetter,
                foundWords: await db.readFoundWords(dayId, roomId)
            });
        }));

        socket.on('submit', (async ({ word, name, dayId, roomId }) => {
            word = word.toLowerCase();
            let foundWords = await db.readFoundWords(dayId, roomId);
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
                db.writeFoundWord(word, name, dayId, roomId);
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

    // await db.disconnect();
})();