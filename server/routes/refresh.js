const express = require("express");
const router = express.Router();
const fetch = require('node-fetch');
const $ = require('cheerio');
const sqlite3 = require('sqlite3').verbose();

const config = require('../config');

const getAnswers = (html) => {
    const rawList = $('#main-answer-list .column-list', html).text().split('\n');
    return rawList.map((value) => value.trim()).filter((value) => value.length);
};

const getLetters = (answers) => {
    let letterSet = new Set();
    for (let word of answers) {
        word = word.toLowerCase();
        let letterArray = word.split('');
        for (let letter of letterArray) {
            letterSet.add(letter);
        }
    }
    return Array.from(letterSet);
};

const getCenter = (answers, letters) => {
    for (let letter of letters) {
        let count = 0;
        for (let answer of answers) {
            answer.includes(letter) ? count++ : count;
        }
        if (count == answers.length) return letter;
    }
    return "no center letter";
};

const saveData = (answers, letters, centerLetter) => {
    let db = new sqlite3.Database(config.dbPath, sqlite3.OPEN_READWRITE, (error) => error ? console.error(error.message) : console.log('Connected to database'));

    db.run(`CREATE TABLE IF NOT EXISTS hive (
        id INTEGER PRIMARY KEY,
        centerLetter TEXT NOT NULL,
        allLetters TEXT NOT NULL,
        answers TEXT NOT NULL,
        Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );`);

    db.run(`INSERT INTO hive (centerLetter, allLetters, answers) VALUES (?, ?, ?);`, centerLetter, JSON.stringify(letters), JSON.stringify(answers));

    db.close((error) => error ? console.error(error.message) : console.log('Disconnected from database'));
};

router.get("/refresh", async (req, res) => {
    const r = await fetch(config.answersUrl);
    const html = await r.text();

    const answers = getAnswers(html);
    const letters = getLetters(answers);
    const centerLetter = getCenter(answers, letters);

    saveData(answers, letters, centerLetter);

    res.send({ centerLetter, letters, answers }).status(200);
});

module.exports = router;