export interface ITask {
    id?: number
    description: string
    dateTask?: string
    stTask?: 'A' | 'B'
    'x-csrf-token'?: string
}
