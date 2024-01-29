import { promises as fs } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function renameFile() {
  const sourceFilePath = resolve(__dirname, "files", "wrongFilename.txt");
  const destinationFilePath = resolve(__dirname, "files", "properFilename.md");

  try {
    await fs.access(sourceFilePath);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error(
        "FS operation failed: File wrongFilename.txt does not exist"
      );
    }
    throw err;
  }

  try {
    await fs.access(destinationFilePath);
    throw new Error(
      "FS operation failed: File properFilename.md already exists"
    );
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    }

    await fs.rename(sourceFilePath, destinationFilePath);
  }
}

renameFile()
  .then(() => console.log("File successfully renamed"))
  .catch((error) => console.error(error.message));
