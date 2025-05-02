import { configureStore } from '@reduxjs/toolkit'

import authSlice from '@Auth/authSlice'
import coreUISlice from '@CoreUI/coreUISlice'
import { apiSlice } from 'services/apiSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        coreUI: coreUISlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})
