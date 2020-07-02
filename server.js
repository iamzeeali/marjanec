const dotenv = require("dotenv");
const path = require("path");
const express = require("express");

const cors = require("cors");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 🔥  Shutting down...");
  console.log(err);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

const port = process.env.PORT || 5004;

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Serve Sttaic asset in Production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 🔥  Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
