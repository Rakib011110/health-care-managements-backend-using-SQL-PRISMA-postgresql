import { Server } from "http";
import app from "./app";

const port = 5000;

// app.listen(port, () => {
//   console.log("APP IS RUNNING PORT", port);
// });

async function main() {
  const server: Server = app.listen(port, () => {
    console.log("server is running", port);
  });
}

main();
