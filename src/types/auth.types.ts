export interface User {
    id: string
    email: string
    username: string
    firstName: string
    lastName: string
    bio: string | null
    profileImage: string | null
    coverImage: string | null
    isEmailVerified: boolean
    isActive: boolean
    lastLoginAt: string | null
    createdAt: string
    updatedAt: string
}

export interface ILoginPayload {
    email: string
    password: string
}

export interface IRegisterPayload {
    name: string
    email: string
    password: string
}

export interface IApiError {
    message: string
    code: string
    statusCode: number
    timestamp: string
    path: string
}

export interface ILoginError {
    message: string
}

export interface IRegisterError {
    message: string
}

export interface IToken {
    accessToken: string
    refreshToken: string
}

export interface ILoginResponse {
    success: boolean
    data?: {
        user: User
        accessToken: string
        refreshToken: string
    }
    error?: IApiError
}

export interface IRegisterResponse {
    success: boolean
    data?: {
        user: User
        accessToken: string
        refreshToken: string
    }
    error?: IApiError
}