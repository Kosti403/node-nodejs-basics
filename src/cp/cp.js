import { spawn } from "child_process";
import path from "path";

const spawnChildProcess = async (args) => {
  const scriptPath = path.join("src", "cp", "files", "script.js");

  const child = spawn("node", [scriptPath, ...args], {
    stdio: ["pipe", "pipe", process.stderr, "ipc"],
  });

  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);

  child.on("error", (error) => {
    console.error("Error when starting a child process:", error);
  });

  child.on("close", (code) => {
    console.log(`Child process exited with code ${code}`);
  });
};

spawnChildProcess(["arg1", "arg2"]);
