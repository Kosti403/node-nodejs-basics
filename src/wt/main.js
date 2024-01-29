import { Worker } from "worker_threads";
import os from "os";

const performCalculations = async () => {
  const numCores = os.cpus().length;
  const promises = [];

  for (let i = 0; i < numCores; i++) {
    promises.push(
      new Promise((resolve, reject) => {
        const worker = new Worker(new URL("./worker.js", import.meta.url));
        worker.postMessage(10 + i);

        worker.on("message", (result) => {
          resolve({ status: "resolved", data: result });
        });

        worker.on("error", (err) => {
          console.error(`Worker error: ${err}`);
          resolve({ status: "error", data: null });
        });

        worker.on("exit", (code) => {
          if (code !== 0) {
            console.error(`Worker stopped with exit code ${code}`);
            resolve({ status: "error", data: null });
          }
        });
      })
    );
  }

  const results = await Promise.all(promises);
  console.log(results);
};

performCalculations();
