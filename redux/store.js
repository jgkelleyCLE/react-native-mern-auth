import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import authReducer from './authSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(authApi.middleware)
})