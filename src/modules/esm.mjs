import fs from "fs/promises";
import path from "path";
import os from "os";
import http from "http";

function getDirname(metaUrl) {
  const pathname = new URL(metaUrl).pathname;
  return path.dirname(path.resolve(decodeURIComponent(pathname).slice(1)));
}

const __dirname = getDirname(import.meta.url);

const __filename = new URL("", import.meta.url).pathname;

async function loadJSON(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading the file: ${error.message}`);
    return null;
  }
}

const random = Math.random();
let unknownObject;
const filePathA = path.join(__dirname, "files", "a.json");
const filePathB = path.join(__dirname, "files", "b.json");

if (random > 0.5) {
  loadJSON(filePathA).then((data) => {
    unknownObject = data;
  });
} else {
  loadJSON(filePathB).then((data) => {
    unknownObject = data;
  });
}

console.log(`Release ${os.release()}`);
console.log(`Version ${os.version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = http.createServer((_, res) => {
  res.end("Request accepted");
});

const PORT = 3000;

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log("To terminate it, use Ctrl+C combination");
});

export { unknownObject, myServer };
