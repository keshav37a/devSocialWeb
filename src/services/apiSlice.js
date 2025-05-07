import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { BASE_URL } from 'src/constants'

export const apiSlice = createApi({
    reducerPath: 'devSocialApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: 'include',
    }),
    endpoints: () => ({}),
})
