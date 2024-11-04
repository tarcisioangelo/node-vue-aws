import { api, getHeaders } from '@/globals/api'

import type { IAuthResponse, IAuthUser } from '../types'

export const apiLogin = async (payload: IAuthUser) => {
    const headers = getHeaders()
    const url = `/user/login`

    const { data } = await api.post<IAuthResponse>(url, payload, headers)

    return data
}
