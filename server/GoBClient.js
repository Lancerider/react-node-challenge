// memory database
const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');

let database = {};

class GoBClient {
  constructor(clientID) {
    this.clientID = clientID;
    if (!database[clientID]) database[clientID] = {};
  }

  // TODO: *** instance methods ***

  getJobs() {
    const jobsSaved = database[this.clientID]

    return {response: jobsSaved, error: null}
  }

  // accumulateSearch() - hit https://www.getonbrd.com/search/jobs storing the jobs locally

  accumulateSearch(term) {
    console.log("Console log : GoBClient -> if -> term", term)
    if (!term) return {response: null, error: "Bad request"}

    return new Promise((resolve, reject) => {

      fetch('https://www.getonbrd.com/search/jobs?q=' + term, {
        headers: {'Content-Type': 'application/json'},
      }).then(async response => {
        console.log("jobId")
        const jobsSaved = database[this.clientID]
        const jobsData = await response.json()

        jobsData.jobs.forEach(job => {
          const jobId = uuidv4();
          job.jobId = jobId
          job.favorited = false

          // save jobs as object by ID
          jobsSaved[jobId] = job
        })

        resolve(jobsSaved)
      }).catch(err => {
        setTimeout(() => {
          reject({response: null, error: "Not able to get more jobs"})
        }, 3000)
      });
    })
  }

  // mark() - marks a particular job as favorite and returns the updated local datasore
  mark(jobId) {
    const jobsSaved = database[this.clientID]
    if(!jobsSaved[jobId]) {
      return {respone: null, error: "Job not found"}
    }

    jobsSaved[jobId].favorite = true

    return {response: jobsSaved, error: null}
  }

  // clearSearch() - clears the accumulated searches
  clearSearch() {
    database[this.clientID] = {}

    return {response: {}, error: null}
  }
}

module.exports = GoBClient;
