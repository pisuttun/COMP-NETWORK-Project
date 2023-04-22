import axios from 'axios'

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DROPLET_URL || 'http://localhost:8000',
  timeout: 10000,
})
