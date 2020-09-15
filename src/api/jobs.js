const BASE_URL = 'http://localhost:3001/api'
const headers = { 'Content-Type': 'text/plain' }

export const getJobs = async () => {
  const responseJobs = await fetch(
    `${BASE_URL}/jobs`,
    {
      method: 'GET',
      headers,
    }
  )
  const jobsData = await responseJobs.json()

  if (jobsData.error) throw new Error(jobsData.error)

  return jobsData.response
}

export const searchJobs = async (terms) => {
  const responseJobs = await fetch(
    `${BASE_URL}/search?term=${terms}`,
    {
      method: 'GET',
      headers,
    }
  )
  const jobsData = await responseJobs.json()

  if (jobsData.error) throw new Error(jobsData.error)

  return jobsData.response
}

export const markFavoriteJob = async (jobId) => {
  const responseJobs = await fetch(
    `${BASE_URL}/fav`,
    {
      method: 'POST',
      headers,
      body: { jobId },
    }
  )
  const jobsData = await responseJobs.json()

  if (jobsData.error) throw new Error(jobsData.error)

  return jobsData.response
}

export const clearJobs = async () => {
  const response = await fetch(
    `${BASE_URL}/clear`,
    {
      method: 'POST',
      headers,
    }
  )

  const clearDataResponse = await response.json()
  if (clearDataResponse.error) {
    throw new Error(clearDataResponse.error)
  }

  return clearDataResponse.response
}
