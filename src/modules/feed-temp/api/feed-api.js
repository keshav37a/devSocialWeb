import { showToast } from 'src/modules/layout-temp/api/layout-slice'
import { apiSlice } from 'services/api-slice'

import { GET_USER_FEED_ENDPOINT, GET_USER_FEED_TAG } from 'src/modules/feed-temp/constants/feed-constants'

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
