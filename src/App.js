import React, { useState, useEffect } from "react";

import { getJobs, searchJobs, markFavoriteJob, clearJobs } from './api/jobs'

import "./App.css";


function App() {
  const [searching, setSearching] = useState(false);
  const [term, setTerm] = useState('');
  const [jobs, setJobs] = useState([])

  const getUserJobs = async () => {

    try {
      const fetchedJobs = await getJobs()
      setJobs(fetchedJobs)
      localStorage.setItem('jobs', fetchedJobs)
    } catch (error) {
      console.error(error)
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
      console.error("Error erasing user's Jobs: ", error)
    }
  }

  const search = async () => {
    setSearching(true)
    const formattedTerms = term.replace(' ','+')
    console.log("Console log : searchJobs -> formattedTerms", formattedTerms)

    try {
      const fetchedJobs = searchJobs(formattedTerms)
      localStorage.setItem('jobs', fetchedJobs)
      setJobs(fetchedJobs)
    } catch (error) {
      console.error("Error searching Jobs: ", error)
    }

    setSearching(false)
  }

  useEffect(() => {
    setSearching(true)
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
