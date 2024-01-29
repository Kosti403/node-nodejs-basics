import { promises as fs } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  const filePath = resolve(__dirname, "files", "fileToRead.txt");

  try {
    await fs.access(filePath);

    const content = await fs.readFile(filePath, "utf-8");

    console.log("File content:");
    console.log(content);
  } catch (err) {
    throw new Error(
      `FS operation failed: ${
        err.code === "ENOENT" ? "File does not exist" : err.message
      }`
    );
  }
};

await read();
