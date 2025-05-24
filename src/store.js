import { configureStore } from '@reduxjs/toolkit'

import authSlice from '@Auth/authSlice'
import chatSlice from '@Chat/chatSlice'
import coreUISlice from '@CoreUI/coreUISlice'
import { apiSlice } from 'services/apiSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        chat: chatSlice,
        coreUI: coreUISlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})
