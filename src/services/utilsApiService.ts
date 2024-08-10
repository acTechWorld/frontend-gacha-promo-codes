// src/services/apiService.js
import type { Code } from '@/type/type'
import axios from 'axios'
import CryptoJS from 'crypto-js'

// Access the base URL from environment variables
const baseURLUtilsApi = import.meta.env.VITE_UTILS_API_BASED_URL
const baseURLGatchApi = import.meta.env.VITE_GATCHA_API_BASED_URL
// Function to refresh the token
let isRefreshing = false
let failedQueue: any[] = []

// Create an instance of axios
const utilsApiClient = axios.create({
  baseURL: baseURLUtilsApi, // Use the base URL from the environment variable
  headers: {
    'Content-Type': 'application/json'
  }
})

// Create an instance of axios
const gatchaApiClient = axios.create({
  baseURL: baseURLGatchApi, // Use the base URL from the environment variable
  headers: {
    'Content-Type': 'application/json'
  }
})

// Function to encrypt the password
const encrypt = (value: string) => {
  const expiredAt = Date.now() + 1 * 60 * 1000
  return CryptoJS.AES.encrypt(
    JSON.stringify({ value: value, expiredAt: expiredAt }),
    import.meta.env.VITE_UTILS_API_SECRET_KEY
  ).toString()
}

const refreshToken = async () => {
  const response = await utilsApiClient.post('/user/login', {
    loginEncrypted: encrypt(import.meta.env.VITE_UTILS_API_LOGIN),
    passwordEncrypted: encrypt(import.meta.env.VITE_UTILS_API_PASSWORD)
  })
  localStorage.setItem('accessToken', response.data.token)
  return response.data.token
}

const processQueue = (error: any, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })

  failedQueue = []
}

// Axios request interceptor
gatchaApiClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

gatchaApiClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if ([401, 403].includes(error.response.status) && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token
            return axios(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const newToken = await refreshToken()
        gatchaApiClient.defaults.headers['Authorization'] = 'Bearer ' + newToken
        originalRequest.headers['Authorization'] = 'Bearer ' + newToken
        processQueue(null, newToken)
        return gatchaApiClient(originalRequest)
      } catch (err) {
        processQueue(err, null)
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }
    console.error('Error fetching data:', error)
    return Promise.reject(error)
  }
)

const getAllPromoCodesFromApplication = async (application: string) => {
  try {
    const { data } = await gatchaApiClient.get(`/promo-codes/application/${application}`)
    return data
  } catch (error) {
    console.warn(`ERROR getAllPromoCodesFromApplication ${error}`)
  }
}

export const createPromoCode = async (params: Code, application: string) => {
  const { code, status, awardDescription, awardDetails, downVote, upVote } = params
  try {
    const { data } = await gatchaApiClient.post(`/promo-codes`, {
      code,
      application,
      status,
      awardDescription,
      upVote,
      downVote,
      awardDetails
    })
    return data
  } catch (error) {
    console.warn(`ERROR getAllPromoCodesFromApplication ${error}`)
    throw error
  }
}

export default { getAllPromoCodesFromApplication, createPromoCode }
