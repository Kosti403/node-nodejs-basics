import { createReadStream, createWriteStream, statSync } from "fs";
import { resolve, dirname } from "path";
import zlib from "zlib";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompress = () => {
  const inputFilePath = resolve(__dirname, "files", "archive.gz");
  const outputFilePath = resolve(__dirname, "files", "fileToCompress.txt");

  try {
    const stats = statSync(outputFilePath);
    if (stats.size > 0) {
      console.log("The file is already decompressed and contains data.");
    }
  } catch (error) {}

  const readStream = createReadStream(inputFilePath);
  const writeStream = createWriteStream(outputFilePath);
  const gunzip = zlib.createGunzip();

  readStream.on("error", (error) => {
    console.error(`Error reading the file: ${error.message}`);
  });

  writeStream.on("error", (error) => {
    console.error(`Error writing to the file: ${error.message}`);
  });

  gunzip.on("error", (error) => {
    console.error(`Error decompressing the file: ${error.message}`);
  });

  readStream.pipe(gunzip).pipe(writeStream);

  writeStream.on("finish", () => {
    console.log("File decompression completed.");
  });
};

decompress();
