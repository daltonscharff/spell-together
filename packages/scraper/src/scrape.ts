import * as cheerio from "cheerio";
import * as dayjs from "dayjs";

export class ScrapedData {
  date: string;
  letters: string[];
  centerLetter: string;
  words: string[];

  validate() {
    if (!dayjs(this.date).isValid) throw new Error("Invalid date");
    if (this.letters.length !== 7)
      throw new Error("All letters could not be found");
    if (this.centerLetter.length !== 1)
      throw new Error("Could not find center letter");
    if (this.words.length === 0)
      throw new Error("Word list could not be found");
  }
}

export default function scrape(html: string): ScrapedData {
  const $ = cheerio.load(html);
  const data = new ScrapedData();
  data.date = parseDate($);
  data.words = parseWords($);
  data.letters = parseLetters(data.words);
  data.centerLetter = parseCenterLetter(html);

  return data;
}

function parseDate($: cheerio.CheerioAPI): string {
  const dateMarkup = $("#date-and-pic h2").text();
  return dayjs(dateMarkup, "dddd, MMMM D, YYYY").format("YYYY-MM-DD");
}

function parseWords($: cheerio.CheerioAPI): string[] {
  const wordListMarkup = $("#main-answer-list .column-list").text();
  const wordList = wordListMarkup.split("\n");
  return wordList
    .map((answer) => answer.trim().toLowerCase())
    .filter((answer) => answer.length);
}

function parseLetters(words: string[]): string[] {
  const letterSet = new Set<string>();
  for (let word of words) {
    word = word.toLowerCase();
    for (let letter of word.split("")) {
      letterSet.add(letter);
      if (letterSet.size === 7) {
        return Array.from(letterSet);
      }
    }
  }

  return [];
}

function parseCenterLetter(html: string): string {
  const matches = html.match(/"color":(\[.*\]),"plotX"/g);
  const match = matches[matches.length - 2];
  const array = JSON.parse(match.match(/"color":(\[.*\]),"plotX"/)[1]);
  const index = array.indexOf("firebrick");
  const aCharCode = 97;
  return String.fromCharCode(aCharCode + index);
}
