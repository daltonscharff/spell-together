const { Pool } = require('pg');

class Db {
    constructor() {
        this.pool = new Pool({
            connectionString: process.env.DB_CONNECTION_STRING,
            debug: process.env.NODE_ENV !== 'production',
            max: 3
        });
    }

    async disconnect() {
        return await this.pool.end();
    }

    async writeDay(date, letters, centerLetter) {
        let sql = 'INSERT INTO days (date, letters, center_letter) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING RETURNING id';
        let result = await this.pool.query(sql, [date, JSON.stringify(letters), centerLetter]);

        try {
            return result.rows[0].id;
        } catch (e) {
            sql = 'SELECT id FROM days WHERE date=$1';
            result = await this.pool.query(sql, [date]);
            return result.rows[0].id;
        }
    }

    async writeAnswers(answers, dayId) {
        let values = answers.map((_, i) => `($${i + 1})`).join(',');
        let sql = `INSERT INTO words (word) VALUES ${values} ON CONFLICT DO NOTHING`;
        let result = await this.pool.query(sql, answers);

        let where = answers.map((_, i) => `word=$${i + 1}`).join(' OR ');
        sql = `SELECT id FROM words WHERE ${where}`;
        result = await this.pool.query(sql, answers);
        let wordIds = result.rows.map((row) => row.id);

        values = wordIds.map((_, i) => `($${i + 1}, $${wordIds.length + 1})`);
        sql = `INSERT INTO words_to_days (word_id, day_id) VALUES ${values}`;
        result = await this.pool.query(sql, [...wordIds, dayId]);

        return result.rows.map((row) => row.id);
    }

    async writeLetters(letters, dayId) {
        let sql = 'INSERT INTO days (letters) VALUES ($1) WHERE id=$2 RETURNING id';
        let result = await this.pool.query(sql, [JSON.stringify(letters), dayId]);
        return result.rows[0].id;
    }

    async writeCenterLetter(centerLetter, dayId) {
        let sql = 'INSERT INTO days (center_letter) VALUES ($1) WHERE id=$2 RETURNING id';
        let result = await this.pool.query(sql, [centerLetter, dayId]);
        return result.rows[0].id;
    }

    async writeFoundWord(word, name, dayId, roomId) {
        let sql = 'SELECT id FROM words WHERE word=$1';
        let result = await this.pool.query(sql, [word]);
        let wordId = result.rows[0].id;

        sql = 'INSERT INTO words_to_rooms (word_id, room_id, day_id, player_name) VALUES ($1, $2, $3, $4) RETURNING id';
        result = await this.pool.query(sql, [wordId, roomId, dayId, name]);
        return result.rows[0].id;
    }

    async readGame(date) {
        let sql = 'SELECT * FROM game_view WHERE date=$1';
        let result = await this.pool.query(sql, [date]);
        return result.rows;
    }

    async readAnswers(dayId) {
        let sql = `SELECT word, definition FROM game_view WHERE day_id=$1`;
        let result = await this.pool.query(sql, [dayId]);
        return result.rows;
    }

    async readLetters(dayId) {
        let sql = 'SELECT letters FROM days WHERE id=$1';
        let result = await this.pool.query(sql, [dayId]);
        return result.rows[0].letters;
    }

    async readCenterLetter(dayId) {
        let sql = 'SELECT center_letter FROM days WHERE id=$1';
        let result = await this.pool.query(sql, [dayId]);
        return result.rows[0].center_letter;
    }

    async readFoundWords(dayId, roomId) {
        let sql = 'SELECT word, definition, player_name FROM words_to_rooms JOIN words ON word_id=words.id WHERE day_id=$1 AND room_id=$2';
        let result = await this.pool.query(sql, [dayId, roomId]);
        return result.rows;
    }
}


module.exports = Db;