import fetch from "node-fetch";
import * as fs from "fs";
import scrape, { ScrapedData } from "./scrape";
import update from "./update";

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

  let data: ScrapedData;
  try {
    data = scrape(html);
    data.validate();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  console.log(data);
  update(data);
}

main();
