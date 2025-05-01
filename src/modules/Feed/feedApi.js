import { apiSlice } from 'services/apiSlice'

export const feedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserFeed: builder.query({
            query: () => ({
                url: '/user/feed',
            }),
            transformResponse: (response) => response?.data?.feed,
        }),
    }),
})

export const { useGetUserFeedQuery } = feedApi
