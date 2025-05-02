import { showToast } from '@CoreUI/coreUISlice'
import { apiSlice } from 'services/apiSlice'

export const GET_USER_FEED_ENDPOINT = 'getUserFeed'
export const GET_USER_FEED_TAG = 'GET_USER_FEED'

export const feedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        [GET_USER_FEED_ENDPOINT]: builder.query({
            query: () => ({
                url: '/user/feed',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch (error) {
                    dispatch(showToast({ error: error?.error }))
                }
            },
            providesTags: [GET_USER_FEED_TAG],
            transformResponse: (response) => response?.data?.feed,
        }),
    }),
})

export const { useGetUserFeedQuery } = feedApi
