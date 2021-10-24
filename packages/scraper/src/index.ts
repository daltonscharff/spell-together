import fetch from "node-fetch";
import * as fs from "fs";
import scrape from "./scrape";

const sourceUrl = "https://nytbee.com";
const exampleDataFile = "example_data.html";

async function main() {
  let html;
  if (process.env.NODE_ENV !== "development") {
    try {
      const request = await fetch(sourceUrl);
      html = await request.text();
    } catch (error) {
      console.error(`Error fetching html from ${sourceUrl}`, error);
      process.exit(1);
    }
  } else {
    console.log("Reading from file:", exampleDataFile);
    html = fs.readFileSync(exampleDataFile, "utf-8");
  }

  try {
    const data = scrape(html);
    console.log(data);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
