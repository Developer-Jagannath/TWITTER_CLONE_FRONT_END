import type { User } from "@/types"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
    user: User | null
    accessToken: string
    refreshToken: string
}

const initialState: AuthState = {
    user: null,
    accessToken: "",
    refreshToken: "",
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ user: User; accessToken: string; refreshToken: string }>) => {
            state.user = action.payload.user
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
        },
        logout: (state) => {
            state.user = null
            state.accessToken = ""
            state.refreshToken = ""
        },
    },
})

export const { setUser, logout } = authSlice.actions
export default authSlice.reducer






