import { apiSlice } from 'services/apiSlice'

export const feedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserFeed: builder.query({
            query: () => ({
                url: '/user/feed',
            }),
        }),
    }),
})

export const { useGetUserFeedQuery } = feedApi
