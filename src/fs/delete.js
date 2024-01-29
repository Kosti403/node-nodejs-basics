import { promises as fs } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const remove = async () => {
  const filePath = resolve(__dirname, "files", "fileToRemove.txt");

  try {
    await fs.access(filePath);

    await fs.unlink(filePath);
    console.log("File deleted successfully.");
  } catch (err) {
    throw new Error(
      `FS operation failed: ${
        err.code === "ENOENT" ? "File does not exist" : err.message
      }`
    );
  }
};

await remove();
