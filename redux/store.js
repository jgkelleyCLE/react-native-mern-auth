import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import authReducer from './authSlice'
import { songApi } from "./songApi";
import { playlistApi } from "./playlistApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [songApi.reducerPath]: songApi.reducer,
        [playlistApi.reducerPath]: playlistApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(authApi.middleware, songApi.middleware, playlistApi.middleware)
})