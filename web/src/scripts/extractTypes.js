const fs = require("node:fs/promises");
const { pascalCase } = require("pascal-case");

async function extractTypes() {
  const filepath = "./src/types/supabase.ts";
  const fileBuffer = await fs.readFile(filepath);
  const fileText = fileBuffer.toString();

  const definitionsPattern = RegExp("^export type definitions = {(.+){$", "ms");
  const definitionsMatch = definitionsPattern.exec(fileText);
  if (definitionsMatch.length < 1 || !definitionsMatch[0])
    throw new Error("could not find definitions");
  const definitionsText = definitionsMatch[0];

  const individualDefinitionPattern = /(\w+): {[^}]*/g;
  const individualDefinitionMatches = [
    ...definitionsText.matchAll(individualDefinitionPattern),
  ];

  const types = individualDefinitionMatches.map((match, i) => {
    return `\r\nexport type ${pascalCase(match[1])} = definitions["${
      match[1]
    }"];`;
  });

  await fs.appendFile(filepath, types.join("\r\n"));
}

if (require.main === module) {
  extractTypes();
}
