import { api, getHeaders } from '@/globals/api'
import type { ITask } from '../types'

export const apiListTasks = async () => {
    const headers = getHeaders()
    const url = `/tasks`
    return api.get<ITask[]>(url, headers)
}

export const apiSaveTask = async (payload: ITask) => {
    const headers = getHeaders()
    const url = `/tasks`

    const { data } = await api.post<ITask>(url, payload, headers)

    return data
}
