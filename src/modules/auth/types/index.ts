export interface IUser {
    id: number
    name: string
    email: string
}
export interface IAuthResponse {
    token: string
    user: IUser
}
export interface IAuthUser {
    email: string
    password: string
}
