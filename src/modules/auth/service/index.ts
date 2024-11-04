import { api, getHeaders } from '@/globals/api'

import type { IAuthUser } from '../types'

export const apiLogin = async (data: IAuthUser) => {
    const headers = getHeaders()
    const url = `/user/login`
    return api.post(url, data, headers)
}
