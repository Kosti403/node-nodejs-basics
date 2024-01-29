
import { promises as fs } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
  const sourceFolderPath = resolve(__dirname, "files");
  const destinationFolderPath = resolve(__dirname, "files_copy");

  try {
    await fs.access(sourceFolderPath);

    await fs.mkdir(destinationFolderPath).catch(() => {});

    const files = await fs.readdir(sourceFolderPath);
    for (const file of files) {
      const sourceFilePath = resolve(sourceFolderPath, file);
      const destinationFilePath = resolve(destinationFolderPath, file);
      await fs.copyFile(sourceFilePath, destinationFilePath);
    }

    console.log('Folder "files" copied to "files_copy" successfully.');
  } catch (err) {
    throw new Error(`FS operation failed: ${err.message}`);
  }
};

await copy();
