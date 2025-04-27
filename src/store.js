import { configureStore } from '@reduxjs/toolkit'

import { apiSlice } from 'src/services/apiSlice'

import authSlice from '@Auth/authSlice'
import coreUISlice from '@CoreUI/coreUISlice'
import feedSlice from '@Feed/feedSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        feed: feedSlice,
        coreUI: coreUISlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})
