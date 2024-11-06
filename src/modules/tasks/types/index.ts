export interface ITaskEdit {
    id?: number
    description: string
    date: string
    time: string
}

export interface ITask {
    id?: number
    description: string
    dateTask: string
    stTask: ITaskStatus
    'x-csrf-token'?: string
}

export type ITaskStatus = 'A' | 'B'
