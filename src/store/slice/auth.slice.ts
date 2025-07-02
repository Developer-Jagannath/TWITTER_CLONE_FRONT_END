import type { IAuthState, User } from "@/types"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"


const initialState: IAuthState = {
    user: null,
    accessToken: "",
    refreshToken: "",
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ user: User; accessToken: string; refreshToken: string }>) => {
            state.user = action.payload.user
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
            state.loading = false
            state.error = null
        },
        logout: (state) => {
            state.user = null
            state.accessToken = ""
            state.refreshToken = ""
            state.loading = false
            state.error = null
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
            if (action.payload) {
                state.error = null
            }
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
            if (action.payload) {
                state.loading = false
            }
        },
        clearError: (state) => {
            state.error = null
        },
    },
})

export const { setUser, logout, setLoading, setError, clearError } = authSlice.actions
export default authSlice.reducer






