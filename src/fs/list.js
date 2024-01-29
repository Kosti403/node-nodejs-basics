import { promises as fs } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const list = async () => {
  const folderPath = resolve(__dirname, "files");

  try {
    await fs.access(folderPath);

    const files = await fs.readdir(folderPath);

    console.log("List of files:");
    files.forEach((file) => console.log(file));
  } catch (err) {
    throw new Error(
      `FS operation failed: ${
        err.code === "ENOENT" ? 'Folder "files" does not exist' : err.message
      }`
    );
  }
};

await list();
