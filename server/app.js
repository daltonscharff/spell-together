if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const Scraper = require('./utils/scraper');
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DB_CONNECTION_STRING,
    debug: true
});

const getGameState = async (pool, date) => {
    date = date || new Date;
    let answers = [];
    let letters = [];
    let centerLetter = '';

    const result = await pool.query('SELECT * FROM game_view WHERE date=$1', [date]);

    if (result.rowCount) {
        console.log('pulling from db');
        letters = result.rows[0].letters;
        centerLetter = result.rows[0].center_letter;
        answers = result.rows.map((row) => row.word);
    } else {
        console.log('scraping');
        const scraper = new Scraper();
        const scrapedData = await scraper.scrape();
        answers = scrapedData.answers;
        letters = scrapedData.letters;
        centerLetter = scrapedData.centerLetter;

        try {
            const daysResponse = pool.query('INSERT INTO days (date, letters, center_letter) VALUES ($1, $2, $3) \
            ON CONFLICT (date) DO NOTHING', [date, JSON.stringify(letters), centerLetter]);
            let wordsQuery = 'INSERT INTO words (word) VALUES ' + answers.map((_, i) => `($${i + 1})`).join(',') + ' ON CONFLICT (word) DO NOTHING';
            const wordsResponse = pool.query(wordsQuery, answers);
            await Promise.all([daysResponse, wordsResponse]);
        } catch (e) {
            console.log('Error writing to days or words to database:', e);
        }

        try {
            let daysQuery = 'SELECT id FROM days WHERE date=$1';
            let wordsQuery = 'SELECT id FROM words WHERE ' + answers.map((_, i) => `word=$${i + 1}`).join(' OR ');
            const [daysResponse, wordsResponse] = await Promise.all([pool.query(daysQuery, [date]), pool.query(wordsQuery, answers)]);

            const dayId = daysResponse.rows[0].id;
            const wordIds = wordsResponse.rows.map((row) => row.id);

            let wordsToDaysQuery = 'INSERT INTO words_to_days (word_id, day_id) VALUES ' + answers.map((_, i) => `($${i + 2}, $1)`).join(',');
            await pool.query(wordsToDaysQuery, [dayId, ...wordIds]);
        } catch (e) {
            console.log('Error reading days and words or writing words_to_days to database:', e);
        }
    }

    return { answers, letters, centerLetter };

};

(async () => {

    ({ answers, letters, centerLetter } = await getGameState(pool));
    console.log({ answers, letters, centerLetter });

    await pool.end();
})();