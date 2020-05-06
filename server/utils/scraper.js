const fetch = require('node-fetch');
const $ = require('cheerio');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

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
        const graphColorArrayPattern = /"color":(\[.*\]),"plotX".+"text":"Center Letter Frequency"/g;
        const graphColorArrayMarkup = html.match(graphColorArrayPattern);
        const graphColorArray = JSON.parse(graphColorArrayMarkup);
        const indexOfFirebrick = graphColorArray.indexOf('firebrick');
        const centerLetterCharCode = 'a'.charCodeAt(0) + indexOfFirebrick;

        return String.fromCharCode(centerLetterCharCode);
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