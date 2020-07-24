import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [searching, setSearching] = useState(false);

  // TODO: *** hook that brings the last accumulative search (stored jobs)

  // TODO: helper functions for:
  // 1. Searching jobs
  // 2. Marking a job as favorite
  // 3. Cleaning the accumulated searches

  return (
    <div className="App">
      <h1>Search jobs</h1>
      <label htmlFor="term">Term: </label>
      <input
        id="term"
        type="text"
        value={term}
        onChange={({ target: { value } }) => setTerm(value)}
      />
      <button type="button" onClick={search}>
        Search
      </button>
      <button type="button" onClick={clearSearch}>
        Clear
      </button>
      {searching && <div>...searching</div>}
      {/**
       * TODO: Block of code to list the jobs with a button to mark them as favorite
       * Hint: It would be nice if it is a separate component
       */}
    </div>
  );
}

export default App;
