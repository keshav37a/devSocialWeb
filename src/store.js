import { configureStore } from '@reduxjs/toolkit'

import authSlice from '@Auth/authSlice'
import { apiSlice } from 'src/services/apiSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})
