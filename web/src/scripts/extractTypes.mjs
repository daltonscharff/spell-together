import { program } from "commander";
import openapi from "openapi-typescript";
import fs from "node:fs/promises";
import { pascalCase } from "pascal-case";

async function extractTypes() {
  program
    .description("Creates type file from Swagger doc")
    .option("-o, --output", "output file location", "./src/types/supabase.ts")
    .option(
      "-u, --url",
      "Swagger doc URL",
      "http://localhost:54321/rest/v1/?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs"
    );

  program.parse();
  const { url, output: outputFile } = program.opts();
  let fileText = await openapi(url, {
    exportType: true,
  });

  fileText = replaceUnknownArrays(fileText);
  fileText += extractTypeDefinitions(fileText);

  await fs.writeFile(outputFile, fileText);
}

function replaceUnknownArrays(fileText) {
  fileText = fileText.replace(
    /outer_letters\?: unknown\[\]/gi,
    "outer_letters?: string[]"
  );
  fileText = fileText.replace(
    /outer_letters: unknown\[\]/gi,
    "outer_letters: string[]"
  );

  return fileText;
}

function extractTypeDefinitions(fileText) {
  const definitionsPattern = RegExp("^export type definitions = {(.+){$", "ms");
  const definitionsMatch = definitionsPattern.exec(fileText);
  if (definitionsMatch.length < 1 || !definitionsMatch[0])
    throw new Error("could not find definitions");
  const definitionsText = definitionsMatch[0];

  const individualDefinitionPattern = /(\w+): {[^}]*/g;
  const individualDefinitionMatches = [
    ...definitionsText.matchAll(individualDefinitionPattern),
  ];

  const types = individualDefinitionMatches.map((match) => {
    return `\r\nexport type ${pascalCase(match[1])} = definitions["${
      match[1]
    }"];`;
  });

  return types.join("\r\n");
}

extractTypes();
