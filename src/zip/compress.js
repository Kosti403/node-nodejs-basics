import { createReadStream, createWriteStream } from "fs";
import { resolve, dirname } from "path";
import zlib from "zlib";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);
const compress = async () => {
  const inputFilePath = resolve(__dirname, "files", "fileToCompress.txt");
  const outputFilePath = resolve(__dirname, "files", "archive.gz");

  const readStream = createReadStream(inputFilePath);
  const writeStream = createWriteStream(outputFilePath);
  const gzip = zlib.createGzip();

  readStream.on("error", (error) => {
    console.error(`Error reading the file: ${error.message}`);
  });

  writeStream.on("error", (error) => {
    console.error(`Error writing to the file: ${error.message}`);
  });

  gzip.on("error", (error) => {
    console.error(`Error compressing the file: ${error.message}`);
  });

  readStream.pipe(gzip).pipe(writeStream);

  writeStream.on("finish", () => {
    console.log("File compression completed.");
  });
};

await compress();
