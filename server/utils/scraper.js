const fetch = require('node-fetch');
const $ = require('cheerio');

class Scraper {
    constructor(url) {
        this.url = url || process.env.BEE_URL;
        this.answers = [];
        this.letters = [];
        this.centerLetter = '';
    }

    parseAnswers(html) {
        const answerListMarkup = $('#main-answer-list .column-list', html).text();
        const answerList = answerListMarkup.split('\n');
        const answerListCleaned = answerList.map(answer => answer.trim().toLowerCase()).filter(answer => answer.length);

        return answerListCleaned
    }

    parseLetters(answers) {
        let letterSet = new Set();
        for (let answer of answers) {
            answer = answer.toLowerCase();
            for (let letter of answer.split('')) {
                letterSet.add(letter);
            }
        }

        return Array.from(letterSet);
    }

    parseCenterLetter(html) {
        const matches = html.match(/"color":(\[.*\]),"plotX"/g);
        const match = matches[matches.length - 2];
        const array = JSON.parse(match.match(/"color":(\[.*\]),"plotX"/)[1]);
        const index = array.indexOf('firebrick');
        const aCharCode = 97;
        return String.fromCharCode(aCharCode + index);
    }

    async scrape() {
        try {
            const request = await fetch(this.url);
            const html = await request.text();

            this.answers = this.parseAnswers(html);
            this.letters = this.parseLetters(this.answers);
            this.centerLetter = this.parseCenterLetter(html);
        } catch (e) {
            return { error: e };
        }

        return {
            answers: this.answers,
            letters: this.letters,
            centerLetter: this.centerLetter
        }
    }
}

module.exports = Scraper;