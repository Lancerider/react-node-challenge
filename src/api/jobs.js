const BASE_URL = 'http://localhost:3001/api'
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

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
      body: JSON.stringify({ jobId: jobId }),
      headers,
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
