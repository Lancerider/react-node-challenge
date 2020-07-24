// memory database
let database = {};

class GoBClient {
  constructor(clientID) {
    this.clientID = clientID;
    if (!database[clientID]) database[clientID] = {};
  }

  // TODO: *** instance methods ***

  // accumulateSearch() - hit https://www.getonbrd.com/search/jobs storing the jobs locally
  // mark() - marks a particular job as favorite and returns the updated local datasore
  // clearSearch() - clears the accumulated searches
}

module.exports = GoBClient;
