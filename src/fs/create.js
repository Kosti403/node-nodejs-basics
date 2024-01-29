import { promises as fs } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
  const filePath = resolve(__dirname, "files", "fresh.txt");

  try {
    await fs.access(filePath);
    throw new Error("FS operation failed: File already exists");
  } catch (err) {
    if (err.code === "ENOENT") {
      await fs.writeFile(filePath, "I am fresh and young");
      console.log("File fresh.txt created successfully.");
    } else {
      throw err;
    }
  }
};

await create();
