import { configureStore } from '@reduxjs/toolkit'

import authSlice from '@auth/api/auth-slice'
import chatSlice from '@chat/api/chat-slice'
import coreUISlice from '@layout/api/layout-slice'
import { apiSlice } from 'services/api-slice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        chat: chatSlice,
        coreUI: coreUISlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})
