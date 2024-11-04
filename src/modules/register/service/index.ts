import { api, getHeaders } from '@/globals/api'

import type { IUser, IUserPayload } from '../types'

export const apiRegister = async (payload: IUserPayload) => {
    const headers = getHeaders()
    const url = `/user`

    const { data } = await api.post<IUser>(url, payload, headers)

    return data
}
