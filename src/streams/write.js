import { createWriteStream } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);
const write = async () => {
  const filePath = resolve(__dirname, "files", "fileToWrite.txt");
  const writeStream = createWriteStream(filePath);

  writeStream.on("error", (error) => {
    console.error(`Error writing to the file: ${error.message}`);
  });

  process.stdin.pipe(writeStream);

  writeStream.on("finish", () => {
    console.log("File writing completed.");
  });
};

await write();
