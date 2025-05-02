import { apiSlice } from 'services/apiSlice'

export const GET_USER_FEED_ENDPOINT = 'getUserFeed'
export const GET_USER_FEED_TAG = 'GET_USER_FEED'

export const feedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        [GET_USER_FEED_ENDPOINT]: builder.query({
            query: () => ({
                url: '/user/feed',
            }),
            transformResponse: (response) => response?.data?.feed,
            providesTags: [GET_USER_FEED_TAG],
        }),
    }),
})

export const { useGetUserFeedQuery } = feedApi
