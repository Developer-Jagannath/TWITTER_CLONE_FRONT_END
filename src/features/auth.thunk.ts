import { createAsyncThunk } from "@reduxjs/toolkit"
import { login, register } from "@/services"
import type { ILoginPayload, IRegisterPayload, ILoginResponse, IRegisterResponse } from "@/types"
import { setUser, setError, setLoading } from "@/store/slice/auth.slice"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constant/value"

export const loginThunk = createAsyncThunk<ILoginResponse, ILoginPayload, { rejectValue: string }>(
    "auth/login",
    async (payload: ILoginPayload, { dispatch, rejectWithValue }) => {
        dispatch(setLoading(true))
        dispatch(setError(null))
        
        try {   
            const response: ILoginResponse = await login(payload)
            
            if (response.success && response.data) {
                localStorage.setItem(ACCESS_TOKEN, response.data.accessToken)
                localStorage.setItem(REFRESH_TOKEN, response.data.refreshToken)
                dispatch(setUser({
                    user: response.data.user,
                    accessToken: response.data.accessToken,
                    refreshToken: response.data.refreshToken
                }))
                return response
            } else if (response.error) {
                const errorMessage = response.error.message || "Login failed"
                dispatch(setError(errorMessage))
                return rejectWithValue(errorMessage)
            }
            
            const defaultError = "Login failed. Please try again."
            dispatch(setError(defaultError))
            return rejectWithValue(defaultError)
            
        } catch (error: unknown) {
            console.error("Login error:", error)
            
            let errorMessage = "Login failed. Please try again."
            
            // Type guard for axios errors
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response: { status: number; data: { message?: string } } }
                const status = axiosError.response.status
                const data = axiosError.response.data
                
                if (status === 401) {
                    errorMessage = "Invalid email or password. Please check your credentials."
                } else if (status === 404) {
                    errorMessage = "User not found. Please check your email address."
                } else if (status === 422) {
                    errorMessage = data?.message || "Invalid input. Please check your information."
                } else if (status >= 500) {
                    errorMessage = "Server error. Please try again later."
                } else {
                    errorMessage = data?.message || `Login failed (${status}). Please try again.`
                }
            } else if (error && typeof error === 'object' && 'request' in error) {
                // Network error
                errorMessage = "Network error. Please check your internet connection and try again."
            } else if (error instanceof Error) {
                // Other error
                errorMessage = error.message || "An unexpected error occurred. Please try again."
            }
            
            dispatch(setError(errorMessage))
            return rejectWithValue(errorMessage)
        } finally {
            dispatch(setLoading(false))
        }
    }
)

export const registerThunk = createAsyncThunk<IRegisterResponse, IRegisterPayload, { rejectValue: string }>(
    "auth/register",
    async (payload: IRegisterPayload, { dispatch, rejectWithValue }) => {
        dispatch(setLoading(true))
        dispatch(setError(null))
        
        try {
            const response: IRegisterResponse = await register(payload)
            
            if (response.success && response.data) {
                localStorage.setItem(ACCESS_TOKEN, response.data.accessToken)
                localStorage.setItem(REFRESH_TOKEN, response.data.refreshToken)
                dispatch(setUser({
                    user: response.data.user,
                    accessToken: response.data.accessToken,
                    refreshToken: response.data.refreshToken,
                }))
                return response
            } else if (response.error) {
                const errorMessage = response.error.message || "Registration failed"
                dispatch(setError(errorMessage))
                return rejectWithValue(errorMessage)
            }
            
            const defaultError = "Registration failed. Please try again."
            dispatch(setError(defaultError))
            return rejectWithValue(defaultError)
            
        } catch (error: unknown) {
            console.error("Registration error:", error)
            
            let errorMessage = "Registration failed. Please try again."
            
            // Type guard for axios errors
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response: { status: number; data: { message?: string } } }
                const status = axiosError.response.status
                const data = axiosError.response.data
                
                if (status === 409) {
                    errorMessage = "An account with this email or username already exists. Please try signing in instead."
                } else if (status === 422) {
                    errorMessage = data?.message || "Invalid input. Please check your information."
                } else if (status >= 500) {
                    errorMessage = "Server error. Please try again later."
                } else {
                    errorMessage = data?.message || `Registration failed (${status}). Please try again.`
                }
            } else if (error && typeof error === 'object' && 'request' in error) {
                // Network error
                errorMessage = "Network error. Please check your internet connection and try again."
            } else if (error instanceof Error) {
                // Other error
                errorMessage = error.message || "An unexpected error occurred. Please try again."
            }
            
            dispatch(setError(errorMessage))
            return rejectWithValue(errorMessage)
        } finally {
            dispatch(setLoading(false))
        }
    }
)