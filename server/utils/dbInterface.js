const knex = require('knex')({
    client: 'pg',
    connection: process.env.DB_CONNECTION_STRING,
    debug: process.env.NODE_ENV !== 'production',
    pool: { min: 2, max: 4 }
});

class DbInterface {
    static async getLetters(date) {
        date = date || new Date();

        let rows = await knex('days').where({ date }).select('letters', 'center_letter').limit(1);

        return rows[0];
    }
}

module.exports = DbInterface;
