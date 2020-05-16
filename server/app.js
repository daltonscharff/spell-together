const { Pool } = require('pg');
const express = require('express');
const http = require('http');
const SocketIo = require('socket.io');
const Scraper = require('./utils/scraper');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const init = async (pool, date) => {
    date = date || new Date;
    let sql = 'SELECT id FROM days WHERE date=$1';
    let result = await pool.query(sql, [date]);

    let dayId;
    let answers = [];
    let letters = [];
    let centerLetter = '';

    if (result.rowCount === 0) {
        console.log('scraping');
        sql = 'INSERT INTO days (date) VALUES ($1) RETURNING id';
        result = await pool.query(sql, [date]);
        dayId = result.rows[0].id;

        const scraper = new Scraper();
        const scrapedData = await scraper.scrape();

        answers = scrapedData.answers;
        letters = scrapedData.letters;
        centerLetter = scrapedData.centerLetter;

        writeAnswers(scrapedData.answers, pool, dayId);
        writeLetters(scrapedData.letters, pool, dayId);
        writeCenterLetter(scrapedData.centerLetter, pool, dayId);
    } else {
        console.log('reading');
        dayId = result.rows[0].id;
        answers = readAnswers(pool, dayId);
        letters = readLetters(pool, dayId);
        centerLetter = readCenterLetter(pool, dayId);
    }

    [answers, letters, centerLetter] = await Promise.all([answers, letters, centerLetter]);
    return { dayId, answers, letters, centerLetter };
};

const writeAnswers = async (answers, pool, dayId) => {
    let values = answers.map((_, i) => `($${i + 1})`.join(','));
    let sql = `INSERT INTO words (word) VALUES ${values} RETURNING id ON CONFLICT DO NOTHING`;
    let result = await pool.query(sql, [...answers]);

    let wordIds = result.rows.map((row) => row.id);

    values = wordIds.map((_, i) => `($${i + 1}, ${wordIds.length + 1})`);
    sql = `INSERT INTO words_to_days (word_id, day_id) VALUES ${values}`;
    result = await pool.query(sql, [...wordIds, dayId]);

    return result.rows.map((row) => row.id);
};
const writeLetters = async (letters, pool, dayId) => {
    let sql = 'INSERT INTO days (letters) VALUES ($1) WHERE id=$2 RETURNING id';
    let result = await pool.query(sql, [JSON.stringify(letters), dayId]);
    return result.rows[0].id;
};
const writeCenterLetter = async (centerLetter, pool, dayId) => {
    let sql = 'INSERT INTO days (center_letter) VALUES ($1) WHERE id=$2 RETURNING id';
    let result = await pool.query(sql, [centerLetter, dayId]);
    return result.rows[0].id;
};
const writeFoundWord = async (word, name, pool, dayId, roomId) => {
    let sql = 'SELECT id FROM words WHERE word=$1';
    let result = await pool.query(sql, [word]);
    let wordId = result.rows[0].id;

    sql = 'INSERT INTO words_to_rooms (word_id, room_id, day_id, player_name) VALUES ($1, $2, $3, $4) RETURNING id';
    result = await pool.query(sql, [wordId, roomId, dayId, name]);
    return result.rows[0].id;
};

const readAnswers = async (pool, dayId) => {
    let sql = `SELECT word, definition FROM game_view WHERE day_id=$1`;
    let result = await pool.query(sql, [dayId]);
    return result.rows;
};
const readLetters = async (pool, dayId) => {
    let sql = 'SELECT letters FROM days WHERE id=$1';
    let result = await pool.query(sql, [dayId]);
    return result.rows[0].letters;
};
const readCenterLetter = async (pool, dayId) => {
    let sql = 'SELECT center_letter FROM days WHERE id=$1';
    let result = await pool.query(sql, [dayId]);
    return result.rows[0].center_letter;
};
const readFoundWords = async (pool, dayId, roomId) => {
    let sql = 'SELECT word, definition, player_name FROM words_to_rooms JOIN words ON word_id=words.id WHERE day_id=$1 AND room_id=$2';
    let result = await pool.query(sql, [dayId, roomId]);
    return result.rows;
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
    const pool = new Pool({
        connectionString: process.env.DB_CONNECTION_STRING,
        debug: process.env.NODE_ENV !== 'production',
        max: 3
    });
    ({ dayId, answers, letters, centerLetter } = await init(pool));

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

    await pool.end();
})();