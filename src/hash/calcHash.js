import { createReadStream } from "fs";
import { createHash } from "crypto";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const calculateHash = async () => {
  const filePath = resolve(__dirname, "files", "fileToCalculateHashFor.txt");
  const hash = createHash("sha256");

  try {
    const readStream = createReadStream(filePath);

    readStream.on("data", (chunk) => {
      hash.update(chunk);
    });

    await new Promise((resolve, reject) => {
      readStream.on("end", resolve);
      readStream.on("error", reject);
    });

    const hashResult = hash.digest("hex");
    console.log(`SHA256 Hash: ${hashResult}`);
  } catch (error) {
    console.error(`Error reading or hashing the file: ${error.message}`);
  }
};

await calculateHash();
