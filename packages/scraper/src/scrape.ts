import $ from "cheerio";

export class ScrapedData {
  date: string;
  letters: string[];
  centerLetter: string;
  words: string[];
}

export default function scrape(html: string): ScrapedData {
  const data = new ScrapedData();
  data.date = parseDate(html);
  data.words = parseWords(html);
  data.letters = parseLetters(data.words);
  data.centerLetter = parseCenterLetter(data.words);

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
