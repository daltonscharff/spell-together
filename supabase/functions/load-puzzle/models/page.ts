import {
  cheerio,
  Cheerio,
  Root,
} from "https://deno.land/x/cheerio@1.0.4/mod.ts";
type CheerioAPI = Cheerio & Root;

export class Page {
  html = "";
  outerLetters: string[] = [];
  centerLetter = "";
  date = new Date();
  words: string[] = [];

  async load(html?: string) {
    if (html) {
      this.html = html;
    } else {
      const source = "https://nytbee.com";
      const request = await fetch(source);
      this.html = await request.text();
    }
    const $ = cheerio.load(this.html);

    this.date = this.parseDate($);
    this.words = this.parseWords($);

    const letters = this.parseLetters(this.words);
    this.centerLetter = this.parseCenterLetter(this.html);
    this.outerLetters = letters.filter(
      (letter) => letter !== this.centerLetter
    );
  }

  parseDate($: CheerioAPI): Date {
    const dateString = $("#date-and-pic h2").text();
    return new Date(dateString);
  }

  parseWords($: CheerioAPI): string[] {
    const wordListMarkup = $("#main-answer-list .column-list").text();
    const wordList = wordListMarkup.split("\n");
    return wordList
      .map((answer) => answer.trim().toLowerCase())
      .filter((answer) => answer.length);
  }

  parseLetters(words: string[]): string[] {
    const letterSet = new Set<string>();
    for (let word of words) {
      word = word.toLowerCase();
      for (const letter of word.split("")) {
        letterSet.add(letter);
        if (letterSet.size === 7) {
          return Array.from(letterSet);
        }
      }
    }
    throw Error("Could not parse letters: " + words);
  }

  parseCenterLetter(html: string): string {
    const matches = html.match(/"color":(\[.*\]),"plotX"/g);
    if (!matches) throw new Error("Match not found: " + html);
    const match = matches[matches.length - 2];
    const colorMatch = match.match(/"color":(\[.*\]),"plotX"/);
    if (!colorMatch) throw new Error("Color match not found: " + colorMatch);
    const array = JSON.parse(colorMatch[1]);
    const index = array.indexOf("firebrick");
    const aCharCode = 97;
    return String.fromCharCode(aCharCode + index);
  }
}
