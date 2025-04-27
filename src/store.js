import { configureStore } from '@reduxjs/toolkit'

import { apiSlice } from 'src/services/apiSlice'

import authSlice from '@Auth/authSlice'
import connectionsSlice from '@Connections/connectionsSlice'
import coreUISlice from '@CoreUI/coreUISlice'
import feedSlice from '@Feed/feedSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        connections: connectionsSlice,
        coreUI: coreUISlice,
        feed: feedSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})
