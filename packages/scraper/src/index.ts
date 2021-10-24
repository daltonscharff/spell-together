import fetch from "node-fetch";
import scrape from "./scrape";

const sourceUrl = "https://nytbee.com";

async function main() {
  let html;
  try {
    const request = await fetch(sourceUrl);
    html = await request.text();
  } catch (error) {
    console.error(`Error fetching html from ${sourceUrl}`, error);
    process.exit(1);
  }

  console.log(html);
  scrape(html);
}

main();
