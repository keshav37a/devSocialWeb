/* eslint-disable import/order */
import { showToast } from 'src/modules/layout-temp/api/layout-slice'
import { apiSlice } from 'services/api-slice'

import {
    GET_USER_CONNECTIONS_ENDPOINT,
    GET_USER_CONNECTIONS_TAG,
    REMOVE_CONNECTION_ENDPOINT,
} from 'src/modules/connections-temp/constants/connections-constants'
import { GET_USER_FEED_TAG } from 'src/modules/feed-temp/constants/feed-constants'
import { TOAST_TYPES } from 'src/modules/components-temp/Toast/constants'

export const connectionsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        [GET_USER_CONNECTIONS_ENDPOINT]: builder.query({
            query: () => ({
                url: '/connection-request/connections',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch (error) {
                    dispatch(showToast({ error: error?.error }))
                }
            },
            providesTags: [GET_USER_CONNECTIONS_TAG],
            transformResponse: (response) => response?.data?.connections,
        }),
        [REMOVE_CONNECTION_ENDPOINT]: builder.mutation({
            query: ({ userId }) => ({
                url: `connection-request/connection/remove/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [GET_USER_FEED_TAG],
            async onQueryStarted({ userId }, { dispatch, queryFulfilled }) {
                let patchResult
                try {
                    patchResult = dispatch(
                        apiSlice.util.updateQueryData(GET_USER_CONNECTIONS_ENDPOINT, null, (draft) =>
                            draft.filter((user) => user._id !== userId)
                        )
                    )
                    await queryFulfilled
                    dispatch(showToast({ content: 'Connection removed successfully', type: TOAST_TYPES.SUCCESS }))
                } catch (error) {
                    dispatch(showToast({ error: error?.error }))
                    patchResult.undo()
                }
            },
        }),
    }),
})

export const { useGetUserConnectionsQuery, useRemoveConnectionMutation } = connectionsApi
