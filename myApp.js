var express = require("express");
var app = express();
require("dotenv").config();

console.log("Hello World");

app.use(function middleware(req, res, next) {
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
});

// app.get("/", (req, res) => {
//     res.send("Hello Express");
//   });

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/views/index.html");
// });

app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// app.get("/json", (req, res) => {
//   res.json({ message: "Hello json" });
// });

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else {
    res.json({ message: "Hello json" });
  }
});

app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.send({ time: req.time });
  }
);

module.exports = app;
