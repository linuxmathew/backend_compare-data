const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log("I am running");
  res.send("Hello, Express");
});

app.listen(3001, () => {
  console.log("server started on port 3001");
});
