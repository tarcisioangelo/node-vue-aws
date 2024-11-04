import { api, getHeaders } from '@/globals/api'

export const apiLogin = async () => {
    const headers = getHeaders()
    const url = `/`
    return api.get(url, headers)
}
