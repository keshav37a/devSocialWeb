/* eslint-disable import/order */
import { showToast } from '@layout/api/layout-slice'
import { apiSlice } from 'services/api-slice'

import {
    GET_USER_CONNECTION_REQUESTS_ENDPOINT,
    GET_USER_CONNECTION_REQUESTS_TAG,
    GET_USER_CONNECTIONS_TAG,
    REVIEW_CONNECTION_REQUEST_ENDPOINT,
    SEND_CONNECTION_REQUEST_ENDPOINT,
} from '@connection-requests/constants/connection-requests-constants'
import { TOAST_TYPES } from '@components/Toast/constants'

export const connectionsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        [GET_USER_CONNECTION_REQUESTS_ENDPOINT]: builder.query({
            query: () => ({
                url: '/connection-request/review-requests',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch (error) {
                    dispatch(showToast({ error: error?.error }))
                }
            },
            providesTags: [GET_USER_CONNECTION_REQUESTS_TAG],
            transformResponse: (response) => response?.data?.connectionRequests,
        }),
        [REVIEW_CONNECTION_REQUEST_ENDPOINT]: builder.mutation({
            query: ({ status, connectionRequestId }) => ({
                url: `connection-request/review/${status}/${connectionRequestId}`,
                method: 'POST',
            }),
            invalidatesTags: [GET_USER_CONNECTIONS_TAG],
            async onQueryStarted({ connectionRequestId }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData('getUserConnectionRequests', null, (draft) =>
                        draft.filter((connectionRequest) => connectionRequest?._id !== connectionRequestId)
                    )
                )
                try {
                    await queryFulfilled
                    //TODO: diff messages for accept / ignore
                    dispatch(
                        showToast({ content: 'Connection request reviewed successfully', type: TOAST_TYPES.SUCCESS })
                    )
                } catch (error) {
                    dispatch(showToast({ error: error?.error }))
                    patchResult.undo()
                }
            },
        }),
        [SEND_CONNECTION_REQUEST_ENDPOINT]: builder.mutation({
            query: ({ status, userId }) => ({
                url: `connection-request/send/${status}/${userId}`,
                method: 'POST',
            }),
            async onQueryStarted({ userId }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData('getUserFeed', null, (draft) =>
                        draft.filter((user) => user?._id !== userId)
                    )
                )
                try {
                    await queryFulfilled
                    dispatch(showToast({ content: 'Connection request sent successfully', type: TOAST_TYPES.SUCCESS }))
                } catch (error) {
                    dispatch(showToast({ error: error?.error }))
                    patchResult.undo()
                }
            },
            transformResponse: (response) => response?.data,
        }),
    }),
})

export const {
    useGetUserConnectionRequestsQuery,
    useReviewConnectionRequestMutation,
    useSendConnectionRequestMutation,
} = connectionsApi
