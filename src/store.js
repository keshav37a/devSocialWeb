import { configureStore } from '@reduxjs/toolkit'

import { apiSlice } from 'src/services/apiSlice'

import authSlice from '@Auth/authSlice'
import feedSlice from '@Feed/feedSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        feed: feedSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})
