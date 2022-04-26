const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors')
require('dotenv').config()
// const pino = require("express-pino-logger")();

const GobClient = require("./GoBClient");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(pino);
app.use(cors())
app.set('trust proxy', true)

let gobClient;

const setGobClient = (req, res, next) => {
  gobClient = new GobClient(req.ip)
  next();
}
// GobClient uses an unique identifier (i.e: the request ip)

// *** Endpoints ***
// GET /api/search
app.get("/api/search", setGobClient, async (req, res) => {
  try {
    const term = req.query.term;

    let response = await gobClient.accumulateSearch(term);

    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

// GET jobs
app.get("/api/jobs", setGobClient, async (req, res) => {
  try {
    let response = await gobClient.getJobs();

    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

// POST /api/clear
app.post("/api/clear", setGobClient, async (req, res) => {
  let response = gobClient.clearSearch();
  res.send(response);
});

// POST /api/fav
app.post("/api/fav", setGobClient, async (req, res) => {
  const jobId = req.body.jobId;
  let response = gobClient.mark(jobId);
  res.send(response);
});

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);
