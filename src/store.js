import { configureStore } from '@reduxjs/toolkit'

import authSlice from '@Auth/authSlice'
import connectionsSlice from '@Connections/connectionsSlice'
import coreUISlice from '@CoreUI/coreUISlice'
import feedSlice from '@Feed/feedSlice'
import { apiSlice } from 'services/apiSlice'

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
