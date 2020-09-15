import React from 'react'

function JobsList({ jobs, setFavoriteJob }) {
  const jobsList = Object.values(jobs) || []
  return jobsList.length > 0 ? (
    <ol className="search-result">
      {jobsList.map((job) => (
        <li key={job.jobId}>
          <span className={job.favorited ? 'favorite' : ''}>
            {job.title} by {job.company.name}
          </span>
          <button type="button" onClick={() => setFavoriteJob(job.jobId)}>
            Fav
          </button>
        </li>
      ))}
    </ol>
  ) : (
    <div className="container">
      <div className="jobs-list__no-item">No jobs found</div>
    </div>
  )
}

export default JobsList
