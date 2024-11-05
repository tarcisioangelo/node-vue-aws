import { api, getHeaders } from '@/globals/api'
import type { IPassword } from '../types'

export const apiUpdatePassword = async (payload: IPassword) => {
    const headers = getHeaders()
    const url = `/password`

    const { data } = await api.post<IPassword>(url, payload, headers)

    return data
}
