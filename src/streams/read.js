import { createReadStream } from "fs";

import { resolve, dirname } from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const read = async () => {
  const filePath = resolve(__dirname, "files", "fileToRead.txt");
  const readStream = createReadStream(filePath);

  readStream.on("data", (chunk) => {
    process.stdout.write(chunk);
  });

  readStream.on("end", () => {
    console.log("\nFile reading completed.");
  });

  readStream.on("error", (error) => {
    console.error(`Error reading the file: ${error.message}`);
  });
};

await read();
