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

    async clear() {
        return await this.pool.query('TRUNCATE TABLE days, words, words_to_rooms RESTART IDENTITY');
    }

    async writeDay(date, letters, centerLetter) {
        let sql = 'INSERT INTO days (date, letters, center_letter) VALUES ($1, $2, $3) RETURNING id';
        let result = await this.pool.query(sql, [date, JSON.stringify(letters), centerLetter]);

        return result.rows[0].id;
    }

    async writeAnswers(answers) {
        let values = answers.map((_, i) => `($${i + 1})`).join(',');
        let sql = `INSERT INTO words (word) VALUES ${values} RETURNING id`;
        let result = await this.pool.query(sql, answers);

        return result.rows.map((row) => row.id);
    }

    async writeFoundWord(word, name, roomId) {
        let sql = 'SELECT id FROM words WHERE word=$1';
        let result = await this.pool.query(sql, [word]);
        let wordId = result.rows[0].id;

        sql = 'INSERT INTO words_to_rooms (word_id, room_id, player_name) VALUES ($1, $2, $3) RETURNING id';
        result = await this.pool.query(sql, [wordId, roomId, name]);
        return result.rows[0].id;
    }

    async readDay(date) {
        let sql = 'SELECT * FROM days WHERE date=$1';
        let result = await this.pool.query(sql, [date]);
        return result.rows[0];
    }

    async readAnswers() {
        let sql = `SELECT word, definition FROM words`;
        let result = await this.pool.query(sql);
        return result.rows;
    }

    async readFoundWords(roomId) {
        let sql = 'SELECT word, definition, player_name as name FROM words_to_rooms JOIN words ON word_id=words.id WHERE room_id=$1';
        let result = await this.pool.query(sql, [roomId]);
        return result.rows;
    }
}


module.exports = Db;