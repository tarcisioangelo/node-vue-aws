import { api, getHeaders } from '@/globals/api'
import type { ITask } from '@/modules/tasks/types'

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

export const apiDeleteTask = async (idTask: number) => {
    const headers = getHeaders()
    const url = `/tasks/${idTask}`
    return api.delete(url, headers)
}

export const apiGetCsrfToken = async () => {
    const headers = getHeaders()
    const url = `/user/csrf-token`
    return api.get(url, headers)
}
