import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_ENDPOINT, BASE_URL } from 'src/constants'

export const apiSlice = createApi({
    reducerPath: 'devSocialApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL + API_ENDPOINT,
        credentials: 'include',
    }),
    endpoints: () => ({}),
})
