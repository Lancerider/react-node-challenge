const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const GobClient = require("./GoBClient");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

let gobClient;

// TODO: *** inialize gobClient here ***
// hint: use a middleware
// GobClient uses an unique identifier (i.e: the request ip)

// *** Endpoints ***
// GET /api/search
app.get("/api/search", async (req, res) => {
  const term = req.query.term;
  let response = await gobClient.accumulateSearch(term);
  res.send(response);
});

// TODO: *** Add **
// POST /api/clear
// POST /api/fav

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);
