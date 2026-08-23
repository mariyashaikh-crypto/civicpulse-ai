import axios from 'axios'

const DASHBOARD_URL = '/api/dashboard/'
const REQUESTS_URL = '/api/requests/'
const PRIORITIES_URL = '/api/analytics/priorities'

export async function fetchDashboard() {
  const { data } = await axios.get(DASHBOARD_URL, { timeout: 8000 })
  return data
}

export async function fetchRequests() {
  const { data } = await axios.get(REQUESTS_URL, { timeout: 8000 })
  return data
}

export async function fetchPriorities() {
  const { data } = await axios.get(PRIORITIES_URL, { timeout: 8000 })
  return data
}

export async function submitCitizenRequest(payload) {
  const { data } = await axios.post(REQUESTS_URL, payload, { timeout: 15000 })
  return data
}
