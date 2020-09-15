import React from 'react'

function JobsList({jobs, setFavoriteJob}) {
  const jobsList = Object.values(jobs) || []
  return (
    <ol className="search-result">
      {jobsList.length > 0 ? (
        <div className="jobs-list">
          {jobsList.map(job => (
            <li key={job.jobId} className={job.favorited ? 'favorite-job' : ''}>
              {job.title}
              <button type="button" onClick={()=>setFavoriteJob(job.jobId)}>Fav</button>
            </li>
          ))}
        </div>
      ) : (
        <div className="container">
          <div className="jobs-list__no-item">No jobs found</div>
        </div>
      )}
    </ol>
  )
}

export default JobsList
