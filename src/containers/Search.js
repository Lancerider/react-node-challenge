import React, { useState, useEffect } from "react";
import JobsList from '../components/JobsList'

import { getJobs, searchJobs, markFavoriteJob, clearJobs } from '../api/jobs'

function App() {
  const [searching, setSearching] = useState(false);
  const [errorSearching, setErrorSearching] = useState(false);
  const [term, setTerm] = useState('');
  const [jobs, setJobs] = useState({})

  const getUserJobs = async () => {
    setSearching(true)

    try {
      const fetchedJobs = await getJobs()
      setJobs(fetchedJobs)
      localStorage.setItem('jobs', fetchedJobs)
    } catch (error) {
      const jobsInLocalStorage = localStorage['jobs']

      setJobs(jobsInLocalStorage || [])
    }

    setSearching(false)
  }

  const setFavoriteJob = async (jobId) => {
    try {
      const responseJobs = await markFavoriteJob(jobId)
      setJobs(responseJobs)
    } catch (error) {
      console.error("Error setting favorite Job: ", error)
    }
  }

  const clearSearch = async () => {
    try {
      const responseJobs = await clearJobs()
      setJobs(responseJobs)
    } catch (error) {
      setErrorSearching(true)
    }
  }

  const search = async () => {
    setErrorSearching(false)
    setSearching(true)
    const formattedTerms = term.split(' ').join("+")
    
    try {
      const fetchedJobs = await searchJobs(formattedTerms)

      localStorage.setItem('jobs', fetchedJobs)
      setJobs(fetchedJobs)
    } catch (error) {
      setErrorSearching(true)
    }
    
    setSearching(false)
  }

  useEffect(() => {
    getUserJobs()
  }, [])

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

      <button className="job-list__actions" type="button" onClick={search}>
        Search
      </button>

      <button className="job-list__actions" type="button" onClick={clearSearch}>
        Clear
      </button>

      { searching && <div>...searching</div> }

      { !searching && !errorSearching && <JobsList jobs={jobs} setFavoriteJob={setFavoriteJob}/> }

      { errorSearching && <div>Ups, something went wrong. Please, try again.</div> }
    </div>
  );
}

export default App;
