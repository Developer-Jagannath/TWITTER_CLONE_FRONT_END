import { configureStore } from "@reduxjs/toolkit"
import reducer from "./slice"

const store = configureStore({
    reducer: {
        reducer,
    },
        devTools: import.meta.env.DEV,
})

export default store
// 🔁 Type declarations for typed hooks
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch