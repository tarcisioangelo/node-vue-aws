import axios, { AxiosHeaders } from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'

const headersApi = new AxiosHeaders({
    'Content-Type': 'application/json',
})
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000,
    headers: { ...headersApi },
})

// tipando a config
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.set('Authorization', `Bearer ${token}`)
        }
        return config
    },
    (error) => Promise.reject(error)
)

// tratamento de erro
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
                console.error('Falha na autenticação! Redirecionando...')
                // TODO aqui quero redirecionar para o login o usuario com token expirado ou sem token
            } else {
                console.error(`Falha http: ${error.message}`)
            }
        } else {
            console.error(error)
        }
        return Promise.reject(error)
    }
)

export default api
