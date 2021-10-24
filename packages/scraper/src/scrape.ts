import $ from "cheerio";

export type ScrapedData = {
  date: string;
  letters: string[];
  centerLetter: string;
  words: string[];
};

export default function scrape(html: string): ScrapedData {
  let data: ScrapedData;
  try {
    data.date = parseDate(html);
    data.words = parseWords(html);
    data.letters = parseLetters(data.words);
    data.centerLetter = parseCenterLetter(data.words);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  return data;
}

function parseDate(html: string): string {
  return "";
}

function parseWords(html: string): string[] {
  return [];
}

function parseLetters(words: string[]): string[] {
  return [];
}

function parseCenterLetter(words: string[]): string {
  return "";
}
