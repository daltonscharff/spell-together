/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.raw(`
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

  CREATE FUNCTION generate_shortcode (length int)
  RETURNS varchar 
  LANGUAGE plpgsql
  AS $$
    DECLARE
      _shortcode varchar;
      valid_letters CONSTANT varchar := 'acdefghjlmnpqrstuvwxyz02345679';
      random_number int;
      random_char char;
    BEGIN
      LOOP
        random_number := FLOOR(RANDOM() * LENGTH(valid_letters) + 1)::int;
        random_char := SUBSTRING(valid_letters, random_number, 1);
        _shortcode := CONCAT(_shortcode, random_char);
        IF LENGTH(_shortcode) = length THEN
          IF (SELECT COUNT(*) FROM "room" WHERE "shortcode"=_shortcode) = 0 THEN
            RETURN _shortcode;
          ELSE
            _shortcode := '';
          END IF;
        END IF;
      END LOOP;
    END; $$;

  CREATE TABLE puzzle (
    id              uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    date            date UNIQUE NOT NULL DEFAULT NOW(),
    outer_letters   json NOT NULL,
    center_letter   char NOT NULL,
    max_score        int2 NOT NULL
  );

  CREATE TABLE room (
    id            uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    created_at    timestamp NOT NULL DEFAULT NOW(),
    last_played   timestamp NOT NULL DEFAULT NOW(),
    shortcode     char(6) UNIQUE NOT NULL DEFAULT generate_shortcode(6),
    name          varchar
  );

  CREATE TABLE word (
    id              uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    word            varchar UNIQUE NOT NULL,
    point_value     int2 NOT NULL,
    is_pangram      boolean NOT NULL,
    definition      text,
    part_of_speech  varchar,
    synonym         varchar
  );

  CREATE TABLE record (
    id          uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    created_at  timestamp NOT NULL DEFAULT NOW(),
    username    varchar NOT NULL,
    room_id     uuid NOT NULL REFERENCES room(id) ON DELETE CASCADE,
    word_id     uuid NOT NULL REFERENCES word(id) ON DELETE CASCADE,
    UNIQUE (room_id, word_id)
  );
  `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.raw(`
  DROP TABLE record;
  DROP TABLE word;
  DROP TABLE room;
  DROP TABLE puzzle;
  DROP FUNCTION generate_shortcode;
  `);
};
