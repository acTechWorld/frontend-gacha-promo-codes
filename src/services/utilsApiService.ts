// src/services/apiService.js
import axios, { AxiosError } from 'axios'

// Access the base URL from environment variables
const baseURL = import.meta.env.VITE_UTILS_API_BASED_URL
// Function to refresh the token
let isRefreshing = false
let failedQueue: any[] = []

// Create an instance of axios
const utilsApiClient = axios.create({
  baseURL, // Use the base URL from the environment variable
  headers: {
    'Content-Type': 'application/json'
  }
})

const refreshToken = async () => {
  const response = await utilsApiClient.post('/user/login', {
    login: import.meta.env.VITE_UTILS_API_LOGIN,
    password: import.meta.env.VITE_UTILS_API_PASSWORD
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
utilsApiClient.interceptors.request.use(
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

utilsApiClient.interceptors.response.use(
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
        utilsApiClient.defaults.headers['Authorization'] = 'Bearer ' + newToken
        originalRequest.headers['Authorization'] = 'Bearer ' + newToken
        processQueue(null, newToken)
        return utilsApiClient(originalRequest)
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

const sendContactEmail = async ({
  email,
  firstName,
  lastName,
  companyName,
  message
}: {
  email: string
  firstName: string
  lastName: string
  companyName: string
  message: string
}) => {
  try {
    await utilsApiClient.post('/email/send-contact-email', {
      source: 'vueLanding',
      email: email,
      firstname: firstName,
      lastname: lastName,
      companyName: companyName,
      message: message
    })
    return true
  } catch (error) {
    return false
  }
}

const sendDemoKeyEmail = async ({ email, firstName }: { email: string; firstName: string }) => {
  try {
    await utilsApiClient.post('/email/send-licencing-key-email', {
      source: 'vueLanding',
      email: email,
      firstname: firstName,
      // duration: 604800000 // a week
      duration: 10000 // a week
    })
    return true
  } catch (error: any) {
    if (error.response?.status === 405) {
      return 'You already have a valid licence key, you cannot have a new one'
    } else {
      return 'An error occurred while sending your message, please try again'
    }
  }
}
export default { sendContactEmail, sendDemoKeyEmail }
