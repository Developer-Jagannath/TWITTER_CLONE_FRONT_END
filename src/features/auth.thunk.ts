import { createAsyncThunk } from "@reduxjs/toolkit"
import { login, register } from "@/services"
import type { ILoginPayload, IRegisterPayload, ILoginResponse, IRegisterResponse } from "@/types"
import { setUser } from "@/store/slice/auth.slice"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constant/value"

export const loginThunk = createAsyncThunk<ILoginResponse, ILoginPayload, { rejectValue: string }>(
    "auth/login",
    async (payload: ILoginPayload, { dispatch, rejectWithValue }) => {
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
                return rejectWithValue(response.error.message)
            }
            return rejectWithValue("Login failed")
        } catch {
            return rejectWithValue("Login failed")
        }
    }
)

export const registerThunk = createAsyncThunk<IRegisterResponse, IRegisterPayload, { rejectValue: string }>(
    "auth/register",
    async (payload: IRegisterPayload, { dispatch, rejectWithValue }) => {
        try {
            const response: IRegisterResponse = await register(payload)
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
                return rejectWithValue(response.error.message)
            }
            return rejectWithValue("Registration failed")
        } catch {
            return rejectWithValue("Registration failed")
        }
    }
)